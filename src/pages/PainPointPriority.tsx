import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { AlertOctagon, Plus, Edit2, Trash2, Save, X, Info, LayoutList, GripVertical } from 'lucide-react';

type PainPoint = {
  id: string;
  name: string;
  severity: number;
  frequency: number;
  costImpact: number;
  timeImpact: number;
  riskUrgency: number;
  effortToFix: number;
  notes: string;
};

const DEFAULT_PAIN_POINTS: PainPoint[] = [
  { id: '1', name: 'Generator outages', severity: 5, frequency: 3, costImpact: 4, timeImpact: 4, riskUrgency: 4, effortToFix: 3, notes: 'Need a dedicated backup.' },
  { id: '2', name: 'Feed costs', severity: 4, frequency: 5, costImpact: 5, timeImpact: 2, riskUrgency: 3, effortToFix: 4, notes: 'Evaluate bulk buying.' },
  { id: '3', name: 'Water hauling', severity: 4, frequency: 4, costImpact: 3, timeImpact: 5, riskUrgency: 3, effortToFix: 5, notes: 'Drill a well?' },
  { id: '4', name: 'Fence repairs', severity: 3, frequency: 4, costImpact: 2, timeImpact: 4, riskUrgency: 2, effortToFix: 2, notes: 'Patch holes weekly.' },
  { id: '5', name: 'Utility overruns', severity: 3, frequency: 5, costImpact: 4, timeImpact: 1, riskUrgency: 2, effortToFix: 4, notes: 'Insulate the barn.' },
];

const INITIAL_FORM_STATE = {
  name: '',
  severity: 3,
  frequency: 3,
  costImpact: 3,
  timeImpact: 3,
  riskUrgency: 3,
  effortToFix: 3,
  notes: '',
};

export default function PainPointPriority() {
  const [items, setItems] = useState<PainPoint[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PainPoint, 'id'>>(INITIAL_FORM_STATE);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ruralPainPoints');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(DEFAULT_PAIN_POINTS);
        localStorage.setItem('ruralPainPoints', JSON.stringify(DEFAULT_PAIN_POINTS));
      }
    } catch (e) {
      console.error('Failed to load pain points', e);
      setItems(DEFAULT_PAIN_POINTS);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('ruralPainPoints', JSON.stringify(items));
    }
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      setEditingId(null);
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      setItems([...items, newItem]);
    }
    setFormData(INITIAL_FORM_STATE);
  };

  const handleEdit = (item: PainPoint) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      severity: item.severity,
      frequency: item.frequency,
      costImpact: item.costImpact,
      timeImpact: item.timeImpact,
      riskUrgency: item.riskUrgency,
      effortToFix: item.effortToFix,
      notes: item.notes || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this item from the list?')) {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      if (newItems.length === 0) {
        localStorage.removeItem('ruralPainPoints');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const getTier = (painScore: number, effort: number) => {
    // Quick Win: high pain, low effort
    if (painScore >= 16 && effort <= 3) return { label: 'Quick Win', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    // Long-Term Project: high pain, high effort
    if (painScore >= 16 && effort > 3) return { label: 'Long-Term Project', color: 'bg-orange-100 text-orange-800 border-orange-200' };
    // Low Hanging Fruit (minor): low pain, low effort
    if (painScore < 16 && effort <= 2) return { label: 'Minor Fix', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
    // Low Priority: low pain, high effort
    return { label: 'Low Priority', color: 'bg-gray-100 text-gray-600 border-gray-200' };
  };

  const calculatePain = (item: Omit<PainPoint, 'id'>) => {
    return item.severity + item.frequency + item.costImpact + item.timeImpact + item.riskUrgency;
  };

  const sortedItems = [...items].sort((a, b) => {
    const painA = calculatePain(a);
    const painB = calculatePain(b);
    if (painB !== painA) return painB - painA;
    return a.effortToFix - b.effortToFix; // if pain is equal, lower effort wins
  });

  const ScoreInput = ({ label, field, desc }: { label: string, field: keyof typeof formData, desc: string }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <select
        value={Number(formData[field])}
        onChange={(e) => setFormData({ ...formData, [field]: Number(e.target.value) })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 transition-colors"
      >
        <option value={1}>1 - Lowest</option>
        <option value={2}>2 - Low</option>
        <option value={3}>3 - Medium</option>
        <option value={4}>4 - High</option>
        <option value={5}>5 - Extreme</option>
      </select>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Rural Pain Point Priority Calculator | Rural Utility Cost"
        description="Rank your biggest rural problems by severity, frequency, and impact to determine what to fix first."
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <AlertOctagon className="w-8 h-8 text-rose-600" />
          Pain Point Priority Matrix
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Turn vague rural frustrations into a clear action list. Score issues to reveal Quick Wins (high pain, low effort) versus Long-Term Projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT / TOP ENTRY FORM */}
        <div className="lg:col-span-4 lg:col-start-1 h-fit">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-rose-600" />
              {editingId ? 'Edit Issue' : 'Add New Issue'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Issue / Pain Point Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken perimeter fence"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pain Factors (1-5)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ScoreInput label="Severity" field="severity" desc="How bad is it when it happens?" />
                  <ScoreInput label="Frequency" field="frequency" desc="How often does it happen?" />
                  <ScoreInput label="Cost Impact" field="costImpact" desc="How much money is it draining?" />
                  <ScoreInput label="Time Impact" field="timeImpact" desc="How much time does it waste?" />
                  <div className="col-span-2">
                    <ScoreInput label="Risk / Urgency" field="riskUrgency" desc="What is the legal/safety risk?" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Fix Factors (1-5)</h3>
                <ScoreInput label="Effort to Fix" field="effortToFix" desc="1 = Easy, 5 = Very Hard" />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 resize-none"
                  placeholder="Dependencies, ideas, vendors..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-medium transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
                  {editingId ? <><Save className="w-4 h-4" /> Save</> : <><Plus className="w-4 h-4" /> Add to List</>}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT / BOTTOM LIST */}
        <div className="lg:col-span-8">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-full min-h-[600px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutList className="w-5 h-5 text-gray-500" />
                Ranked Action List
              </h2>
              <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 text-sm font-medium rounded-full shadow-sm">
                {items.length} Items Indexed
              </span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-20">
                <AlertOctagon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No pending issues</h3>
                <p className="text-gray-500">Add a problem to the left to see your priority ranking.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedItems.map((item, index) => {
                  const pain = calculatePain(item);
                  const tier = getTier(pain, item.effortToFix);
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`bg-white rounded-xl shadow-sm border p-4 sm:p-5 transition-shadow hover:shadow-md ${editingId === item.id ? 'border-rose-300 ring-2 ring-rose-50' : 'border-gray-200'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 text-wrap flex-wrap">
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                              #{index + 1}
                            </span>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">
                              {item.name}
                            </h3>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${tier.color}`}>
                              {tier.label}
                            </span>
                          </div>

                          {item.notes && (
                            <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                              {item.notes}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div>Pain Metrics: <span className="font-bold text-rose-600">S:{item.severity} F:{item.frequency} C:{item.costImpact} T:{item.timeImpact} R:{item.riskUrgency}</span></div>
                            <div>Effort Required: <span className="font-bold text-indigo-600">{item.effortToFix}/5</span></div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2">
                          <div className="text-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 min-w-[90px]">
                            <div className="text-xs font-bold text-gray-500 uppercase">Pain Score</div>
                            <div className="text-2xl font-black text-rose-700">{pain}</div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Edit Issue"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Issue"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 bg-blue-50/50 rounded-xl p-4 flex gap-3 text-blue-800 text-sm border border-blue-100">
              <Info className="w-5 h-5 shrink-0 text-blue-500" />
              <div>
                <strong className="block font-semibold text-blue-900 mb-1">How Scoring Works</strong>
                All metrics are graded 1 (Lowest) to 5 (Extreme). The Total Pain Score is the sum of Severity, Frequency, Cost, Time, and Risk (Max 25). 
                <br className="my-1"/>
                • <strong>Quick Wins:</strong> Pain ≥ 16, Effort ≤ 3. High return investments.<br/>
                • <strong>Long-Term:</strong> Pain ≥ 16, Effort ≥ 4. Needs planning/budgeting.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
