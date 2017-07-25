#!/usr/bin/env node

// global variable
const printer = require('../lib/printer.js')
const zipper = require('../lib/zipper.js')
const agif = require('../lib/agif.js')
const argv = require('minimist')(process.argv.slice(2))

// initial 
function init() { 
	// define parameters
	var args = {
		stype: (argv.t !== undefined) ? argv.t : (argv.stype !== undefined) ? argv.stype : '',
		delay: (argv.d !== undefined) ? argv.d : (argv.delay !== undefined) ? argv.delay : 30000,
		folder: (argv.f !== undefined) ? argv.f : (argv.folder !== undefined) ? argv.folder : undefined,
		iszip: (argv.z !== undefined) ? argv.z : (argv.zip !== undefined) ? argv.zip : true,
		iscapture: (argv.c !== undefined) ? argv.c : (argv.capture !== undefined) ? argv.capture : true,
		selector: (argv.s !== undefined) ? argv.s : (argv.selector !== undefined) ? argv.selector : "#banner",
		quality: (argv.q !== undefined) ? argv.q : (argv.quality !== undefined) ? argv.quality : 75,
		range: (argv.r !== undefined) ? argv.r : (argv.range !== undefined) ? argv.range : 10,
	}

	// parameters statement
	switch(args.stype) {
		case 'agif':
			agif.init(args)
		break;
		case 'zip':
			zipper.init(args)
		break;
		default:
			if(args.iscapture === true) {
				printer.init(args)
			} 
		break;
	}

} init()
