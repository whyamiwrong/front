import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

        return Response.json({
           submissionsid: submission.submission_id,
           status : 'Success' 
        });
}

