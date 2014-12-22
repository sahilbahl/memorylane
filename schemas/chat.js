var mongoose  =   require('mongoose');


module.exports =   mongoose.model('messages',{
             fname :   String ,
			 lname  :  String ,
			 message : String ,
			 uname : String 
			 });
			 
