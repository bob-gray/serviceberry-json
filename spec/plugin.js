"use strict";

const json = require("../plugin"),
	Request = require("serviceberry/src/Request"),
	{HttpError} = require("serviceberry"),
	httpMocks = require("node-mocks-http");

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

	it("should throw if request content is not properly formatted", () => {
		request.getContent.and.returnValue("{bad=json}");

		expect(deserialize).toThrowMatching(badRequest);

		function deserialize () {
			json.deserialize(request);
		}
	});
});

function createRequest (body) {
	var incomingMessage = httpMocks.createRequest({
			url: "/"
		}),
		request;

	incomingMessage.setEncoding = Function.prototype;
	request = new Request(incomingMessage);
	request.getContent = jasmine.createSpy("request.getContent")
		.and.returnValue(JSON.stringify(body));
	request.proceed = jasmine.createSpy("request.proceed");

	return request;
}

function createResponse (body) {
	var response = jasmine.createSpyObj("Response", [
		"getBody"
	]);

	response.getBody.and.returnValue(body);

	return response;
}

function badRequest (thrown) {
	return thrown.is("Bad Request");
}
