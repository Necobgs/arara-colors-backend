import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(Favorite)
    private readonly repository:Repository<Favorite>,
    private readonly procuctService:ProductsService
  ){}

  async create(dto: CreateFavoriteDto,customer_id) {
    
    const product = await this.procuctService.findOne(dto.product_id);
    if(!product) throw new HttpException('Produto não encontrado',HttpStatus.BAD_REQUEST)
    const favorite = this.repository.create({
      ...dto,
      customer_id
    })
    return this.repository.save(favorite);
  }

  findAll(customer_id) {
    return this.repository.find({where:{customer_id}});
  }

  async remove(customer_id: number,product_id) {
    const favorite = await this.repository.find({where:{ customer_id, product_id }})
    return this.repository.remove(favorite);
  }
}
