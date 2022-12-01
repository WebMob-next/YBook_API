import {Post} from "@tsed/schema";
import {Controller, Inject} from "@tsed/di";
import { UserService } from "../../services";
import { BodyParams } from "@tsed/common";
import { UserCreation } from "../../models/UserCreation";
import { UserModel } from "@tsed/prisma";

@Controller("/user")
export class UserCtrl {
    @Inject()
    userService : UserService
    @Post('/create')
    async create(@BodyParams() body: UserCreation): Promise<UserModel> {
        return this.userService.createUser(body);
    }
}