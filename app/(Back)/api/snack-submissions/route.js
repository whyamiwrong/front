import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function correct(submission){
    const solutions = await prisma.solutions.create({
        data: {
            is_correct : 1,
            submission_id : submission.submission_id,
        }
    })

    return solutions
}

async function wrong(submission){
    const solutions = await prisma.solutions.create({
        data: {
            is_correct : 0,
            submission_id : submission.submission_id,
        }
    })

    return solutions
}

export async function POST(request) {

        const { user_id, problem_id, answer } = await request.json();

        const submission = await prisma.submissions.create({
            data: {
                user:{
                    connect : {user_id : user_id},
                },
                problems:{
                    connect : {problem_id : problem_id},
                },
                answer : answer
            }
        })

        const ox_problems = await prisma.ox_problems.findUnique({
            where: {
                problem_id : problem_id,
            },
        })

        const short_answer_problems = await prisma.short_answer_problems.findUnique({
            where: {
                problem_id : problem_id,
            },
        })

        const multiple_choices_problems = await prisma.multiple_choices_problems.findUnique({
            where: {
                problem_id : problem_id,
            },
        })

        if(ox_problems === null && short_answer_problems === null && multiple_choices_problems === null){
            return Response.json({
                status : 'Error',
                message : 'No matching problem found'
            }), {status : 404};
        }
        else if(ox_problems !== null){
            if(ox_problems.correct_answer == answer){
                correct(submission);
            }
            else{
                wrong(submission);
            }
        }
        else if(short_answer_problems !== null){
            if(short_answer_problems.expected_answer == answer){
                correct(submission);
            }
            else{
                wrong(submission);
            }
        }
        else if(multiple_choices_problems !== null){
            if(multiple_choices_problems.correct_choice == answer){
                correct(submission);
            }
            else{
                wrong(submission);
            }
        }

        return Response.json({
           submissionsid: submission.submission_id,
           status : 'Success' 
        });
}


/**
 * @swagger
 * /snack-submissions:
 *   post:
 *     summary: 스낵 문제에 대해 새 제출을 생성하고, 정답 여부에 따라 solution이 solutions에 생성됩니다
 *     tags: [Snack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               problem_id:
 *                 type: integer
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submissionsid:
 *                   type: integer
 *                 status:
 *                   type: string
 *                   example: "Success"
 *       404:
 *         description: No matching problem found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "No matching problem found"
 */
    

