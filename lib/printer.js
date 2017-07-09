const helper = require('./helper.js')
const webshot = require('webshot')
const cdir = process.cwd()

module.exports = {
	theShot: function(dir, delay, selector) {
		var html = cdir+"\\"+dir+"\\"
		var target = cdir+"\\"+dir+"\\backup_image.jpg"
		var files = helper.getFiles(cdir+"\\"+dir)

		html += files.filter(function (files) {
			var c = files.split(".")
			return c[1] === "html" ? files : null
		})
		var ops = {
			siteType: 'file',
			renderDelay: delay,
			captureSelector: selector
		}
		webshot(html, target, ops, function(err) {
		 	if(err === null) {
		 		console.log(target+" Created.")
		 	} else {
		 		console.log(err)
		 	}
		})
	},
	init: function(delay, folders, selector) {
		var arr = (folders === undefined) ? helper.getDirectories(cdir) : folders.split(",")
		var i = delay / 1000

		// loading 
		i += 2
		console.assert('Estimated times is '+i+' seconds')
		var intl = setInterval(function () {
			process.stdout.write('Waiting for banner durations: '+i+'s left '+'\r')
			return (i < 1) ? clearInterval(intl) : i--;
		}, 1000)

		// start loop shots
		if(arr.constructor === Array) {
			arr.forEach(function (val) {
				module.exports.theShot(val, delay, selector)
			})
		} else {
			module.exports.theShot(folder, delay, selector)
		}
	}	
}