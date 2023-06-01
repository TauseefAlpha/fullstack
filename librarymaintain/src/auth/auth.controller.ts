import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto, SignUpDto } from './data/auth.dto';
import { User } from 'src/_schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //validationpipe() to activate validate fuvtion on create dto calss
  @Post('signup')
  async createUser(
    @Body(new ValidationPipe()) signUpdto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authService.createUser(signUpdto);
  }

  @Post('login')
  async validateUser(@Body() logindto: LoginDto): Promise<{ token: string }> {
    return await this.authService.validateUser(logindto);
  }

  @UseGuards(AuthGuard())
  @Get('getall')
  async getAllUser(): Promise<User[]> {
    return await this.authService.getAllUser();
  }
}
