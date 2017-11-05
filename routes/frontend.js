var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Home - ScanBuddy' });
});


router.get('/advertise', function(req, res, next) {
	res.render('advertise', { title: 'Advertisements - ScanBuddy' });
});


router.get('/complaint/:addressid', function(req, res, next) {
	if(req.params && req.params.addressid) {
		var options = {
			"addressid" : req.params.addressid
		}
		res.render('complaint', { title : 'Complaint - ScanBuddy', options: options });
	}
	else {
		res.render('index', { title: 'Home - ScanBuddy' });
	}
});


router.get('/customersupport/:objectid', function(req, res, next) {
	if(req.params && req.params.objectid) {
		var options = {
			"objectid" : req.params.objectid
		}
		res.render('customersupport', { title : 'Customer Support - ScanBuddy', options: options });
	}
	else {
		res.render('index', { title: 'Home - ScanBuddy' });
	}
});


module.exports = router;