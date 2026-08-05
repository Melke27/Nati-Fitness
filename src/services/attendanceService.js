import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';
import { memberService } from './memberService';

class AttendanceService {
  getAll() {
    return storageService.getAll(STORAGE_KEYS.ATTENDANCE);
  }

  getByMemberId(memberId) {
    return this.getAll().filter((a) => a.memberId === memberId);
  }

  checkIn(memberId) {
    const member = memberService.getById(memberId);
    if (!member) throw new Error('Member not found');
    if (member.status !== 'active') throw new Error('Access denied: Membership has expired!');

    const now = new Date();
    const checkin = {
      id: `att-${Date.now()}`,
      memberId,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    storageService.create(STORAGE_KEYS.ATTENDANCE, checkin);
    return checkin;
  }

  getTodayCount(dateStr = new Date().toISOString().split('T')[0]) {
    return this.getAll().filter((a) => a.date === dateStr).length;
  }
}

export const attendanceService = new AttendanceService();
