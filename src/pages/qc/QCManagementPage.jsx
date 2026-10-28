import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

export default function QCManagementPage() {
  const [qcRecords, setQcRecords] = useState([
    { id: '1', tutor: 'Putri Nadia', period: 'Periode 2 (Okt 2026)', score: 92, grade: 'A', status: 'Acknowledged', note: 'Sangat baik dalam penguasaan modul.' },
    { id: '2', tutor: 'Tutor B', period: 'Periode 2 (Okt 2026)', score: 78, grade: 'B', status: 'Pending Review', note: 'Perlu peningkatan pada punctuality kelas.' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">QC & Evaluation Management</h2>
          <p className="text-sm text-muted-foreground">Monitoring evaluasi performa dan respon sanggahan tutor</p>
        </div>
        <Button className="gap-2"><ShieldCheck className="w-4 h-4" /> Input QC Baru</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qcRecords.map((qc) => (
          <div key={qc.id} className="bg-card border rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{qc.tutor}</h3>
                <p className="text-xs text-muted-foreground">{qc.period}</p>
              </div>
              <span className="text-2xl font-black text-primary">{qc.score} <span className="text-xs font-normal">({qc.grade})</span></span>
            </div>

            <p className="text-sm bg-muted p-3 rounded-xl">{qc.note}</p>

            <div className="flex justify-between items-center text-xs pt-2 border-t">
              <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-3.5 h-3.5" /> {qc.status}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                <MessageSquare className="w-3 h-3" /> Respon Tutor
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
