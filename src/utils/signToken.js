import jwt from "jsonwebtoken";
import fs from "fs";

const SignToken = async (email) => {
  // const secretKey = fs.readFileSync("./secret_key.txt", "utf8");
  // console.log("secret: ", secretKey);
  const token = await jwt.sign({ id: email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export default SignToken;
