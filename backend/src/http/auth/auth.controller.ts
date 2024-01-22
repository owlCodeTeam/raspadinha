import { RegisterRpositoryTypeOrm } from '@modules/Auth/infra/Register/repository/registerRepositoryTypeOrm.orm';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterUserRequestDto } from './authRegister.request.dto';
import { saveUserUsecase } from '@modules/Auth/core/Register/usecase/saveUserUsecase.usecase';
import { RegisterEmailQueue } from '@modules/Auth/infra/Register/queue/registerEmailQueue.rabbitmq';
import { RegisterGatewayLocal } from '@modules/Auth/infra/Register/gateway/registerGatewayLocal.local';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    readonly repo: RegisterRpositoryTypeOrm,
    readonly emailGateway: RegisterEmailQueue,
    readonly gateway: RegisterGatewayLocal,
  ) {}
  @Post('save/user')
  async saveUser(@Body() body: AuthRegisterUserRequestDto, @Res() response) {
    const action = new saveUserUsecase(this.repo, this.gateway, this.emailGateway);
    const user = await action.execute(body);

    response.status(HttpStatus.OK).send({
      message: 'Usuario cadastrado com sucesso, uma mnesagem foi enviada ao seu email.',
      user: user.props,
    });
  }
}
