import prisma from '@/lib/prisma';
import { getVerified } from '@/lib/session';

async function getUserNameById(user_id) {
  const user = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
    select: {
      username: true,
    },
  });

  return user ? user.username : null;
}

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

    const userSubmissions = {};

    for(let i = 0; i < submissions.length; i++){
      const user_id = submissions[i].user_id;
      const username = await getUserNameById(user_id);

      if(userSubmissions.hasOwnProperty(username)) {
        userSubmissions[username]++;
      } else {
        userSubmissions[username] = 1;
      }
    }

    const userSubmissionDetails = [];

    for(const [username, submissionCount] of Object.entries(userSubmissions)) {
      userSubmissionDetails.push({
        username,
        submissionCount,
      });
    }

    
    
    const answer_percent = ((solved / tot) * 100) + '%';

    return Response.json({ answer_percent, userSubmissionDetails });
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
 * /problems/{problemId}/dashboard:
 *   get:
 *     security:
 *       - cookieAuth: [] 
 *     summary: 제출자에 한하여, 문제에 대한 통계 정보를 반환합니다.
 *     tags: [Problems]
 *     description: 특정 문제에 대하여, 정답률과 유저별 제출 횟수를 반환합니다.
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
 *               answer_percent: 75%
 *               userSubmissionDetails:
 *                 - username : kim
 *                   submissionCount : 2
 *                 - username : park
 *                   submissionCount : 3
 *       '401':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */