const User=require('../models/user');
const Book=require('../models/books');
const Mapping=require('../models/mapping');
const jwt = require('jsonwebtoken');

exports.student_books_get=(req,res)=>{
    Book.find()
    .then((result)=>{
        res.render('student/student-books',{title:'List Of Books', books:result, success:""})
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.student_post_request=(req,res)=>{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret");  
    Mapping.findOne({books:req.params.id,user:decoded.id})
    .then((result)=>{
        if(!result)
        Mapping.create({
        books: req.params.id,
        user:decoded.id ,
        });
    })
    res.status(200).redirect('/students/books');
}

exports.student_post_return=(req,res)=>{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret");  
    const userId=decoded.id;
    const bookId=req.params.id;
    Book.findById(bookId)
    .then((result)=>{
        result.active=true;
        result.save();
    })
    res.redirect('/students/books');
}

exports.restrict_student=(req,res,next)=>{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret");  
    const userId=decoded.id;
    User.findById(decoded.id)
    .then((result)=>{
        if(result.role!='student'){
            if(result.role=='admin')
                res.redirect("/admin/books");
            else
                res.redirect("/lecturer/books");
        }
    })
    next();
}