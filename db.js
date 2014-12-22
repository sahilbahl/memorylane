var mongoose  =   require('mongoose');

mongoose.connect('mongodb://root:root@ds047950.mongolab.com:47950/chat2');

module.exports =   mongoose.connection ;