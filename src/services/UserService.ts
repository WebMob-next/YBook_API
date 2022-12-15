import { Injectable } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { UserModel, UsersRepository } from "@tsed/prisma";
import { UserCreation } from "../models/UserCreation";

@Injectable()
export class UserService extends UsersRepository {
  async createUser(params: UserCreation): Promise<UserModel> {
    if (!params.email) throw new BadRequest("Email is required");

    const user = await this.findUnique({
      where: {
        email: params.email
      }
    });
    if (user) throw new BadRequest("Email is already taken");

    return this.create({
      data: {
        ...params,
        avatarS3Key: "",
        coverPicS3Key: ""
      }
    });
  }
}
