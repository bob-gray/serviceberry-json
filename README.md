serviceberry-json
=================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-json.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-json)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5a4fc498c6e90455f103/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-json/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a4fc498c6e90455f103/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-json/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-json.svg)](https://badge.fury.io/js/serviceberry-json)

JSON serialization plugin for serviceberry.

API
---

### contentType

`application/json`

### serialize(request, response)

Tranforms the respone body into a JSON string

### deserialize(request, response)

Transforms the request content into the request body
