import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'border-blue-500/40 bg-blue-500/5' },
  { id: 'in_progress', title: 'In Progress', color: 'border-yellow-500/40 bg-yellow-500/5' },
  { id: 'under_review', title: 'Under Review', color: 'border-purple-500/40 bg-purple-500/5' },
  { id: 'done', title: 'Done', color: 'border-green-500/40 bg-green-500/5' }
];

export default function TaskboardPage() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Upload Modul 3 Scratch', status: 'todo', priority: 'high', due_date: '2026-11-02' },
    { id: '2', title: 'Input Student Feedback Kelas A', status: 'in_progress', priority: 'medium', due_date: '2026-10-30' },
    { id: '3', title: 'Review QC Result Periode 2', status: 'done', priority: 'low', due_date: '2026-10-28' },
  ]);

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tutor Taskboard</h2>
          <p className="text-sm text-muted-foreground">Kelola alur kerja dan tugas mengajar harian</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Tambah Tugas</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <div key={col.id} className={`rounded-2xl border ${col.color} p-4 flex flex-col min-h-[500px]`}>
            <h3 className="font-semibold text-sm mb-4 flex justify-between items-center">
              <span>{col.title}</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </h3>
            <div className="space-y-3 flex-1">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="bg-card border p-4 rounded-xl shadow-sm space-y-3">
                  <div className="text-sm font-medium">{task.title}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">{task.priority}</span>
                    <span>{task.due_date}</span>
                  </div>
                  {col.id !== 'done' && (
                    <button 
                      onClick={() => moveTask(task.id, col.id === 'todo' ? 'in_progress' : col.id === 'in_progress' ? 'under_review' : 'done')}
                      className="text-xs text-primary hover:underline pt-2"
                    >
                      Lanjut →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
