const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let userSchema=new Schema({
  	username:{type:String,required:true},
  	userpwd:{type:String,required:true},
		code:{type:String}
  })
  // type 字段类型  required 是否必须
 let usermodel=mongoose.model('users', userSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=usermodel