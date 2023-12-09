import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {

        const problem_id = parseInt(params.problemId);
        const original_problems = await prisma.original_problems.findUnique({
            where:{
                problem_id : problem_id,
            },
            select:{
                problem_id:true,
                problems:true
            }
        });

        const examples = await prisma.examples.findMany({
            where: {
                problem_id : problem_id,
            },
            select: {
                input: true,
                output: true
            }
        })

        const testcases = await prisma.testcases.findMany({
            where: {
                problem_id : problem_id,
            },
            select: {
                input: true,
                output: true
            }
        })

        const result = {
            ...original_problems,
            examples: examples,
            testcases: testcases,
        };

        return Response.json(result);
}

/**
 * @swagger
 * /problems/{problemId}:
 *   get:
 *     summary: 특정 Original problem의 정보를 반환합니다
 *     tags: [Original Problems]
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 정보를 얻고자하는 Original problem의 ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 problem_id:
 *                   type: number
 *                 problems:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     algorithm_category:
 *                       type: string
 *                 examples:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       input:
 *                         type: string
 *                       output:
 *                         type: string
 *                 testcases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       input:
 *                         type: string
 *                       output:
 *                         type: string
 */

