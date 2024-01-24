import prisma from '@/lib/prisma';
import { getVerified } from '@/lib/session';

export async function GET(req, { params }) {
  try {
    const problem_id = parseInt(params.problemId);
    console.log(getVerified());

    const { user_id, username } = getVerified();

    const problem = await prisma.problems.findFirst({
      where: {
        problem_id: problem_id,
        created_by: username,
      },
    });

    // 출제자만 볼 수 있게
    if (problem == null) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submissions = await prisma.submissions.findMany({
      where: {
        problem_id: problem_id,
      },
    });

    const tot = submissions.length;
    let solved = 0;

    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i].is_correct) solved++;
    }

    const userCount = await prisma.submissions.count({
      where: {
        problem_id: problem_id,
      },
      distinct: ['user_id'],
    });

    const answer_percent = (solved / tot) * 100;
    const avg_submissions = userCount / tot;

    return Response.json({ answer_percent, avg_submissions });
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * @swagger
 * /problem/{problemId}/dashboard:
 *   get:
 *     summary: 문제에 대한 통계 정보를 반환합니다.
 *     tags: [Problems]
 *     description: 특정 문제에 대하여, 정답률과 평균 제출 횟수를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         description: 문제의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               answer_percent: 75
 *               avg_submissions: 3.5
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */