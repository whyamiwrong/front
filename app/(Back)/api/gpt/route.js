import OpenAI from 'openai';
//const dotenv = require('dotenv');
import { PrismaClient } from "@prisma/client";
let extractedData = ''; 
const prisma = new PrismaClient();

export async function GET(request) {
  const apiKey = process.env.OPENAI_API_SECRET_KEY;
  const prompt = '너는 이제 컴퓨터공학과의 TA야. 학생들을 위한 문제를 내야해. OSI 7계층 중 5계층의 특징에 대해 묻는 객관식 1문제(4 choices)를 출제 해. 문제의 형식은 반드시 \n 개수도 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. 정답은 번호만 출력하고, 태그는 2개 이상 ,로 구분해야 해. \n문제 제목:\n문제 설명:\n1. \n2. \n3. \n4. \n정답:\n관련 태그:';

  const openai = new OpenAI({
    apiKey: apiKey,
  });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const extractedData = extractInfoFromGPTResponse(response.choices[0].message.content);
    console.log(0);
    console.log(extractedData.title);
    // POST 함수 호출

    // const newQuiz = await prisma.snack_quiz.create({
    //     data: {
    //         snack_id: 1,
    //         title: extractedData.title,
    //         description: extractedData.description,
    //         selections: extractedData.choice1 + '\n' + extractedData.choice2 + '\n' + extractedData.choice3 + '\n' + extractedData.choice4,
    //         created_by: 'test',
    //         tag: extractedData.tag,
    //     },
    // });

    return Response.json({extractedData})

} 

// export async function POST(request) {
//     try {
//         // Request에서 JSON 데이터 추출
//         //const requestData = await request.json();
//         console.log(extractedData);
//         // 추출된 데이터를 활용하여 새로운 퀴즈 생성
//         const newQuiz = await prisma.snack_quiz.create({
//             data: {
//                 snack_id: 1,
//                 title: 'test',
//                 description: 'testtest',
//                 selections: 'test0103',
//                 created_by: 'test',
//                 tag: 'extractedData.tag',
//             },
//         });

//         return new Response(JSON.stringify({ newQuiz }), {
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error:', error);

//         return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }



function extractInfoFromGPTResponse(gptResponse) {
  const lines = gptResponse.split('\n');
  let choice1 = '';
  let choice2 = '';
  let choice3 = '';
  let choice4 = '';
  let title = '';
  let description = '';
  let selections = '';
  let tag = '';

  for (const line of lines) {
    if (line.startsWith('문제 제목:')) {
      title = line.slice(7).trim();
    } else if (line.startsWith('문제 설명:')) {
      description = line.slice(7).trim();
    } else if (line.startsWith('1.')) {
      choice1 = line.slice(0).trim();
    } else if (line.startsWith('2.')) {
      choice2 = line.slice(0).trim();
    } else if (line.startsWith('3.')) {
      choice3 = line.slice(0).trim();
    } else if (line.startsWith('4.')) {
      choice4 = line.slice(0).trim();
    } else if (line.startsWith('정답:')) {
      selections = line.slice(4).trim();
    } else if (line.startsWith('관련 태그:')) {
      tag = line.slice(7).trim();
    }
  }

  return { title, description, choice1, choice2, choice3, choice4 , selections, tag };
}
