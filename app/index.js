var express = require('express');
var path = require('path');

var app = express();
var root = '/test'; // Better: path.resolve(__dirname, 'relativePath')

app.set('port', (process.env.PORT || 5000));

app.use('/test', express.static(__dirname + '/public'));
// app.use('', express.static(path.resolve('test')));
// app
//     .use('/test', express.static(path.resolve(root, 'app.uploads')))
//     .use('', express.static(path.resolve(root, 'app.www')));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('hello.ejs');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});