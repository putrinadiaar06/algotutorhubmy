import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function FeedbackMonitoringPage() {
  const [assignments, setAssignments] = useState([
    { id: '1', tutor: 'Putri Nadia', class_code: 'ALGO-A1', course: 'Scratch', due_date: '2026-10-30', status: 'submitted', submitted_at: '2026-10-29 14:00' },
    { id: '2', tutor: 'Tutor B', class_code: 'ALGO-B2', course: 'Python', due_date: '2026-10-28', status: 'late', submitted_at: '2026-10-29 09:00' },
    { id: '3', tutor: 'Tutor C', class_code: 'ALGO-C3', course: 'Web Dev', due_date: '2026-10-25', status: 'pending', submitted_at: '-' },
  ]);

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Nama Tutor,Kode Kelas,Course,Due Date,Status,Tanggal Submit"]
        .concat(assignments.map(a => `${a.tutor},${a.class_code},${a.course},${a.due_date},${a.status},${a.submitted_at}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Laporan_Feedback_Mingguan.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feedback Submissions & Monitoring</h2>
          <p className="text-sm text-muted-foreground">Pantau dan kelola penugasan monthly feedback tutor</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportReport} variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Laporan (.csv)
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Assign Tutor Baru
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted border-b">
            <tr>
              <th className="p-4 font-semibold">Tutor</th>
              <th className="p-4 font-semibold">Kode Kelas</th>
              <th className="p-4 font-semibold">Course</th>
              <th className="p-4 font-semibold">Tenggat Waktu</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Waktu Submit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {assignments.map((item) => (
              <tr key={item.id} className="hover:bg-accent/50">
                <td className="p-4 font-medium">{item.tutor}</td>
                <td className="p-4">{item.class_code}</td>
                <td className="p-4">{item.course}</td>
                <td className="p-4">{item.due_date}</td>
                <td className="p-4">
                  {item.status === 'submitted' && <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 font-semibold flex items-center gap-1 w-fit"><CheckCircle2 className="w-3.5 h-3.5"/> Submitted</span>}
                  {item.status === 'late' && <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-semibold flex items-center gap-1 w-fit"><Clock className="w-3.5 h-3.5"/> Telat</span>}
                  {item.status === 'pending' && <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 font-semibold flex items-center gap-1 w-fit"><AlertCircle className="w-3.5 h-3.5"/> Overdue / Belum</span>}
                </td>
                <td className="p-4 text-muted-foreground">{item.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
