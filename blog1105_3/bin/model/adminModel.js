const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let adminSchema=new Schema({
		_id:{type:String,required:true},
		name:{type:String,required:true},
  	adminname:{type:String,required:true},
		tel:{type:String,required:true},
  	adminpwd:{type:String,required:true},
		date:{type:String,required:true},
		ip:{type:String,required:true}
  })
  // type 字段类型  required 是否必须
 let adminmodel=mongoose.model('admin', adminSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=adminmodel