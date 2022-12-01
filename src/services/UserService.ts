import { Injectable } from "@tsed/di";
import { UserModel, UsersRepository } from "@tsed/prisma";
import { UserCreation } from "../models/UserCreation";

@Injectable()

export class UserService extends UsersRepository {
    async createUser(params: UserCreation): Promise<UserModel> {
        return this.create({
        data:{
            ...params,
            avatarS3Key:"",
            coverPicS3Key:""
        }
        }) 
    }
}