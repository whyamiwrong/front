import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

export async function GET(req, { params }) {
    const snack_id = params.snackId;
    const quiz_id = params.quizId;

    const snack_quiz = await prisma.snack_quiz.findFirst({
        where : {
            snack_id : parseInt(snack_id),
            snack_quiz_id: parseInt(quiz_id),
        },
    })  

    return Response.json(snack_quiz);
}

export async function DELETE(request, { params }){
    const snack_id = params.snackId;
    const quiz_id = params.quizId;

    try{
        const {username, user_id} = getVerified();
 
        const deleteSnack_quiz = await prisma.snack_quiz.delete({
            where: {
                snack_id: snack_id,
                snack_quiz_id: quiz_id,
                created_by: username,
            },
        });

        return Response.json({deleteSnack_quiz});
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

/**
 * @swagger
 * /snack/{snackId}/quiz/{quizId}:
 *   get:
 *     summary: 특정 스낵의 특정 퀴즈의 정보를 반환합니다.
 *     tags: [Snack]
 *     parameters:
 *       - in: path
 *         name: snackId
 *         required: true
 *         description: 퀴즈 정보를 가져올 스낵의 ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: 가져올 퀴즈의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               snack_quiz_id: 1
 *               snack_id: 1
 *               title: "배열의 특징"
 *               description: "프로그래밍 관점에서, 길이가 n인 배열(Array)의 특징에 대해 맞는 답을 고르세요."
 *               selections:
 *                 1: "배열의 특정 인덱스의 원소를 찾기 위해서는 O(n) 시간이 소요된다."
 *                 2: "배열의 특정 위치에 원소를 삽입할 때에는 O(1) 시간이 소요된다."
 *                 3: "배열의 특정 위치에 원소를 삭제할 때에는 O(1) 시간이 소요된다."
 *                 4: "배열의 연속한 원소들은 연속한 메모리 공간에 위치한다."
 *               answer: "4"
 *               created_by: null
 *               tag:
 *                 1: "자료구조"
 *                 2: "배열"
 *   delete:
 *      summary: 출제자에 한하여, 특정 스낵의 특정 퀴즈를 삭제합니다.
 *      tags: [Snack]
 *      security:
 *       - cookieAuth: []  
 *      parameters:
 *       - in: path
 *         name: snackId
 *         required: true
 *         description: 삭제할 스낵의 ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: 삭제할 스낵 내의 퀴즈 ID
 *         schema:
 *           type: integer
 *         responses:
 *           200:
 *             description: 성공적으로 삭제가 수행됩니다.
 *             content:
 *               applicaition/json:
 *                 example:
 *               snack_quiz_id: 1
 *               snack_id: 1
 *               title: "배열의 특징"
 *               description: "프로그래밍 관점에서, 길이가 n인 배열(Array)의 특징에 대해 맞는 답을 고르세요."
 *               selections:
 *                 1: "배열의 특정 인덱스의 원소를 찾기 위해서는 O(n) 시간이 소요된다."
 *                 2: "배열의 특정 위치에 원소를 삽입할 때에는 O(1) 시간이 소요된다."
 *                 3: "배열의 특정 위치에 원소를 삭제할 때에는 O(1) 시간이 소요된다."
 *                 4: "배열의 연속한 원소들은 연속한 메모리 공간에 위치한다."
 *               answer: "4"
 *               created_by: null
 *               tag:
 *                 1: "자료구조"
 *                 2: "배열"
 *           401:
 *             description: Unauthorized
 */
