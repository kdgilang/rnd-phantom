// global variable
const helper = require('./helper.js')
const zip = require('zip-dir')
const cdir = process.cwd()

module.exports = {
	// create zip file
	theZip: function (data, fzip) {
		zip(data, { saveTo: fzip }, function (err, buffer) {
			if(err === null) {		
			  	console.log(data+".zip Created.")
			} else {
				console.log(err)
			}
		});
	},
	// initial 
	init: function (args) {
		var folder = (args.folder === undefined) ? helper.getDirectories(cdir) : args.folder.split(",")
		if(folder.constructor === Array) {
			folder = folder.map(function (e) {
			  	return e.trim();
			})
			folder.forEach(function (val) {
				var data = cdir + "\\" + val
				module.exports.theZip(data, data+".zip")
			})
		} else {
			var data = cdir + "\\" + folder
			module.exports.theZip(data, data+".zip")
		}
	}
}