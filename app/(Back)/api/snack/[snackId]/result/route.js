import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

export async function POST(req, { params }){

    try{
        const session = await req.json();
        const snack_id = parseInt(params.snackId);

        const { user_id, username } = getVerified();

        const result = await prisma.snack_solutions.create({
            data: {
                snack_id : snack_id,
                user_id : user_id,
                score : session.score,
                duration : session.duration,
            },
        });

        return Response.json(result);
    } catch (err) {
        return Response.json({ alert : '로그인되지 않은 상태입니다.'});
    }
}

/**
 * @swagger
 * /snack/{snackId}/result:
 *   post:
 *     summary: 특정 스낵에 대한 유저 아이디, 점수, 푼 시간을 snack_solutions 테이블에 저장합니다.
 *     tags: [Snack]
 *     requestBody:
 *       description: 점수랑 푼 시간 넘겨주세요
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             score : 50
 *             duration : 7
 *     parameters:
 *       - in: path
 *         name: snackId
 *         required: true
 *         description: 스낵 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
*             example:
 *               - snack_solutions_id: 1
 *                 snack_id: 1
 *                 user_id: 23
 *                 score: 50
 *                 duration : 7
 * */