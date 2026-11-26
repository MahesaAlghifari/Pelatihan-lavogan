import { GripVertical, Edit, Trash2 } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

export interface PathItem {
  id: number;
  title: string;
  modules: number;
  order: number;
}

interface PathManagerProps {
  item: PathItem;
  index: number;
  moveItem: (from: number, to: number) => void;
}

export function PathManager({ item, index, moveItem }: PathManagerProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'path-item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'path-item',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-card p-4 rounded-xl border border-border flex items-center gap-4 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <GripVertical className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.modules} Modul</p>
      </div>
      <div className="flex gap-2">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-error-light transition-colors" style={{ color: 'var(--error)' }}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}