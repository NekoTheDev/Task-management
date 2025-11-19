import React, { useState, useMemo } from 'react';
import { Check, X, Plus, LayoutGrid, List, BarChart3, Calendar, Tag, User, Clock, AlertCircle, TrendingUp, Users, Filter, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data
const users = [
  { id: 1, name: 'Sarah Chen', avatar: '👩‍💻', color: '#3b82f6' },
  { id: 2, name: 'Mike Johnson', avatar: '👨‍💼', color: '#10b981' },
  { id: 3, name: 'Emily Davis', avatar: '👩‍🎨', color: '#f59e0b' },
  { id: 4, name: 'Alex Kumar', avatar: '👨‍🔬', color: '#8b5cf6' },
  { id: 5, name: 'Jordan Lee', avatar: '👩‍🚀', color: '#ec4899' }
];

const tags = [
  { id: 1, name: 'frontend', color: '#3b82f6' },
  { id: 2, name: 'backend', color: '#10b981' },
  { id: 3, name: 'bug', color: '#ef4444' },
  { id: 4, name: 'feature', color: '#8b5cf6' },
  { id: 5, name: 'design', color: '#f59e0b' },
  { id: 6, name: 'testing', color: '#06b6d4' },
  { id: 7, name: 'documentation', color: '#6366f1' }
];

const statuses = ['Todo', 'In Progress', 'In Review', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

const generateTasks = () => {
  const taskTitles = [
    'Implement user authentication system', 'Fix responsive navbar issues', 'Design landing page mockup',
    'Optimize database queries', 'Add dark mode toggle', 'Create API documentation',
    'Refactor payment integration', 'Update dependencies to latest versions', 'Write unit tests for auth module',
    'Implement real-time notifications', 'Fix memory leak in dashboard', 'Design new logo and branding',
    'Migrate to TypeScript', 'Add search functionality', 'Optimize image loading',
    'Implement caching strategy', 'Create admin dashboard', 'Fix CORS issues',
    'Add email verification', 'Implement OAuth providers', 'Design mobile app UI',
    'Set up CI/CD pipeline', 'Add rate limiting', 'Create user onboarding flow',
    'Implement data export feature', 'Fix chart rendering bug', 'Add keyboard shortcuts',
    'Optimize bundle size', 'Create style guide', 'Implement WebSocket connection',
    'Add multi-language support', 'Fix date picker issues', 'Design error pages',
    'Implement file upload', 'Add progress indicators', 'Create API rate limiter',
    'Fix mobile navigation', 'Add data validation', 'Implement session management',
    'Design notification system', 'Add user roles and permissions', 'Create backup system',
    'Fix SSL certificate issues', 'Implement logging system', 'Add analytics tracking',
    'Design dashboard widgets', 'Implement drag and drop', 'Add bulk actions',
    'Fix timezone handling', 'Create email templates', 'Implement search filters',
    'Add export to PDF', 'Design settings page', 'Implement auto-save',
    'Fix cross-browser issues', 'Add infinite scroll', 'Create loading states',
    'Implement password reset', 'Add social sharing', 'Design profile page',
    'Fix API rate limits', 'Implement two-factor auth', 'Add custom themes',
    'Create admin tools', 'Fix performance issues', 'Add user preferences',
    'Design mobile layouts', 'Implement chat feature', 'Add notification preferences',
    'Fix memory optimization', 'Create migration scripts', 'Add API versioning',
    'Design onboarding screens', 'Implement lazy loading', 'Add error boundaries',
    'Fix responsive tables', 'Create component library', 'Add accessibility features',
    'Design icon system', 'Implement state management', 'Add form validation',
    'Fix SEO optimization', 'Create deployment scripts', 'Add performance monitoring',
    'Design color system', 'Implement code splitting', 'Add user feedback system',
    'Fix database indexing', 'Create testing framework', 'Add feature flags',
    'Design typography system', 'Implement error handling', 'Add monitoring alerts',
    'Fix caching strategy', 'Create documentation site', 'Add integration tests',
    'Design spacing system', 'Implement security headers', 'Add backup automation',
    'Fix API documentation', 'Create style tokens', 'Add load testing',
    'Design component variants', 'Implement rate limiting', 'Add health checks'
  ];

  const descriptions = [
    'This task requires careful planning and execution to ensure quality delivery.',
    'Priority task that needs immediate attention from the team.',
    'Collaborative effort requiring input from multiple team members.',
    'Technical debt that needs to be addressed in this sprint.'
  ];

  return taskTitles.map((title, i) => {
    const daysOffset = Math.floor(Math.random() * 60) - 30;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysOffset);
    
    const createdDaysAgo = Math.floor(Math.random() * 14);
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - createdDaysAgo);

    return {
      id: i + 1,
      title,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: users[Math.floor(Math.random() * users.length)],
      tags: tags.slice(0, Math.floor(Math.random() * 3) + 1).sort(() => Math.random() - 0.5),
      dueDate: dueDate.toISOString(),
      createdAt: createdDate.toISOString()
    };
  });
};

const initialTasks = generateTasks();

// Main App Component
export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('board');
  const [page, setPage] = useState('board');
  const [selectedTask, setSelectedTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [filters, setFilters] = useState({ authors: [], tags: [], priorities: [] });
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filters.authors.length > 0 && !filters.authors.includes(task.assignee.id)) return false;
      if (filters.tags.length > 0 && !task.tags.some(tag => filters.tags.includes(tag.id))) return false;
      if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) return false;
      return true;
    });
  }, [tasks, filters]);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      setTasks(tasks.map(t => 
        t.id === draggedTask.id ? { ...t, status } : t
      ));
      setDraggedTask(null);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(null);
  };

  const handleCreateTask = (status) => {
    const newTask = {
      id: tasks.length + 1,
      title: 'New Task',
      description: '',
      status,
      priority: 'Medium',
      assignee: users[0],
      tags: [],
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <nav className="flex gap-2">
              <button
                onClick={() => setPage('board')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === 'board' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <LayoutGrid className="inline w-4 h-4 mr-2" />
                Board
              </button>
              <button
                onClick={() => setPage('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <BarChart3 className="inline w-4 h-4 mr-2" />
                Dashboard
              </button>
            </nav>
          </div>
          {page === 'board' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Filters
              </button>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setView('board')}
                  className={`px-3 py-1.5 rounded ${view === 'board' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-1.5 rounded ${view === 'list' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {showFilters && page === 'board' && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Authors</h3>
                <div className="space-y-1">
                  {users.map(user => (
                    <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.authors.includes(user.id)}
                        onChange={() => toggleFilter('authors', user.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{user.avatar} {user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Tags</h3>
                <div className="space-y-1">
                  {tags.map(tag => (
                    <label key={tag.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag.id)}
                        onChange={() => toggleFilter('tags', tag.id)}
                        className="rounded"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: tag.color}}></span>
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Priority</h3>
                <div className="space-y-1">
                  {priorities.map(priority => (
                    <label key={priority} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priorities.includes(priority)}
                        onChange={() => toggleFilter('priorities', priority)}
                        className="rounded"
                      />
                      <span className="text-sm">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="p-6">
        {page === 'board' ? (
          view === 'board' ? (
            <KanbanBoard
              tasks={filteredTasks}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onTaskClick={setSelectedTask}
              onCreateTask={handleCreateTask}
            />
          ) : (
            <ListView tasks={filteredTasks} onTaskClick={setSelectedTask} />
          )
        ) : (
          <Dashboard tasks={tasks} users={users} tags={tags} />
        )}
      </main>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          users={users}
          tags={tags}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskUpdate}
        />
      )}
    </div>
  );
}

function KanbanBoard({ tasks, onDragStart, onDragOver, onDrop, onTaskClick, onCreateTask }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statuses.map(status => (
        <div
          key={status}
          onDragOver={onDragOver}
          onDrop={() => onDrop(status)}
          className="bg-gray-900 rounded-lg p-4 min-h-[600px]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-200 flex items-center gap-2">
              <span className="text-lg">{status}</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                {tasks.filter(t => t.status === status).length}
              </span>
            </h2>
            <button
              onClick={() => onCreateTask(status)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {tasks
              .filter(t => t.status === status)
              .map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={() => onDragStart(task)}
                  onClick={() => onTaskClick(task)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskCard({ task, onDragStart, onClick }) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';
  const priorityColors = {
    Low: 'bg-green-500/20 text-green-400 border-green-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    High: 'bg-red-500/20 text-red-400 border-red-500/50'
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-all border border-gray-700 hover:border-gray-600 group"
    >
      <h3 className="font-medium mb-2 text-gray-100 group-hover:text-blue-400 transition-colors">
        {task.title}
      </h3>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <span
            key={tag.id}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: tag.color + '30', color: tag.color }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{task.assignee.avatar}</span>
          <span className={`text-xs px-2 py-1 rounded border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
          {isOverdue && <AlertCircle className="w-3 h-3" />}
          <Calendar className="w-3 h-3" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

function ListView({ tasks, onTaskClick }) {
  return (
    <div className="space-y-6">
      {statuses.map(status => (
        <div key={status} className="bg-gray-900 rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 text-gray-200">
            {status} ({tasks.filter(t => t.status === status).length})
          </h2>
          <div className="space-y-2">
            {tasks
              .filter(t => t.status === status)
              .map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl">{task.assignee.avatar}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-100">{task.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {task.tags.map(tag => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: tag.color + '30', color: tag.color }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ tasks, users, tags }) {
  const completedTasks = tasks.filter(t => t.status === 'Done');
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done');
  const onTimeTasks = completedTasks.filter(t => new Date(t.dueDate) >= new Date());
  
  const completionRate = ((completedTasks.length / tasks.length) * 100).toFixed(1);
  const onTimeRate = completedTasks.length > 0 ? ((onTimeTasks.length / completedTasks.length) * 100).toFixed(1) : 0;

  const statusData = statuses.map(status => ({
    name: status,
    Low: tasks.filter(t => t.status === status && t.priority === 'Low').length,
    Medium: tasks.filter(t => t.status === status && t.priority === 'Medium').length,
    High: tasks.filter(t => t.status === status && t.priority === 'High').length
  }));

  const tagData = tags.map(tag => ({
    name: tag.name,
    value: tasks.filter(t => t.tags.some(tt => tt.id === tag.id)).length,
    color: tag.color
  }));

  const userPerformance = users.map(user => ({
    name: user.name,
    completed: tasks.filter(t => t.assignee.id === user.id && t.status === 'Done').length,
    assigned: tasks.filter(t => t.assignee.id === user.id).length
  })).sort((a, b) => b.completed - a.completed);

  const last7Days = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const timelineData = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    created: tasks.filter(t => t.createdAt.split('T')[0] === date).length,
    completed: tasks.filter(t => t.status === 'Done' && t.createdAt.split('T')[0] <= date).length
  }));

  const upcomingTasks = tasks
    .filter(t => t.status !== 'Done' && new Date(t.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Task Completion</p>
              <p className="text-3xl font-bold text-white">{completionRate}%</p>
              <p className="text-blue-100 text-xs mt-1">{completedTasks.length} of {tasks.length} tasks</p>
            </div>
            <Check className="w-12 h-12 text-blue-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">On-Time Completion</p>
              <p className="text-3xl font-bold text-white">{onTimeRate}%</p>
              <p className="text-green-100 text-xs mt-1">{onTimeTasks.length} tasks on time</p>
            </div>
            <Clock className="w-12 h-12 text-green-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Overdue Tasks</p>
              <p className="text-3xl font-bold text-white">{overdueTasks.length}</p>
              <p className="text-red-100 text-xs mt-1">Requires attention</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-200 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Task Distribution by Status & Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="Low" stackId="a" fill="#10b981" />
              <Bar dataKey="Medium" stackId="a" fill="#f59e0b" />
              <Bar dataKey="High" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks Created vs Completed</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="created" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Task Distribution by Tags</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tagData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {tagData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {tagData.map(tag => (
              <div key={tag.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }}></div>
                <span className="text-xs text-gray-400">{tag.name}: {tag.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Leaderboard
          </h3>
          <div className="space-y-3">
            {userPerformance.map((user, index) => (
              <div key={user.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{users.find(u => u.name === user.name)?.avatar}</span>
                    <span className="font-medium">{user.name}</span>
                    {index === 0 && <span className="ml-2 text-xs bg-yellow-500 text-gray-900 px-2 py-0.5 rounded">🏆 Top</span>}
                  </div>
                  <span className="text-sm text-gray-400">{user.completed} / {user.assigned} tasks</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(user.completed / user.assigned * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {upcomingTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{task.assignee.avatar}</span>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <div className="flex gap-2 mt-1">
                    {task.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: tag.color + '30', color: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="text-xs text-gray-400">
                  {Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Workload Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" width={120} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="assigned" fill="#3b82f6" name="Assigned" />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TaskModal({ task, users, tags, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Edit Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={editedTask.title}
                onChange={e => setEditedTask({...editedTask, title: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={editedTask.description}
                onChange={e => setEditedTask({...editedTask, description: e.target.value})}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={editedTask.status}
                  onChange={e => setEditedTask({...editedTask, status: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={editedTask.priority}
                  onChange={e => setEditedTask({...editedTask, priority: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Assignee</label>
              <select
                value={editedTask.assignee.id}
                onChange={e => setEditedTask({...editedTask, assignee: users.find(u => u.id === parseInt(e.target.value))})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.avatar} {user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={editedTask.dueDate.split('T')[0]}
                onChange={e => setEditedTask({...editedTask, dueDate: new Date(e.target.value).toISOString()})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const isSelected = editedTask.tags.some(t => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => {
                        setEditedTask({
                          ...editedTask,
                          tags: isSelected 
                            ? editedTask.tags.filter(t => t.id !== tag.id)
                            : [...editedTask.tags, tag]
                        });
                      }}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        isSelected 
                          ? 'ring-2 ring-offset-2 ring-offset-gray-900'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: tag.color + '30',
                        color: tag.color,
                        ringColor: isSelected ? tag.color : 'transparent'
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}