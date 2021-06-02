var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin123@cluster0.8olth.mongodb.net/fbi',  { useNewUrlParser: true } );
mongoose.set('useFindAndModify', false);
console.log("mongodb connect...")
module.exports=mongoose;
