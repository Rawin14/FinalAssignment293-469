const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");


//Routes
router.get("", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  if (req.session.userId) {
    // ถ้าผู้ใช้ล็อกอินแล้ว ให้ส่งค่า dropdown profile
    res.render('index', { isLoggedIn: true });
  } else {
    // ถ้าผู้ใช้ยังไม่ได้ล็อกอิน
    res.render('index', { isLoggedIn: false });
  }
});

router.get("/types", (req, res) => {
  res.render("types");
});

router.get("/game", (req, res) => {
  res.render("game");
});

// function insertPostData(req, res) {
//   Post.insertMany([
//     {
//       title: "Kuy",
//       description:
//         "Csdfasdfsdfsdfsdfsdfsdfsdfgdophgdojhkldghiodjklhfiogdhjfuohfhjdhosgdfogjdfjhgjkdfgjkdjkgdjkgdflgdfgjkdjkgjdkgkdfglks",
//     },
//   ]);
// }

// insertPostData();

router.get("/forum", async (req, res) => {
  try {
    const locals = {
      title: "Post Details",
      description: "Viewing a single post",
    };

    const perPage = 5;
    const page = parseInt(req.query.page) || 1;

    // ดึงข้อมูลโพสต์ที่จัดเรียงตามวันที่ล่าสุด
    const data = await Post.find({})
      .sort({ created_date: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    // นับจำนวนโพสต์ทั้งหมด
    const count = await Post.countDocuments();

    // คำนวณค่าที่จำเป็นสำหรับ Pagination
    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.render("forum", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const locals = {
      title: "Post Details",
      description: "Viewing a single post",
    };

    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/write", (req, res) => {
  res.render("writeforum");
});

router.get("/register", (req, res) => {
  res.render("create");
});
router.get("/login", (req, res) => {
  res.render("login");
});



module.exports = router;
