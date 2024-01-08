import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sign } from "@/lib/jwt";
import { verifyPassword } from "@/lib/hashing";

export async function POST(req, res) {
  const data = await req.json();

  const { username, password } = data;

  const user = await prisma.user.findUnique({
    where:{
      username : username,
    },
  });

  const verified = await verifyPassword(password, user.salt, user.password);

  if(user == null){
    throw new Error("User not found")
  } 
  else if(!verified){
    throw new Error("Invalid password");
  }
  else{
    const token = sign(user.user_id, user.username);

    let _res = new Response(JSON.stringify({ user, token }));
    _res.headers.set(
      "Set-Cookie",
      `_TOKEN=${token}; Path=/; Expires=${(
        new Date(Date.now() + 60 * 60 * 24 * 30)
      ).toUTCString()}; HttpOnly;`
    );

    return _res;
  }
}


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 회원 확인 후 회원 jwt를 반환합니다.
 *     tags : [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "whyamiwrong"
 *               password:
 *                 type: string
 *                 example: "qwer1234"
 *     responses:
 *       200:
 *         description: 'success'
 */
