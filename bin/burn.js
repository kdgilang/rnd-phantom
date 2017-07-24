#!/usr/bin/env node

// global variable
const printer = require('../lib/printer.js')
const zipper = require('../lib/zipper.js')
const GIFEncoder = require('gifencoder')
//const Canvas = require('canvas')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2));

// initial 
function init() {
	delay = (argv.d !== undefined) ? argv.d : (argv.delay !== undefined) ? argv.delay : 30000
	folder = (argv.f !== undefined) ? argv.folder : (argv.folder !== undefined) ? argv.folder : undefined
	iszip = (argv.z !== undefined) ? argv.z : (argv.zip !== undefined) ? argv.zip : true
	iscapture = (argv.c !== undefined) ? argv.c : (argv.capture !== undefined) ? argv.capture : true
	selector = (argv.s !== undefined) ? argv.s : (argv.selector !== undefined) ? argv.selector : "#banner"

	if(iscapture === true) {
		printer.init(delay, folder, selector, iszip)
	} else {
		zipper.init(folder)
	}

	// var encoder = new GIFEncoder(320, 240);
	// // stream the results as they are available into myanimated.gif
	// encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

	// encoder.start();
	// encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
	// encoder.setDelay(500);  // frame delay in ms
	// encoder.setQuality(10); // image quality. 10 is default.

	// // use node-canvas
	// var canvas = new Canvas(320, 240);
	// var ctx = canvas.getContext('2d');

	// // red rectangle
	// ctx.fillStyle = '#ff0000';
	// ctx.fillRect(0, 0, 320, 240);
	// encoder.addFrame(ctx);

	// // green rectangle
	// ctx.fillStyle = '#00ff00';
	// ctx.fillRect(0, 0, 320, 240);
	// encoder.addFrame(ctx);

	// // blue rectangle
	// ctx.fillStyle = '#0000ff';
	// ctx.fillRect(0, 0, 320, 240);
	// encoder.addFrame(ctx);

	// encoder.finish();
} init()
