import crypto from 'crypto';
import util from 'util';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

async function createSalt() {
  const buf = await randomBytesPromise(64);

  return buf.toString('base64');
}

export async function createHashedPassword(password) {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 100003, 64, 'sha512');
  const hashedPassword = key.toString('base64');
  return {hashedPassword, salt};
}

export async function verifyPassword(password, userSalt, userPassword) {
  const key = await pbkdf2Promise(password, userSalt, 100003, 64, 'sha512');
  const hashedPassword = key.toString('base64');


  if (hashedPassword == userPassword) return true;

  return false;
}