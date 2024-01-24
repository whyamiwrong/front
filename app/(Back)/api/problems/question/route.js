import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

/*
{
    "title": "abcd",
    "description": "a + b를 작성하세요",
    "algorithm_category": "수학",
    "examples": [
        {
            "input" : "1 3",
            "output" : "4"
        },
        {
            "input" : "1 4",
            "output" : "5"
        }
    ],
    "testcases": [
        {
            "input": "1 3",
            "output": "4"
        },
        {
            "input" : "1 4",
            "output" : "5"
        }
    ]
}
*/

export async function POST(req){
    try{
        const { title, description, algorithm_category, example_code, examples, testcases } = await req.json();
        const { user_id, username } = getVerified();

        const new_problem = await prisma.problems.create({
            data: {
                title: title,
                description: description,
                algorithm_category: algorithm_category,
                example_code: example_code,
                created_by: username,
            },
        });

        for(let i = 0; i < examples.length; i++){
            const new_examples = await prisma.examples.create({
                data: {
                    problem_id: new_problem.problem_id,
                    input: examples[i].input,
                    output: examples[i].output,
                },
            });
        };

        for(let i = 0; i < testcases.length; i++){
            const new_testcases = await prisma.testcases.create({
                data: {
                    problem_id: new_problem.problem_id,
                    input: testcases[i].input,
                    output: testcases[i].output,
                },
            });
        };

        return Response.json(new_problem);
    } catch(error) { 
        console.error('Error:', error);

        return new Response(JSON.stringify({ error: 'Invalid token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

/**
 * @swagger
 * /problems/question:
 *   post:
 *     summary: 새로운 문제를 생성합니다.
 *     tags:
 *       - Problems
 *     requestBody:
 *       description: 새로운 문제에 대한 정보를 담고 있는 JSON Payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the problem.
 *               description:
 *                 type: string
 *                 description: The description of the problem.
 *               algorithm_category:
 *                 type: string
 *                 description: The category of the algorithm.
 *               example_code:
 *                 type: string
 *                 description: The example code for the problem.
 *               examples:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                       description: The input for an example.
 *                     output:
 *                       type: string
 *                       description: The expected output for the example.
 *                 description: An array of examples for the problem.
 *               testcases:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: string
 *                       description: The input for a test case.
 *                     output:
 *                       type: string
 *                       description: The expected output for the test case.
 *                 description: An array of test cases for the problem.
 *     responses:
 *       '200':
 *         description: 성공적인 응답. 생성된 문제에 대한 정보를 반환합니다.
 *       '401':
 *         description: 토큰 인증 오류
 */