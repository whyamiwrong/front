import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, {params }) {

        const snack_id = params.snackId;
        const snack_quizs = await prisma.snack_quiz.findMany({
            where:{
                snack_id : parseInt(snack_id),
            }
        });

        return Response.json(snack_quizs);
}

/**
 * @swagger
 * /snack/{snackId}:
 *   get:
 *     summary: 특정 스낵에 대한 퀴즈 목록을 반환합니다.
 *     tags: [Snack]
 *     parameters:
 *       - in: path
 *         name: snackId
 *         required: true
 *         description: 퀴즈를 가져올 스낵의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
*             example:
 *               - snack_quiz_id: 1
 *                 snack_id: 1
 *                 title: "배열의 특징"
 *                 description: "프로그래밍 관점에서, 길이가 n인 배열(Array)의 특징에 대해 맞는 답을 고르세요."
 *                 selections:
 *                   1: "배열의 특정 인덱스의 원소를 찾기 위해서는 O(n) 시간이 소요된다."
 *                   2: "배열의 특정 위치에 원소를 삽입할 때에는 O(1) 시간이 소요된다."
 *                   3: "배열의 특정 위치에 원소를 삭제할 때에는 O(1) 시간이 소요된다."
 *                   4: "배열의 연속한 원소들은 연속한 메모리 공간에 위치한다."
 *                 answer: "4"
 *                 created_by: null
 *                 tag:
 *                   1: "자료구조"
 *                   2: "배열"
 *               - snack_quiz_id: 2
 *                 snack_id: 1
 *                 title: "배열의 공간복잡도"
 *                 description: "다음 문장이 맞으면 O, 틀리면 X를 체크하세요. 길이가 100인 INT형 배열은 약 400 Bytes의 메모리 공간을 필요로 한다."
 *                 selections:
 *                   1: "O"
 *                   2: "X"
 *                 answer: "1"
 *                 created_by: null
 *                 tag:
 *                   1: "배열"
 *                   2: "공간 복잡도"
 */