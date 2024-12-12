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
  const { username, password } = req.body;

  // Authentication logic...
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id; // บันทึก userId ใน session
    res.redirect("/"); // กลับไปที่หน้า home
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// สมัครสมาชิก
router.post("/register", async (req, res) => {
  try {
    // ตรวจสอบว่า user ได้รับการยืนยันตัวตนแล้วหรือไม่
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
      dob 
    } = req.body; // ดึงข้อมูลอื่นๆ จากฟอร์ม

    // หากมีการอัปโหลดไฟล์
    let myfiles = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-profile.png'; // ใช้ path ของไฟล์ที่อัปโหลด หรือไฟล์ default

    // แฮชพาสเวิร์ด
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // สร้างผู้ใช้ใหม่ในฐานข้อมูล
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
        myfiles, // ใช้ path ของไฟล์ที่อัปโหลด
      });

      res.redirect("/login");
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Username already in use" });
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

// router.get("/profile", async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.redirect("/login");  // Redirect to login if no token
//     }

//     const decoded = jwt.verify(token, jwtSecret);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.redirect("/login");  // Redirect if no user is found
//     }

//     res.render("profile", { user });  // Render profile page with user data
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/"); // กลับไปหน้าแรก
  });
});

module.exports = router;
