import admin from "../config/firebaseAuth.js";
import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";

const firebaseAuth = async (req, res) => {   // *** firebase authentication *** (handle both login and register)
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




const Authregister = async (req, res) => {         // *** Register funtion *** 

  const { username, email, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ username }); // check if user already exists

  if (user) {
    return res.json({ message: "User already exists" }); // if user already exists, return an error message
  }

  const hashedPassword = await bcrypt.hash(password, 10); // hash the password

  const newUser = new UserModel({ username, email, password: hashedPassword,authProvider:'local' }); // create a new user
  await newUser.save(); // save the user to the database

  res.json({ message: "User Registered Successfully!" }); // send the user data to the client
};

const Authlogin = async (req, res) => {    // *** Login funtion *** 

  const { username, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ username }); // check if user already exists
  if (!user) {
    return res.json({ message: "User doesn't exist" }); // if user doesn't exist, return an error message
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" }); // if password is incorrect, return an error message
  }
  const token = jwt.sign({ id: user._id }, "secret"); // create a token
  res.json({ token, userID: user._id }); // send the token to the client)
};


const logout = async(req,res)=>    // logging out the user (removing jwt token or cookie)
  {
    console.log('reached log out');
    try {
      // Clear the cookie with matching options
      res.clearCookie("token", {
        httpOnly: true,
      });
      console.log('cookies cleared');
      console.log('cookies :',req.cookies);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
  }


const getProfile = async(req,res)=>    // geting user data (only userName and profile picture ,You can furthur add recipices or other data stored in th database)
  {
    console.log('user',req.user)
    try
    {
      let user = await UserModel.findOne({_id:req.user.id})
      if(user)
        {
          console.log('data sent')
          res.status(200).json({username:user.username,pfp:user.profilePhoto})
          return;
        }
        res.status(400).json({mess:"theres some error ,user not found"})
      }catch(err)
      {
        console.log(err);
        res.status(400).json({mess:"theres some error ",err});
    }
  }

export {firebaseAuth ,Authlogin,Authregister,getProfile,logout } ;
