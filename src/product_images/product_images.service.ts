import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductImagesService {

  constructor(
    @InjectRepository(ProductImage)
    private readonly repository:Repository<ProductImage>,
    private readonly productService:ProductsService
  ){}

  async create(dto: CreateProductImageDto) {
    const product = await this.productService.findOne(dto.product_id)
    if(!product) throw new HttpException('Produto não encontrado',HttpStatus.BAD_REQUEST)
    const productImage = this.repository.create(dto);
    return this.repository.save(productImage);
  }

  findAll(product_id:number) {
    return this.repository.find({where:{ product_id }});
  }

  findOne(product_id:number) {
    return this.repository.findOne({ where:{ product_id } });
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
