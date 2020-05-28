serviceberry-json
=================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-json.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-json)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5a3b692d2c6e70440cd0/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-json/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a3b692d2c6e70440cd0/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-json/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-json.svg)](https://badge.fury.io/js/serviceberry-json)

JSON serialization plugin for serviceberry.

API
---

### contentType

`application/json`

### serialize(request, response)

Transforms the response body into a JSON string.

*If the response body is a readable stream, it will be piped through a JSON serializer stream. Objects are transformed
into a stream that's entire output is a valid JSON array - `[` followed by each object serialized as JSON and separated by
a comma (except last object) and a new line (LF) followed by `]`.*

### deserialize(request, response)

Transforms the request content into the request body
