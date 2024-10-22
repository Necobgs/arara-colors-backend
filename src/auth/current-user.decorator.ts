import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { request } from "http";


export const CurrentUser = createParamDecorator((data:unknown,ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});