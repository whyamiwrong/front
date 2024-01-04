import { getVerified } from "@/lib/session"

export async function GET(_request: Request) {
  
  getVerified();
  // Do whatever you want
  return new Response("Hello World!", {
    status: 200,
  });
}

/**
 * @swagger
 * /hello:
 *   get:
 *     description: __\'hello world\'__ 를 반환합니다.
 *     responses:
 *       200:
 *         description: Hello World!
 */
