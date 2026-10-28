import React from 'react';
import { 
  LayoutDashboard, Users, MessageSquare, BookOpen, 
  CheckSquare, Trello, ClipboardList, ShieldCheck 
} from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', rbac: 'dashboard' },
  { key: 'taskboard', label: 'Tutor Taskboard', icon: Trello, path: '/tutor/taskboard', rbac: 'dashboard' },
  { key: 'feedback-monitoring', label: 'Feedback Monitoring', icon: ClipboardList, path: '/tl/feedback-monitoring', rbac: 'team_leader' },
  { key: 'qc-management', label: 'QC Management', icon: ShieldCheck, path: '/qc/management', rbac: 'qc_team' },
  { key: 'admin', label: 'User List', icon: Users, path: '/admin/users', rbac: 'admin_crud' },
  { key: 'student-feedback', label: 'Student Feedback', icon: MessageSquare, path: '/student-feedback', rbac: 'student_feedback' },
];

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 border-r border-border p-4 space-y-4">
        <h1 className="text-xl font-bold text-primary">Algonova Hub</h1>
        <nav className="space-y-1">
          {navItems.map(item => (
            <a key={item.key} href={item.path} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium">
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
