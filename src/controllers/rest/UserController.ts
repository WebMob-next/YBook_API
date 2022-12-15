import { Description, Post, Security } from "@tsed/schema";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { UserService } from "../../services";
import { BodyParams, Req } from "@tsed/common";
import { UserCreation } from "../../models/UserCreation";
import { UserModel } from "@tsed/prisma";
import { Authorize } from "@tsed/passport";
import { User } from "@prisma/client";

@Controller("/user")
@Scope(ProviderScope.SINGLETON)
export class UserCtrl {
  @Inject()
  userService: UserService;
  @Security("jwt")
  @Authorize("jwt")
  @Post("/create")
  @Description("Create a new user")
  async create(@Req("user") user: User | undefined, @BodyParams() body: UserCreation): Promise<UserModel> {
    return this.userService.createUser(body);
  }
}
