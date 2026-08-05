import { attendanceService, memberService, paymentService, reportService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { showToast, refreshKey } = useApp();
  const members = memberService.getAll();
  const payments = paymentService.getAll();
  const activeCount = members.filter((m) => m.status === 'active').length;
  const expiredCount = members.filter((m) => m.status === 'expired').length;
  const totalRev = paymentService.getTotalRevenue();
  const todayAttendance = attendanceService.getTodayCount('2026-08-05');
  void refreshKey;

  const handleExport = () => {
    reportService.downloadCsv(reportService.exportDashboardCsv(), `triener_executive_metrics_${Date.now()}.csv`);
    showToast('Excel/CSV dashboard report downloaded!', 'success');
  };

  return (
    <div className="portal-content-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Executive Administration Dashboard</h2>
        <button className="btn btn-secondary btn-sm" onClick={handleExport}>Export Dashboard Report</button>
      </div>
      <div className="stat-grid">
        <div className="glass-card stat-card">
          <div className="stat-title">Total Registered Members</div>
          <div className="stat-value">{members.length}</div>
          <div className="stat-trend trend-up">▲ 12.8% vs last month</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-title">Active Members</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{activeCount}</div>
          <div className="stat-trend" style={{ color: 'var(--text-muted)' }}>{expiredCount} Expired contracts</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-title">Today&apos;s Gym Visits</div>
          <div className="stat-value">{todayAttendance}</div>
          <div className="stat-trend trend-up">▲ 4 visits logged today</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">${totalRev}</div>
          <div className="stat-trend trend-up">▲ $99.00 this week</div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h3>Monthly Business Revenue Trend</h3>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Total: ${totalRev}.00 USD</span>
        </div>
        <svg className="chart-svg" viewBox="0 0 600 220">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="50" y1="20" x2="550" y2="20" className="chart-grid-line" />
          <line x1="50" y1="70" x2="550" y2="70" className="chart-grid-line" />
          <line x1="50" y1="120" x2="550" y2="120" className="chart-grid-line" />
          <line x1="50" y1="170" x2="550" y2="170" className="chart-grid-line" />
          <path d="M 50,170 Q 150,130 250,150 T 450,60 T 550,40 L 550,170 Z" className="chart-line-area" />
          <path d="M 50,170 Q 150,130 250,150 T 450,60 T 550,40" className="chart-line" />
          <circle cx="50" cy="170" r="5" fill="var(--primary)" />
          <circle cx="200" cy="140" r="5" fill="var(--primary)" />
          <circle cx="350" cy="110" r="5" fill="var(--primary)" />
          <circle cx="500" cy="55" r="5" fill="var(--primary)" />
          <circle cx="550" cy="40" r="5" fill="var(--info)" />
          <text x="50" y="195" className="chart-label">April</text>
          <text x="200" y="195" className="chart-label">May</text>
          <text x="350" y="195" className="chart-label">June</text>
          <text x="500" y="195" className="chart-label">July</text>
          <text x="550" y="195" className="chart-label">August (MTD)</text>
        </svg>
      </div>

      <div className="glass-card">
        <h3>Recent Transactions</h3>
        <div className="table-container" style={{ marginTop: 16 }}>
          <table className="portal-table">
            <thead>
              <tr><th>Ref ID</th><th>Member</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {payments.slice(-3).reverse().map((p) => {
                const memberObj = members.find((m) => m.id === p.memberId) || { name: 'Unknown Member' };
                return (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td><strong>{memberObj.name}</strong></td>
                    <td>{p.date}</td>
                    <td>${p.amount}.00</td>
                    <td>{p.method}</td>
                    <td><span className="badge badge-active">{p.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
