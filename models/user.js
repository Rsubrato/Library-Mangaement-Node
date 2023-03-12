const mongoose=require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema =mongoose.Schema

const userSchema=new Schema({
    name:{
        type : String,
        required: [true, 'Please tell us your name!']
    },

    email:{
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },

    joined: { 
        type : Date, 
        default : Date.now() 
    },
     
    phone_number : {
        type : Number,
        minlength: 10,
        required : true
    },

    gender: {
        type : String,
        required : true
    },


    role:{
        type: String,
        enum: ['student', 'lecturer', 'admin'],
        default: 'student'
    },
//     books:[
//       {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Book',
//   },
//   {
//     type: Boolean,
//     default:true
//   }

// ],
});

  userSchema.pre('save', async function(next) {
    console.log('schema',this.password);
    this.password = await bcrypt.hash(this.password, 12);
    
    next();
  });

  userSchema.statics.login = async function(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const User=mongoose.model('User',userSchema);
module.exports=User;