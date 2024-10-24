import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SelectProductDto } from './dto/select-product.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { JwtAuthGuardOptional } from 'src/auth/jwt-authOptional.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuardOptional)
  findAll(@Query() selectProductDto:SelectProductDto,@CurrentUser() user:CurrentUserDto | null) {
    return this.productsService.findAll(selectProductDto,user ? user.userId : null);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuardOptional)
  findOne(@Param('id') id: string,@CurrentUser() user:CurrentUserDto | null) {
    return this.productsService.findOne(+id,user ? user.userId : null );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
