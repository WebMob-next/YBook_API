import {Post} from "@tsed/schema";
import {Controller, Inject} from "@tsed/di";
import { UserService } from "src/services";
import { BodyParams } from "@tsed/common";

@Controller("/user")
export class UserCtrl {
    @Inject()
    userService : UserService
    @Post('/create')
    async create(@BodyParams() body: T): Promise<T> {
        console.log("payload", body);
    
        return body;
    }
}