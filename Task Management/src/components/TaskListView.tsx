import React from 'react';
import { CheckCircle2, Circle, Trash2, AlertCircle } from 'lucide-react';
import { Task, SortOption } from '../types/TaskTypes';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListViewProps {
  tasks: Task[];
  searchQuery: string;
  sortOption: SortOption;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: Task['priority']) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  searchQuery,
  sortOption,
  onToggle,
  onDelete,
  onUpdatePriority,
}) => {
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <AnimatePresence>
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border ${
              task.completed ? 'border-gray-200' : 'border-purple-200'
            } transition-all`}
          >
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => onToggle(task.id)}
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <span
                className={`flex-1 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={task.priority}
                onChange={(e) =>
                  onUpdatePriority(task.id, e.target.value as Task['priority'])
                }
                className={`px-2 py-1 rounded-md text-sm ${
                  priorityColors[task.priority]
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <AlertCircle className="w-12 h-12 mb-2" />
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};