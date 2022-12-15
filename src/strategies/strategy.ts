import { Strategy } from "passport";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export class JwtCognitoStrategy extends Strategy {
  private verifier = CognitoJwtVerifier.create({
    region: process.env.AWS_REGION ?? "",
    userPoolId: process.env.USER_POOL_ID ?? "",
    clientId: process.env.CLIENT_ID ?? "",
    tokenUse: "id"
  });

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async authenticate(req: any) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return this.fail(new Error("No token provided"));
    }

    try {
      const payload = await this.verifier.verify(token);
      return this.success(payload);
    } catch (error) {
      return this.fail(error);
    }
  }
}
