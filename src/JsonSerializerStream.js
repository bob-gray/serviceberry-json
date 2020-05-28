"use strict";

const {Transform} = require("stream");

class JsonSerializerStream extends Transform {
	#previous;

	constructor () {
		super({
			writableObjectMode: true,
			allowHalfOpen: false
		});

		this.push("[\n");
	}

	_transform (chunk, encoding, done) {
		this._pump(",\n");
		this.#previous = chunk;
		done();
	}

	_flush (done) {
		this._pump("\n");
		this.push("]");
		this.#previous = null;
		done();
	}

	_pump (delimiter) {
		if (this.#previous) {
			this.push(JSON.stringify(this.#previous) + delimiter);
		}
	}
}

module.exports = JsonSerializerStream;
