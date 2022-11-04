import {
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ToBoolean } from "src/common/helper/env.helper";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}

export class UpateUserDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  genderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  mobileNumber: string;
}

export class UpateUserPasswordDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ToggleLockDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  isLock: boolean;
}