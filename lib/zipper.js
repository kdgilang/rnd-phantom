// global variable
const helper = require('./helper.js')
const zip = require('zip-dir')
const cdir = process.cwd()

module.exports = {
	// create zip file
	theZip: function (data, fzip) {
		zip(data, { saveTo: fzip }, function (err, buffer) {
			if(err === null) {		
			  	console.log(data+" Created.")
			} else {
				console.log(err)
			}
		});
	},
	// initial 
	init: function (f) {
		var folders = (f === undefined) ? helper.getDirectories(cdir) : f.split(",")
		if(folders.constructor === Array) {
			folders.forEach(function (val) {
				var data = cdir + "\\" + val
				module.exports.theZip(data, data+".zip")
			})
		} else {
			var data = cdir + "\\" + folders
			module.exports.theZip(data, data+".zip")
		}
	}
}