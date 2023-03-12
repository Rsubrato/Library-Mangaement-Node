const User=require('../models/user');
const Book=require('../models/books');
const Mapping=require('../models/mapping');
const jwt = require('jsonwebtoken');

exports.lecturer_books_get=(req,res)=>{
    Book.find()
    .then((result)=>{
        res.render('lecturer/lecturer-books',{title:'List Of Books', books:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.approve_get=(req,res)=>{
    Mapping.find()
    .populate('books')
    .populate('user')
    .then((result)=>{
        res.render('lecturer/approveBooks',{title:'List Of Books', mapping:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.approve_post=(req,res)=>{
    const token = req.cookies.jwt;
    Mapping.findOne({'books':req.params.id})
    .then((result)=>{
        Book.findById(req.params.id)
        .then((data)=>{
            data.active=false;
            data.save();
            
        })
    })
    Mapping.deleteOne({'books':req.params.id})
    .then((result)=>{
        res.redirect("/lecturer/approve");
    })

}


exports.reject_post=(req,res)=>{
    Mapping.deleteOne({'books':req.params.id})
    .then((result)=>{
        res.redirect("/lecturer/approve");
    })

}


exports.restrict_lecturer=(req,res,next)=>{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret");  
    const userId=decoded.id;
    User.findById(decoded.id)
    .then((result)=>{
        if(result.role!='lecturer'){
            if(result.role=='admin')
                res.redirect("/admin/books");
            else
                res.redirect("/students/books");
        }
    })
    next();
}