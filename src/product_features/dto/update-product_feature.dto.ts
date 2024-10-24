import { PartialType } from '@nestjs/mapped-types';
import { CreateProductFeatureDto } from './create-product_feature.dto';

export class UpdateProductFeatureDto extends PartialType(CreateProductFeatureDto) {}
