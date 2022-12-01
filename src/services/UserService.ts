import { Injectable } from "@tsed/di";
import { UsersRepository } from "@tsed/prisma";

@Injectable()

export class UserService extends UsersRepository {

}