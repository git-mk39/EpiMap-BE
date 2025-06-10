// Import libraries
import crypto from "crypto";
import { base64Url, base64UrlDecode } from "./base64Url.js";
function createToken(user) {
  // Create token
  const jwtSecret = process.env.JWT_SECRET;

  const header = {
    type: "JWT",
    alg: "HS256",
  };

  const payload = {
    role: account.role,
    userId: account._id,
    username: account.username,
    gender: account.gender,
    name: account.name,
    exp: Date.now() + 60 * 60 * 1000,
  };

  console.log(JSON.stringify(header));
  console.log(JSON.stringify(payload));
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const tokenData = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", jwtSecret)
    .update(tokenData)
    .digest("base64url");
  const token = `${tokenData}.${signature}`;
  return token;
}

function verifytoken(token) {
  if (!token) {
    return null;
  } else {
    const [header, payload, signature] = token.split(".");
    const tokenData = `${header}.${payload}`;
    const decodedPayload = JSON.parse(base64UrlDecode(payload));
    const jwtSecret = process.env.JWT_SECRET;
    const signatureCheck = crypto
      .createHmac("sha256", jwtSecret)
      .update(tokenData)
      .digest("base64url");
    if (signature === signatureCheck && Date.now() <= decodedPayload.exp) {
      return decodedPayload;
    } else {
      return null;
    }
  }
}

export { createToken, verifytoken };
