import React, { useState, useEffect } from 'react';

// Initial Data
const initialTasks = [
  {
    id: 1,
    title: "Menyelesaikan laporan bulanan",
    description: "Membuat laporan kinerja untuk bulan ini",
    category: "work",
    priority: "high",
    status: "in-progress",
    deadline: "2025-01-15",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Belajar React.js",
    description: "Mempelajari konsep dasar React dan hooks",
    category: "study",
    priority: "medium",
    status: "pending",
    deadline: "2025-01-20",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Olahraga pagi",
    description: "Jogging selama 30 menit",
    category: "personal",
    priority: "low",
    status: "completed",
    deadline: "2025-01-10",
    createdAt: new Date()
  }
];

const initialNotes = [
  {
    id: 1,
    title: "Ide Proyek Baru",
    content: "Membuat aplikasi manajemen keuangan pribadi dengan fitur tracking pengeluaran otomatis",
    tags: ["proyek", "ide", "keuangan"],
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Diskusi tentang roadmap produk Q1 2024. Fokus pada peningkatan UX dan performance",
    tags: ["meeting", "roadmap", "produk"],
    createdAt: new Date()
  }
];

// Sidebar Component
const Sidebar = ({ currentSection, onSectionChange, isMobileOpen, onMobileClose }) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'tasks', icon: '✅', label: 'Tugas' },
    { id: 'calendar', icon: '📅', label: 'Kalender' },
    { id: 'notes', icon: '📝', label: 'Catatan' },
    { id: 'analytics', icon: '📈', label: 'Analitik' }
  ];

  return (
    <div className={`w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 ${isMobileOpen ? '' : 'hidden lg:flex'}`}>
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📋</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">TaskFlow</h1>
            <p className="text-gray-400 text-sm">Dashboard Pribadi</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              onSectionChange(item.id);
              onMobileClose();
            }}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              currentSection === item.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">U</span>
          </div>
          <div className="flex-1">
            <p className="font-medium">User</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title, onSidebarToggle, onResetData }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('id-ID', options));
  }, []);

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onSidebarToggle} className="lg:hidden p-2 rounded-lg hover:bg-gray-700">
            <span>☰</span>
          </button>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-400 text-sm">{currentDate}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Cari..." 
              className="bg-gray-700 text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-700 relative">
            <span>🔔</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* ✅ TAMBAHKAN INI - Tombol Settings dengan Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowResetConfirm(!showResetConfirm)}
              className="p-2 rounded-lg hover:bg-gray-700"
            >
              <span>⚙️</span>
            </button>
            
            {showResetConfirm && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg p-2 z-50">
                <button
                  onClick={() => {
                    onResetData();
                    setShowResetConfirm(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-600 rounded flex items-center space-x-2 text-red-400 hover:text-white transition-colors"
                >
                  <span>🔄</span>
                  <span>Reset Data</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

// Weekly Progress Component
const WeeklyProgress = () => {
  const days = [
    { name: 'Senin', progress: 80 },
    { name: 'Selasa', progress: 65 },
    { name: 'Rabu', progress: 90 },
    { name: 'Kamis', progress: 75 },
    { name: 'Jumat', progress: 100 }
  ];

  return (
    <div className="space-y-4">
      {days.map(day => (
        <div key={day.name} className="flex items-center justify-between">
          <span className="text-sm text-gray-400 w-16">{day.name}</span>
          <div className="flex-1 mx-4 bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${day.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${day.progress}%` }}
            ></div>
          </div>
          <span className="text-sm w-12 text-right">{day.progress}%</span>
        </div>
      ))}
    </div>
  );
};

// Recent Task Item Component
const RecentTaskItem = ({ task }) => {
  const statusColors = {
    pending: 'bg-yellow-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500'
  };

  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${statusColors[task.status]}`}></div>
        <div>
          <p className="font-medium">{task.title}</p>
          <p className="text-sm text-gray-400">{task.category} • {task.deadline}</p>
        </div>
      </div>
      <span className={`text-xs ${priorityColors[task.priority]} font-semibold uppercase`}>
        {task.priority}
      </span>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ tasks, onShowAddTask, onShowAddNote }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tugas" value={stats.total} icon="📋" color="blue" />
        <StatCard title="Selesai" value={stats.completed} icon="✅" color="green" />
        <StatCard title="Dalam Progress" value={stats.inProgress} icon="⏳" color="yellow" />
        <StatCard title="Terlambat" value={stats.overdue} icon="⚠️" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Progress Mingguan</h3>
          <WeeklyProgress />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <button 
              onClick={onShowAddTask}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Tambah Tugas</span>
            </button>
            <button 
              onClick={onShowAddNote}
              className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>📝</span>
              <span>Buat Catatan</span>
            </button>
            <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2">
              <span>📊</span>
              <span>Lihat Laporan</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tugas Terbaru</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Lihat Semua</button>
        </div>
        <div className="space-y-3">
          {recentTasks.map(task => (
            <RecentTaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-700 hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);

// Task Item Component
const TaskItem = ({ task, onToggleStatus, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500'
  };

  const priorityColors = {
    low: 'border-green-400',
    medium: 'border-yellow-400',
    high: 'border-red-400'
  };

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'Progress',
    completed: 'Selesai'
  };

  return (
    <div className={`bg-gray-800 p-4 rounded-lg border-l-4 ${priorityColors[task.priority]} hover:transform hover:-translate-y-1 transition-all fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2 flex-wrap">
            <h4 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h4>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]} text-white`}>
              {statusLabels[task.status]}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-2">{task.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 flex-wrap">
            <span>📅 {task.deadline}</span>
            <span>🏷️ {task.category}</span>
            <span>⚡ {task.priority}</span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button 
            onClick={() => onToggleStatus(task.id)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            {task.status === 'completed' ? '↩️' : '✅'}
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-gray-700 rounded text-red-400"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

// Tasks Page Component
const TasksPage = ({ tasks, onShowAddTask, onToggleStatus, onDeleteTask }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manajemen Tugas</h2>
        <button 
          onClick={onShowAddTask}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          ➕ Tambah Tugas
        </button>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Semua</FilterButton>
        <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>Pending</FilterButton>
        <FilterButton active={filter === 'in-progress'} onClick={() => setFilter('in-progress')}>Progress</FilterButton>
        <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Selesai</FilterButton>
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggleStatus={onToggleStatus}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 p-6 rounded-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// Add Task Form
const AddTaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
    priority: 'medium',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: 'work',
      priority: 'medium',
      deadline: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Judul Tugas</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <textarea 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <select 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="work">Pekerjaan</option>
            <option value="personal">Pribadi</option>
            <option value="study">Belajar</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prioritas</label>
          <select 
            value={formData.priority}
            onChange={e => setFormData({...formData, priority: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Deadline</label>
          <input 
            type="date" 
            value={formData.deadline}
            onChange={e => setFormData({...formData, deadline: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex space-x-3 mt-6">
        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors">
          Simpan
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg transition-colors">
          Batal
        </button>
      </div>
    </form>
  );
};

// Note Card Component
const NoteCard = ({ note, onDelete }) => (
  <div className="bg-gray-800 p-4 rounded-lg hover:transform hover:-translate-y-1 transition-all fade-in">
    <h4 className="font-semibold mb-2">{note.title}</h4>
    <p className="text-gray-400 text-sm mb-3 line-clamp-3">{note.content}</p>
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-1">
        {note.tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-blue-600 text-xs rounded">{tag}</span>
        ))}
      </div>
      <button 
        onClick={() => onDelete(note.id)}
        className="text-red-400 hover:text-red-300"
      >
        🗑️
      </button>
    </div>
  </div>
);

// Notes Page Component
const NotesPage = ({ notes, onShowAddNote, onDeleteNote }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Catatan</h2>
        <button 
          onClick={onShowAddNote}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
        >
          ➕ Tambah Catatan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
        ))}
      </div>
    </div>
  );
};

// Add Note Form
const AddNoteForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    });
    setFormData({ title: '', content: '', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Judul Catatan</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Isi Catatan</label>
          <textarea 
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tag</label>
          <input 
            type="text" 
            value={formData.tags}
            onChange={e => setFormData({...formData, tags: e.target.value})}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
            placeholder="Pisahkan dengan koma"
          />
        </div>
      </div>
      <div className="flex space-x-3 mt-6">
        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg transition-colors">
          Simpan
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg transition-colors">
          Batal
        </button>
      </div>
    </form>
  );
};

// Calendar & Analytics placeholders
// Ganti komponen CalendarPage yang lama dengan kode ini:

const CalendarPage = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Navigasi bulan
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate kalender days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Hari pertama bulan ini
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Mulai dari minggu pertama (termasuk hari dari bulan sebelumnya)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const totalDays = 42; // 6 minggu × 7 hari

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  // Cek apakah tanggal sama
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Get tasks untuk tanggal tertentu
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.deadline === dateString);
  };

  // Handle klik tanggal
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTasks(getTasksForDate(date));
  };

  const calendarDays = getCalendarDays();
  const today = new Date();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kalender Grid */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-xl">
            {/* Header Kalender */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ◀
              </button>

              <div className="text-center">
                <h3 className="text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={goToToday}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-1"
                >
                  Hari Ini
                </button>
              </div>

              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ▶
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div
                  key={day}
                  className="text-center text-gray-400 font-semibold text-sm py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, index) => {
                const isToday = isSameDay(date, today);
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const dayTasks = getTasksForDate(date);
                const hasTasks = dayTasks.length > 0;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`
                      relative p-2 min-h-[60px] rounded-lg text-sm transition-all
                      ${isToday ? 'bg-blue-600 text-white font-bold' : ''}
                      ${isSelected ? 'ring-2 ring-blue-400' : ''}
                      ${!isCurrentMonth ? 'text-gray-600' : 'text-white'}
                      ${!isToday && !isSelected ? 'hover:bg-gray-700' : ''}
                      ${hasTasks ? 'border-l-2 border-green-400' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span>{date.getDate()}</span>
                      
                      {/* Task Indicators */}
                      {hasTasks && (
                        <div className="flex gap-1 mt-1">
                          {dayTasks.slice(0, 3).map((task, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                task.status === 'completed' ? 'bg-green-400' :
                                task.status === 'in-progress' ? 'bg-blue-400' :
                                'bg-yellow-400'
                              }`}
                            />
                          ))}
                          {dayTasks.length > 3 && (
                            <span className="text-xs text-gray-400">+{dayTasks.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-gray-400">Hari Ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-400">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400">Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-400">Selesai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Sidebar */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate 
              ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
              : 'Pilih Tanggal'
            }
          </h3>

          {selectedDate ? (
            selectedTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      task.priority === 'high' ? 'border-red-400' :
                      task.priority === 'medium' ? 'border-yellow-400' :
                      'border-green-400'
                    } bg-gray-700`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          task.status === 'completed' ? 'line-through text-gray-400' : ''
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {task.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            task.status === 'completed' ? 'bg-green-500' :
                            task.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}>
                            {task.status === 'completed' ? 'Selesai' :
                             task.status === 'in-progress' ? 'Progress' :
                             'Pending'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <span className="text-4xl mb-2 block">📅</span>
                <p>Tidak ada tugas di tanggal ini</p>
              </div>
            )
          ) : (
            <div className="text-center text-gray-400 py-8">
              <span className="text-4xl mb-2 block">👆</span>
              <p>Klik tanggal untuk melihat tugas</p>
            </div>
          )}

          {/* Quick Stats */}
          {selectedDate && selectedTasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-3">Ringkasan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Tugas</span>
                  <span className="font-semibold">{selectedTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selesai</span>
                  <span className="text-green-400 font-semibold">
                    {selectedTasks.filter(t => t.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending</span>
                  <span className="text-yellow-400 font-semibold">
                    {selectedTasks.filter(t => t.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Analitik Produktivitas</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Produktivitas Harian</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Hari ini</span>
            <span className="text-green-400 font-semibold">85%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Kemarin</span>
            <span className="text-blue-400 font-semibold">72%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Rata-rata minggu ini</span>
            <span className="text-yellow-400 font-semibold">78%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Kategori Tugas</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Pekerjaan</span>
            <span className="text-blue-400 font-semibold">45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pribadi</span>
            <span className="text-green-400 font-semibold">30%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Belajar</span>
            <span className="text-purple-400 font-semibold">25%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
export default function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // ✅ TASKS dengan Local Storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return initialTasks;
  });
  
  // ✅ NOTES dengan Local Storage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('taskflow-notes');
    if (savedNotes) {
      return JSON.parse(savedNotes);
    }
    return initialNotes;
  });
  
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  const sectionTitles = {
    dashboard: 'Dashboard',
    tasks: 'Manajemen Tugas',
    calendar: 'Kalender',
    notes: 'Catatan',
    analytics: 'Analitik'
  };

  // ✅ TAMBAHKAN INI - Auto-save tasks ke Local Storage
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    console.log('💾 Tasks saved to Local Storage:', tasks.length, 'tasks');
  }, [tasks]); // Jalan setiap kali tasks berubah

  // ✅ TAMBAHKAN INI - Auto-save notes ke Local Storage
  useEffect(() => {
    localStorage.setItem('taskflow-notes', JSON.stringify(notes));
    console.log('💾 Notes saved to Local Storage:', notes.length, 'notes');
  }, [notes]); // Jalan setiap kali notes berubah


  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      createdAt: new Date()
    };
    setTasks([newTask, ...tasks]);
    setShowAddTaskModal(false);
  };

  const handleToggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        let newStatus = task.status;
        if (task.status === 'completed') {
          newStatus = 'pending';
        } else if (task.status === 'pending') {
          newStatus = 'in-progress';
        } else {
          newStatus = 'completed';
        }
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleAddNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      createdAt: new Date()
    };
    setNotes([newNote, ...notes]);
    setShowAddNoteModal(false);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  // ✅ TAMBAHKAN INI - Fungsi Reset Data
  const handleResetData = () => {
    if (window.confirm('⚠️ Ini akan menghapus SEMUA data dan kembali ke data awal. Yakin?')) {
      localStorage.removeItem('taskflow-tasks');
      localStorage.removeItem('taskflow-notes');
      setTasks(initialTasks);
      setNotes(initialNotes);
      alert('✅ Data berhasil di-reset!');
    }
  };

  const renderSection = () => {
  switch (currentSection) {
    case 'dashboard':
      return (
        <Dashboard 
          tasks={tasks}
          onShowAddTask={() => setShowAddTaskModal(true)}
          onShowAddNote={() => setShowAddNoteModal(true)}
        />
      );
    case 'tasks':
      return (
        <TasksPage 
          tasks={tasks}
          onShowAddTask={() => setShowAddTaskModal(true)}
          onToggleStatus={handleToggleTaskStatus}
          onDeleteTask={handleDeleteTask}
        />
      );
    case 'notes':
      return (
        <NotesPage 
          notes={notes}
          onShowAddNote={() => setShowAddNoteModal(true)}
          onDeleteNote={handleDeleteNote}
        />
      );
    case 'calendar':
      return <CalendarPage tasks={tasks} />; // ← TAMBAH tasks
    case 'analytics':
      return <AnalyticsPage />;
    default:
      return <Dashboard tasks={tasks} />;
  }
};
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={sectionTitles[currentSection]}
          onSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onResetData={handleResetData}
        /> {/* ← TAMBAH onResetData */}
        
        <main className="flex-1 overflow-auto">
          {renderSection()}
        </main>
      </div>

      <Modal 
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        title="Tambah Tugas Baru"
      >
        <AddTaskForm 
          onSubmit={handleAddTask}
          onCancel={() => setShowAddTaskModal(false)}
        />
      </Modal>

      <Modal 
        isOpen={showAddNoteModal}
        onClose={() => setShowAddNoteModal(false)}
        title="Tambah Catatan Baru"
      >
        <AddNoteForm 
          onSubmit={handleAddNote}
          onCancel={() => setShowAddNoteModal(false)}
        />
      </Modal>
    </div>
  );
}

