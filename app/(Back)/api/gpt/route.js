import OpenAI from 'openai';
//const dotenv = require('dotenv');
import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";
let extractedData = ''; 

export async function POST(request) {
  try{
  const session = await request.json();
  const apiKey = process.env.OPENAI_API_SECRET_KEY;
  // const prompt = `너는 이제 컴퓨터공학과의 TA야. 학생들을 위한 문제를 내야해. ${session.title}에 대해 묻는 객관식 1문제(4 choices)를 출제 해. 문제의 형식은 반드시 \n 개수도 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. 정답은 번호만 출력하고, 태그는 2개 이상 ,로 구분해야 해. \n문제 제목:\n문제 설명:\n1. \n2. \n3. \n4. \n정답:\n관련 태그:`;
  const prompt = `너는 이제 컴퓨터공학과의 TA야. 학생들을 위한 문제를 내야해. '${session.title}'에 대해 묻는 객관식 1문제(4 choices)를 출제 해. 문제의 형식은 반드시 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. 4가지 선지 중에 정답인 선지는 랜덤으로 정해줘.
  tag value에는 해당 문제와 관련한 알고리즘 분류를 적어줘.
  무조건 \`\`\`json으로 시작해\n
  \`\`\`json{"title": "알고리즘 문제 제목","description": "알고리즘 문제 설명","selections": {"1": "선지1","2": "선지2","3": "선지3","4": "선지4","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`
  const openai = new OpenAI({
    apiKey: apiKey,
  });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

  //   console.log(prompt);
  // const extractedData = extractInfoFromGPTResponse(response.choices[0].message.content);


    let extractedData = response.choices[0].message.content;
    console.log(extractedData);
    extractedData = extractedData.slice(extractedData.indexOf('{'), extractedData.lastIndexOf('}') + 1);

    console.log(extractedData)
    extractedData = JSON.parse(extractedData);
    console.log(extractedData);

    if (extractedData?.answer) {
      extractedData.selections = {...extractedData.selections, answer: extractedData.answer}
    }

    if (extractedData.tag[1].includes(',')) {
      const arr = extractedData.tag[1].split(",");
      extractedData.tag = {};
      for (var i = 0; i < arr.length; i++) {
          let key = i + 1;
          extractedData.tag[key] = arr[i].trim();
      }
    }

    // POST 함수 호출

    const {user_id, username} = getVerified();

    const newQuiz = await prisma.snack_quiz.create({
        data: {
            snack_id: session.snack_id,
            title: extractedData.title,
            description: extractedData.description,
            selections: extractedData.selections,
            created_by: username,
            tag: extractedData.tag,
        },
    });

    return Response.json({newQuiz})}
    catch(error){
        console.error('Error:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
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
  console.log(gptResponse);
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
      choice1 = line.slice(3).trim();
    } else if (line.startsWith('2.')) {
      choice2 = line.slice(3).trim();
    } else if (line.startsWith('3.')) {
      choice3 = line.slice(3).trim();
    } else if (line.startsWith('4.')) {
      choice4 = line.slice(3).trim();
    } else if (line.startsWith('정답:')) {
      selections = line.slice(4).trim();
    } else if (line.startsWith('관련 태그:')) {
      tag = line.slice(7).trim();
    }
  }

  return { title, description, choice1, choice2, choice3, choice4 , selections, tag };
}

/**
 * @swagger
 * /gpt:
 *   post:
 *     summary: OpenAI API를 이용한 스낵에 대한 새 스낵 퀴즈 생성
 *     description: OpenAI의 GPT-3.5-turbo 모델을 사용하여 주어진 세션 제목을 기반으로 새 퀴즈를 생성합니다.
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: int
 *                 example: 1
 *               snack_id:
 *                 type: int
 *                 example: 3
 *               title:
 *                 type: string
 *                 example: "트리의 특징"
 *     responses:
 *       200:
 *         description: 퀴즈가 성공적으로 생성
 *         content:
 *           application/json:
 *             example:
 *               newQuiz:
 *                 snack_quiz_id: 6
 *                 snack_id: 3
 *                 title: "퀴즈의 제목"
 *                 description: "생성된 퀴즈 설명"
 *                 selections:
 *                   1: "옵션 1"
 *                   2: "옵션 2"
 *                   3: "옵션 3"
 *                   4: "옵션 4"
 *                   answer: 2
 *                 created_by: 1
 *                 tag:
 *                   1: "알고리즘 카테고리 1"
 *                   2: "알고리즘 카테고리 2"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
