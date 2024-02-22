import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@Controller("auth")
@ApiTags("权限验证")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  @ApiOperation({ summary: "管理员登录" })
  async login(@Body() loginDto: LoginDto): Promise<boolean> {
    return !!(await this.authService.findByNameAndPwd(
      loginDto.username,
      loginDto.password,
    ));
  }
}
