const mongoose=require('mongoose')
const Schema =mongoose.Schema

const mappingSchema=new Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
      status:{
        type: String,
        enum:['approved','pending'],
        default:'pending',
      },
      createdAt: {
        type: Date,
        default: Date.now()
      },
});


const Mapping=mongoose.model('Mapping',mappingSchema);
module.exports=Mapping;