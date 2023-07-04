import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

@Controller('estudo')
export class EstudoController {
  @HttpCode(HttpStatus.OK)
  @Post()
  async criar(@Body() params: Record<string, any>, @Req() req) {
    console.log(req.user);
  }
}
