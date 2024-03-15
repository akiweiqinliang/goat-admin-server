import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "../../common/dto/result.dto";
import { Public } from "../../common/decorator/public.decorator";

@Controller("auth")
@ApiTags("权限验证")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post("login")
  @ApiOperation({ summary: "管理员登录" })
  async login(@Body() loginDto: LoginDto): Promise<Result<any>> {
    const result = await this.authService.findByNameAndPwd(
      loginDto.username,
      loginDto.password,
    );
    if (result) {
      const user = { username: loginDto.username };
      const payload = {
        username: user.username,
        sub: "",
        realName: "",
        role: "",
      };
      const token = this.authService.generateToken(payload);
      return new Result().ok({ token });
    } else {
      return new Result().error(1, "登录信息有误");
    }
  }
}
