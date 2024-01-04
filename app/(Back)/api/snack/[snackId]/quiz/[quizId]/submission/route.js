import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
    const { user_id, snack_quiz_id, selection } = await req.json();

    const snack_quiz = await prisma.snack_quiz.findFirst({
        where: {
            snack_quiz_id: snack_quiz_id,
        },
    });

    const obj = snack_quiz.selections;

    let is_correct = 0; 

    if(obj.answer == selection){
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

    const solutions = await prisma.solutions.create({
        data: {
            snack_quiz_id : snack_quiz_id,
            user_id : user_id,
            is_correct: is_correct,
        }
    })

    return Response.json({ user_id, snack_quiz_id, is_correct })
}

/**
 * @swagger
 * /snack/{snackId}/quiz/{quizId}/submission:
 *   post:
 *     summary: 사용자가 스낵 퀴즈를 제출하고 결과를 반환합니다.
 *     tags: [Snack]
 *     parameters:
 *       - in: path
 *         name: snackId
 *         required: true
 *         description: 퀴즈를 제출할 스낵의 ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: 제출할 퀴즈의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: 사용자의 ID
 *               snack_quiz_id:
 *                 type: integer
 *                 description: 제출할 스낵 퀴즈의 ID
 *               selection:
 *                 type: integer
 *                 description: 사용자가 선택한 답
 *     responses:
 *       200:
 *         description: 퀴즈 제출 결과
 *         content:
 *           application/json:
 *             example:
 *               user_id: 1
 *               snack_quiz_id: 1
 *               is_correct: 1
 */
