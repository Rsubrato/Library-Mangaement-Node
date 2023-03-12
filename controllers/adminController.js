const User=require('../models/user');
const Book=require('../models/books');
const Mapping=require('../models/mapping');
const jwt=require('jsonwebtoken');
const { nextTick } = require('process');

exports.user_add=(req,res)=>{
  res.render('admin/addUsers',{title:'Enter User Details'});
}

exports.books_create=(req,res)=>{
  res.render('admin/addBooks',{title:'Enter Book Details'});
}

exports.users_get= (req,res)=>{
    User.find()
    .then((result)=>{
      res.render('admin/admin-users',{title:'List Of Users', users:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.users_post= (req,res)=>{
    const user= new User(req.body);
    user.save()
        .then((result)=>{
            res.redirect('/admin/users');
        })
        .catch((err)=>{
            console.log(err);
        })
}


exports.books_post= (req,res)=>{
    const book= new Book(req.body);
      book.save()
          .then((result)=>{
              res.redirect('/admin/books');
          })
          .catch((err)=>{
              console.log(err);
          })
}

exports.books_get= (req,res)=>{
    Book.find()
    .then((result)=>{
        res.render('admin/admin-books',{title:'List Of Books Admin', books:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}


exports.book_get_id=(req,res)=>{
    Book.findById(req.params.id)
    .then((result)=>{
      var arr = [];
      arr.push(result);
      res.render('admin/admin-books',{title:'List Of Books Admin', books:arr})
    })
    .catch((err)=>{
      console.log(err);
      res.render('admin/admin-books',{title:'Books not found',books:[]})
  })
}

exports.book_delete_id= (req,res)=>{
    const id=req.params.id;
  Book.findByIdAndRemove(id,(err,result)=>{
    if(err)
    console.log(err);
    else{
    res.redirect("/admin/books");
    }
  })
}

exports.user_delete_id= (req,res)=>{
    const id=req.params.id;
  User.findByIdAndRemove(id,(err,result)=>{
    if(err)
    console.log(err);
    else{
    res.redirect("/admin/users");
    }
  })
}

exports.user_update= (req,res)=>{
const id = req.params.id;
User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        }else{
          res.redirect('/admin/users');
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update user information"})
    })
}


exports.book_update= (req,res)=>{

  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        }else{
          res.redirect('/admin/books');
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update user information"})
    })
}

exports.view_updated_users = (req, res) =>{
  User.findById(req.params.id)
  .then((result)=>{
    // var arr = [];
    // arr.push(result);
    res.render('admin/updateuser',{title:'List Of Books Admin', user:result})
  })
  .catch((err)=>{
    console.log(err);
})
}

exports.view_updated_books = (req, res) =>{
  Book.findById(req.params.id)
  .then((result)=>{
    var arr = [];
    arr.push(result);
    res.render('admin/updatebook',{title:'List Of Books Admin', books:result })
  })
  .catch((err)=>{
    console.log(err);
})
}

exports.restrict_admin=(req,res,next)=>{
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, "secret");  
  const userId=decoded.id;
  User.findById(decoded.id)
  .then((result)=>{
    if(result.role!='admin'){
      if(result.role=='lecturer')
          res.redirect("/lecturer/books");
      else
          res.redirect("/students/books");
  }
  })
  next();
}
