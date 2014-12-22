window.onload = function() {

	var socket = io.connect('http://www.classmates2015.in/',{ reconnet : false , rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling']});
	
    /*var socket = io.connect('http://localhost:8000', {
	    'reconnect': false
	});
	*/
	
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
	var namel = document.getElementById("namel");
  // var username  = document.getElementById("uname");
   var flag=true;

	var tryReconnect = function(){

	    if (socket.socket.connected === false &&
	        socket.socket.connecting === false) {

		    	socket.socket.connect();
		    	flag = false;
	   }
	}

	socket.on('connect', function () {
		if(typeof(intervalID) != 'undefined')
			clearInterval(intervalID);
	});

	socket.on('disconnect', function () {
		var intervalID = setInterval(tryReconnect, 2000);
	});

   
	socket.on('message', function (data) {
		if(data.message) {
		   
		   
			var liste  =  document.getElementById("tiles");
			var checkdiv =  document.getElementById(data.firstname.trim().toLowerCase() + "_" +  data.lastname.trim().toLowerCase());
			
			var ti  =  document.getElementById("tick");
		//	ti.innerHTML += "<li> <h1  style = \"color:grey\" > > " + data.firstname  + " " + data.lastname  + "</h1><br><p>" + data.message +  "</p></li>" ; 
			ti.insertAdjacentHTML("afterbegin", "<li> <h1  style = \"color:grey;text-transform: capitalize;\" > > " + data.firstname  + " " + data.lastname  + "</h1><br><p>" + data.message +  "</p></li>");	
				
			if(checkdiv==undefined)
			{
			   // alert("wtf");
			   var mydata = "  <li class=\"comment\" id = \"" + data.firstname.trim().toLowerCase() + "_" +  data.lastname.trim().toLowerCase() +   "\" style=\"display:block ;float:left; margin-left:2px ; margin-top:2px ; text-align: center;   \"> \
			        	<div class= \"post-info\  style=\"height: 95% \">  \
			        		<div class=\"post-basic-info \" style=\"height: 200px;overflow-y: scroll;\" > \
				        		<h3 style=  \"text-align: center; text-transform: capitalize; font-weight: bold;\" >" +  data.firstname.trim().toLowerCase() + "  " +  data.lastname.trim().toLowerCase() +  "</h3><hr> \
				        		<p id = \"" + "t_" + data.firstname.trim().toLowerCase() + "_" +  data.lastname.trim().toLowerCase() + "\">" +  data.message + "<hr></p> \
			        		</div> \
			        		<div class=\"post-info-rate-share\">\
			        			<div class=\"post-share\"> \
								   <span class=\"pic\"> </span> <span id = \"" + "ct_" + data.firstname.trim().toLowerCase() + "_" +  data.lastname.trim().toLowerCase() + "\">"+  "1"  + "</span>"  +
			        			"</div> \
			        			<div class=\"clear\"> </div> \
			        		</div> \
			        	</div> </li>";
						
                        
						console.log("wtf");
			liste.innerHTML +=  mydata ;
			
			}
			else{
			
			document.getElementById("t_" + data.firstname.trim().toLowerCase() +"_" +  data.lastname.trim().toLowerCase() ).insertAdjacentHTML("afterbegin" ,  data.message +  "<hr>") ;
			var ct = parseInt(document.getElementById("ct_" + data.firstname.trim().toLowerCase() +"_" +  data.lastname.trim().toLowerCase() ).innerHTML); 
            document.getElementById("ct_" + data.firstname.trim().toLowerCase() +"_" +  data.lastname.trim().toLowerCase() ).innerHTML =  ct+1;
			
			//var d =  document.getElementById("t_" + data.firstname.trim().toLowerCase() +"_" +  data.lastname.trim().toLowerCase() ).innerHTML ;
					 //alert(d.length);
					/* if(d.length>90)
					 {
					        
					       var e =  d.substr(0,90);
						   document.getElementById("t_" + data.firstname.trim().toLowerCase() +"_" +  data.lastname.trim().toLowerCase() ).innerHTML  = e;
					 }
                    */					 
			
			}
			
			
			
			
		} else {
			console.log("There is a problem:", data);
		}
	});

	socket.on('load', function (data) {
		console.log("entered");
		if(flag)
	    {
		 if(data.messages) {
			//var html = '';
			//console.log(data.messages.length);
			/*var di = data.messages.length;
			for (var i = 0; i < di; i++) {
               var li = document.createElement("li");
			   var data = "   <img src= \"images/img1.jpg\" width=\"282\" height=\"118\"> \
			        	<div class= \"post-info\">  \
			        		<div class=\"post-basic-info\"> \
				        		<h3><a href=\"#\">Animation films</a></h3> \
				        		<span><a href=\"#\"><label> </label>Movies</a></span> \
				        		<p>Lorem Ipsum is simply dummy text of the printing & typesetting industry.</p> \
			        		</div> \
			        		<div class=\"post-info-rate-share\">\
			        			<div class=\"rateit\"> \
			        				<span> </span> \
			        			</div> \
			        			<div class=\"post-share\"> \
			        				<span> </span> \
			        			</div> \
			        			<div class=\"clear\"> </div> \
			        		</div> \
			        	</div> "; 
						
                
				console.log("Wtf");
				*/
				
				
				var html = '';
				 
				 
				 
				 var mydata = "  <li style=\"display:block ;float:left; marginLeft:10% 10% 10% 10%   \"> \
			        	<div class= \"post-info\  style=\"height: 95% \">  \
			        		<div class=\"post-basic-info\"> \
				        		<h3><a href=\"#\">Animation films</a></h3> \
				        		<span><a href=\"#\"><label> </label>Movies</a></span> \
				        		<p>Lorem Ipsum is simply dummy text of the printing & typesetting industry.</p> \
			        		</div> \
			        		<div class=\"post-info-rate-share\">\
			        			<div class=\"post-share\"> \
			        				<span class=\"pic\"> </span> \
			        			</div> \
			        			<div class=\"clear\"> </div> \
			        		</div> \
			        	</div> </li>";  
			  for (var i = 0; i < data.messages.length; i++) {
                var liste  =  document.getElementById("tiles");
				var st  =    document.getElementById(data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() );
				var ti  =  document.getElementById("tick");
				ti.insertAdjacentHTML("afterbegin" ,"<li> <h1 style = \"color:grey; text-transform: capitalize;\" > >" + data.messages[i].fname  + " " + data.messages[i].lname  + "</h1><br><p>" + data.messages[i].message +  "</p></li>") ;  
				
				if(st==undefined)
				{
				    var mydata = "  <li class=\"comment\" id = \"" + data.messages[i].fname.trim().toLowerCase() + "_" +  data.messages[i].lname.trim().toLowerCase() +   "\" style=\"display:block ;float:left; margin-left:2px ; margin-top:2px ; text-align: center;  \"> \
			        	<div class= \"post-info\  style=\"height: 95% \">  \
			        		<div class=\"post-basic-info\" style=\"height: 200px;overflow-y: scroll;\" > \
				        		<h3 style=  \"text-align: center;text-transform: capitalize; font-weight: bold;\"> " +  data.messages[i].fname.trim().toLowerCase() + "  " +  data.messages[i].lname.trim().toLowerCase() +  "</h3> \
				        		<p id = \"" + "t_" + data.messages[i].fname.trim().toLowerCase() + "_" +  data.messages[i].lname.trim().toLowerCase() + "\">" +  data.messages[i].message + "</p><br> \
			        		</div> \
			        		<div class=\"post-info-rate-share\">\
								<div class=\"post-share\"> \
			        			 <span class=\"pic\"> </span> 	<span id = \"" + "ct_" + data.messages[i].fname.trim().toLowerCase() + "_" +  data.messages[i].lname.trim().toLowerCase() + "\">"+  "1"  + "</span>"  + 
					          "  </div> \
			        			<div class=\"clear\"> </div> \
			        		</div> \
			        	</div> </li>";
                        liste.innerHTML +=  mydata ;
					
 						
				}
				else
				{
				     
			         
				      document.getElementById("t_" + data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() ).insertAdjacentHTML("afterbegin" ,  data.messages[i].message +  "<hr>") ;
					  var ct = parseInt(document.getElementById("ct_" + data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() ).innerHTML); 
                      document.getElementById("ct_" + data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() ).innerHTML =  ct+1;
   					 var d =  document.getElementById("t_" + data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() ).innerHTML ;
					
					 /*if(d.length>90)
					 {
					        
					       var e =  d.substr(0,90);
						    document.getElementById("t_" + data.messages[i].fname.trim().toLowerCase() +"_" +  data.messages[i].lname.trim().toLowerCase() ).innerHTML =  e;
							
					 }
					 */
				}
				 /*var item  =  document.createElement("li");
				 var img1  = document.createElement("img") ;
				 img1.setAttribute('href', 'images/img1.jpg');
				 img1.setAttribute('width', '282');
				 img1.setAttribute('height', '118');
				 item.appendChild(img1);
				 liste.appendChild(item);
				 */
			     
			};
			console.log(liste.innerHTML);
			//list.innerHTML += html;
		} else {
			console.log("There is a problem:", data);
		}
	 }	
	});
	
	socket.on('result', function (data) {

	    var dataList = document.getElementById('json-datalist');
        var input = document.getElementById('search');
		
 
 while (dataList.firstChild) {
    dataList.removeChild(dataList.firstChild);
 }
		var list = [];
		for (var i = 0; i < data.key.length; i++) {
			if(list.indexOf(data.key[i].fname+' '+data.key[i].lname) == -1)
			{
			   var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = data.key[i].fname+' '+data.key[i].lname;
		
		
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
		
	    
			
		list.push(data.key[i].fname+' '+data.key[i].lname);		
		}
		
		};

		//document.getElementById('firstname').innerHTML = list;
	    //document.getElementById('status').innerHTML = '';
		
	});

	
	
	
	document.getElementById('search').onkeyup = function () {

				var s = document.getElementById('search').value;
				s = s.trim();

				if(s != '')
				{
			//		document.getElementById('status').innerHTML = '<img src="/images/load.gif">';

					socket.emit('search', { key: s  });

				}
				else
				{
				//	document.getElementById('firstname').innerHTML = '';					
				}

			}
    
			
	sendButton.onclick = sendMessage = function() {
		if(name.value == "" || namel.value == "") {
			alert("We need the full name!");
		} else if(field.value == "") {
			alert("You forgot the message.");
		} else {
			var text = field.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			
			var usname  =  document.getElementById("usename").innerHTML;
			
			socket.emit('send', { message: text, firstname: name.value.trim().toLowerCase(), lastname: namel.value.trim().toLowerCase() , uname : usname });
			name.value = "";
			namel.value = "";
			field.value = "";
		}
	};
	

}