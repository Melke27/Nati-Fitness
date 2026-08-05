import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class MessageService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.MESSAGES);
  }

  getConversation(trainerId, memberId) {
    return this.getAll().filter(
      (m) =>
        (m.from === trainerId && m.to === memberId) ||
        (m.from === memberId && m.to === trainerId)
    );
  }

  send({ from, to, content }) {
    const now = new Date();
    const message = {
      from,
      to,
      timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      content,
    };

    const messages = this.getAll();
    messages.push(message);
    storageService.saveAll(STORAGE_KEYS.MESSAGES, messages);
    return message;
  }
}

export const messageService = new MessageService();
