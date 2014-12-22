
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Memorylane' });
};




exports.loggedin =  function(req,res){
     res.render('message',{ user: req.user } );
};