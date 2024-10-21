import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes,scrypt as _scrypt } from 'crypto';
import { Customers } from 'src/customers/entities/customers.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { AuthUpDto } from './dto/auth-signUp.dto';
import { AuthInDto } from './dto/auth-signIn.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Customers)
        private readonly repository:Repository<Customers>
    ){}

    async signUp(dto:AuthUpDto){
        
        const user = await this.repository.findOneBy({ email:dto.email })
        if(user) throw new HttpException('Email já está em uso',HttpStatus.BAD_REQUEST)
    
        const salt = randomBytes(8).toString('hex')
        const hash = await scrypt(dto.password,salt,32) as Buffer
        const saltAndHash = `${salt}.${hash.toString('hex')}`

        const customer = this.repository.create({
            name:dto.name,
            email:dto.email,
            password:saltAndHash,
            addres:dto.addres,
            phone:dto.phone
        })


        return this.repository.save(customer);
    }

    async signIn(dto:AuthInDto){

  
        const user = await this.repository.findOneBy({ email:dto.email });
        const [salt,hash] =  user.password.split('.');
        const hashPass = await scrypt(dto.password,salt,32) as Buffer; 
        console.log(hashPass.toString('hex'))
        console.log(hash)
        if(hash == hashPass.toString('hex')){
            console.log('LOGADO FILHO, DALEE')
        }
    }

}
