import { memberService, paymentService } from '../../services';
import { useApp } from '../../context/AppContext';
import RenewalModal from '../../components/modals/RenewalModal';

export default function MemberPayments() {
  const { currentUser, openModal, closeModal, setCurrentUser, refresh, refreshKey } = useApp();
  const member = memberService.getById(currentUser.id) || currentUser;
  const payments = paymentService.getByMemberId(member.id);
  void refreshKey;

  const showReceipt = (invoiceId) => {
    const invoice = paymentService.getById(invoiceId);
    const memberData = memberService.getById(invoice.memberId);
    openModal(
      <>
        <div style={{ fontFamily: 'monospace', color: '#000', background: '#fff', padding: 30, borderRadius: 8 }}>
          <div style={{ textAlign: 'center', borderBottom: '2px dashed #000', paddingBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: 2 }}>TRIENER FITNESS receipt</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem' }}>100 ELITE PERFORMANCE WAY, BOSTON, MA</p>
          </div>
          <div style={{ margin: '20px 0', fontSize: '0.9rem' }}>
            {[['INVOICE ID:', `#${invoice.id}`], ['DATE:', invoice.date], ['MEMBER:', memberData.name], ['METHOD:', invoice.method]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '15px 0', marginBottom: 20, fontWeight: 'bold' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>MEMBERSHIP RENEWAL RETAINER</span>
              <span>${invoice.amount}.00</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>TOTAL:</span><span>${invoice.amount}.00</span>
          </div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => window.print()}>Print Receipt</button>
          <button className="btn btn-secondary" onClick={closeModal}>Close</button>
        </div>
      </>
    );
  };

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Billing & Payment History</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            openModal(
              <RenewalModal
                member={member}
                onSuccess={(planId) => {
                  const updated = memberService.renewMembership(member.id, planId);
                  setCurrentUser(updated);
                  refresh();
                  return updated;
                }}
              />
            )
          }
        >
          Renew/Upgrade Plan
        </button>
      </div>
      <div className="glass-card">
        <h3>Invoices</h3>
        <div className="table-container" style={{ marginTop: 16 }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Invoice ID</th><th>Date</th><th>Amount</th><th>Payment Method</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>No payment invoices found.</td></tr>
              ) : (
                payments.slice().reverse().map((p) => (
                  <tr key={p.id}>
                    <td><strong>#{p.id}</strong></td>
                    <td>{p.date}</td>
                    <td>${p.amount}.00</td>
                    <td>{p.method}</td>
                    <td><span className="badge badge-active">{p.status}</span></td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => showReceipt(p.id)}>PDF Receipt</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
