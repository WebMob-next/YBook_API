import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config";
import * as rest from "./controllers/rest";
import * as pages from "./controllers/pages";
import "./protocols";
import session from "express-session";
import { rateLimiterUsingThirdParty } from "./middlewares/ratelimiter";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/rest": [...Object.values(rest)],
    "/": [...Object.values(pages)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
      spec: {
        components: {
          securitySchemes: {
            jwt: {
              type: "http",
              scheme: "bearer"
            }
          }
        }
      }
    }
  ],
  middlewares: [
    cors(),
    cookieParser(),
    rateLimiterUsingThirdParty(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    session({
      secret: "eH8v9qpfxVHC00brgf3E4ONtK7NhrfYYfE1i7C5PmVuwACQZvm1YpCCvT2TMw6Sck71ybe7SbVs0dmcdeLxVkkQsPzqzkiJrSwLi",
      resave: true,
      saveUninitialized: true,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false
      }
    })
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
