import { Module } from '@nestjs/common';
import { ProductFeaturesService } from './product_features.service';
import { ProductFeaturesController } from './product_features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFeature } from './entities/product_feature.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProductFeature]),
          ProductsModule],
  controllers: [ProductFeaturesController],
  providers: [ProductFeaturesService],
})
export class ProductFeaturesModule {}
