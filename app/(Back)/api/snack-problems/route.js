import prisma from "@/lib/prisma";

export async function GET(request) {

        const oxProblems = await prisma.ox_problems.findMany({
            select: {
                problem_id: true,
                problems: {
                    select: {
                        title: true,
                        algorithm_category: true
                    },
                },
            }
        });

        const shortAnswerProblems = 
        await prisma.short_answer_problems.findMany({
            select: {
                problem_id: true,
                problems: {
                    select: {
                        title: true,
                        algorithm_category: true
                    },
                },
            }
        });
        const MultipleChoicesProblems = 
        await prisma.multiple_choices_problems.findMany({
            select: {
                problem_id: true,
                problems: {
                    select: {
                        title: true,
                        algorithm_category: true
                    },
                },
            }
        });

        const snackProblems = {
            oxProblems,
            shortAnswerProblems,
            MultipleChoicesProblems
        };

        return Response.json(snackProblems);
}

/**
 * @swagger
 * /snack-problems:
 *   get:
 *     summary: 스낵 문제의 리스트를 OX문제, 주관식 문제, 객관식 문제 리스트 순으로 반환합니다
 *     tags: [Snack]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *            example:
 *               oxProblems:
 *                - problem_id: 1
 *                  problems:
 *                    title: "ox 문제"
 *                    algorithm_category: "사칙연산" 
 *               shortAnswerProblems: 
 *                - problem_id: 2
 *                  problems :
 *                    title : "주관식 문제"
 *                    algorithm_category: "DFS"
 *               MultipleChoicesProblems:
 *                 - problem_id: 3
 *                   problems:
 *                     title: "객관식 문제1"
 *                     algorithm_category: "배열"
 *
 *                 - problem_id: 4
 *                   problems:
 *                     title: "객관식 문제2"
 *                     algorithm_category: "브루트포스"
 */
