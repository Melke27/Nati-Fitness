import { memberService } from './memberService';
import { paymentService } from './paymentService';

class ReportService {
  exportDashboardCsv() {
    const members = memberService.getAll();
    const active = members.filter((m) => m.status === 'active').length;
    const expired = members.filter((m) => m.status === 'expired').length;
    const totalRev = paymentService.getTotalRevenue();

    return `Triener Gym Business Metrics Report
Generated: ${new Date().toLocaleString()}

Metric,Value
Total Members,${members.length}
Active Subscriptions,${active}
Expired Subscriptions,${expired}
Total Gross Revenue,$${totalRev}.00 USD
`;
  }

  downloadCsv(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const reportService = new ReportService();
