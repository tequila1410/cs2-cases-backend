import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { SigninDto } from "./dto/signin.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<{token: string, user: User}> {
    return this.authService.signUp(signUpDto)
  }

  @Post('/signin')
  signIn(@Body() signInDto: SigninDto): Promise<{token: string, user: User}> {
    return this.authService.signIn(signInDto)
  }
}