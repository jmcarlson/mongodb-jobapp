var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Applicant = require('./models/applicant.js');

mongoose.connect('mongodb://localhost/jobapp');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(error, results) {
		if(error) {
			console.log(error);
		}
		else {
			console.log(results);
			res.render('applicants', {
				'applicants': results
			})	
		}
	})
});

// display success message
app.get('/success', function(req, res) {
	res.render('success')
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	var applicant = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		experience: req.body.years,
		reason: req.body.why
	});
	applicant.save();
	// console.log(req.body);
	res.redirect('/success');
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
