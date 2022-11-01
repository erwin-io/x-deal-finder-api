import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import {
  compare,
  hash,
  getAge,
  isStaffRegistrationApproved,
} from "../common/utils/utils";
import { Users } from "../shared/entities/Users";
import { Gender } from "../shared/entities/Gender";
import { EntityStatus } from "../shared/entities/EntityStatus";
import { query } from "express";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>
  ) {}

  async getAllAdminUserType() {
    return await this.userRepo.find({
      where: { isAdminUserType: true },
      relations: ["gender"],
    });
  }
  async getAllClientUserType() {
    return await this.userRepo.find({
      where: { isAdminUserType: true },
      relations: ["gender"],
    });
  }

  async findByLogin(username, password, isAdminUserType) {
    const result = await this.userRepo.findOne({
      where: { username, isAdminUserType },
      relations: ["gender"],
    });
    if (!result) {
      throw new HttpException("Username not found", HttpStatus.NOT_FOUND);
    }
    if (!result.isLock) {
      throw new HttpException("Yout account has been locked", HttpStatus.OK);
    }
    const areEqual = await compare(result.password, password);
    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.NOT_ACCEPTABLE);
    }
    return this._sanitizeUser(result);
  }

  async findByUsername(username) {
    try {
      const result = await this.userRepo.findOne({
        where: { username },
      });
      if (result) {
        return this._sanitizeUser(result);
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  async create(userDto: CreateUserDto, isAdminUserType: boolean) {
    const { username } = userDto;

    return await this.userRepo.manager.transaction(async (entityManager) => {
      const userInDb = await entityManager.findOne(Users, {
        where: { username },
      });
      if (userInDb) {
        throw new HttpException("Username already exist", HttpStatus.CONFLICT);
      }
      let user = new Users();
      user.isAdminUserType = isAdminUserType;
      user.username = userDto.username;
      user.password = await hash(userDto.password);
      user.entityStatus = new EntityStatus();
      user.entityStatus.entityStatusId = "1";
      user.isAdminApproved = true;
      user.firstName = userDto.firstName;
      user.middleName = userDto.middleName;
      user.lastName = userDto.lastName;
      user.mobileNumber = userDto.mobileNumber;
      user.address = userDto.address;
      user.birthDate = userDto.birthDate;
      user.age = await getAge(userDto.birthDate);
      user.gender = new Gender();
      user.gender.genderId = userDto.genderId;
      user = await entityManager.save(Users, user);
      user = await this._sanitizeUser(user);
      return user;
    });
  }

  async register(userDto: CreateUserDto, isAdminUserType: boolean) {
    const { username } = userDto;

    return await this.userRepo.manager.transaction(async (entityManager) => {
      const userInDb = await entityManager.findOne(Users, {
        where: { username },
      });
      if (userInDb) {
        throw new HttpException("Username already taken", HttpStatus.CONFLICT);
      }
      let user = new Users();
      user.isAdminUserType = isAdminUserType;
      user.username = userDto.username;
      user.password = await hash(userDto.password);
      user.entityStatus = new EntityStatus();
      user.entityStatus.entityStatusId = "1";
      user.firstName = userDto.firstName;
      user.middleName = userDto.middleName;
      user.lastName = userDto.lastName;
      user.mobileNumber = userDto.mobileNumber;
      user.address = userDto.address;
      user.birthDate = userDto.birthDate;
      user.age = await getAge(userDto.birthDate);
      user.gender = new Gender();
      user.gender.genderId = userDto.genderId;
      user = await entityManager.save(Users, user);
      user = await this._sanitizeUser(user);
      return user;
    });
  }

  private _sanitizeUser(user: Users) {
    delete user.password;
    return user;
  }
}
