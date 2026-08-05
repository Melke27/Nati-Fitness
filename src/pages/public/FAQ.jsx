import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'How does portal personal training work?',
    a: 'When you join under Elite or VIP plans, you are assigned a coach. They construct a customized workout plan directly in their Trainer Portal. You instantly view it on your mobile/desktop Member Portal. Any updates they make sync automatically!',
  },
  {
    q: 'Can I access the facility 24/7?',
    a: 'Yes, 24/7 keycard access is provided to Elite Performance and VIP Ultimate members. Basic Tier members can access the gym during staffed hours (6:00 AM - 10:00 PM).',
  },
  {
    q: 'How do I cancel or pause my subscription?',
    a: "You can pause or cancel your subscription directly from your Member Portal settings under 'Membership Status' or send a quick email to our admin team. No penalty charges apply!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="container">
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Have questions about plans, access, or trainers? Check out our quick answers below.</p>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={item.q} className={`faq-item${openIndex === i ? ' active' : ''}`}>
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              {item.q} <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
