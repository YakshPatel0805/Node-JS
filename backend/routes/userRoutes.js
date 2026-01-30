// routes section
const express = require("express");
const path = require("path");
const router = express.Router();

// user list
let users = [{fullname : 'hello', email: 'abc123@gmail.com', password: 'abcd@123'}];

// ================ Get Routes ====================
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/signup.html"));
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/dashboard.html"));
});

// ================ Post Routes ====================
router.post("/login", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
      return res.json({success: false, message: "All fields required"});
    }

    const user = users.find(u => u.email === email && u.password === password);
    if(user){
        res.json({success: true, message: "Successfully logged in"});
    }else{
        res.json({success: false, message: "Invalid credentials"});
    }
});

router.post("/signup", (req, res) => {
    const {fullname, email, password} = req.body;

    if(!fullname || !email || !password){
      return res.json({success: false, message: "All fields required"});
    }

    const userExist = users.find(u => u.email === email);
    if(userExist){
        return res.json({success: false, message: "User already exists"});
    }

    users.push({fullname, email, password});
    res.json({success: true, message: "Account created successfully"});
});

module.exports = router;
