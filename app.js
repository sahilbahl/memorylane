
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
//var mysql = require("mysql");
//var config = require("./config.json");
var conn =  require('./db.js');
var graph = require('fbgraph');
var port = 8000;
var graph  =  require('fbgraph');
var http = require('http');
var path = require('path');
var config  =  require('./config');
var app = express();
var passport = require('passport') ,
      FacebookStrategy = require('passport-facebook').Strategy;

var User  =  require('./models/user');


passport.serializeUser(function(user,done){
 done(null,user.id);
});
 
passport.deserializeUser(function(id,done){
  User.findOne(id,function(err,user){
      done(err,user);
	});
});

 
 
passport.use(new FacebookStrategy({
    clientID: config.development.fb.appId,
    clientSecret  : config.development.fb.appSecret,
    callbackURL   : config.development.fb.url + "fbauthed" 
   },
   function(accessToken,refreshToken,profile,done) {
   process.nextTick(function(){
       var query =   User.findOne({ 'fbId': profile.id});
       query.exec(function(err,oldUser){
		if(oldUser){
		   console.log('Existing User');// :  + 
		   //graph.setAccessToken(accessToken);
		   //graph.setRefreshToken(refreshToken) ;
			
			
		   done(null,oldUser);
		}else{
		    var newUser  = new User();
			newUser.fbId  =  profile.id;
			newUser.name  =  profile.displayName;
			//newUser.email =  profile.emails[0].value;
			newUser.save(function(err){
			if(err) throw err;
			done(null,newUser);
		   });
		
		}
	});
   });
}
	
) );

//http.createServer(app).listen(app.get('port'),function(){

//});
var chatSchema  =  require('./schemas/chat.js');
var io = require('socket.io', {rememberTransport:false,transports: [ 'WebSocket','Flash Socket','AJAX long-polling']}).listen(app.listen(port));

//var count=0;



io.sockets.on('connection', function (socket) {
      chatSchema.find().exec(function(err,results)
	  {
	       if(err)
		   {
		        //console.log(err);
		   }
		   else{

		//   count++;

		/*	io.sockets.emit('count', {
				number: count
			});
*/
		   socket.emit('load', { messages: results });
		   }
	  });
	//db.query("select firstname, lastname, message from messages", function(err, results){
		
	socket.on('disconnect', function () {
		console.log('Disconned');
	 /*   count--;
	    io.sockets.emit('count', {
	        number: count
	    });
		*/
	});

	socket.on('search', function (data) {

		var st = data.key;
		st = st.trim();

		var arr = st.split(" ");

		if(arr.length == 1)
		{
			var fn = arr[0];
			chatSchema.find({fname: new RegExp('^'+fn)}).exec(function(err,results)
		  	{

			    io.sockets.emit('result', {
			        key: results
			    });
		  	});

		}
		else if(arr.length == 3)
		{
			var fn = arr[0];
			var ln = arr[2];
			chatSchema.find({fname: new RegExp('^'+fn), lname: new RegExp('^'+ln)}).exec(function(err,results)
		  	{

			    io.sockets.emit('result', {
			        key: results
			    });
		  	});

		}
		else
		{
			var fn = arr[0];
			var ln = arr[1];
			chatSchema.find({fname: new RegExp('^'+fn), lname: new RegExp('^'+ln)}).exec(function(err,results)
		  	{

			    io.sockets.emit('result', {
			        key: results
			    });
		  	});

		}


	});

	socket.on('send', function (data) {
        // var x  =  document.getElementById("name").innerHTML;   
	     var msg = {
            fname: data.firstname ,
			lname : data.lastname , 
			message : data.message ,
			uname  : data.uname
          };
		  
		  console.log(msg);
		  conn.collection('messages').insert(msg ,function (err, inserted) {
    // check err...
	      if(err){
		     console.log(err);
		  }
		  else{
		  }
});

		//db.query("insert into messages (firstname, lastname, message) values ('"+data.firstname+"', '"+data.lastname+"', '"+data.message+"')");
          
		io.sockets.emit('message', data);
	});
});

console.log("Listening on port " + port);

		
	
   


// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser());
app.use(express.session({secret:'aaaaaaaaaaaaaaaaaaaaaaaaaaaa' } ) );

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.urlencoded());
app.use(express.methodOverride());




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get("/", function(req, res){
	res.render("message");
});


app.get("/message", function(req, res){
	res.render("message");
});
app.get('/fbauth',passport.authenticate('facebook', {scope : ['email'] } ));
app.get('/fbauthed',passport.authenticate('facebook',{failureRedirect:'/'}) , routes.loggedin ); 
app.get('/chat',function(req,res){
      res.render("index");
});

app.get('/search',function(req,res){
     //extract key using req.query.key
     //call MySQL Query.
     //form JSON response and return.
	 
	 var regex = new RegExp(req.query["term"], 'i');
     var query = chatSchema.find({fname: regex}).limit(20);
        
      // Execute query in a callback and return users list
  query.exec(function(err, users) {
      if (!err) {
         // Method to construct the json result set
         var result = buildResultSet(users); 
         res.send(result, {
            'Content-Type': 'application/json'
         }, 200);
      } else {
         res.send(JSON.stringify(err), {
            'Content-Type': 'application/json'
         }, 404);
      }
   });
});


  
app.get('/logout',function(req,res){
     req.logOut();
	 res.redirect('/');
	 
});





