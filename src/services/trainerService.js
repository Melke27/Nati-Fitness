import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class TrainerService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.TRAINERS);
  }

  getById(id) {
    return storageService.findById(STORAGE_KEYS.TRAINERS, id);
  }

  create(data) {
    return storageService.create(STORAGE_KEYS.TRAINERS, {
      id: `trainer-${Date.now()}`,
      ...data,
    });
  }

  update(id, updates) {
    return storageService.update(STORAGE_KEYS.TRAINERS, id, updates);
  }

  delete(id) {
    storageService.remove(STORAGE_KEYS.TRAINERS, id);
  }
}

export const trainerService = new TrainerService();
