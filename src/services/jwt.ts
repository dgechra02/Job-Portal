import jwt from "jsonwebtoken";

type Data = {
  id : string
}

export function createToken(data : Data) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token; // token ke under encrypt hoke data rkh liya hai
}

export function verifyToken(token : string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data as Data;
  } catch {
    return null;
  }
}
// npm i jsonwebtoken
// npm i --save-dev @types/jsonwebtoken
