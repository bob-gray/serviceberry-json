"use strict";

const json = require("../src/plugin"),
	{HttpError} = require("serviceberry"),
	{Readable, Writable} = require("stream"),
	{StringDecoder} = require("string_decoder");

describe("serviceberry-json", () => {
	var body,
		request,
		response;

	beforeEach(() => {
		body = {
			foo: "baz",
			hello: [1, 2, 3],
			world: null,
			awesome: true,
			test: {}
		};
		request = createRequest(body);
		response = createResponse(body);
	});

	it("should have a json content type", () => {
		expect(json.contentType).toBe("application/json");
	});

	it("should deserialize request body", () => {
		json.deserialize(request);

		expect(request.proceed.calls.argsFor(0)).toEqual([body]);
	});

	it("should proceed with an undefined if request content is empty", () => {
		request.getContent.and.returnValue("");
		json.deserialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith(undefined);
	});

	it("should proceed with undefined if response body is empty", () => {
		response.getBody.and.returnValue(undefined);
		json.serialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith(undefined);
	});

	it("should serialize response body", () => {
		json.serialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith(JSON.stringify(body));
	});

	it("should serialize a streamable response body", (done) => {
		var data = [{zero:0}, {one:1}, {two:2}],
			decoder = new StringDecoder("utf8"),
			result = "";

		response = createResponse(new Readable({
			objectMode: true,
			autoDestroy: true,
			read () {
				this.push(data.shift() || null);
			}
		}));

		json.serialize(request, response);

		request.proceed.calls.argsFor(0)[0].pipe(new Writable({
			write (chunk, encoding, callback) {
				result += decoder.write(chunk);
				callback();
			},
			final (callback) {
				result += decoder.end();
				expect(JSON.parse(result)).toEqual([{zero:0}, {one:1}, {two:2}]);
				done();
				callback();
			}
		}));
	});

	it("should throw if request content is not properly formatted", () => {
		request.getContent.and.returnValue("{bad=json}");

		expect(deserialize).toThrowMatching(badRequest);

		function deserialize () {
			json.deserialize(request);
		}
	});
});

function createRequest (body) {
	var request = jasmine.createSpyObj("Request", ["proceed", "getContent", "fail"]);

	request.getContent.and.returnValue(JSON.stringify(body));
	request.fail.and.throwError(new HttpError("Aw Snap!", "Bad Request"));

	return request;
}

function createResponse (body) {
	var response = jasmine.createSpyObj("Response", ["getBody", "isBodyStreamable"]);

	response.isBodyStreamable.and.returnValue("pipe" in body);
	response.getBody.and.returnValue(body);

	return response;
}

function badRequest (thrown) {
	return thrown.is("Bad Request");
}
