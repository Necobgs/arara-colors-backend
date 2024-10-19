import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { SelectProductDto } from './dto/select-product.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  create(dto: CreateProductDto) {
    const product = this.repository.create(dto);
    return this.repository.save(product);
  }

  findAll(dto: SelectProductDto) {
    const query = this.repository.createQueryBuilder('products');
    if(dto.price_gt && dto.price_lt && dto.price_gt > dto.price_lt) throw new HttpException('Preço mínimo deve ser menor que preço máximo',HttpStatus.BAD_REQUEST)

    if(dto.category_id){
      query.andWhere("products.cateory_id = :category_id",{category_id:dto.category_id})
    }
    if(dto.color_name){
      query.andWhere("products.color_name LIKE :color_name",{color_name:`%${dto.color_name}%`})
    }
    if(dto.price_gt){
      query.andWhere("products.price > :price_gt",{price_gt:dto.price_gt})
    }
    if(dto.price_lt){
      query.andWhere("products.price < :price_lt",{price_lt:dto.price_lt})
    }

    query.offset((dto.page-1)*dto.qty_per_page)
    query.limit(dto.qty_per_page)

    return query.getMany();
  }

  findOne(product_id: number) {
    return this.repository.findOne({
      where:{ product_id },
      relations:['category']
    });
  }

  async update(product_id: number, dto: UpdateProductDto) {
    const product = await this.repository.findOneBy({ product_id });
    console.log(product)
    this.repository.merge(product,dto);
    console.log(product)
    return this.repository.save(product);
  }

  async remove(product_id: number) {
    const product = await this.repository.findOneBy({ product_id });
    return this.repository.remove(product);
  }
}
