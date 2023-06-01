import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto, LoginDto } from '../auth/data/auth.dto';
import { User, UserDocument } from '../_schema/user.schema';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtservice: JwtService,
  ) {}
  async createUser(newUser: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password } = newUser;
    const hashedPassword = await hash(password, 10);
    const user = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const payload = {
      id: savedUser._id,
      email: savedUser.email,
    };
    const token = this.jwtservice.sign(payload);
    return { token };
  }

  // =========================
  async validateUser(loguser: LoginDto): Promise<{ token: string }> {
    const { email, password } = loguser;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('invalid email');
    }
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('invalid email and password');
    }
    const payload = {
      id: user._id,
      email: user.email
    };
    const token = this.jwtservice.sign(payload);
    return { token };
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find({});
  }
}
