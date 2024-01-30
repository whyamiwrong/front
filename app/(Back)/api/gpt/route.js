//const dotenv = require('dotenv');
import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";
import fs from "fs";
//const fs = require("fs");
let extractedData = ''; 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(data).toString("base64"),
      mimeType
    },
  };
}


export async function POST(request) {
  try{
  const session = await request.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
 
  const prompt = `너는 이제 컴퓨터공학과의 TA야. 학생들을 위한 문제를 내야해. 이미지를 분석하고 해당 이미지가 포함하는 내용을 이해하고 이와 관련된 주제에 대해 묻는 객관식 1문제(4 choices)를 출제 해. 문제의 형식은 반드시 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. 선지를 제시하기 전에 문제 설명에 힌트를 담으면 안돼. 4가지 선지 중에 정답인 선지는 랜덤으로 정해줘. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어줘. 무조건 \`\`\`json으로 시작해\n
  \`\`\`json{"title": "알고리즘 문제 제목","description": "알고리즘 문제 설명","selections": {"1": "선지1","2": "선지2","3": "선지3","4": "선지4","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`
   const imagePath = "/Users/ihaesu/Desktop/test/learning.png";
  const imageData = fs.readFileSync(imagePath);

  const imageParts = [
    fileToGenerativePart(imageData, "image/png"),
  ];
  
  // const uploadedFile = request.files && request.files[0];
  //   if (!uploadedFile) {
  //     throw new Error("No file uploaded");
  //   }

  //   const imageParts = [
  //     fileToGenerativePart(uploadedFile.content, uploadedFile.mimeType),
  //   ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // let extractedData = response.text();
    // console.log(extractedData);
    // extractedData = extractedData.slice(extractedData.indexOf('{'), extractedData.lastIndexOf('}') + 1);

    // console.log(extractedData)
    // extractedData = JSON.parse(extractedData);
    // console.log(extractedData);

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