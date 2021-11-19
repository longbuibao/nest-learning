import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService

  //BAD CODE, DONT DO THIS IN REAL LIFE
  //USE DEPENDENCY INJECTION
  constructor() {
    this.messagesService = new MessagesService()
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll()
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content)
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id)
  }
}
