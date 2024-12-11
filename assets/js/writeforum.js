const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

var quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder: "Write your post here...",
  theme: "snow",
});
// อัปเดตค่าใน Textarea (#content) โดยใช้ข้อความแบบ plain text
quill.on("text-change", function () {
  // ดึง HTML markup จาก Quill Editor
  const htmlContent = quill.root.innerHTML;

  // อัปเดตเนื้อหาใน Textarea เพื่อส่งไปที่เซิร์ฟเวอร์
  document.getElementById("content").value = htmlContent;
});

// ตั้งค่าเริ่มต้นใน Textarea (ถ้าจำเป็น)
document.getElementById("content").addEventListener("input", function () {
  quill.root.innerHTML = this.value;
});

quill.format("color", "black");