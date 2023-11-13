import { createSwaggerSpec } from 'next-swagger-doc';

const info = {
  title: '맞왜틀 API',
  version: '0.0.0',
  // summary: '맞왜틀 API',
  // description: '맞왜틀 API',
};

const servers = [
  {
    url: 'http://localhost:3000/api',
    description: 'Local server',
  },
  {
    url: 'https://whyamiwrong-front-29n4bs9zt-kimbank.vercel.app/api',
    description: 'Production server',
  },
  {
    "url": "https://?????:{port}/{basePath}",
    "description": "스프링 서버가 될 예정인 것",
    "variables": {
      "port": {
        "enum": [
          "8080",
          "443",
          "80"
        ],
        "default": "8080"
      },
      "basePath": {
        "default": "api"
      }
    }
  }
];

const components = {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
}

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/(Back)/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: '맞왜틀 API',
        version: '0.0.0',
        // summary: '맞왜틀 API',
        // description: '맞왜틀 API',
      },
      servers: servers,
      // components: {
      //   securitySchemes: {
      //     BearerAuth: {
      //       type: 'http',
      //       scheme: 'bearer',
      //       bearerFormat: 'JWT',
      //     },
      //   },
      // },
      security: [],
    },
  });
  return spec;
};