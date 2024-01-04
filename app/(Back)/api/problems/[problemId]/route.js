import { PrismaClient } from "@prisma/client";
import { getVerified } from "@/lib/session";
//import {code} from "../../../../(Front)/algorithm/[prob_id]/page"
const prisma = new PrismaClient();

//original problems, problems에서는 
export async function GET(request, { params }) {

        const problem_id = parseInt(params.problemId);
        const original_problems = await prisma.original_problems.findUnique({
            where:{
                problem_id : problem_id,
            },
            select:{
                problem_id:true,
                problems:true
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
            ...original_problems,
            examples: examples,
            testcases: testcases,
        };
        
        return Response.json(result);
}

async function hihi(){
    
    const username = "whyamiwrong";
    //const username = getVerified;
    
    
    const solved = await prisma.user.update({
        where : {
            username : username,
            //user_id: 1,//이 부분에 대한 처리는 어떻게 할것인가?
        },
        data: {
            solved:{
                increment:1,
            }
        }
    })
    console.log("success")
    console.log(solved.solved)
}
/**
 * @swagger
 * /problems/{problemId}:
 *   get:
 *     summary: 특정 Original problem의 정보를 반환합니다
 *     tags: [Original Problems]
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 정보를 얻고자하는 Original problem의 ID
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
 *                 problems:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     algorithm_category:
 *                       type: string
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

export async function POST(request, {params,body}){
    const problem_id = parseInt(params.problemId);
    const testcases = await prisma.testcases.findUnique({
        where:{
            problem_id: problem_id,
            testcase_id: problem_id,
        },
        select:{
            input: true,
            output: true
        }
        
    })
    const input = testcases.input[0];
    const check = testcases.output[0];
    //code는 import?해와야 할 것임. 어떤 페이지에서?
    const code = '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "4";\n    return 0;\n}';
    const runCode = async () => {
        try{
            const response = await fetch('https://judge-worker.run.goorm.io/submit/check_answer',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code, input, check}),
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
    
    
    
    const result = await runCode({code, input,check});
    console.log(result)
    
    if(result.correct=="1"){
        console.log("happy")
        await hihi()
    }
    else console.log(result.correct)
    return Response.json(result)

}


// model testcases {
//     testcase_id       Int               @id @default(autoincrement())
//     problem_id        Int
//     input             String            @db.Text
//     output            String            @db.Text
//     original_problems original_problems @relation(fields: [problem_id], references: [problem_id], onDelete: NoAction, onUpdate: Restrict, map: "fk_testcases_problems")
  
//     @@index([problem_id], map: "fk_testcases_problems")
//   }