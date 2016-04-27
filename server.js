var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./server/config/database.js');
var User = require('./server/models/user');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var port = 8000;

// mongoose.connect(config.url);
require('./server/config/passport')(passport);

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({ 	secret: 'bestcatever',
					resave: false,
					saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Using EJS for testing pre-angularization
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app, passport);
//Look at documentation at http://getbootstrap.com/getting-started/#download
//require('bootstrap');

//-------------- Google API --------------//
var googleAPI = require('googleapis');
var cookieParser = require('cookie-parser');
var gitKit = require('gitkitclient');
var fs = require('fs');
var GitkitClient = require('gitkitclient');
var gitkitClient = new GitkitClient(JSON.parse(fs.readFileSync('./gitkit-server-config.json')));


// index page
// app.get('/', renderIndexPage);

// // widget page hosting Gitkit javascript
// app.get('/gitkit', renderGitkitWidgetPage);
// app.post('/gitkit', renderGitkitWidgetPage);

// // Ajax endpoint to send email for password-recovery and email change event
// app.post('/sendemail', renderSendEmailPage);

// function renderGitkitWidgetPage(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var html = new Buffer(fs.readFileSync('./client/static/partials/gitkit-widget.html')).toString();
//   html = html.replace('%%postBody%%', encodeURIComponent(req.body || ''));
//   res.end(html);
// }

// function renderIndexPage(req, res) {
//   if (req.cookies.gtoken) {
//     gitkitClient.verifyGitkitToken(req.cookies.gtoken, function (err, resp) {
//       if (err) {
//         printLoginInfo(res, 'Invalid token: ' + err);
//       } else {
//         printLoginInfo(res, 'Welcome back! Login token is: ' + JSON.stringify(resp));
//       }
//     });
//   } else {
//     printLoginInfo(res, 'You are not logged in yet.');
//   }
// }

// function renderSendEmailPage(req, res) {
//   app.disable('etag');
//   gitkitClient.getOobResult(req.body, req.ip, req.cookies.gtoken, function(err, resp) {
//     if (err) {
//       console.log('Error: ' + JSON.stringify(err));
//     } else {
//       // Add code here to send email
//       console.log('Send email: ' + JSON.stringify(resp));
//     }
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end(resp.responseBody);
//   })
// }

// function printLoginInfo(res, loginInfo) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var html = new Buffer(fs.readFileSync('/client/index.html'))
//       .toString()
//       .replace('%%loginInfo%%', loginInfo);
//   res.end(html);
// }
//-------------- END Google API --------------//

var port = 8000;
app.listen(port, function() {
  console.log('Code on! Cool stuff on: ', port);
});