const helper = require('./helper.js')
const zipper = require('./zipper.js')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const webshot = require('webshot')
const fs = require('fs')
const cdir = process.cwd()

module.exports = {
	theAgif: function (args, fz) {
		var size = fz.split("x")
		const encoder = new GIFEncoder(size[0], size[1])
		pngFileStream(fz+"/frame?.png")
		    .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: args.quality}))
		  	.pipe(fs.createWriteStream(fz+"/backup_image.gif"))		  	
		  	.on('finish', function () {
		  		var count = 1;
				for(var i=0; i<args.range; i++) {
					let target = cdir+"\\"+fz+"\\frame"+i+".png"
					fs.unlink(target, function (err) {
						if(count === args.range && args.iszip === true) {
							let target = cdir+"\\"+fz
			 				zipper.theZip(target, target+".zip")
						} count++
					})
				}
		  	})
	},
	theShot: function (args) {
		var total = args.delay / (args.range * 1000),
			count = 1,
			fz = args.folder
		for(var i=0; i<args.range; i++) {
			args.delay = (args.range>1) ? (total*1000) * i : args.delay
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
							module.exports.theAgif(args, fz)
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
		// const readline = require('readline');

		// const rl = readline.createInterface({
		//   input: process.stdin,
		//   output: process.stdout
		// });

		// rl.question('What do you think of Node.js? ', (answer) => {
		//   // TODO: Log the answer in a database
		//   console.log(`Thank you for your valuable feedback: ${answer}`);

		//   rl.close();
		// });
	}
}
