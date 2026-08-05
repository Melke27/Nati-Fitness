import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class PaymentService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.PAYMENTS);
  }

  getByMemberId(memberId) {
    return this.getAll().filter((p) => p.memberId === memberId);
  }

  getById(id) {
    return storageService.findById(STORAGE_KEYS.PAYMENTS, id);
  }

  getTotalRevenue() {
    return this.getAll().reduce((acc, p) => acc + p.amount, 0);
  }
}

export const paymentService = new PaymentService();
