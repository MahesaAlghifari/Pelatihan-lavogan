import { Users, BookOpen, FolderTree, FileText, Award, TrendingUp, Activity } from 'lucide-react';

export function AdminDashboardPage() {
  const stats = [
    { icon: Users, label: 'Total Peserta', value: '1,234', change: '+12%', trend: 'up', bgColor: 'var(--primary-light)', iconColor: 'var(--primary)' },
    { icon: BookOpen, label: 'Total Skema', value: '6', change: '+2', trend: 'up', bgColor: 'var(--success-light)', iconColor: 'var(--success)' },
    { icon: FolderTree, label: 'Total Learning Path', value: '24', change: '+4', trend: 'up', bgColor: '#EDE9FE', iconColor: '#8B5CF6' },
    { icon: FileText, label: 'Total Modul', value: '156', change: '+18', trend: 'up', bgColor: 'var(--warning-light)', iconColor: 'var(--warning)' },
    { icon: Award, label: 'Sertifikat Diterbitkan', value: '487', change: '+23%', trend: 'up', bgColor: '#DBEAFE', iconColor: '#3B82F6' },
    { icon: Activity, label: 'Tingkat Kelulusan', value: '87%', change: '+5%', trend: 'up', bgColor: 'var(--success-light)', iconColor: 'var(--success)' },
  ];

  const recentParticipants = [
    { name: 'John Doe', email: 'john@example.com', scheme: 'Full Stack Web Dev', progress: 75, status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', scheme: 'Data Science', progress: 60, status: 'active' },
    { name: 'Bob Johnson', email: 'bob@example.com', scheme: 'Full Stack Web Dev', progress: 100, status: 'completed' },
    { name: 'Alice Williams', email: 'alice@example.com', scheme: 'Mobile App Dev', progress: 45, status: 'active' },
    { name: 'Charlie Brown', email: 'charlie@example.com', scheme: 'Cloud Computing', progress: 90, status: 'active' },
  ];

  const recentCertificates = [
    { participant: 'Bob Johnson', scheme: 'Full Stack Web Development', date: '2026-06-01', number: 'CERT-001234' },
    { participant: 'Sarah Davis', scheme: 'Data Science & ML', date: '2026-05-30', number: 'CERT-001233' },
    { participant: 'Mike Wilson', scheme: 'Mobile App Development', date: '2026-05-28', number: 'CERT-001232' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor platform performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                  <Icon className="w-6 h-6" style={{ color: stat.iconColor }} />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--success)' }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              <p className="font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Participants */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Aktivitas Peserta Terbaru</h3>
          <div className="space-y-3">
            {recentParticipants.map((participant, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
                  <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>{participant.name}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{participant.scheme}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{participant.progress}%</p>
                  <div className="w-16 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${participant.progress}%`, backgroundColor: 'var(--primary)' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Certificates */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Sertifikat Terbaru</h3>
          <div className="space-y-3">
            {recentCertificates.map((cert, index) => (
              <div key={index} className="p-4 rounded-xl border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{cert.participant}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cert.scheme}</p>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                    Issued
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  <span>{cert.date}</span>
                  <span>{cert.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Progress Keseluruhan per Skema</h3>
        <div className="space-y-4">
          {[
            { name: 'Full Stack Web Development', participants: 450, avgProgress: 67, completed: 120 },
            { name: 'Data Science & Machine Learning', participants: 320, avgProgress: 54, completed: 89 },
            { name: 'Mobile App Development', participants: 280, avgProgress: 71, completed: 95 },
            { name: 'Cloud Computing & DevOps', participants: 184, avgProgress: 62, completed: 58 },
          ].map((scheme, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{scheme.name}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {scheme.participants} peserta • {scheme.completed} selesai
                  </p>
                </div>
                <span className="font-semibold" style={{ color: 'var(--primary)' }}>{scheme.avgProgress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${scheme.avgProgress}%`, backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}