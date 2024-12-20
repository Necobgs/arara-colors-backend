import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes,scrypt as _scrypt } from 'crypto';
import { Customers } from 'src/customers/entities/customers.entity';
import { promisify } from 'util';
import { AuthUpDto } from './dto/auth-signUp.dto';
import { AuthInDto } from './dto/auth-signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { CartService } from 'src/cart/cart.service';
import { Repository } from 'typeorm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(
        private readonly customerService:CustomersService,
        private readonly jwtService:JwtService,
        private readonly cartService:CartService,
        @InjectRepository(Customers)
        private readonly repository:Repository<Customers>
    ){}

    async signUp(dto:AuthUpDto){
        
        const user = await this.customerService.findOne({email:dto.email});
        if(user) throw new HttpException('Email já está em uso',HttpStatus.BAD_REQUEST);
        
        const salt = randomBytes(8).toString('hex')
        const hash = await scrypt(dto.password,salt,32) as Buffer
        const saltAndHash = `${salt}.${hash.toString('hex')}`

        const customer = this.repository.create({
            name:dto.name,
            email:dto.email,
            password:saltAndHash,
            addres:dto.addres,
            phone:dto.phone
        });

        const user_created = await this.repository.save(customer);
        await this.cartService.create({customer_id:user_created.customer_id});

        return await this.signIn(dto);
    }

    async signIn(dto:AuthInDto){

  
        const user = await this.repository.findOneBy({ email:dto.email });
        const [salt,hash] =  user.password.split('.');
        const hashPass = await scrypt(dto.password,salt,32) as Buffer; 
        
        if(hash !== hashPass.toString('hex')){
            return new HttpException('Usuário não autorizado',HttpStatus.UNAUTHORIZED);
        }

        const payload = { username:user.email, sub:user.customer_id  }

        return { accessToken:this.jwtService.sign(payload) }

    }

}
