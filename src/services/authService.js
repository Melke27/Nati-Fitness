import { STORAGE_KEYS } from '../data/seedData';
import { storageService } from './storageService';
import { memberService } from './memberService';
import { trainerService } from './trainerService';

class AuthService {
  login({ email, password, role }) {
    if (role === 'admin') {
      if (email.includes('admin') || email === 'admin@triener.com') {
        return { role: 'admin', user: { name: 'System Administrator', role: 'admin' } };
      }
      throw new Error('Invalid administrator credentials');
    }

    if (role === 'trainer') {
      const trainers = trainerService.getAll();
      const trainer = trainers.find(
        (t) => t.name.toLowerCase().includes(email.split('@')[0]) || t.id === 'trainer-alex'
      );
      if (!trainer) throw new Error('Trainer not found');
      return { role: 'trainer', user: trainer };
    }

    if (role === 'member') {
      const members = memberService.getAll();
      const member = members.find((m) => m.email === email) || members[0];
      if (!member) throw new Error('Member not found');
      return { role: 'member', user: member };
    }

    throw new Error('Invalid role');
  }

  register({ name, email, phone, planId }) {
    const plan = storageService.findById(STORAGE_KEYS.PLANS, planId);
    if (!plan) throw new Error('Invalid plan selected');

    const startDate = new Date().toISOString().split('T')[0];
    const member = memberService.create({
      name,
      email,
      password: 'password',
      phone,
      planId,
      trainerId: '',
      status: 'active',
      startDate,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      barcode: `TRN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      bio: 'New member.',
    });

    storageService.create(STORAGE_KEYS.PAYMENTS, {
      id: `inv-${Math.floor(200 + Math.random() * 1000)}`,
      memberId: member.id,
      amount: plan.price,
      status: 'paid',
      date: startDate,
      method: 'Visa Credit Card',
    });

    return { role: 'member', user: member };
  }
}

export const authService = new AuthService();
