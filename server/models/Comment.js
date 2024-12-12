const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // เชื่อมกับ Post
  username: { type: String, required: true }, // ชื่อผู้ใช้
  content: { type: String, required: true }, // เนื้อหาคอมเมนต์
  created_at: { type: Date, default: Date.now } // วันที่สร้าง
});

module.exports = mongoose.model('Comment', CommentSchema);