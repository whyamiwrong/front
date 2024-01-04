import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
        

        const solution_id = parseInt(params.solutionId);
        const solutions = await prisma.solutions.findUnique({
                where: {
                        solution_id: solution_id,
                },
                select: {
                        solution_code: true,
                        is_correct : true,
                        language: true,
                        time_taken: true,
                        submitted_at: true,
                        error_type: true,
                },
        });

        return Response.json(solutions);
}

/**
 * @swagger
 * /solutions/{solutionId}:
 *   get:
 *     summary: 특정 Solution에 대한 정보를 반환합니다
 *     tags: [Solutions]
 *     parameters:
 *       - in: path
 *         name: solutionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 정보를 얻고자하는 Solution의 ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solution_code:
 *                   type: string
 *                 is_correct:
 *                   type: number
 *                 language:
 *                   type: string
 *                 time_taken:
 *                   type: number
 *                 submitted_at:
 *                   type: string
 *                   format: date-time
 *                 error_type:
 *                   type: string
 */
