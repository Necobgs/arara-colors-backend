import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    readAll(){
    }

    @Get(":id")
    read(@Param('id') id:string){
        return `Você mandou o id ${id}`
    }
    
    @Post()
    create(){
    }

    @Delete()
    delete(){
    }

    @Put()
    update(){
    }

}