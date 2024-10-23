import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuardOptional extends AuthGuard('jwt'){
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser | null {
        return user || null
    }
}