const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
    const { username, password } = req.body; // Get username and password from the form

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // เก็บข้อมูลผู้ใช้ใน session
    req.session.userId = user._id;  // หรือเก็บข้อมูลอื่นๆ เช่น user.username

    // Redirect the user to the home page after successful login
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

router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");  // Redirect to login if no token
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.redirect("/login");  // Redirect if no user is found
    }

    res.render("profile", { user });  // Render profile page with user data
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.redirect("/home");
  });
});

module.exports = router;
