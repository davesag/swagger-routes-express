declare module 'swagger-routes-express' {
  import { Handler, Router } from 'express'

  interface Controllers {
    [key: string]: Handler
  }

  interface ConnectorOptions {
    security?: {
      [key: string]: Handler
    }

    middleware?: {
      [key: string]: Handler
    }

    onCreateRoute?: (method: string, descriptor: any[]) => void

    apiSeparator?: string
    notImplemented?: Handler
    notFound?: Handler
    rootTag?: string
    variables?: object
  }

  interface SummariseOptions {
    INVALID_VERSION?: string
  }

  interface Summary {
    info: {
      name: string
      description: string
      version: string
    }

    paths: {
      [key: string]: string[]
    }
  }

  export function connector(
    api: Controllers,
    apiDefinition: object,
    options?: ConnectorOptions
  ): (router: Router) => void

  export function summarise(apiDefinition: object, options?: SummariseOptions): Summary
}
