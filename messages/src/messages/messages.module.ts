import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'
import { MessagesReprository } from './messages.repository'

@Module({
  controllers: [MessagesController],
  // aka things that can be used as dependencies for other classes
  providers: [MessagesService, MessagesReprository],
})
export class MessagesModule {}
