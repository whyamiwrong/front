import { PrismaClient } from "@prisma/client";
import { getVerified } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(req, { params }){
    
    try{
    const snack_id = params.snack_id;
    const {user_id, username} = getVerified();
    
    const data = await req.json();

    const keys = Object.keys(data);

    const tot_count = keys.length;

    let ans_count = 0;

    for(var i = 0; i < tot_count; i++){
        var key = keys[i];

        const snack_quiz = await prisma.snack_quiz.findFirst({
            where: {
                snack_quiz_id: parseInt(key),
            },
        });    
        
        const obj = snack_quiz.selections;

        let is_correct = 0;

        if(obj.answer == data[key]){
            ans_count++;
            is_correct = 1;
            const users = await prisma.user.updateMany({
                where: {
                    user_id : user_id,
                },
                data: {
                    solved: {
                        increment : 1,
                    },
                },
            });
        };

        const solution = await prisma.solutions.create({
            data: {
                snack_quiz_id : parseInt(key),
                user_id : user_id,
                is_correct: is_correct,
            }
        })
    }

    return Response.json({ ans_count, tot_count});
    }catch (error) {
        console.error('Error:', error);
        
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

/**
 * @swagger
 * /snack/{snackId}/submission:
 *   post:
 *     summary: 사용자가 스낵 내에서 제출한 퀴즈들을 채점하고, 문제 맞은 갯수와 총 갯수를 반환합니다.
 *     tags: [Snack]
 *     requestBody:
 *       description: 스낵 퀴즈 ID, 선택한 정답 순으로 json 만들어주세요
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             1 : "4"
 *             2 : "1"
 *     parameters:
 *       - in: path
 *         name: snack_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 특정 스낵의 ID
 *     responses:
 *       200:
 *         description: 성공적으로 답변이 제출되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ans_count:
 *                   type: integer
 *                 tot_count:
 *                   type: integer 
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 * */