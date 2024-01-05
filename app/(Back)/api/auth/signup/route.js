import prisma from "@/lib/prisma"
import { sign } from "@/lib/jwt";

export async function POST(req){
    const user = await req.json();

    const signup = await prisma.user.create({
        data: {
            username : user.username,
            password : user.password,
            phone_number : user.phone_number,
            email : user.email,
        },
    });

    const token = sign(signup.user_id, signup.username);



    let _res = new Response(JSON.stringify({ signup, token }));
    _res.headers.set(
        "Set-Cookie",
        `_TOKEN=${token}; Path=/; Expires=${(
          new Date(Date.now() + 60 * 60 * 24 * 30)
        ).toUTCString()}; HttpOnly;`
      );

    return _res;
}

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 사용자의 회원가입을 처리하고 인증 토큰을 발급합니다.
 *     requestBody:
 *       description: 사용자 정보를 포함한 JSON 데이터
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 사용자 이름
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *               phone_number:
 *                 type: string
 *                 description: 사용자 전화번호
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 주소
 *     responses:
 *       '200':
 *         description: 회원가입이 성공하고 토큰이 발급되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signup:
 *                   type: object
 *                   description: 회원가입된 사용자 정보
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       description: 사용자 ID
 *                     username:
 *                       type: string
 *                       description: 사용자 이름
 *                     password:
 *                       type: string
 *                       description: 사용자 비밀번호 (암호화된 형태)
 *                     phone_number:
 *                       type: string
 *                       description: 사용자 전화번호
 *                     email:
 *                       type: string
 *                       description: 사용자 이메일 주소
 *                 token:
 *                   type: string
 *                   description: 발급된 사용자 토큰
 */