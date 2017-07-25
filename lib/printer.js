const helper = require('./helper.js')
const zipper = require('../lib/zipper.js')
const webshot = require('webshot')
const fs = require('fs')
const cdir = process.cwd()

module.exports = {
	theShot: function(args) {
		var curi = cdir.split("\\")
		curi = curi.join("/") 
		var html = "file:///"+curi+"/"+args.folder+"/",
		isfile = cdir+"\\"+args.folder+"\\",
		target = cdir+"\\"+args.folder+"\\backup_image.jpg",
		files = helper.getFiles(cdir+"\\"+args.folder),
		fz = cdir+"\\"+args.folder,
 		file = files.filter(function (files) {
			var c = files.split(".")
			return c[1] === "html" ? files : null
		})
		
		html += file
		isfile += file

		var ops = {
			streamType:	'jpg',
			quality: args.quality,
			renderDelay: args.delay,
			captureSelector: args.selector
		}
		if(fs.existsSync(isfile)) {
			webshot(html, target, ops, function(err) {
			 	if(err === null) {
			 		console.log(target+" Created.")
			 		if(args.iszip === true) {
			 			zipper.theZip(fz, fz+".zip")
			 		}
			 	} else {
			 		console.log(err)
			 	}
			})
		} else {
			console.log('Files Does not exists')
		}
	},
	init: function(args) {
		var arr = (args.folder === undefined) ? helper.getDirectories(cdir) : args.folder.split(",")
		var i = args.delay / 1000
		// loading 
		i += 1
		console.assert('Estimated times is '+i+' seconds')
		var intl = setInterval(function () {
			process.stdout.write('Waiting for frames durations: '+i+'s left '+'\r')
			return (i < 1) ? clearInterval(intl) : i--;
		}, 1000)

		// start loop shots
		if(arr.constructor === Array) {
			arr = arr.map(function (e) {
			  	return e.trim();
			})
			arr.forEach(function (val) {
				args.folder = val
				module.exports.theShot(args)
			})
		} else {
			module.exports.theShot(args)
		}
	}	
}