import React, { useState, useEffect } from 'react';
import { PainPoint } from './types';

const DEFAULT_PAIN_POINTS: PainPoint[] = [
  { id: '1', name: 'Generator outages', severity: 5, frequency: 3, costImpact: 4, timeImpact: 4, riskUrgency: 4, effortToFix: 3, notes: 'Need a dedicated backup.' },
  { id: '2', name: 'Feed costs', severity: 4, frequency: 5, costImpact: 5, timeImpact: 2, riskUrgency: 3, effortToFix: 4, notes: 'Evaluate bulk buying.' },
  { id: '3', name: 'Water hauling', severity: 4, frequency: 4, costImpact: 3, timeImpact: 5, riskUrgency: 3, effortToFix: 5, notes: 'Drill a well?' },
  { id: '4', name: 'Fence repairs', severity: 3, frequency: 4, costImpact: 2, timeImpact: 4, riskUrgency: 2, effortToFix: 2, notes: 'Patch holes weekly.' },
  { id: '5', name: 'Utility overruns', severity: 3, frequency: 5, costImpact: 4, timeImpact: 1, riskUrgency: 2, effortToFix: 4, notes: 'Insulate the barn.' },
];

export const INITIAL_FORM_STATE = {
  name: '',
  severity: 3,
  frequency: 3,
  costImpact: 3,
  timeImpact: 3,
  riskUrgency: 3,
  effortToFix: 3,
  notes: '',
};

export function usePainPoints() {
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

  return {
    items,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
}
