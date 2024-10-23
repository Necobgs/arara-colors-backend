import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { SelectProductDto } from './dto/select-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.repository.create(dto);
    return this.repository.save(product);
  }

  findAll(dto: SelectProductDto, customer_id) {
    const query = this.repository.createQueryBuilder('products');

    // Validação de preços
    if (dto.price_gt && dto.price_lt && dto.price_gt > dto.price_lt) {
      console.log(customer_id)
      return new HttpException(
        'Preço mínimo deve ser menor que preço máximo',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Juntando as relações
    query
      .leftJoinAndSelect('products.category', 'category') // Junta a categoria
      .leftJoinAndSelect('products.productImages', 'productImages') // Junta as imagens do produto
      .leftJoinAndSelect(
        'favorite',
        'f',
        'f.product_id = products.product_id AND f.customer_id = :customer_id',
        { customer_id },
      )

      .addSelect(
        'CASE WHEN f.product_id IS NOT NULL THEN true ELSE false END',
        'isFavorite',
      );

    // Filtros
    if (dto.category_id) {
      query.andWhere('products.category_id = :category_id', {
        category_id: dto.category_id,
      });
    }
    if (dto.color_name) {
      query.andWhere('products.color_name LIKE :color_name', {
        color_name: `%${dto.color_name}%`,
      });
    }
    if (dto.price_gt) {
      query.andWhere('products.price > :price_gt', { price_gt: dto.price_gt });
    }
    if (dto.price_lt) {
      query.andWhere('products.price < :price_lt', { price_lt: dto.price_lt });
    }

    // Paginação
    query.offset((dto.page - 1) * dto.qty_per_page);
    query.limit(dto.qty_per_page);

    return query.getRawMany().then(results => 
      results.map(result => {
        console.log(result)
        // product_id: result.products_product_id,
        // product_name: result.products_product_name,
        // color_name: result.products_color_name,
        // quantity_in_stock: result.products_quantity_in_stock,
        // price: result.products_price,
        // category_id: result.category_category_id,
        // category_name: result.category_category_name,
        // description: result.category_description,
        // isFavorite: result.isFavorite,  
        // Adicionando outros campos conforme necessário
      }))
  }

  findOne(product_id: number) {
    return this.repository.findOne({
      where: { product_id },
      relations: ['category', 'productImages'],
    });
  }

  async update(product_id: number, dto: UpdateProductDto) {
    const product = await this.repository.findOneBy({ product_id });
    this.repository.merge(product, dto);
    return this.repository.save(product);
  }

  async remove(product_id: number) {
    const product = await this.repository.findOneBy({ product_id });
    return this.repository.remove(product);
  }
}
