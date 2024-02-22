//const dotenv = require('dotenv');
import prisma from "@/lib/prisma";
import { getVerified } from "@/lib/session";
let extractedData = "";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: data,
      mimeType,
    },
  };
}

export async function POST(request) {
  try {
    const session = await request.json();
    const generationConfig = {
      temperature: 0.9,
    };
    var model = "";
    var result = "";
    if (session.version == "image")
      model = genAI.getGenerativeModel({
        model: "gemini-pro-vision",
        generationConfig,
      });
    else
      model = genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig,
      });
    // 모델 정의 (session.version에 따라 image or text 모델)

    var prompt = "";
    if (session.version == "image" && session.type == "multi")
      prompt = `당신은 이제 컴퓨터공학과의 교수입니다. 당신의 임무는 학생들을 위한 컴퓨터 공학 전공 관련 문제를 내는 것입니다. 우선 input으로 제공되는 images들을 분석하고, 모든 이미지들이 포함하고 있는 내용을 이해하여야 합니다. 이미지에서 중요하다고 생각하는 키워드에 대해 묻는 객관식 1문제(4 choices)를 출제해야 합니다. 이미지가 내포하는 keyword + ${session.subject}을 토대로 문제를 출제합니다. 이는 반드시 컴퓨터 공학과 학생이 풀 수 있는 문제여야 합니다. 또한 문제는 단순하지 않고 반드시! 컴퓨터 공학적 개념을 활용하여 풀 법한 난이도여야 합니다. 
  객관식 문제의 형식은 반드시 아래 형식을 지켜야 합니다. 두 번 이상 \n을 출력하면 안 됩니다. 선지를 제시하기 전에 description에는 선지를 유추할 수 있는 문장을 포함하면 안되고 특정 주제에 대해 묻는 문장이어야 합니다. 문제의 난이도는 컴퓨터 전공 대학생에게 '${session.difficulty}' 정도로 출제해야 합니다. 4가지 선지 중에 정답인 선지는 랜덤으로 정해야 합니다. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어주세요. 반드시! 무조건 json\n으로 시작하세요\n
  json{"title": "알고리즘 문제 제목","description": "알고리즘 문제 설명","selections": {"1": "선지1","2": "선지2","3": "선지3","4": "선지4","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`;
    // 이미지 객관식 문제 출제
    else if (session.version == "image" && session.type == "ox")
      prompt = `당신은 이제 컴퓨터공학과의 교수입니다. 당신의 임무는 학생들을 위한 컴퓨터 공학 전공 관련 문제를 내는 것입니다. 너는 input으로 제공되는 images들을 분석하고, 이미지에서 중요하다고 생각하는 키워드를 알아내야 합니다. 그리고 키워드에 대해 자세히 묻는 true or false question(정답은 O or X)를 1문제 출제 하세요. 이미지는 ${session.subject}와 관련이 있습니다. 문제의 난이도는 꼭 '${session.difficulty}'하게 내야 합니다. OX 문제의 description에는 해당 context가 거짓인지 참인지에 대해 묻는 내용이 들어가 있어야 합니다. selection 에는 enum type으로 O (true) or X (false)만 들어가야 합니다. OX 문제의 형식은 반드시 아래 형식과 똑같아야 합니다. 두 번 이상 \n을 출력하면 안됩니다. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어주세요. 반드시 json으로 시작하세요\n
  json{"title": "알고리즘 문제 제목","description": "ox 퀴즈 내용","selections": {"1": "true","2": "false","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`;
    // 이미지 OX 문제 출제
    else if (session.version == "text" && session.type == "multi")
      prompt = `당신은 이제 컴퓨터공학과의 교수입니다. 당신의 임무는 학생들을 위한 컴퓨터 공학 전공 관련 문제를 내는 것입니다. ${session.subject}에 대해 묻는 객관식 1문제(4 choices)를 출제해야 합니다. 이는 반드시 컴퓨터 공학과 학생이 풀 수 있는 문제여야 합니다. 또한 문제는 단순하지 않고 반드시! 컴퓨터 공학적 개념을 활용하여 풀 법한 난이도여야 합니다. 
  객관식 문제의 형식은 반드시 아래 형식을 지켜야 합니다. 두 번 이상 \n을 출력하면 안 됩니다. 선지를 제시하기 전에 description에는 선지를 유추할 수 있는 문장을 포함하면 안되고 특정 주제에 대해 묻는 문장이어야 합니다. 문제의 난이도는 컴퓨터 전공 대학생에게 '${session.difficulty}' 정도로 출제해야 합니다. 4가지 선지 중에 정답인 선지는 랜덤으로 정해야 합니다. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어주세요. 반드시! 무조건 json\n{으로 시작하세요\n
  json{"title": "알고리즘 문제 제목","description": "알고리즘 문제 설명","selections": {"1": "선지1","2": "선지2","3": "선지3","4": "선지4","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`;
    // 텍스트(키워드) 객관식 문제 출제
    else if (session.version == "text" && session.type == "ox")
      prompt = `당신은 이제 컴퓨터공학과의 교수입니다. 당신의 임무는 학생들을 위한 컴퓨터 공학 전공 관련 문제를 내는 것입니다. ${session.subject}에 대해 자세히 묻는 true or false question(정답은 O or X)를 1문제 출제 하세요. 문제의 난이도는 꼭 '${session.difficulty}'하게 내야 합니다. OX 문제의 description에는 해당 context가 거짓인지 참인지에 대해 묻는 내용이 들어가 있어야 합니다. selection 에는 enum type으로 O (true) or X (false)만 들어가야 합니다. OX 문제의 형식은 반드시 아래 형식과 똑같아야 합니다. 두 번 이상 \n을 출력하면 안됩니다. tag value에는 해당 문제와 관련한 알고리즘 분류를 적어주세요. 반드시 json\n{ 으로 시작하세요\n
  json{"title": "알고리즘 문제 제목","description": "ox 퀴즈 내용","selections": {"1": "true","2": "false","answer": "정답인 key"},"tag": {"1": "문제와 관련한 알고리즘 분류"}}`;
    // 텍스트(키워드) 객관식 문제 출제

    // 프롬프트 정의

    const URL = session.images;
    const urls = [];
    var imageParts = [];
    if (session.version == "image") {
      for (let i = 0; i < URL.length; i++) {
        urls[i] = fileToGenerativePart(URL[i], "image/png");
      }
      // imageParts = urls;
      imageParts = [
        urls[0],
        urls[1],
        urls[2],
        urls[3],
        urls[4],
        urls[5],
        urls[6],
        urls[7],
        urls[8],
        urls[9],
      ];

      // 이미지 받은거 data url로 변환해서 넘기는 거까지

      if (session.version == "image") {
        result = await model.generateContent([prompt, ...imageParts]);
      } else {
        result = await model.generateContent([prompt]);
      }

      return Response.json({ msg: "test" });

      const response = await result.response;
      const text = response.text();
      console.log(text);
      // gemini가 생성한 문제 value들

      const jsonString = text.split("json")[1];

      const data = JSON.parse(jsonString);
      console.log(data);

      // 필요한 정보 추출
      const t_title = data.title;
      const t_description = data.description;
      const t_selections = data.selections;
      //const t_answer = data.answer;
      const t_tag = data.tag;

      // POST 함수 호출
      const { username } = getVerified();

      const newQuiz = await prisma.snack_quiz.create({
        data: {
          snack_id: session.snack_id,
          title: t_title,
          description: t_description,
          selections: t_selections,
          created_by: username,
          tag: t_tag,
        },
      });

      return Response.json(newQuiz);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return new Response(JSON.stringify({ error: "Internal Server Error" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * @swagger
 * /gpt:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: 주어진 이미지나 텍스트에 따라 생성된 OX 문제 또는 객관식 문제를 반환합니다.
 *     tags: [Gemini]
 *     requestBody:
 *       description: 문제의 버전, 문제의 타입, 이미지 URL
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             snack_id : 1
 *             version : image
 *             type : multi
 *             subject : 다익스트라
 *             difficulty : medium
 *             images :
 *                 - "https://example.com/image1.png"
 *                 - "https://example.com/image2.png"
 *                 - "https://example.com/image3.png"
 *
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               - snack_id: 1
 *                 title: 다익스트라 알고리즘 문제
 *                 description: 다익스트라 알고리즘과 관련하여 알맞은 정답을 고르세요.
 *                 selections:
 *                   1: "다익스트라 알고리즘은 모든 출발점에서 모든 도착점까지의 최단 경로를 구할 수 있다."
 *                   2: "다익스트라 알고리즘을 우선순위 큐를 이용하여 구현하였을 때 O(V^2)의 시간이 소요된다."
 *                   3: "다익스트라 알고리즘은 음의 가중치를 갖는 간선이 있는 그래프에서는 유효하지 않다."
 *                   4: "다익스트라 알고리즘은 사이클(Cycle)이 있는 그래프에서도 유효하다."
 *                   answer: "3"
 *                 created_by: abcd
 *                 tag:
 *                   1: "그래프"
 *       500:
 *         description: Internal Server Error
 *
 */
