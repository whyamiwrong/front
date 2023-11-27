import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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