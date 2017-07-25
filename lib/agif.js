const helper = require('./helper.js')
const zipper = require('../lib/zipper.js')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const webshot = require('webshot')
const fs = require('fs')
const cdir = process.cwd()
const encoder = new GIFEncoder(300, 250)

module.exports = {
	theAgif: function (args) {
		var fz = cdir+"\\"+args.folder
		pngFileStream(args.folder+'/frame?.png')
		    .pipe(encoder.createWriteStream({ repeat: -1, delay: 1000, quality: args.quality}))
		  	.pipe(fs.createWriteStream(args.folder+'/backup_image.gif'))
		  	.on('finish', function () {
		  		console.log(fz)
		  		var count = 1;
				for(var i=0; i<args.range; i++) {
					let target = cdir+"\\"+args.folder+"\\frame"+i+".png"
					fs.unlink(target, function (err) {
						if(count === args.range && args.iszip === true) {
			 				zipper.theZip(fz, fz+".zip")
						} count++
					})
				}
		  	})
	},
	theShot: function (args) {
		var total = args.delay / (args.range * 1000)
		var count = 1
		for(var i=0; i<args.range; i++) {
			args.delay = (total*1000) * i
			var curi = cdir.split("\\")
			curi = curi.join("/") 
			var html = "file:///"+curi+"/"+args.folder+"/",
			isfile = cdir+"\\"+args.folder+"\\",
			target = cdir+"\\"+args.folder+"\\frame"+i+".png",
			files = helper.getFiles(cdir+"\\"+args.folder),
			file = files.filter(function (files) {
				var c = files.split(".")
				return c[1] === "html" ? files : null
			})
			
			html += file
			isfile += file

			var ops = {
				quality: args.quality,
				renderDelay: args.delay,
				captureSelector: args.selector
			}
			if(fs.existsSync(isfile)) {
				webshot(html, target, ops, function(err) {
				 	if(err !== null) {
				 		console.log(err)
				 	} else {
				 		if(count === args.range) {
							module.exports.theAgif(args)
				 		} count ++
				 	}
				}) 
			} else {
				console.log('Files Does not exists')
			}
		}
	},
	thePngs: function (args) {
		var arr = (args.folder === undefined) ? helper.getDirectories(cdir) : args.folder.split(",")
		var i = args.delay / 1000
		// loading 
		i += 1
		// console.assert('Estimated times is '+i+' seconds')
		// var intl = setInterval(function () {
		// 	process.stdout.write('Waiting for frames durations: '+i+'s left '+'\r')
		// 	return (i < 1) ? clearInterval(intl) : i--;
		// }, 1000)

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
	},
	init: function (args) {
		module.exports.thePngs(args)
	}
}
