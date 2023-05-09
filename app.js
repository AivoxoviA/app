require('./discord/bot/index');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { Server } = require('ws')
  , mongoose = require('mongoose'), crypto = require('crypto');
const config = require('./core/getConfig');

const User = require('./models/user');

var indexRouter = require('./routes/index');
var uangRouter = require('./routes/uang');

var app = express();

const wss = new Server({ port: 3001 });

console.log('connecting to mongodb...');
mongoose.connect(
  `mongodb+srv://`
  + `${config.mongodb.user}:${config.mongodb.pass}`
  +`@${config.mongodb.server}/?retryWrites=true&w=majority`
)
    .then((_) => console.log("Connected to database."))
    .catch((e) => console.log("Error:", e)); // Open MongoDB.

wss.on('connection', function(ws, req) {
    ws.on('message', message => { // If there is any message
        var datastring = message.toString();
        if(datastring.charAt(0) == "{"){ // Check if message starts with '{' to check if it's json
            datastring = datastring.replace(/\'/g, '"');
            var data = JSON.parse(datastring);
            console.log(data);
            if(data.auth == "chatappauthkey231r4"){
                // TODO: Create login function
              if (data.cmd === 'signup'){ // On Signup
                // If mail doesn't exists it will return null
                User.findOne({email: data.email}).then((mail) => {
                  // Check if email doesn't exist.
                  if (mail == null){
                    User.findOne({
                      username: data.username
                    }).then((user) => {
                      // Check if username doesn't exists.
                      if (user == null){
                        const hash = crypto.createHash("md5")
                        let hexPwd = hash.update(
                          data.hash
                        ).digest('hex');
                        var signupData = "{'cmd':'"
                          +data.cmd+"','status':'succes'}";
                        const user = new User({
                          email: data.email,
                          username: data.username,
                          password: hexPwd,
                        });
                        // Insert new user in db
                        user.save();
                        // Send info to user
                        ws.send(signupData);
                      } else{
                        // Send error message to user.
                        var signupData = "{'cmd':'"
                          +data.cmd+"','status':'user_exists'}";  
                        ws.send(signupData);  
                      }
                    });
                  } else{
                    // Send error message to user.
                    var signupData = "{'cmd':'"
                      +data.cmd+"','status':'mail_exists'}";    
                    ws.send(signupData);
                  }
                });
              }

              if (data.cmd === 'login'){
                // Check if email exists 
                User.findOne({email: data.email}).then((r) => {
                  // If email doesn't exists it will return null
                  if (r != null){
                    console.log(r);
                    const hash = crypto.createHash("md5")
                    // Hash password to md5
                    let hexPwd = hash.update(
                      data.hash
                    ).digest('hex');
                    // Check if password is correct
                    console.log(hexPwd, r.password);
                    if (hexPwd == r.password) {
                      // Send username to user and status code is succes.
                      var loginData = '{"username":"'
                        +r.username+'","status":"success"}';
                      console.log('aaaaaaaaa');
                      // Send data back to user
                      ws.send(loginData);
                    } else{
                      // Send error
                      var loginData = '{"cmd":"'
                        +data.cmd+'","status":"wrong_pass"}';
                      console.log('bbbbbbbbb');
                      ws.send(loginData);
                    }
                  } else{
                    // Send error
                    var loginData = '{"cmd":"'
                      +data.cmd+'","status":"wrong_mail"}';
                    ws.send(loginData);
                  }
                });
              }

            }
        }
    }) 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/uang', uangRouter);
/*
### stalled project
app.use('/users', usersRouter);
app.use('/mlbb', mlbbRouter);
app.use('/mlbb/squad', mlbbSquadRouter);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
