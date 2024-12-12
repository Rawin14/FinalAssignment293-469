const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Visitor = require("../models/visitor");
const Comment = require("../models/Comment");
const upload = require('../middleware/upload'); // ไฟล์ Multer ที่ตั้งค่าไว้

router.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.session.userId;
  // console.log("isLoggedIn:", res.locals.isLoggedIn); // ตรวจสอบค่า
  next();
});

async function checkAuth(req, res, next) {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId); // ใช้ await แทน callback
      if (!user) {
        return next(); // ถ้าไม่พบผู้ใช้ ไปยัง middleware ถัดไป
      }
      req.user = user; // เก็บข้อมูลผู้ใช้ใน req
      res.locals.user = user; // ส่งข้อมูลไปยัง View
      next(); // ดำเนินการต่อ
    } catch (err) {
      console.error("Error in checkAuth middleware:", err);
      next(); // ไปยัง middleware ถัดไปในกรณีเกิดข้อผิดพลาด
    }
  } else {
    next(); // ดำเนินการต่อถ้าไม่ได้ล็อกอิน
  }
}

// ใช้ Middleware นี้กับทุก Route
router.use(checkAuth);

//Routes
router.get("/", (req, res) => {
  res.render("index", { isLoggedIn: !!req.user, username: req.user?.username });
});

router.get("/home", (req, res) => {
  if (req.user) {
    res.render("index", { isLoggedIn: true, username: req.user.username });
  } else {
    res.render("index", { isLoggedIn: false, username: null });
  }
});

router.get("/types", (req, res) => {
  if (req.user) {
    res.render("types", { isLoggedIn: true, username: req.user.username });
  } else {
    res.render("types", { isLoggedIn: false, username: null });
  }
});

router.get("/game", (req, res) => {
  if (req.user) {
    res.render("game", { isLoggedIn: true, username: req.user.username });
  } else {
    res.render("game", { isLoggedIn: false, username: null });
  }
});

// function insertPostData(req, res) {
//   Post.insertMany([
//     {
//       title: "",
//       description:
//         "",
//     },
//   ]);
// }

// insertPostData();

router.get("/forum", async (req, res) => {
  try {
    const locals = {
      title: "Forum",
      description: "View and explore posts",
    };

    const ip = req.clientIp; // ดึง IP จาก request
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // ใช้แค่วัน (yyyy-mm-dd)

    // ตรวจสอบว่า IP นี้เคยเข้ามาในวันนี้หรือยัง
    const existingVisitor = await Visitor.findOne({
      ip,
      date: { $gte: new Date(dateStr) },
    });

    if (!existingVisitor) {
      // ถ้ายังไม่เคยเข้ามาหรือเป็นวันที่ใหม่ ให้บันทึก IP และวันที่
      const newVisitor = new Visitor({ ip, date: today });
      await newVisitor.save();
      console.log("New visit recorded from IP: " + ip);
    } else {
      console.log("IP " + ip + " has already visited today.");
    }

    // นับจำนวนผู้เข้าชมทั้งหมด
    const totalVisitorsToday = await Visitor.countDocuments({
      date: { $gte: new Date(dateStr) },
    });

    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    const type = req.params.type || null; // รับ type จาก query parameter

    // Query สำหรับกรองโพสต์ตามประเภท
    const filter = type ? { types: type } : {}; // ถ้าไม่มี type จะดึงโพสต์ทั้งหมด

    const data = await Post.find(filter)
      .sort({ created_date: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const count = await Post.countDocuments(filter);

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
      selectedType: type, // ส่งประเภทไปยัง View
      isLoggedIn: !!req.user,
      username: req.user ? req.user.username : null,
      totalVisitorsToday: totalVisitorsToday, // ส่งจำนวนผู้เข้าชมไปยัง EJS
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/forum/type/:type", async (req, res) => {
  try {
    const locals = {
      title: "Forum",
      description: "View and explore posts",
    };

    const ip = req.clientIp; // ดึง IP จาก request
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // ใช้แค่วัน (yyyy-mm-dd)

    // ตรวจสอบว่า IP นี้เคยเข้ามาในวันนี้หรือยัง
    const existingVisitor = await Visitor.findOne({
      ip,
      date: { $gte: new Date(dateStr) },
    });

    if (!existingVisitor) {
      // ถ้ายังไม่เคยเข้ามาหรือเป็นวันที่ใหม่ ให้บันทึก IP และวันที่
      const newVisitor = new Visitor({ ip, date: today });
      await newVisitor.save();
      console.log("New visit recorded from IP: " + ip);
    } else {
      console.log("IP " + ip + " has already visited today.");
    }

    // นับจำนวนผู้เข้าชมทั้งหมด
    const totalVisitorsToday = await Visitor.countDocuments({
      date: { $gte: new Date(dateStr) },
    });

    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    const type = req.params.type || null; // รับ type จาก query parameter

    // Query สำหรับกรองโพสต์ตามประเภท
    const filter = type ? { types: type } : {}; // ถ้าไม่มี type จะดึงโพสต์ทั้งหมด

    const count = await Post.countDocuments(filter);
    const data = await Post.find(filter)
      .sort({ created_date: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.render("forumtypes", {
      locals,
      data,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
      current: page,
      totalPages,
      selectedType: type, // Send selected type to EJS
      totalVisitorsToday: totalVisitorsToday, // ส่งจำนวนผู้เข้าชมไปยัง EJS
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

    const ip = req.clientIp; // ดึง IP จาก request
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // ใช้แค่วัน (yyyy-mm-dd)
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ postId: post._id }).sort({
      created_at: -1,
    });

    // ตรวจสอบว่า IP นี้เคยเข้ามาในวันนี้หรือยัง
    const existingVisitor = await Visitor.findOne({
      ip,
      date: { $gte: new Date(dateStr) },
    });

    if (!existingVisitor) {
      // ถ้ายังไม่เคยเข้ามาหรือเป็นวันที่ใหม่ ให้บันทึก IP และวันที่
      const newVisitor = new Visitor({ ip, date: today });
      await newVisitor.save();
      console.log("New visit recorded from IP: " + ip);
    } else {
      console.log("IP " + ip + " has already visited today.");
    }

    // นับจำนวนผู้เข้าชมทั้งหมด
    const totalVisitorsToday = await Visitor.countDocuments({
      date: { $gte: new Date(dateStr) },
    });

    const type = req.params.type || null;
    const slug = req.params.id;
    const filter = type ? { types: type } : {};
    const data = await Post.findById(slug, filter);
    // รับ type จาก query parameter

    // Query สำหรับกรองโพสต์ตามประเภท
    // ถ้าไม่มี type จะดึงโพสต์ทั้งหมด

    res.render("post", {
      locals,
      data,
      isLoggedIn: !!req.user,
      username: req.user ? req.user.username : null,
      selectedType: type,
      totalVisitorsToday: totalVisitorsToday,
      post,
      comments, // ส่งคอมเมนต์ไปยัง EJS
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/post/:id/comment", async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    if (!content) {
      return res.status(400).send("Comment cannot be empty.");
    }

    const newComment = new Comment({
      postId,
      username: req.user.username, // ดึงชื่อผู้ใช้จาก session
      content,
      created_at: new Date(),
    });
    // สร้างคอมเมนต์ใหม่
    await newComment.save();

    res.redirect(`/post/${postId}`); // กลับไปหน้าโพสต์เดิม
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/write", async (req, res) => {
  try {
    const locals = {
      title: "Post Details",
      description: "Viewing a single post",
    };

    const ip = req.clientIp; // ดึง IP จาก request
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // ใช้แค่วัน (yyyy-mm-dd)

    // ตรวจสอบว่า IP นี้เคยเข้ามาในวันนี้หรือยัง
    const existingVisitor = await Visitor.findOne({
      ip,
      date: { $gte: new Date(dateStr) },
    });

    if (!existingVisitor) {
      // ถ้ายังไม่เคยเข้ามาหรือเป็นวันที่ใหม่ ให้บันทึก IP และวันที่
      const newVisitor = new Visitor({ ip, date: today });
      await newVisitor.save();
      console.log("New visit recorded from IP: " + ip);
    } else {
      console.log("IP " + ip + " has already visited today.");
    }

    // นับจำนวนผู้เข้าชมทั้งหมด
    const totalVisitorsToday = await Visitor.countDocuments({
      date: { $gte: new Date(dateStr) },
    });

    const type = req.params.type || null;
    const slug = req.params.id;
    const filter = type ? { types: type } : {};
    const data = await Post.findById(slug, filter);
    // รับ type จาก query parameter

    // Query สำหรับกรองโพสต์ตามประเภท
    // ถ้าไม่มี type จะดึงโพสต์ทั้งหมด

    res.render("writeforum", {
      locals,
      data,
      isLoggedIn: !!req.user,
      username: req.user ? req.user.username : null,
      selectedType: type,
      totalVisitorsToday: totalVisitorsToday,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/register", (req, res) => {
  res.render("create");
});
router.get("/login", (req, res) => {
  res.render("login");
});

// Profile route
router.get("/profile", checkAuth, async (req, res) => {
  try {
    // ใช้ user ID จาก session (req.user._id ถูกกำหนดโดย Passport หรือ session)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send("User not found");
    }
    user.dob = user.dob || null;
    // ส่งข้อมูลผู้ใช้ไปยัง EJS
    res.render("profile", {
      username: user.username, // ส่ง username
      user,// ส่ง object ผู้ใช้ทั้งหมด
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/about", (req, res) => {
  if (req.user) {
    res.render("aboutus", { isLoggedIn: true, username: req.user.username });
  } else {
    res.render("aboutus", { isLoggedIn: false, username: null });
  }
});


module.exports = router;
