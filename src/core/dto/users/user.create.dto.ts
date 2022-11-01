import {
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import * as moment from "moment";

export class CreateUserDto {
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

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}