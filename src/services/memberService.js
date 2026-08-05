import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class MemberService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.MEMBERS);
  }

  getById(id) {
    return storageService.findById(STORAGE_KEYS.MEMBERS, id);
  }

  getByTrainer(trainerId) {
    return this.getAll().filter((m) => m.trainerId === trainerId);
  }

  create(data) {
    return storageService.create(STORAGE_KEYS.MEMBERS, {
      id: `member-${Date.now()}`,
      ...data,
    });
  }

  update(id, updates) {
    return storageService.update(STORAGE_KEYS.MEMBERS, id, updates);
  }

  delete(id) {
    storageService.remove(STORAGE_KEYS.MEMBERS, id);
  }

  renewMembership(memberId, planId) {
    const plan = storageService.findById(STORAGE_KEYS.PLANS, planId);
    const member = this.getById(memberId);
    if (!plan || !member) throw new Error('Invalid renewal request');

    const baseDate = member.status === 'active' ? new Date(member.expiryDate) : new Date();
    const extendedDate = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const updated = this.update(memberId, {
      planId,
      status: 'active',
      expiryDate: extendedDate.toISOString().split('T')[0],
    });

    storageService.create(STORAGE_KEYS.PAYMENTS, {
      id: `inv-${Math.floor(100 + Math.random() * 900)}`,
      memberId,
      amount: plan.price,
      status: 'paid',
      date: new Date().toISOString().split('T')[0],
      method: 'Visa ending 4444',
    });

    return updated;
  }
}

export const memberService = new MemberService();
