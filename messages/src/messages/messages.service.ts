import { MessagesReprository } from './messages.repository'

export class MessagesService {
  messagesRepo: MessagesReprository

  constructor() {
    this.messagesRepo = new MessagesReprository()
  }

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
