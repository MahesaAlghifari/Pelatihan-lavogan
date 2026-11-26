import { useState } from 'react';
import { Settings, CheckCircle, AlertCircle, Info, Upload } from 'lucide-react';

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('colors');

  const tabs = ['colors', 'typography', 'buttons', 'inputs', 'cards', 'alerts'];

  return (
    <div className="min-h-screen bg-surface p-4 sm:p-6 font-sans">
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Design System</h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Showcase of UI components and styling guidelines
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-text-secondary hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-xl border border-border p-8">
          {activeTab === 'colors' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ColorBox name="Primary" varName="--primary" />
                <ColorBox name="Primary Light" varName="--primary-light" />
                <ColorBox name="Surface" varName="--surface" />
                <ColorBox name="Card" varName="--card" />
                <ColorBox name="Success" varName="--success" />
                <ColorBox name="Warning" varName="--warning" />
                <ColorBox name="Error" varName="--error" />
                <ColorBox name="Border" varName="--border" />
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6" style={{ color: 'var(--text-primary)' }}>
              <div>
                <h1 className="text-4xl font-bold">Heading 1 (4xl)</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Used for main page titles</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2 (3xl)</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Used for section titles</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Heading 3 (2xl)</h3>
              </div>
              <div>
                <h4 className="text-xl font-medium">Heading 4 (xl)</h4>
              </div>
              <div>
                <p className="text-base">Body Text (base). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Small Text (sm). Used for secondary information and captions.</p>
              </div>
            </div>
          )}

          {activeTab === 'buttons' && (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-6 py-3 rounded-xl font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Primary Button</button>
                <button className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>Secondary Button</button>
                <button className="px-6 py-3 rounded-xl font-medium bg-error/10 text-error hover:bg-error/20 transition-colors">Danger Button</button>
                <button disabled className="px-6 py-3 rounded-xl font-medium bg-muted text-text-tertiary cursor-not-allowed">Disabled Button</button>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                  <Settings className="w-5 h-5" /> With Icon
                </button>
                <button className="p-3 rounded-xl border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inputs' && (
            <div className="max-w-md space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Standard Input</label>
                <input type="text" placeholder="Enter text..." className="w-full px-4 py-3 rounded-xl border border-input-border focus:ring-2 focus:outline-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Select Dropdown</label>
                <select className="w-full px-4 py-3 rounded-xl border border-input-border focus:ring-2 focus:outline-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' }}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-error">Input with Error</label>
                <input type="text" defaultValue="Invalid value" className="w-full px-4 py-3 rounded-xl border-2 border-error/50 focus:outline-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' }} />
                <p className="text-xs text-error mt-1">This field is required.</p>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 rounded-xl flex gap-3 border" style={{ backgroundColor: 'var(--success-light)', borderColor: 'var(--success)', color: 'var(--success)' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Operation completed successfully.</p>
              </div>
              <div className="p-4 rounded-xl flex gap-3 border" style={{ backgroundColor: 'var(--warning-light)', borderColor: 'var(--warning)', color: 'var(--warning)' }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Please review your changes before saving.</p>
              </div>
              <div className="p-4 rounded-xl flex gap-3 border" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">New updates are available for your courses.</p>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Standard Card</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Used for displaying contained information blocks.</p>
                <button className="px-4 py-2 rounded-lg font-medium bg-muted text-text-primary">Action</button>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-md">
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Elevated Card</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Used for modal dialogs or highlighted content.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ColorBox({ name, varName }: { name: string; varName: string }) {
  return (
    <div className="space-y-2">
      <div 
        className="w-full h-24 rounded-xl border border-border shadow-sm flex items-end p-3"
        style={{ backgroundColor: `var(${varName})` }}
      >
        <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded text-black mix-blend-screen">
          {varName}
        </span>
      </div>
      <div>
        <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{name}</p>
      </div>
    </div>
  );
}