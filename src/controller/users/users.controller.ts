import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UsersService } from "../../services/users.service";
import { CustomResponse } from "./../../common/helper/customresponse.helpers";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get("getAllAdminUserType")
  async getAllAdminUserType() {
    const res: CustomResponse = {};
    try {
      res.data = await this.userService.getAllAdminUserType();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("getAllClientUserType")
  async getAllClientUserType() {
    const res: CustomResponse = {};
    try {
      res.data = await this.userService.getAllClientUserType();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/admin")
  async createStaff(@Body() createDto: CreateUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.userService.create(createDto, true);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/client")
  async createClient(@Body() createDto: CreateUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.userService.create(createDto, true);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
