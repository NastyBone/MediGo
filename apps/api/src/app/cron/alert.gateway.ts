import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import io from 'socket.io-client';
import { socketOptions } from './constants';

@WebSocketGateway(+process.env.GATEWAY_PORT | 8080, socketOptions)
export class AlertGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {
    // const client = io('http://localhost:8080');
    // client.on('connect', () => {
    //   console.log('Connected to WebSocket server');
    // });
    // client.on('alert', (data: any) => {
    //   console.log('Received message:', data);
    // }); //TESTING
  }
  private logger: Logger = new Logger('AlertGateway');

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }
}
