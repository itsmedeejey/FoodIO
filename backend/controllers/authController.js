import admin from "../config/firebaseAuth.js";
import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";
const firebaseAuth = async (req, res) => {
  const { idtoken } = req.body;
  console.log('BACKEND GETS THE TOKEN',idtoken);
  if (!idtoken) {
    console.log("token not found");
    res.status(400).json({ mess: "no token found" });
    return;
  }
  try {
    const decoded = await admin.auth().verifyIdToken(idtoken);

    const { email, name, uid, picture } = decoded;

    console.log("Email:", email);
    console.log("Name:", name);
    console.log("uid", uid);
    console.log("Picture URL:", picture);
    let user = await UserModel.findOne({ email });
    if (user) {
        console.log('user already exits ',user);
        if (user.authProvider != "firebase" && user.authProvider != "both") {     //connecting user to both firebase and local
            user.profilePhoto = user.profilePhoto || picture ;
            user.authProvider = "both";
            await user.save();
        }
        
        const token = jwt.sign(                                    //generating fresh jwt for the existing user
            
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token",token ,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
        });
        res.status(200).json({ mess: "user already exist, updated the cookie" });
      return
    } else {
        let newUser = await UserModel.create({       //creating new user
      
            email,
            username: name,
            authProvider: "firebase",
            profilePhoto: picture,
            uid,
        });
        const token = jwt.sign(                       // generating new cookie
            { email: newUser.email, id:newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        console.log('user already exits ',newUser);
      res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
       });
      res.status(200).json({ mess: "user registered successfully" ,newUser});
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ mess: "Theres some issue wiht auth provider" });
    return;
  }
};

export default firebaseAuth;
