import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UserEntity } from './user.entity';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // how to use configService in gateway😠
    credentials: true,
  },
})
export class UserGateway {
  @WebSocketServer()
  server: Server;

  notifyUserUpdated(user: UserEntity) {
    this.server.emit('userUpdated', {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  }
}
