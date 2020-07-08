// Type definitions for [swagger-routes-express] [3.1.3]
// Project: https://github.com/davesag/swagger-routes-express
// Definitions by: Dave Sag <https://github.com/davesag>
//                 Marco Rinck <https://github.com/marcorinck>
//                 Rodrigo Feijao <https://github.com/rodrigofeijao>
// Definitions: https://github.com/davesag/swagger-routes-express
// TypeScript Version: 3.9.x
declare module 'swagger-routes-express' {
  import {Handler, Router} from "express";

  interface Controllers {
      [key: string]: Handler;
  }

  interface ConnectorOptions {
      security?: {
          [key: string]: Handler;
      };

      middleware?: {
          [key: string]: Handler;
      };

      onCreateRoute?: (method: string, descriptor: any[]) => void;

      apiSeparator?: string;
      notImplemented?: Handler;
      notFound?: Handler;
      rootTag?: string;
      variables?: object;
  }

  interface SummariseOptions {
    INVALID_VERSION?: string
  }

  export function connector(api: Controllers, apiDefinition: object, options?: ConnectorOptions): (router: Router) => void;
  export function summarise(apiDefinition: object, options?: SummariseOptions): void;
}
