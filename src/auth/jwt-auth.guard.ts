import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
 * Este Guard utiliza a estratégia JWT cadastrada
 * no Passport para validar o token enviado.
 *
 * Se o token for válido:
 *    -> a requisição continua.
 *
 * Se o token for inválido ou inexistente:
 *    -> retorna erro 401 Unauthorized.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}