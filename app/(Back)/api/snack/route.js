import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

export async function GET(req) {
    
    const snacks = await prisma.snack.findMany()

    return Response.json(snacks);
}

export async function POST(req){
    try{
        const session = await req.json();
        const {user_id, username} = getVerified();
    
        const newSnack = await prisma.snack.create({
            data: {
                title: session.title,
                created_by: username,
            }
        });

        return Response.json(newSnack);
    }   catch (err){
        console.error('Error:', err);

        return new Response(JSON.stringify({ error: 'Invalid token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
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
 *   post:
 *     security:
 *       - cookieAuth: [] 
 *     summary: 새로운 스낵 문제를 생성합니다.
 *     tags: [Snack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "트리"
 *     responses:
 *       201:
 *         description: 새로운 스낵 문제가 성공적으로 생성됩니다.
 *         content:
 *           application/json:
 *             example:
 *               snack_id: 3
 *               title: "트리"
 *               views: 0
 */