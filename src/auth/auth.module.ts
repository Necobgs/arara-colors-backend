import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entities/customers.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CartModule } from 'src/cart/cart.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule,
    TypeOrmModule.forFeature([Customers]),
            JwtModule.registerAsync({
              inject:[ConfigService],
              useFactory: (config:ConfigService) => ({
                secret:config.get("JWT_SECRET"),
                signOptions: { expiresIn: '2h' }
              })
            }),
    CustomersModule,
    CartModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy]
})
export class AuthModule {}
