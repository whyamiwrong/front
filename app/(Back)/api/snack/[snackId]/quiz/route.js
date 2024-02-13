import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

export async function POST(req){

    try{
    const session = await req.json();
    const { user_id, username } = getVerified();

    const newQuiz = await prisma.snack_quiz.create({
        data: {
            snack_id : session.snack_id,
            title: session.title,
            description: session.description,
            selections: session.selections,
            created_by: username,
            tag: session.tag,
        },
    });

    // console.log(user_id);
    // console.log(username);

    return Response.json(newQuiz);
}catch(error){
    console.error('Error:', error);

    return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
    });
}
}

/**
 * @swagger
 * /snack/{snackId}/quiz:
 *   post:
 *     security:
 *       - cookieAuth: []  
 *     summary: 스낵 내에서 새로운 퀴즈를 생성합니다.
 *     tags: [Snack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             snack_id: 3
 *             title: "트리의 특징"
 *             description: "프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."
 *             selections: 
 *               1: "트리에는 사이클(Cycle)이 포함될 수 있다."
 *               2: "노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."
 *               3: "트리는 그래프의 한 종류라고 할 수 있다."
 *               4: "트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."
 *               answer: "3" 
 *             tag:
 *               1: "자료구조"
 *               2: "트리"
 *     responses:
 *       200:
 *         description: 새로운 퀴즈가 생성됩니다.
 *         content:
 *           application/json:
 *             example:
 *               snack_quiz_id: 5
 *               snack_id: 3
 *               title: "트리의 특징"
 *               description: "프로그래밍 관점에서, 트리(Tree)의 특징에 대해 맞는 답을 고르세요."
 *               selections: 
 *                 1: "트리에는 사이클(Cycle)이 포함될 수 있다."
 *                 2: "노드의 수가 n인 트리에서, 트리의 최대 높이는 O(logn)이다."
 *                 3: "트리는 그래프의 한 종류라고 할 수 있다."
 *                 4: "트리에서 부모 노드는 여러 자식 노드를 가질 수 있고, 자식 노드는 여러 부모 노드를 가질 수 있다."
 *                 answer: "3" 
 *               created_by: "whyamiwrong"
 *               tag:
 *                 1: "자료구조"
 *                 2: "트리"
 */

