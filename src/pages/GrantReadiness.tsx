import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Landmark, Info, Banknote, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

type Tab = 'simple' | 'reimbursable';

export default function GrantReadiness() {
  const [activeTab, setActiveTab] = useState<Tab>('simple');

  // Tab 1 State: Standard Match
  const [totalCost1, setTotalCost1] = useState(50000);
  const [grantPercent1, setGrantPercent1] = useState(50);
  const [priorCosts1, setPriorCosts1] = useState(0);

  // Tab 2 State: Reimbursable Cash Flow
  const [totalCost2, setTotalCost2] = useState(100000);
  const [grantPercent2, setGrantPercent2] = useState(75);
  const [phases, setPhases] = useState(3);
  const [bridgeInterest, setBridgeInterest] = useState(8);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.max(0, val));
  };

  // --- Calculations: Tab 1 ---
  const eligibleCost = Math.max(0, totalCost1 - priorCosts1);
  const grantAwarded1 = eligibleCost * (grantPercent1 / 100);
  const applicantMatch1 = eligibleCost * ((100 - grantPercent1) / 100);
  const totalOutofPocket1 = applicantMatch1 + priorCosts1;

  // --- Calculations: Tab 2 (Reimbursable Pipeline) ---
  const eligibleCost2 = totalCost2;
  const totalGrantAvailable = eligibleCost2 * (grantPercent2 / 100);
  const costPerPhase = eligibleCost2 / phases;
  
  // They spend costPerPhase. Then they get reimbursed (grantPercent2) for that phase. 
  // Max float (cash needed to bridge) is the highest amount they are out-of-pocket at any one time.
  // Assuming they must pay for Phase 1 fully, then submit for reimbursement, then use reimbursement to pay for Phase 2.
  // Actually, max cash needed *before* any reimbursement clears is simply one full Phase cost.
  // PLUS their overall matching requirement across all phases.
  // For safety, users generally need `Cost_Per_Phase` in the bank as working capital, or a bridge loan.
  const cashWorkingCapitalNeeded = costPerPhase; 
  const applicantMatch2 = eligibleCost2 * ((100 - grantPercent2) / 100);
  
  // Bridge loan interest approx for 1 year
  const estimatedInterest = cashWorkingCapitalNeeded * (bridgeInterest / 100);
  const totalOutofPocket2 = applicantMatch2 + estimatedInterest;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Grant Readiness & Match Calculator"
        description="Calculate required matching funds and bridging cash flow for reimbursable rural grants like USDA REAP or EQIP."
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Landmark className="w-8 h-8 text-emerald-600" />
          Grant Readiness & Match Planner
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Federal and state grants are rarely "free money." Calculate exactly how much cash you need on hand for matching funds and to bridge reimbursable phases.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('simple')}
          className={cn(
            "px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors border-b-2",
            activeTab === 'simple' 
              ? "border-emerald-600 text-emerald-700 bg-emerald-50/50" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          1. Standard % Match
        </button>
        <button
          onClick={() => setActiveTab('reimbursable')}
          className={cn(
            "px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors border-b-2",
            activeTab === 'reimbursable' 
              ? "border-emerald-600 text-emerald-700 bg-emerald-50/50" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          2. Reimbursable Cash Flow
        </button>
      </div>

      {activeTab === 'simple' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                Project Inputs
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Total Estimated Project Cost ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 50000"
                    value={totalCost1 || ''}
                    onChange={(e) => setTotalCost1(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Grant Match Percentage %
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Typically 50% (REAP) up to 75%+ (EQIP, depending on status).</p>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={grantPercent1 || ''}
                    onChange={(e) => setGrantPercent1(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Ineligible Prior Costs ($)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Money spent before grant approval usually cannot be matched.</p>
                  <input
                    type="number"
                    min="0"
                    value={priorCosts1 || ''}
                    onChange={(e) => setPriorCosts1(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setTotalCost1(50000);
                      setGrantPercent1(50);
                      setPriorCosts1(0);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex justify-center items-center gap-2 font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Funding Breakdown
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase">Gov. Grant Award</p>
                  <p className="text-3xl font-black text-emerald-700 mt-1">{formatCurrency(grantAwarded1)}</p>
                  <p className="text-xs text-gray-500 mt-2">Maximum allowable match</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase">Your Share</p>
                  <p className="text-3xl font-black text-emerald-700 mt-1">{formatCurrency(totalOutofPocket1)}</p>
                  <p className="text-xs text-gray-500 mt-2">Required cash match + prior costs</p>
                </div>
              </div>

              <div className="bg-white border text-sm border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="flex justify-between p-3 bg-gray-50 border-b font-semibold">
                  <span>Line Item</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-100 text-gray-600">
                  <span>Total Project Scope</span>
                  <span>{formatCurrency(totalCost1)}</span>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-100 text-gray-600 text-red-600">
                  <span>Minus Ineligible Past Spending</span>
                  <span>-{formatCurrency(priorCosts1)}</span>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-100 font-semibold text-emerald-700">
                  <span>Eligible Basis for Match</span>
                  <span>{formatCurrency(eligibleCost)}</span>
                </div>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 mt-auto flex gap-3 text-sm">
                <Info className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
                <p>
                  <strong>Important:</strong> Ensure you have liquid proof of funds for your {formatCurrency(totalOutofPocket1)} portion, as almost all rural grants require verifying your cash match *before* the award is issued.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reimbursable' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                Reimbursement Timeline
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Total Estimated Project Cost ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 100000"
                    value={totalCost2 || ''}
                    onChange={(e) => setTotalCost2(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Grant Match Percentage %
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={grantPercent2 || ''}
                    onChange={(e) => setGrantPercent2(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Project Phases (Draws)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">How many steps will the project be divided into for reimbursement invoices? (e.g., 3 means 33% paid at a time).</p>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={phases || ''}
                    onChange={(e) => setPhases(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Bridge Loan Interest Rate (%)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">If you borrow the working capital to float the project, enter annual interest.</p>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={bridgeInterest || ''}
                    onChange={(e) => setBridgeInterest(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Cash Flow Reality Check
              </h2>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl mb-6 flex gap-3 text-sm text-orange-900">
                <AlertTriangle className="w-5 h-5 shrink-0 text-orange-600 mt-0.5" />
                <p>
                  <strong>The Reimbursable Trap:</strong> Even though you won {formatCurrency(totalGrantAvailable)}, you must pay contractors <em>first</em> before the government reimburses you. You need serious working capital to avoid stalling the project during phase 1.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 uppercase">Working Capital Needed</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">{formatCurrency(cashWorkingCapitalNeeded)}</p>
                  <p className="text-xs text-gray-500 mt-2">Cash or loan line needed to bridge one active phase</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 uppercase">Total Grant Awarded</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">{formatCurrency(totalGrantAvailable)}</p>
                  <p className="text-xs text-gray-500 mt-2">Max eventual payback</p>
                </div>
              </div>

              <div className="bg-white border text-sm border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="flex justify-between p-3 bg-gray-100 border-b font-semibold">
                  <span>Actual Out of Pocket (End of Project)</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-100 text-gray-600">
                  <span>Base Funding Match Needed ({100 - grantPercent2}%)</span>
                  <span>{formatCurrency(applicantMatch2)}</span>
                </div>
                {bridgeInterest > 0 && (
                  <div className="flex justify-between p-3 border-b border-gray-100 text-gray-600 text-red-600">
                    <span>Estimated 1-Year Loan Interest on Working Capital</span>
                    <span>+{formatCurrency(estimatedInterest)}</span>
                  </div>
                )}
                <div className="flex justify-between p-3 bg-gray-50 font-black text-gray-900">
                  <span>True Final Cost</span>
                  <span>{formatCurrency(totalOutofPocket2)}</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-100 leading-relaxed text-sm text-gray-600">
                <strong className="block mb-2 text-gray-900">How the cycle works (per phase):</strong>
                1. Spend {formatCurrency(costPerPhase)} to finish Phase 1.<br/>
                2. Submit receipts and cancelled checks to agency.<br/>
                3. Wait 30-90 days for {formatCurrency(costPerPhase * (grantPercent2/100))} reimbursement payout.<br/>
                4. Use the reimbursement + your match cash to start Phase 2.
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
