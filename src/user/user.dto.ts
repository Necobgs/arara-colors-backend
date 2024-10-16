export class UserDto{
    id:number;
    name:string;
    email:string;
    password:string;
}

export interface FindAllParams{
    id:number;
    name:string;
    email:string;
}