import { CognitoJwtVerifier } from "aws-jwt-verify";
import {Context} from "@tsed/platform-params";
import {MiddlewareMethods, Middleware} from "@tsed/platform-middlewares";
import { HTTPException } from "@tsed/exceptions";
import { Next } from "@tsed/common";

@Middleware()
export default class AcceptMimesMiddleware implements MiddlewareMethods {

  async use(@Context() $ctx: Context, @Next() next: Next) {
    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.USER_POOL_ID ?? "",
        tokenUse: "access",
        clientId: process.env.CLIENT_ID ?? "",
    });
  
    try {
        const jwt = $ctx.request.headers.authorization
        if(!jwt){
            return new HTTPException(401,"Unauthorized")
        }
        const jwt_split = jwt.split(" ");
        const token = jwt_split[1];
        await verifier.verify(
            token
        );
        next();
    } catch {
        return new HTTPException(401,"Unauthorized")
    }
  }
}

