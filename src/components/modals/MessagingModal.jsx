import { useState } from 'react';
import { memberService, trainerService, messageService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function MessagingModal({ trainerId, memberId }) {
  const { currentRole, showToast } = useApp();
  const trainer = trainerService.getById(trainerId);
  const member = memberService.getById(memberId);
  const recipient = currentRole === 'trainer' ? member : trainer;
  const [messages, setMessages] = useState(() => messageService.getConversation(trainerId, memberId));
  const [text, setText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const from = currentRole === 'trainer' ? trainerId : memberId;
    const to = currentRole === 'trainer' ? memberId : trainerId;
    messageService.send({ from, to, content: text.trim() });
    setMessages(messageService.getConversation(trainerId, memberId));
    setText('');
    showToast('Message sent!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
      <h3>Conversation with {recipient?.name}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Portal messaging simulator</p>
      <div style={{ flexGrow: 1, overflowY: 'auto', background: 'var(--bg-input)', padding: 15, borderRadius: 8, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 40 }}>No messages. Send a message to start!</div>
        ) : (
          messages.map((m, i) => {
            const isOutgoing =
              (currentRole === 'trainer' && m.from === trainerId) ||
              (currentRole === 'member' && m.from === memberId);
            return (
              <div key={i} className={`chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}`}>
                <div>{m.content}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6, textAlign: 'right', marginTop: 4 }}>{m.timestamp}</div>
              </div>
            );
          })
        )}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
        <input type="text" className="form-control" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} required />
        <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>Send</button>
      </form>
    </div>
  );
}
