import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function GET(req, res) {

  let _res = new Response(JSON.stringify({ message: "logout success" }));
  _res.headers.set(
    "Set-Cookie",
    `_TOKEN=; Path=/; Expires=-1; HttpOnly;`
  );

  if (cookies().has("_TOKEN")) {
    cookies().delete("_TOKEN");
  }

  return _res;
}

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: cookie 에서 jwt를 삭제합니다.
 *     tags : [Auth]
 *     responses:
 *       '200':
 *         description: 'OK'
 */
