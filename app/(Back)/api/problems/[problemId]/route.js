import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";
//import {code} from "../../../../(Front)/algorithm/[prob_id]/page"


// problems, problems에서는 
export async function GET(request, { params }) {

        const problem_id = parseInt(params.problemId);
        const problems = await prisma.problems.findUnique({
            where:{
                problem_id : problem_id,
            }
        });

        const examples = await prisma.examples.findMany({
            where: {
                problem_id : problem_id,
            },
            select: {
                input: true,
                output: true
            }
        })

        const testcases = await prisma.testcases.findMany({
            where: {
                problem_id : problem_id,
            },
            select: {
                input: true,
                output: true
            }
        })

        const result = {
            ...problems,
            examples: examples,
            testcases: testcases,
        };
        
        return Response.json(result);
}

/**
 * @swagger
 * /problems/{problemId}:
 *   get:
 *     summary: 특정 Problem의 정보를 반환합니다
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 정보를 얻고자하는 Problem의 ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 problem_id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 algorithm_category:
 *                   type: string
 *                 examples:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       input:
 *                         type: string
 *                       output:
 *                         type: string
 *                 testcases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       input:
 *                         type: string
 *                       output:
 *                         type: string
 */

export async function POST(request, { params } ){
    const problem_id = parseInt(params.problemId);
    const body = await request.json();
    const code = body.code;

    // const testcases = await prisma.testcases.findUnique({
    //     where:{
    //         problem_id: problem_id,
    //         testcase_id: problem_id,
    //     },
    //     select:{
    //         input: true,
    //         output: true
    //     }
        
    // })
    const testcases = await prisma.testcases.findMany({
        where: {
            problem_id: problem_id,
        },
        select: {
            input: true,
            output: true
        }
    });
    console.log("bye")
    const inputs = testcases.map(testcase => Array.isArray(testcase.input) ? testcase.input.join('\n') : testcase.input);
    if(!inputs)
    {
        console.log("yaho")
    }
    const checks = testcases.map(testcase => Array.isArray(testcase.output) ? testcase.output.join('\n') : testcase.output);

    // inputs ,outputs => 배열
    console.log(inputs);
    console.log(checks);


    //const input = testcases.input[0];
    //const check = testcases.output[0];

    //const input = testcases.input // 각 입력값을 줄바꿈으로 연결
    //const check = testcases.output

    const runCode = async () => {
        try{
            const response = await fetch(`${process.env.JUDGE_WORKER}/submit/check_answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code, inputs, checks}),
                credentials: 'include',
            });

            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.detail);
            }
            const result = await response.json();
            return result
        }
        catch(error){
            console.error(error);
            return {
                error
            }
        }
    }
    
    
    
    const result = await runCode({code, inputs,checks});
    console.log(result)
    
    await update_submissions(problem_id, result.correct);

    if(result.correct==1){
        console.log("happy")
        await update_solved()
        console.log("muyaho")
    }
    else console.log(result.correct)
    return Response.json(result)
}

async function update_solved(){
    
    try{
        const {user_id, username} = getVerified();
        const solved = await prisma.user.update({
            where : {
                username : username,
                user_id:user_id
            },
            data: {
                solved:{
                    increment:1,
                }
            }
        })
        console.log("success")
        console.log(solved.solved)
    } catch(e){
        return
    }
}
    
async function update_submissions(problem_id, is_correct){

    try{
        const { user_id, username } = getVerified();
        
        if(is_correct == 1){
            const solved = await prisma.submissions.create({
                data:{
                    problem_id: problem_id,
                    user_id: user_id,
                    is_correct: 1,
                },
            });
        } else {
            const solved = await prisma.submissions.create({
                data:{
                    problem_id: problem_id,
                    user_id: user_id,
                    is_correct: 0,
                },
            });
        }
    } catch (error){
        return error;
    }
}

// model testcases {
//     testcase_id       Int               @id @default(autoincrement())
//     problem_id        Int
//     input             String            @db.Text
//     output            String            @db.Text
//     _problems _problems @relation(fields: [problem_id], references: [problem_id], onDelete: NoAction, onUpdate: Restrict, map: "fk_testcases_problems")
//
//     @@index([problem_id], map: "fk_testcases_problems")
//   }