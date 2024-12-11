const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

router.get("/login", (req, res) => {
  try {
    const locals = {
      title: "Login Page",
      description: "Enter your credentials to login",
    };

    res.render("login", { locals });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// ตรวจสอบการ login
router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body; // ดึงข้อมูล username และ password จาก form

    console.log("Request Body:", req.body); // log ข้อมูลใน console
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ตรวจสอบการ login
// router.post("/auth", (req, res) => {
//   try {
//     const { username, password } = req.body; // ดึงข้อมูล username และ password จาก form

//     console.log("Request Body:", req.body); // log ข้อมูลใน console

//     if (username === "admin" && password === "admin") {
//       // หาก username และ password ตรงกับ admin
//       res.send("Login successful"); // เปลี่ยนเส้นทางไปยังหน้าผู้ดูแลระบบ
//     } else {
//       // หากข้อมูลไม่ถูกต้อง
//       res.redirect("/login"); // เปลี่ยนกลับไปยังหน้าล็อกอิน
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });
// สมัครสมาชิก
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      surname,
      lastname,
      country,
      province,
      address,
      zipcode,
      mail,
      TelNum,
      gender,
      dob,
      myfiles,
    } = req.body; // ดึงข้อมูล username และ password จาก form
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({
        username,
        password: hashedPassword,
        surname,
        lastname,
        country,
        province,
        address,
        zipcode,
        mail,
        TelNum,
        gender,
        dob,
        myfiles,
      });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "Username already in use" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post('/write', async (req, res) => {
  try {
    const { title, types, content } = req.body;

    // สร้างโพสต์ใหม่
    const newPost = new Post({
      title: title,
      types: types,
      content: content,  // HTML ที่ได้รับจาก Quill Editor
    });

    // ใช้ await แทนการใช้ callback
    await newPost.save();
    
    res.redirect('/forum'); // ไปยังหน้าฟอรัม
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).send('Error saving post');
  }
});

module.exports = router;
