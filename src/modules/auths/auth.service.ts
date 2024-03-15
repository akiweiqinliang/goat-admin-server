import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../../entities/auth.entity";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
  async findByNameAndPwd(userName: string, password: string): Promise<boolean> {
    const result = await this.authRepository.findOneBy({
      userName: userName,
      password: password,
    });
    return !!result;
  }
}
