import React, { useState, useRef } from 'react';
import { SEO } from '../components/SEO';
import { ExportActions } from '../components/ExportActions';

export default function Septic() {
  const [bedrooms, setBedrooms] = useState(3);
  const [soil, setSoil] = useState('average');
  const [state, setState] = useState('TX');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let minTank = 0;
    if (bedrooms === 1) minTank = 750;
    else if (bedrooms === 2) minTank = 1000;
    else minTank = 1000 + ((bedrooms - 2) * 250);

    const recommended = soil === 'poor' ? minTank * 1.25 : minTank;
    
    // Cost estimate
    const costLow = 1500 + (recommended * 1.5);
    const costHigh = 3500 + (recommended * 2.2);

    return { 
      minTank, 
      recommended: Math.round(recommended), 
      costLow: Math.round(costLow), 
      costHigh: Math.round(costHigh),
      drainField: Math.round(recommended * 0.8) // Simple heuristic
    };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Septic Tank Size Calculator" 
        description="Calculate the required septic tank size based on the number of bedrooms and soil type for residential rural properties."
        url="/septic"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Septic Tank Size Calculator",
          "applicationCategory": "CalculatorApplication"
        }}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Number of Bedrooms</label>
            <input type="number" min="1" max="10" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">EPA baseline estimates occupancy</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">State / Region</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="OTHER">Other State</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type / Condition</label>
            <select value={soil} onChange={(e) => setSoil(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="good">Good (Sandy, Loamy)</option>
              <option value="average">Average (Silt, mixed)</option>
              <option value="poor">Poor (Heavy Clay, slow percolation)</option>
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
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Recommended Tank Size</p>
              <p className="text-4xl font-black text-white">{results.recommended.toLocaleString()} <span className="text-lg font-bold opacity-80">Gal</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Est. Installation Cost</p>
              <p className="text-2xl font-black text-gray-800">${results.costLow.toLocaleString()} - ${results.costHigh.toLocaleString()}</p>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Requirement Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Absolute Minimum (EPA)</span>
                  <span className="font-bold text-gray-900">{results.minTank.toLocaleString()} gal</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Soil Condition Modifier</span>
                  <span className="font-bold text-gray-900">{soil === 'poor' ? '+25% Capacity' : 'No Penalty'}</span>
                </li>
                <li className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                  <span className="text-gray-600">Est. Drain Field Size</span>
                  <span className="font-bold text-[#1a5f3f]">{results.drainField.toLocaleString()} sq ft</span>
                </li>
              </ul>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed flex flex-col justify-center">
                <strong>⚠️ State Mandates:</strong> Local states ({state}) may have additional structural or capacity mandates depending on local environmental regulations. High-flow fixtures or garbage disposals often trigger a strictly larger requirement tier by inspectors.
              </div>
            </div>
          </div>
        </div>

        <ExportActions 
          title="Septic Tank Size Calculator" 
          targetRef={resultRef}
          data={{
            'Bedrooms': bedrooms,
            'State': state.toUpperCase(),
            'Soil Type': soil.toUpperCase(),
            'Recommended Tank Size (Gal)': results.recommended,
            'Minimum Size (Gal)': results.minTank,
            'Estimated Drain Field (sq ft)': results.drainField,
            'Installation Cost Estimate': `$${results.costLow.toLocaleString()} - $${results.costHigh.toLocaleString()}`
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Guide: Septic Tank Sizing</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>By standard building codes, tank sizing is calculated based on the <strong>number of bedrooms</strong>, rather than square footage. This indicates maximum possible human occupancy and daily water usage.</p>
              <p>A 1 or 2-bedroom home requires a 1,000-gal absolute minimum. The quality of soil (clay vs sand) determines percolation. "Poor soil" heavily increases required settling time inside the tank.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Current Occupancy:</strong> You cannot install a small tank just because "only 2 people live here." It's tied to house bedrooms for future sales.</li>
              <li><strong>Pumping:</strong> A 1,000-gal tank for a family of 4 needs pumping every 2-3 years.</li>
              <li><strong>Drain Field:</strong> Poor soil means a larger drain field is also required to handle the slow dissipation.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
