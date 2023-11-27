import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {

        const original_problems = await prisma.original_problems.findMany({
            select: {
                problem_id: true,
                problems: {
                    select: {
                        title: true,
                        algorithm_category: true
                    },
                },
            },
        })

        return Response.json(original_problems);
}