import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { OrderStatusModule } from './order_status/order_status.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CardItemsModule } from './card-items/cart-items.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { ProductFeaturesModule } from './product_features/product_features.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configsService: ConfigService) => ({
        type:"postgres",
        host:configsService.get<string>('DATABASE_HOST'),
        port:configsService.get<number>('DATABASE_PORT'),
        username:configsService.get<string>('DATABASE_USERNAME'),
        password:configsService.get<string>('DATABASE_PASSWORD'),
        database:configsService.get<string>('DATABASE_NAME'),
        ssl:{
          rejectUnauthorized:true 
        },
        entities:[__dirname + '/**/*.entity{.ts,.js}'], //Carrega todas as entidades do diretório
        synchronize:true
      }),
    }),
    CategoriesModule,
    CustomersModule,
    OrderStatusModule,
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
    AuthModule,
    CartModule,
    CardItemsModule,
    FavoritesModule,
    ProductImagesModule,
    ProductFeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
