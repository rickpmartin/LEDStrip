/**
 * dna.js
 *
 * DNA sequence scrolling colors
 *
 * LEDstrip plugin
 *
 * Distributed under the MIT License
 */

function DNA (ledstrip) {
	this.ledstrip = ledstrip;
	this.ledstrip.clear();
	
	this.startTime = Date.now(); // number of milliseconds elapsed since January 1, 1970
	this.interval = 200; // time in milliseconds between updates

	// http://paletton.com/#uid=7321o0ktwxn0xoIfLv7LztS++lW
	this.palette = {
		'G': [14, 180, 104],
		'A': [87, 29, 177],
		'T': [255, 230, 20],
		'C': [255, 83, 20],
	}

	this.sequence = 'GATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGAGATCTGACTACTGGA';

	return this;
}

DNA.prototype.init = function() {}

DNA.prototype.update = function () {
	var i, 
		size = this.ledstrip.size(), 
		offset = Math.floor((Date.now() - this.startTime) / this.interval);

	for (i = 0; i < size; i++) {
		this.ledstrip.buffer[i] = this.palette[this.sequence[(i + offset) % size]];
	}
}

DNA.prototype.animate = function() {
	animation = requestAnimationFrame(this.animate.bind(this)); // preserve our context

	this.update();

	this.ledstrip.send(); // update strip
}