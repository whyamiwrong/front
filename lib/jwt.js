import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const sign = (userId, userName) => {

  return jwt.sign({ user_id: userId, username: userName }, secret, {
    algorithm: 'HS256'
  });
};

const verify = (token) => {
  let decoded = null;

  try {
    decoded = jwt.verify(token, secret);
    return decoded;
  }
  catch (err) {
    return null;
  }
}

export { sign, verify };