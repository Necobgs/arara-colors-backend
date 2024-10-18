import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/category.entity';
import { retryWhen } from 'rxjs';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Categories)
    private readonly repository: Repository<Categories>){}

  create(dto: CreateCategoryDto) {
    const category = this.repository.create(dto);
    return this.repository.save(category);
  }

  findAll(){
    return this.repository.find();
  }

  findOne(category_id: number) {
    return this.repository.findOneBy({ category_id });
  }

  async update(category_id: number, dto: UpdateCategoryDto) {
    const category = await this.repository.findOneBy({ category_id });
    if(!category) return null;
    this.repository.merge(category,dto);
    return this.repository.save(category); 
  }

  async remove(category_id: number) {
    const category = await this.repository.findOneBy({ category_id });
    if (!category) return null;
    return this.repository.remove(category)
  }
}
