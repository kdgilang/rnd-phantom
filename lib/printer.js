const helper = require('./helper.js')
const zipper = require('../lib/zipper.js')
const webshot = require('webshot')
const fs = require('fs')
const cdir = process.cwd()

module.exports = {
	theShot: function(dir, delay, selector, iszip, quality) {
		var curi = cdir.split("\\")
		curi = curi.join("/") 
		var html = "file:///"+curi+"/"+dir+"/"
		var isfile = cdir+"\\"+dir+"\\"
		var target = cdir+"\\"+dir+"\\backup_image.jpg"
		var files = helper.getFiles(cdir+"\\"+dir)

		var file = files.filter(function (files) {
			var c = files.split(".")
			return c[1] === "html" ? files : null
		})
		
		html += file
		isfile += file

		var ops = {
			//siteType: 'file',
			quality: quality,
			renderDelay: delay,
			defaultWhiteBackground: true,
			captureSelector: selector
		}
		if(fs.existsSync(isfile)) {
			webshot(html, target, ops, function(err) {
			 	if(err === null) {
			 		console.log(target+" Created.")
			 		if(iszip === true) {
			 			zipper.init(dir)
			 		}
			 	} else {
			 		console.log(err)
			 	}
			})
		} else {
			console.log('Files Does not exists')
		}
	},
	init: function(delay, folders, selector, iszip, quality) {
		var arr = (folders === undefined) ? helper.getDirectories(cdir) : folders.split(",")
		var i = delay / 1000

		// loading 
		i += 2
		console.assert('Estimated times is '+i+' seconds')
		var intl = setInterval(function () {
			process.stdout.write('Waiting for frames durations: '+i+'s left '+'\r')
			return (i < 1) ? clearInterval(intl) : i--;
		}, 1000)

		// start loop shots
		if(arr.constructor === Array) {
			arr.forEach(function (val) {
				module.exports.theShot(val, delay, selector, iszip, quality)
			})
		} else {
			module.exports.theShot(folder, delay, selector, iszip, quality)
		}
	}	
}