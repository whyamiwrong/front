import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){

    const users = await prisma.user.findMany({
        orderBy: {
            solved : 'desc',
        },
        select: {
            user_id : true,
            username : true,
            solved : true,
        },
    });

    const rankings = users.map((user, index) => ({
        ...user,
        rank : index + 1,
    }))

    return Response.json(rankings);
}

/**
 * @swagger
 * /ranking:
 *   get:
 *     summary: 문제를 푼 갯수에 기반하여 유저들의 순위를 반환합니다.
 *     tags : [Ranking]
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               - user_id: 1
 *                 username: whyamiwrong
 *                 solved: 10
 *                 rank: 1
 *               - user_id: 2
 *                 username : acsd
 *                 solved : 6
 *                 rank: 2
 */