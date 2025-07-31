import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";


const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({
      success: false,
      message: "Please Enter the Required Fileds",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Is Already Exits" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hash Password : ", hashPassword);

    const user = new User({ username, email, password: hashPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production",
      none: "strict",
      maxAge: 7 * 24 * 160 * 60 * 60 * 1000,
    });

    // Sending Welcome Email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome To Authentication Proccess",
      text: `Welcome to Authentication Proccess . Your Account hash been created with email id : ${email}`,
    };
    await transporter.sendMail(mailOption);
    console.log("email is sending");

    return res.json({
      success: true,
      message: "Register Successfully created",
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      success: false,
      message: "Please enter the email end password again",
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Please check  the email " });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Please check the password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "procution",
      none: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login Successfully created" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.json({ success: true, message: "Logeed Out" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Send the Verification OTP  with User's Email
const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verifyed" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Otp : ", otp);
    user.verifyOtp = otp;

    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify Your Account using this OTP`,
    };
    await transporter.sendMail(mailOption);

    return res.json({success : true , message : "Verification OTP Send Your Email"})
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


// Verified the Account 
const verifyEmail =async (req,res) =>{
  const {userId , otp} = req.body

  if(!userId || !otp){
    return res.json({success : false , message : "Missing the Details"})
  }

  try{
    const user = await User.findById(userId);

    if(!user){
      return res.json({success : false , message : "User is not found"})
    }

    if(user.verifyOtp === '' || user.verifyOtp !== otp){
      return res.json({success : false , message : "Invalid OTP"})
    }

    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success : false , message : "OTP is Expired"})
    }

    user.isAccountVerified = true
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save()

    return res.json({success : true , message : "Email Verified Suiccessfully"})
  }
  catch(err){
    return res.json({success : false , message : err.message})
  }
}

const isAuthenticated = async (req,res) =>{
  try{  
    return res.json({success : true , messagea : "User is already authenticated"})
  } 
  catch(err){
    return res.json({success : false , message : err.message})
  }
}
export { register, login, logout, sendVerifyOtp ,verifyEmail ,isAuthenticated };
