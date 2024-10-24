import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductFeaturesService } from './product_features.service';
import { CreateProductFeatureDto } from './dto/create-product_feature.dto';
import { UpdateProductFeatureDto } from './dto/update-product_feature.dto';

@Controller('product-features')
export class ProductFeaturesController {
  constructor(private readonly productFeaturesService: ProductFeaturesService) {}

  @Post()
  create(@Body() createProductFeatureDto: CreateProductFeatureDto) {
    return this.productFeaturesService.create(createProductFeatureDto);
  }

  @Get(':id')
  findAll(@Param('id') product_id:number) {
    return this.productFeaturesService.findAll(product_id);
  }
}
