import { Controller, Get, Post, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { FindAllParams, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Get()
    readAll(@Query() params:FindAllParams){
        return this.userService.readAll(params);
    }

    @Get(":id")
    read(@Param('id') id:string){
        return this.userService.read(Number(id));
    }
    
    @Post()
    create(@Body() user:UserDto){
        return this.userService.create(user);
    }

    @Delete()
    delete(){
    }

    @Put()
    update(){
    }

}