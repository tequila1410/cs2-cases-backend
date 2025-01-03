import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignupDto): Promise<{token: string, user: User}> {
    const { username, email, password } = signUpDto

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = this.jwtService.sign({ id: user._id })

    return { token, user }
  }

  async signIn(signInDto: SigninDto): Promise<{token: string, user: User}> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({email});

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }


    const token = this.jwtService.sign({ id: user._id })

    return { token, user }
  }
}