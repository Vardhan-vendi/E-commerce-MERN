import jwt from "jsonwebtoken";
export const generateToken =  (id,res) => {
  const token = jwt.sign({ id },process.env.SECRET_KEY, { expiresIn: "30d"});

 res.cookie('userToken',token,{

   httpOnly: true,
    secure: true,          // Render uses HTTPS
    sameSite: "none",      // Allow cross-site cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,
 })


 return token

};
