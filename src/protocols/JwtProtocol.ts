import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { JwtCognitoStrategy } from "../strategies/strategy";
import { UserService } from "../services/UserService";

@Protocol({
  name: "jwt",
  useStrategy: JwtCognitoStrategy
})
export class JwtProtocol implements OnVerify {
  @Inject()
  userService: UserService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = this.userService.findUnique({
      where: {
        email: jwtPayload.email
      }
    });

    if (!user) {
      if (req.url === "/rest/user/create") {
      } else {
        throw new Unauthorized("Invalid credentials");
      }
    }

    req.user = user;

    return user;
  }
}
