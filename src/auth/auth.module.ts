import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entities/customers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Customers])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
