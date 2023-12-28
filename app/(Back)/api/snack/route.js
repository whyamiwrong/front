import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    
    const snacks = await prisma.snack.findMany()

    return Response.json(snacks);
}

/**
 * @swagger
 * /snack:
 *   get:
 *     summary: 모든 스낵의 정보를 반환합니다.
 *     tags: [Snack]
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               - snack_id: 1
 *                 title: "배열"
 *                 views: 0
 *               - snack_id: 2
 *                 title: "연결 리스트"
 *                 views: 0
 */