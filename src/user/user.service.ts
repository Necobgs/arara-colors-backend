import { Injectable } from '@nestjs/common';
import { FindAllParams, UserDto } from './user.dto';

@Injectable()
export class UserService {

    create(user:UserDto){
        return 'Criado com sucesso!';
    }

    read(id:number){
        return 'Lido com sucesso!'
    }

    readAll(params:FindAllParams):UserDto[]{
        let bd_temp = []

        return bd_temp.filter(t => {
            let match = true;

            if(params.id != null && t.id != params.id){
                match = false;
            };

            if(params.email != null && !t.email.includes(params.email)){
                match = false;
            };

            if(params.name != null && !t.name.includes(params.name)){
                match = false;
            };

            return match;
        })
    }

    update(){
        return 'Atualizado com sucesos!'
    }

    delete(){
        return 'Deletado com sucesso!'
    }

}
