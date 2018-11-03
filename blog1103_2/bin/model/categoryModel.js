const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let categorySchema=new Schema({
  	_id:{type:String,required:true},
  	name:{type:String,required:true},
		keywords:{type:String,required:true},
		total:{type:String},
		description:{type:String,required:true}
  })
  // type 字段类型  required 是否必须
 let categoryModel=mongoose.model('category', categorySchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=categoryModel