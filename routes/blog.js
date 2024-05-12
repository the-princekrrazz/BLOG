const Router = require("express")
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images/uploads/`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })
  const upload = multer({ storage: storage })







router.get("/add-new",(req,res)=>{
   return res.render("addblog",{
        user:req.user,
    });
})
router.post("/",upload.single('coverImage'),async(req,res)=>{
    console.log(req.body);
    const {title,body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImgageURL: `/images/uploads/${req.file.filename}`,
    });
    res.redirect(`/blog/${blog._id}`);
})

router.post("/comment/:blogId",async(req,res)=>{

 await Comment.create({
    content : req.body.content,
    blogId: req.params.blogId,
    createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`);
})




router.get("/:id", async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
  console.log(comments);
  return res.render("blog",{
    user:req.user,
    blog,
    comments
  })
})
module.exports = router