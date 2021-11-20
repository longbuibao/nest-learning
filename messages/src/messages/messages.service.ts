import { Injectable } from '@nestjs/common'
import { MessagesReprository } from './messages.repository'

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesReprository) {}

  async findOne(id: string) {
    return this.messagesRepo.findOne(id)
  }

  async findAll() {
    return this.messagesRepo.findAll()
  }

  async create(content: string) {
    return this.messagesRepo.create(content)
  }
}
