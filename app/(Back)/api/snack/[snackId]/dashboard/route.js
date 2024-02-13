import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";

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

export async function GET(req, { params }){
    try{
        const snack_id = parseInt(params.snackId);

        const { user_id, username } = getVerified();

        // 유저이름 찾기
        const snack = await prisma.snack.findUnique({
            where: {
                snack_id: snack_id,
            },
        });

        // 스낵을 만든 사람만 볼 수 있게
        if(snack.created_by != username){
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const snack_solutions = await prisma.snack_solutions.findMany({
            where: {
                snack_id: snack_id,
            }
        })

        let tot_score = 0;
        let tot_duration = 0;
        const tot = snack_solutions.length;

        const userSubmissions = {};

        for(let i = 0; i < tot; i++){
            tot_score += snack_solutions[i].score;
            tot_duration += snack_solutions[i].duration;
            
            const username = await getUserNameById(snack_solutions[i].user_id);

            if(userSubmissions.hasOwnProperty(username)){
                userSubmissions[username]++;
            }
            else{
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

        let avg_score = ((tot_score / tot));
        let avg_duration = ((tot_duration / tot));

        avg_score.toFixed(1);
        avg_duration.toFixed(1);

        return Response.json({ avg_score, avg_duration, userSubmissionDetails });
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
 * /snack/{snackId}/dashboard:
 *  get:
 *    security:
 *      - cookieAuth: []
 *    summary: 제출자에 한하여, 스낵에 대한 통계 정보를 반환합니다.
 *    tags: [Snack]
 *    description: 특정 스낵에 대하여, 평균 점수, 평균 제출 시간, 유저별 제출 횟수를 반환합니다.
 *    parameters:
 *      - in: path
 *        name: snackId
 *        required: true
 *        description: 스낵의 ID
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: 성공적인 응답
 *        content:
 *          application/json:
 *            example:
 *              avg_score: 33.6
 *              avg_duration: 7.5
 *              userSubmissionDetails:
 *                 - username : kim
 *                   submissionCount : 2
 *                 - username : park
 *                   submissionCount : 3
 *      401:
 *        description: Invalid token
 *      500:
 *        description: Internal Server Error
 */

