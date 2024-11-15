import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskListView } from './components/TaskListView';
import { TaskToolbar } from './components/TaskToolbar';
import { useTaskManager } from './hooks/useTaskManager';
import { SortOption } from './types/TaskTypes';

function App() {
  const { tasks, addTask, deleteTask, toggleTask, updateTaskPriority } = useTaskManager();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <CheckSquare className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <TaskForm onAdd={addTask} />
        
        <TaskToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        <TaskListView
          tasks={tasks}
          searchQuery={searchQuery}
          sortOption={sortOption}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdatePriority={updateTaskPriority}
        />
      </div>
    </div>
  );
}

export default App;