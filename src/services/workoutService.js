import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class WorkoutService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.WORKOUTS);
  }

  getByMemberId(memberId) {
    return this.getAll().find((w) => w.memberId === memberId) || null;
  }

  save(memberId, days) {
    const workouts = this.getAll();
    const index = workouts.findIndex((w) => w.memberId === memberId);

    if (index !== -1) {
      workouts[index].days = days;
    } else {
      workouts.push({ memberId, days });
    }

    storageService.saveAll(STORAGE_KEYS.WORKOUTS, workouts);
    return workouts.find((w) => w.memberId === memberId);
  }
}

export const workoutService = new WorkoutService();
