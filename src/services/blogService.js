import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';

class BlogService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.BLOG);
  }

  getById(id) {
    return storageService.findById(STORAGE_KEYS.BLOG, id);
  }
}

export const blogService = new BlogService();
