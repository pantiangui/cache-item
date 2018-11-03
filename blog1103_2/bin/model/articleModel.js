const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let articleSchema=new Schema({
  	title:{type:String,required:true},
  	article:{type:String,required:true},
		category:{type:String,required:true},
		article_pic:{type:String,required:true},
		comment:{type:String},
		date:{type:String,required:true}
  })
  // type 字段类型  required 是否必须
 let articleModel=mongoose.model('articles', articleSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=articleModel