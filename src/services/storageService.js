import {
  DEFAULT_PLANS,
  DEFAULT_TRAINERS,
  DEFAULT_MEMBERS,
  DEFAULT_WORKOUTS,
  DEFAULT_ATTENDANCE,
  DEFAULT_PAYMENTS,
  DEFAULT_MESSAGES,
  DEFAULT_BLOG,
  STORAGE_KEYS,
} from '../data/seedData';

class StorageService {
  seedDatabase() {
    if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;

    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(DEFAULT_PLANS));
    localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(DEFAULT_TRAINERS));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(DEFAULT_WORKOUTS));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(DEFAULT_PAYMENTS));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(DEFAULT_BLOG));
    localStorage.setItem(STORAGE_KEYS.SEEDED, 'true');
  }

  getAll(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  saveAll(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  findById(key, id) {
    return this.getAll(key).find((item) => item.id === id) || null;
  }

  create(key, item) {
    const items = this.getAll(key);
    items.push(item);
    this.saveAll(key, items);
    return item;
  }

  update(key, id, updates) {
    const items = this.getAll(key);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    this.saveAll(key, items);
    return items[index];
  }

  remove(key, id) {
    const items = this.getAll(key).filter((item) => item.id !== id);
    this.saveAll(key, items);
  }
}

export const storageService = new StorageService();
