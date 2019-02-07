# swagger-routes-express

Connect your Express route controllers to restful paths using your Swagger/OpenAPI definition file

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/swagger-routes-express.svg)](https://greenkeeper.io/)

## Branches

| Branch | Status | Coverage | Notes |
| ------ | ------ | -------- | - |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/swagger-routes-express/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/swagger-routes-express/tree/develop) | [![codecov](https://codecov.io/gh/davesag/swagger-routes-express/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/swagger-routes-express) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/swagger-routes-express/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/swagger-routes-express/tree/master) | [![codecov](https://codecov.io/gh/davesag/swagger-routes-express/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/swagger-routes-express) | Latest stable release |

## Prerequisites

This library assumes:

1. You are using [`expressjs`](http://www.expressjs.com)
2. You are using [`swagger`](http://swagger.io) _version 2_ or [`OpenAPI`](https://www.openapis.org) _version 3_

## Install

Add `swagger-routes-express` as a `dependency`:

    npm i swagger-routes-express

## Examples

### A simple API

Assume the following API route controllers, defined in `./api/index.js` as follows:

    const { name, version, description } = require('../../package.json')

    const versions = (req, res) => {
      res.json([
        {
          version: 1,
          path: '/api/v1'
        }
      ])
    }

    const ping = (req, res) => {
      res.json({
        name,
        description,
        version,
        uptime: process.uptime()
      })
    }

    module.exports = { ping, versions }

### Swagger Version 2 Example

Given a Swagger (v2) YAML file `my-api.yml` along the lines of:

    swagger: "2.0"
    info:
      description: Something about the API
      version: "1.0.0"
      title: "Test API"
    basePath: "/api/v1"
    schemes:
      - "https"
      - "http"
    paths:
      /:
        get:
          tags:
            - "root"
          summary: "Get API Version Information"
          description: "Returns a list of the available API versions"
          operationId: "versions"
          produces:
          - "application/json"
          responses:
            200:
              description: "success"
              schema:
                $ref: "#/definitions/ArrayOfVersions"
      /ping:
        get:
          tags:
            - "root"
          summary: "Get Server Information"
          description: "Returns information about the server"
          operationId: "ping"
          produces:
          - "application/json"
          responses:
            200:
              description: "success"
              schema:
                $ref: "#/definitions/ServerInfo"
    definitions:
      # see https://swagger.io/docs/specification/data-models/data-types
      APIVersion:
        type: "object"
        properties:
          version:
            type: "integer"
            format: "int64"
          path:
            type: "string"
      ServerInfo:
        type: "object"
        properties:
          name:
            type: "string"
          description:
            type: "string"
          version:
            type: "string"
          uptime:
            type: "number"
      ArrayOfVersions:
        type: "array"
        items:
          $ref: "#/definitions/APIVersion"

### Or as an OpenAPI Version 3 example

    openapi: 3.0.0
    info:
      description: Something about the API
      version: 1.0.0
      title: Test API
    paths:
      /:
        get:
          tags:
            - root
          summary: Get API Version Information
          description: Returns a list of the available API versions
          operationId: versions
          responses:
            '200':
              description: success
              content:
                application/json:
                  schema:
                    $ref: '#/components/schemas/ArrayOfVersions'
      /ping:
        get:
          tags:
            - root
          summary: Get Server Information
          description: Returns information about the server
          operationId: ping
          responses:
            '200':
              description: success
              content:
                application/json:
                  schema:
                    $ref: '#/components/schemas/ServerInfo'
    servers:
      - url: /api/v1
    components:
      schemas:
        APIVersion:
          type: object
          properties:
            version:
              type: integer
              format: int64
            path:
              type: string
        ServerInfo:
          type: object
          properties:
            name:
              type: string
            description:
              type: string
            version:
              type: string
            uptime:
              type: number
        ArrayOfVersions:
          type: array
          items:
            $ref: '#/components/schemas/APIVersion'

### Your Express Server

You could set up your server as follows:

    const express = require('express')
    const SwaggerParser = require('swagger-parser')
    const swaggerRoutes = require('swagger-routes-express')
    const api = require('./api')

    const makeApp = async () => {
      const parser = new SwaggerParser()
      const apiDescription = await parser.validate('my-api.yml')
      const connect = swaggerRoutes(api, apiDescription)

      const app = express()
      // do any other app stuff, such as wire in passport, use cors etc
      // then attach the routes
      connect(app)

      // add any error handlers last
      return app
    }

With the result that requests to `GET /` will invoke the `versions` controller and a request to `/ping` will invoke the `ping` controller.

### Adding security handlers

You can pass in a range of options, so if your swagger document defines security scopes you can pass in the following `scopes` option:

    const options = {
      scopes: {
        'my-scope': correspondingMiddlewareFunction,
        'my-other-scope': otherAuthMiddleware,
        'admin': adminAuthMiddleware
      }
    }

#### What's an Auth Middleware function?

An Auth Middleware Function is simply an [Express Middleware function](https://expressjs.com/en/guide/using-middleware.html) that checks to see if the user making the request is allowed to do so.

How this actually works in your server's case is going to be completely application specific, but the general idea is your app needs to be able to log users in, or accept a token from a header, or somehow otherwise stick a user id, or some roles, into `req.user` or `req.session.user` or something like that.  There are dozens of ways to do this.  I recommend using something like [Passport](http://www.passportjs.org/packages/) to handle the specifics.

Your Auth Middleware then just needs to check that the user / roles you've stored corresponds with what you'd like to allow that user to do.

```
async function correspondingMiddlewareFunction(req, res, next) {
  // previously you have added a userId to req (say from an 'Authorization: Bearer token' header)
  // how you check that the token is valid is up to your app's logic
  if (await isValidToken(req.user.token)) return next()

  // otherwise reject with an error
  return res.status(401).json({ error: "I'm afraid you can't do that" })
}
```

* [More information…](https://duckduckgo.com/?q=express+auth+middleware) (via DuckDuckGo)

#### OpenAPI V3 Security Blocks

OpenAPI V3 allows you to define a global `security` definition as well as path specific ones. The global `security` block will be applied if there is no path specific one defined.

### Adding hooks

You can supply an `onCreateRoute` handler function with the options with signature

    const onCreateRoute = (method, descriptor) => {
      const [path, ...handlers] = descriptor
      console.log('created route', method, path, handlers)
    }

The method will be one of `get`, `put`, `post`, `delete`, etc.

The descriptor is an array of

    [
      path, // a string. Swagger param formats will have been converted to express route formats.
      security, // a middleware function (if needed)
      controller //  a route controller function
    ]

### Mapping to nested API routes

If your `./api` folder contains nested controllers such as

    /api/v1/createThing.js

It's not uncommon for `./index.js` to expose this as `v1_createThing`, but in swagger the `operationId` might specify it as `v1/createThing`.

You can supply your own `apiSeparator` option in place of `_` to map from `/`.

### Missing Route Controllers

If a route controller is defined as an `operationId` in swagger but there is no corresponding controller, a default `notImplemented` controller will be inserted that simply responds with a `501` error. You can also specify your own `notImplemented` controller in `options`.

If no `operationId` is supplied for a path then a default `notFound` controller that responds with a `404` status will be inserted. You can also specify your own `notFound` controller in `options`.

### Base paths

#### Swagger Version 2

For the root path `/` we check the route's `tags`.  If the first tag defined for a path is `'root'` we don't inject the api basePath, otherwise we do.  You can define your own `rootTag` option to override this.

#### OpenAPI Version 3

The OpenAPI format allows you to define both a default `servers` array, and `path` specific `servers` arrays. The `url` fields in those arrays are parsed, ignoring any absolute URLS (as they are deemed to refer to controllers external to this API Server).

The spec allows you to include template variables in the `servers`' `url` field.  To accomodate this you can supply a `variables` option in `options`.  Any variables you specify will be substituted.

### Default Options

If you don't pass in any options the defaults are:

```
{
  apiSeparator: '_',
  notFound: : require('./routes/notFound'),
  notImplemented: require('./routes/notImplemented'),
  onCreateRoute: undefined,
  rootTag: 'root', // unused in OpenAPI v3 docs
  scopes: {},
  variables: {}, // unused in Swagger V2 docs
  INVALID_VERSION: require('./errors').INVALID_VERSION
}
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
