import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class PlanService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.PLANS);
  }

  getById(id) {
    return storageService.findById(STORAGE_KEYS.PLANS, id);
  }

  create(data) {
    return storageService.create(STORAGE_KEYS.PLANS, {
      id: `plan-${Date.now()}`,
      duration: 'month',
      disabled: [],
      ...data,
    });
  }

  update(id, updates) {
    return storageService.update(STORAGE_KEYS.PLANS, id, updates);
  }
}

export const planService = new PlanService();
