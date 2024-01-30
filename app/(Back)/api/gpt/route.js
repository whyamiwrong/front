//const dotenv = require('dotenv');
import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";
let extractedData = ''; 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: data,
      mimeType
    },
  };
}

export async function POST(request) {
  try {
  const session = await request.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  var prompt = '';
  if (session.type == 'multi') prompt = `너는 이제 컴퓨터공학과의 TA야. 학생들을 위한 컴퓨터 공학 전공 관련 문제를 내야해. 너는 이미지들을 분석해서 모든 이미지들이 포함하고 있는 내용을 이해하고, 이미지들의 공통적인 주제 + keyword + '${session.subject}'에 대한 객관식 1문제(4 choices)를 출제 해. 이는 반드시 컴퓨터 공학도에게 관련 있어야 해. 객관식 문제의 형식은 반드시 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. 선지를 제시하기 전에 문제 설명에 주제어를 포함하면 안돼. 문제의 난이도는 '${session.difficulty}'야. 4가지 선지 중에 정답인 선지는 랜덤으로 정해줘. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어줘. 무조건 \`\`\`json으로 시작해\n
  \`\`\`json{"title": "알고리즘 문제 제목","description": "알고리즘 문제 설명","selections": {"1": "선지1","2": "선지2","3": "선지3","4": "선지4","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`
  else if (session.type == 'ox') prompt = `이미지들을 분석해서 이미지들이 공통적으로 포함하는 주제를 이해해줘 + '${session.subject}' 이러한 주제와 관련된 true or false 1문제(정답은 O or X)를 출제 해. 문제의 난이도는 꼭 '${session.difficulty}'하게 내줘. OX 문제의 description에는 반드시 참 거짓 여부를 질문하는 문제 내용이 들어가야 해. selection 에는 내가 지정한대로 O, X만 들어갈거야. OX 문제의 형식은 반드시 아래 형식과 똑같아야 해. 두 번 이상 \n을 출력하지마. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어줘. 무조건 \`\`\`json으로 시작해\n
  \`\`json{"title": "알고리즘 문제 제목","description": "true or false 문제 내용","selections": {"1": "true","2": "false","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`

  console.log(session);

  const URL = session.images;
  const urls = [];

  for(let i = 0; i < URL.length; i++){
      urls[i] = fileToGenerativePart(URL[i], "image/png");
  }

  console.log(urls[1]);
  const imageParts = [
    urls[0], urls[1], urls[2], urls[3], urls[4]
  ];
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    console.log(text);

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
//    const {user_id, username} = getVerified();

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