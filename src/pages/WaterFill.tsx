import React, { useState, useRef } from 'react';
import { SEO } from '../components/SEO';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ExportActions } from '../components/ExportActions';

export default function WaterFill() {
  const [zip, setZip] = useState('');
  const [gallons, setGallons] = useState(1000);
  const [type, setType] = useState('standard');
  const [distance, setDistance] = useState(10);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let baseRate = 0.06;
    const zipNum = parseInt(zip);
    if (zipNum >= 76001 && zipNum <= 76010) baseRate = 0.05;
    if (zipNum >= 77001 && zipNum <= 77003) baseRate = 0.045;
    if (zipNum >= 78201 && zipNum <= 78202) baseRate = 0.055;
    if (zipNum >= 75001 && zipNum <= 75003) baseRate = 0.06;

    const rate = type === 'potable' ? baseRate * 1.5 : baseRate;
    const delivery = 75 + (2.5 * distance);
    const waterCost = gallons * rate;
    const total = waterCost + delivery;
    const loads = Math.ceil(gallons / 4000);
    const costPerGal = gallons > 0 ? (total / gallons) : 0;

    // 12 month data projection
    const chartData = Array.from({ length: 12 }).map((_, i) => ({
      month: `Month ${i + 1}`,
      cost: Math.round(total)
    }));

    return { total, costPerGal, loads, delivery, waterCost, chartData };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Water Fill Charge Calculator" 
        description="Calculate water delivery cost for rural homes, wells, septic, and pools based on your local ZIP code."
        url="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Water Fill Charge Calculator",
          "applicationCategory": "CalculatorApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0" }
        }}
      />

      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ZIP Code</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 76001" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Specific rates for TX locations</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gallons Needed</label>
            <div className="relative">
              <input type="number" min="1000" step="500" value={gallons} onChange={(e) => setGallons(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">GAL</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Water Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="standard">Standard / Non-potable</option>
              <option value="potable">Potable (1.5x Premium)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Distance</label>
            <div className="relative">
              <input type="number" min="1" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">MILES</span>
            </div>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Estimate</p>
              <p className="text-2xl font-black text-[#1a5f3f]">${results.total.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Per Gallon</p>
              <p className="text-2xl font-black text-gray-800">${results.costPerGal.toFixed(3)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Truckloads</p>
              <p className="text-2xl font-black text-gray-800">{results.loads} Loads</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Delivery Fee</p>
              <p className="text-2xl font-black text-gray-800">${results.delivery.toFixed(2)}</p>
            </div>
          </div>

          {/* CHART & BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 print:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">12-Month Projection</h3>
              <div className="h-48 w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="month" hide />
                    <YAxis fontSize={10} width={40} tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value: number) => [`$${value}`, 'Monthly Cost']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="cost" fill="#1a5f3f" radius={[4, 4, 0, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-[8px] text-gray-400 pt-2 border-t border-gray-100 mt-2">
                <span>JAN</span><span>MAR</span><span>JUN</span><span>SEP</span><span>DEC</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Cost Factors Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 italic">Water Supply Cost</span>
                  <span className="font-bold">${results.waterCost.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 italic">Base Dispatch + Mileage</span>
                  <span className="font-bold">${results.delivery.toFixed(2)}</span>
                </li>
                <li className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-black">
                  <span className="text-[#1a5f3f]">TOTAL</span>
                  <span className="text-[#1a5f3f]">${results.total.toFixed(2)}</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 leading-normal">
                <strong>💡 Pro Tip:</strong> Standard water hauling trucks hold around 4,000 gallons. Ordering slightly over this limit triggers the need for a second truck, duplicating the base delivery fee.
              </div>
            </div>
          </div>
        </div>

        <ExportActions 
          title="Water Fill Charge Calculator" 
          targetRef={resultRef}
          data={{
            'ZIP Code': zip || 'N/A',
            'Water Volume (Gallons)': `${gallons.toLocaleString()}`,
            'Type': type.toUpperCase(),
            'Distance (Miles)': distance,
            'Total Estimate': `$${results.total.toFixed(2)}`,
            'Cost Per Gallon': `$${results.costPerGal.toFixed(3)}`,
            'Delivery Fee': `$${results.delivery.toFixed(2)}`,
            'Truckloads Required': results.loads
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">SEO Guide: 2026 Water Fill Costs</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>When living on a rural property, managing water supply is critical. Standard bulk water sits between $0.04 and $0.08 per gallon. Potable water (drinking quality) typically adds a 50% to 100% premium due to required sanitization.</p>
              <p>Distance is the biggest variable; trucks burn considerable diesel and endure wear carrying heavy loads. The base delivery fee is often fixed ($75-$150) plus an escalating mileage fee.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Truck Capacity:</strong> Most carry 2,500 - 4,000 gallons.</li>
              <li><strong>Potable vs Non-Potable:</strong> Non-potable water cannot be put into household drinking cisterns.</li>
              <li><strong>Volume Discount:</strong> Ordering close to the maximum capacity of one truck (e.g. 4,000 gal) reduces the effective cost per gallon by avoiding duplicate delivery fees.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
