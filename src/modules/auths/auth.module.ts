import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Auth } from "../../entities/auth.entity";
import { jwtConstants } from "./constants";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "8h" }, // token 过期时效
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
