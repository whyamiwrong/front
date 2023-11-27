import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
        

        const solution_id = parseInt(params.solutionId);
        const solutions = await prisma.solutions.findUnique({
                where: {
                        solution_id: solution_id,
                },
                select: {
                        solution_code: true,
                        is_correct : true,
                        language: true,
                        time_taken: true,
                        submitted_at: true,
                        error_type: true,
                },
        });

        return Response.json(solutions);
}