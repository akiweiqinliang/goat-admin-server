import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../../entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async findByNameAndPwd(userName: string, password: string): Promise<Auth> {
    return await this.authRepository.findOneBy({
      userName: userName,
      password: password,
    });
  }
}
