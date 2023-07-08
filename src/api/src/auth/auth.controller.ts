import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../core/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() params: Record<string, any>) {
    return this.authService.login(params.email, params.senha);
  }

  @Get('me')
  getProfile(@Request() req) {
    return this.authService.me(req.user.username);
  }
}
