import jwt from "jsonwebtoken";
export const generateToken =  (id,res) => {
  const token = jwt.sign({ id },process.env.SECRET_KEY, { expiresIn: "30d"});

 res.cookie('userToken',token,{

    httpOnly: true,
    secure : process.env.NODE_ENV !== 'development',
    sameSite : 'strict',
    maxAge : 30*24*60*60
 })


 return token

};
