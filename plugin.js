"use strict";

module.exports = {
	contentType: "application/json",

	serialize (request, response) {
		var body = response.getBody(),
			content;

		if (typeof body !== "undefined") {
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
				const {statusCodes, HttpError} = require("serviceberry");

				throw new HttpError(error, statusCodes.BAD_REQUEST);
			}
		}

		request.proceed(body);
	}
};
