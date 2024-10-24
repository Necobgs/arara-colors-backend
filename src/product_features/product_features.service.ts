import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductFeatureDto } from './dto/create-product_feature.dto';
import { UpdateProductFeatureDto } from './dto/update-product_feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFeature } from './entities/product_feature.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductFeaturesService {
  
  constructor(
    @InjectRepository(ProductFeature)
    private readonly repository:Repository<ProductFeature>,
    private readonly productService:ProductsService
  ){}
  
  async create(dto: CreateProductFeatureDto) {
    const product = await this.productService.findOne(dto.product_id);
    if(!product) throw new HttpException('Produto não encontrado',HttpStatus.BAD_REQUEST);
    const productFeature = this.repository.create(dto);
    return this.repository.save(productFeature);
  }

  findAll(product_id:number) {
    return this.repository.find({ where:{ product_id }});
  }
}
