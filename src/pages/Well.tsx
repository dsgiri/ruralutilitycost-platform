import React, { useState, useRef } from 'react';
import { SEO } from '../components/SEO';
import { ExportActions } from '../components/ExportActions';

export default function Well() {
  const [depth, setDepth] = useState(250);
  const [soil, setSoil] = useState('medium');
  const [region, setRegion] = useState('average');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let rate = 30;
    if (soil === 'soft') rate = 20;
    if (soil === 'medium') rate = 30;
    if (soil === 'hard') rate = 45;
    if (soil === 'rock') rate = 65;

    // Region multiplier
    if (region === 'high') rate *= 1.25;
    if (region === 'low') rate *= 0.85;

    const drillingCost = depth * rate;
    
    // Deeper wells need more expensive submersible pumps and longer electrical lines
    let pumpCost = 1500;
    if (depth > 200) pumpCost = 2500;
    if (depth > 400) pumpCost = 3500;

    const totalCost = drillingCost + pumpCost;

    return { 
      ratePerFoot: Math.round(rate),
      drillingCost: Math.round(drillingCost),
      pumpCost,
      totalCost
    };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Well Drilling Cost Calculator" 
        description="Calculate the cost per foot of drilling a water well based on geological conditions and depth requirements."
        url="/well"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Well Drilling Cost Calculator",
          "applicationCategory": "CalculatorApplication"
        }}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Expected Depth Needed (Feet)</label>
            <input type="number" min="50" step="50" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Avg residential well sits at 100-500ft</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Geology / Soil Type</label>
            <select value={soil} onChange={(e) => setSoil(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="soft">Soft (Sand, loose clay)</option>
              <option value="medium">Medium (Packed clay, mixed)</option>
              <option value="hard">Hard (Dense hardpan)</option>
              <option value="rock">Solid Bedrock</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Regional Labor Rates</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="low">Rural/Low Cost Area</option>
              <option value="average">National Average</option>
              <option value="high">High Cost Area (Coastal / Mountain)</option>
            </select>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a5f3f] p-5 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Estimated Drilling Rate</p>
              <p className="text-4xl font-black text-white">${results.ratePerFoot} <span className="text-lg font-bold opacity-80">/ ft</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total System Estimate</p>
              <p className="text-2xl font-black text-[#1a5f3f]">${results.totalCost.toLocaleString()}</p>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Investment Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4 flex flex-col justify-center">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Drilling & Steel Casing</span>
                  <span className="font-bold text-gray-900">${results.drillingCost.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pump & Electrical</span>
                  <span className="font-bold text-gray-900">${results.pumpCost.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between text-lg pt-3 border-t border-gray-100 font-bold">
                  <span className="text-gray-800">Total Build Cost</span>
                  <span className="text-[#1a5f3f]">${results.totalCost.toLocaleString()}</span>
                </li>
              </ul>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 leading-relaxed flex flex-col justify-center">
                <strong>⚠️ Dry Hole Warning:</strong> Drillers charge per foot drilled regardless of whether aquifer deposits were found. You will still owe the drilling portion of the invoice even if no water is hit.
              </div>
            </div>
          </div>
        </div>

        <ExportActions 
          title="Well Drilling Cost Calculator" 
          targetRef={resultRef}
          data={{
            'Depth (ft)': depth,
            'Geology / Soil Type': soil.toUpperCase(),
            'Regional Cost Level': region.toUpperCase(),
            'Estimated Rate per Foot': `$${results.ratePerFoot}`,
            'Drilling & Casing Cost': `$${results.drillingCost.toLocaleString()}`,
            'Pump & Electrical Cost': `$${results.pumpCost.toLocaleString()}`,
            'Total Estimate': `$${results.totalCost.toLocaleString()}`
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Guide: Well Drilling</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>The grand total consists of two major components: the actual per-foot boring charge, and the mechanical infrastructure (the pump, casing, and filtration).</p>
              <p>Geology is everything. Drillers charge primarily by the foot based on how many bits they burn. Soft soil ($15-$25/ft) is fast but requires heavy casing. Bedrock requires slow precision pneumatic drilling.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Water Treatment:</strong> Quotes cover pulling water from the ground. Robust filtration for iron/hardness is thousands extra.</li>
              <li><strong>Pump Lifespan:</strong> A high-quality submersible pump lasts 10-15 years. Deeper pumps work harder and degrade slightly faster.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
