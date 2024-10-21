import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUpDto } from './dto/auth-signUp.dto';
import { AuthInDto } from './dto/auth-signIn.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('signup')
    signUp(@Body() dto:AuthUpDto){
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signIn(@Body() dto:AuthInDto){
        return this.authService.signIn(dto);
    }

}
