var mongoose = require('mongoose');

var Applicant = mongoose.model('Applicant', {
	id: mongoose.Schema.Types.ObjectId,
	name: String,
	bio: String,
	skills: String,
	experience: Number,
	reason: String
});

module.exports = Applicant;
