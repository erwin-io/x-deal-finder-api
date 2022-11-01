import { Users } from "../shared/entities/Users";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { LoginUserDto } from "../core/dto/users/user-login.dto";
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import * as path from "path";
import { compare, hash } from "src/common/utils/utils";
import { RoleEnum } from "src/common/enums/role.enum copy";
import { UserTypeEnum } from "src/common/enums/user-type.enum";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerAdminUserType(userDto: CreateUserDto) {
    return await this.usersService.register(userDto, true);
  }

  async registerClientUserType(userDto: CreateUserDto) {
    return await this.usersService.register(userDto, false);
  }

  async loginAdminUserType({ username, password }: any) {
    return await this.usersService.findByLogin(username, password, true);
  }

  async loginClientUserType({ username, password }: any) {
    return await this.usersService.findByLogin(username, password, false);
  }

  async findByUserName(username) {
    return await this.usersService.findByUsername(username);
  }

}
