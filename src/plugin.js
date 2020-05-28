"use strict";

const JsonSerializerStream = require("./JsonSerializerStream");

module.exports = Object.freeze(Object.assign(Object.create(null), {
	contentType: "application/json",

	serialize (request, response) {
		var body = response.getBody(),
			content;

		if (response.isBodyStreamable()) {
			content = body.pipe(new JsonSerializerStream());
		} else if (typeof body !== "undefined") {
			content = JSON.stringify(body);
		}

		request.proceed(content);
	},

	deserialize (request) {
		var content = request.getContent(),
			body;

		if (content) {
			try {
				body = JSON.parse(content);
			} catch (error) {
				request.fail(error, "Bad Request");
			}
		}

		request.proceed(body);
	}
}));
