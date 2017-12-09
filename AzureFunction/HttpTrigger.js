//https://github.com/eleith/emailjs
var email 	= require("emailjs/email");

var server 	= email.server.connect({
    user:    "<user@email.com>", 
    password:"<password>", 
    host:    "smtp.gmail.com", 
    ssl:     true
 })
 
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.teamData && req.body.email) {
        context.log(req.body.teamData)  //can put this in online JSON viewer to view in better format
        
         // send the message and get a callback with an error or details of the message that was sent
         server.send({
            text:    `Open the following in a JSON Viewer to format it (http://jsonviewer.stack.hu/) \n${req.body.teamData}`, 
            from:    "<from email>", 
            to:      req.body.email,
            subject: "Line Caller Data Export"
         }, function(err, message) { 
            context.log(err || message); 
            context.res = {
                status: 200, /* Defaults to 200 */
                //body: "Hello " + (req.query.name || req.body.name)
            }
             context.done();
        })
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass team data and email in the request body"
        };
        context.done();
    }
};