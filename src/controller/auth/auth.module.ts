import { Module } from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/shared/entities/Users";

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
