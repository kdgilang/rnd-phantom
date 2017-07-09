const fs = require('fs')
const path = require('path')
module.exports = {
	// get directories as array
	getDirectories: function (srcpath) {
	  return fs.readdirSync(srcpath)
	    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
	},

	// get files as array
	getFiles: function (srcpath) {
	  return fs.readdirSync(srcpath)
	    .filter(file => fs.lstatSync(path.join(srcpath, file)))
	}
}