#!/usr/bin/env node

// global variable
const zipper = require('../lib/zipper.js')
const printer = require('../lib/printer.js')

// initial 
function init() {
	process.argv.forEach(function (val, index, array) {
		delay = (array[2] !== undefined) ? array[2] : 30000
		folders = (array[3] !== undefined) ? array[3] : undefined
		iszipper = (array[4] !== undefined) ? array[4] : "true"
		selector = (array[5] !== undefined) ? array[5] : "#banner" 
	})
	printer.init(delay, folders, selector)
	if(iszipper === "true") {
		delay = parseInt(delay) + 5000
		setTimeout(function () {
			zipper.init(folders)
		}, delay)
	}
}

init()
