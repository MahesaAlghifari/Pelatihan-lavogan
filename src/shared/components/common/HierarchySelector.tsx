import { ChevronRight } from 'lucide-react';

interface HierarchySelectorProps {
  levels: {
    label: string;
    options: Array<{ id: string; name: string; count?: number }>;
    selected: string;
    onSelect: (id: string) => void;
    placeholder?: string;
  }[];
}

export function HierarchySelector({ levels }: HierarchySelectorProps) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex items-center gap-3 flex-wrap">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center gap-3">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
            )}
            <div className="min-w-[200px]">
              <label className="block text-xs mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                {level.label}
              </label>
              <select
                value={level.selected}
                onChange={(e) => level.onSelect(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-input-border focus:outline-none focus:ring-2 text-sm"
                style={{
                  backgroundColor: level.selected ? 'var(--primary-light)' : 'var(--input-background)',
                  color: level.selected ? 'var(--primary)' : 'var(--text-primary)',
                  '--tw-ring-color': 'var(--ring)',
                  fontWeight: level.selected ? '600' : '400',
                } as React.CSSProperties}
              >
                <option value="">{level.placeholder || `Pilih ${level.label}`}</option>
                {level.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} {option.count !== undefined ? `(${option.count})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
