import { UserDto } from "../../core/dto/users/user.update.dto";
import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
} from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto } from "../../core/dto/users/user-login.dto";
import { ApiTags } from "@nestjs/swagger";
import { CustomResponse } from "../../common/helper/customresponse.helpers";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/staff")
  public async registerStaff(@Body() createUserDto: CreateUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.registerAdminUserType(createUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
  
  @Post("register/client")
  public async registerClient(@Body() createUserDto: CreateUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.registerClientUserType(createUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/admin")
  public async loginAdminUserType(@Body() loginUserDto: LoginUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.loginAdminUserType(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/client")
  public async loginClientUserType(@Body() loginUserDto: LoginUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.loginClientUserType(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/findByUsername/:username")
  async findByUsername(@Param("username") username: string) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.findByUserName(username);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
