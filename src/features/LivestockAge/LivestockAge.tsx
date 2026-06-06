import React, { useState, useRef } from 'react';
import { Bone, Info, AlertTriangle, Calculator, HelpCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ExportActions } from '../../components/ExportActions';
import { JawIllustration } from './JawIllustration';
import { 
  estimateLivestockAge, 
  Dentition, 
  Breed, 
  WearLevel, 
  ConfidenceMode, 
  AgeEstimateResult 
} from './calculator';

type ToothType = 'M' | 'P' | 'W';

const livestockTeethStages: {
  id: Dentition;
  title: string;
  ageRef: string;
  desc: string;
  pattern: ToothType[];
  note?: string;
}[] = [
  {
    id: 'milk',
    title: 'Milk Teeth Only',
    ageRef: 'Under 1.5 Years',
    desc: 'All temporary incisors visible, small and evenly sized, with no permanent incisors erupted yet.',
    pattern: ['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'],
    note: 'Typical for a young calf.'
  },
  {
    id: '2-incisors',
    title: '2 Permanent Incisors',
    ageRef: '1.5 to 2 Years',
    desc: 'Two permanent incisors visible in the center of the lower jaw, while the remaining are still milk teeth. The two permanent teeth look larger, whiter, and more mature.',
    pattern: ['M', 'M', 'M', 'P', 'P', 'M', 'M', 'M']
  },
  {
    id: '4-incisors',
    title: '4 Permanent Incisors',
    ageRef: '2.5 to 3 Years',
    desc: 'Four permanent incisors visible. Shows contrast between the newer permanent teeth and the remaining milk teeth, with the mature teeth larger and more square.',
    pattern: ['M', 'M', 'P', 'P', 'P', 'P', 'M', 'M']
  },
  {
    id: '6-incisors',
    title: '6 Permanent Incisors',
    ageRef: '3.5 to 4 Years',
    desc: 'Six permanent incisors visible in the lower jaw. The last two corner incisors are still transitioning milk teeth.',
    pattern: ['M', 'P', 'P', 'P', 'P', 'P', 'P', 'M']
  },
  {
    id: '8-incisors',
    title: 'Full Mouth (8 Incisors)',
    ageRef: '4 to 5 Years',
    desc: 'Mature cow showing a full mouth with eight permanent lower incisors. Teeth are broad, mature, and evenly arranged.',
    pattern: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
  }
];

export default function LivestockAge() {
  const [evaluationMethod, setEvaluationMethod] = useState<'teeth' | 'horns'>('teeth');
  const [dentition, setDentition] = useState<Dentition>('2-incisors');
  const [breed, setBreed] = useState<Breed>('british');
  const [wearLevel, setWearLevel] = useState<WearLevel>('none');
  const [hornRings, setHornRings] = useState<string>('');

  const resultRef = useRef<HTMLDivElement>(null);

  // Derive stage info for the UI
  const activeStage = livestockTeethStages.find(s => s.id === dentition) || livestockTeethStages[1];

  // Adjust pattern if teeth are worn out
  const displayPattern = wearLevel === 'severe' || wearLevel === 'moderate' 
    ? activeStage.pattern.map(t => t === 'P' ? 'W' : t) as ToothType[]
    : activeStage.pattern;

  const calculate = (): AgeEstimateResult | null => {
    try {
      const parsedHornRings = hornRings ? parseInt(hornRings, 10) : undefined;
      
      const confMode: ConfidenceMode = evaluationMethod === 'horns' 
        ? 'horn-only' 
        : (parsedHornRings !== undefined && parsedHornRings >= 0 ? 'teeth-and-horn' : 'teeth-only');

      if (confMode === 'horn-only' && (parsedHornRings === undefined || isNaN(parsedHornRings) || parsedHornRings < 0)) {
         return null; 
      }
      if (confMode !== 'horn-only' && dentition === 'unknown') {
         return null;
      }
      
      return estimateLivestockAge({
        dentition: evaluationMethod === 'horns' ? 'unknown' : dentition,
        breed,
        hornRings: parsedHornRings,
        wearLevel,
        confidenceMode: confMode
      });
    } catch (err) {
      return null;
    }
  };

  const results = calculate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Livestock Age Estimator",
        "description": "Estimate the approximate age of cattle based on teeth (dentition) and horn rings.",
        "applicationCategory": "UtilitiesApplication"
      }
    ]
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-1 gap-6 max-w-5xl mx-auto">
      <SEO 
        title="Livestock Age Estimator | Rural Utility Cost"
        description="Estimate the approximate age of cattle based on teeth (dentition) and horn rings."
        jsonLd={jsonLd}
      />
      
      {/* Header */}
      <header className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-[#1a5f3f]" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Livestock Age Estimator</h1>
        </div>
        <p className="text-gray-600">Estimate approximate age using dentition (teeth eruption) and horn rings.</p>
        
        {/* Species Tabs */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {['Cattle', 'Goat', 'Sheep', 'Horse'].map(species => {
            const isCattle = species === 'Cattle';
            return (
              <button
                key={species}
                disabled={!isCattle}
                onClick={() => {}}
                className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isCattle 
                    ? 'bg-[#1a5f3f] text-white shadow-md' 
                    : 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed'
                }`}
              >
                {species} {!isCattle && <span className="text-xs ml-1 opacity-70">(Coming Soon)</span>}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main ref={resultRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col print-friendly">
        
        {/* Method Toggle */}
        <div className="flex flex-col sm:flex-row border-b border-gray-200 bg-gray-50 print:hidden">
          <button
            onClick={() => setEvaluationMethod('teeth')}
            className={`flex-1 py-4 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${
              evaluationMethod === 'teeth' ? 'text-[#1a5f3f] bg-white border-b-2 sm:border-b-4 border-[#1a5f3f]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bone className="w-5 h-5" /> Dentition (Teeth)
          </button>
          <button
            onClick={() => setEvaluationMethod('horns')}
            className={`flex-1 py-4 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${
              evaluationMethod === 'horns' ? 'text-[#1a5f3f] bg-white border-b-2 sm:border-b-4 border-[#1a5f3f]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Info className="w-5 h-5" /> Horn Rings
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {evaluationMethod === 'teeth' ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Visualizer & Info Pane (Left) */}
              <div className="xl:col-span-7 bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-start min-h-[400px]">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeStage.title}</h2>
                
                {results ? (
                  <div className="inline-block bg-green-50 text-[#1a5f3f] px-6 py-2 rounded-full font-bold text-xl mb-6 shadow-sm border border-green-200 text-center">
                    Estimated Age: {results.minMonths}-{results.maxMonths} mo ({results.minYears}-{results.maxYears} yrs)
                  </div>
                ) : (
                  <div className="inline-block bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-bold text-lg mb-6 shadow-sm border border-gray-200">
                    Est. Age: {activeStage.ageRef}
                  </div>
                )}
                
                {/* Clean SVG Illustration */}
                <div className="w-full max-w-sm bg-white rounded-xl shadow-inner border border-gray-100 p-6 mb-8 print:border-none print:shadow-none">
                  <JawIllustration pattern={displayPattern} />
                </div>
                
                <p className="text-gray-700 text-center text-lg max-w-md leading-relaxed mb-6">
                  {activeStage.desc}
                </p>

                {results && (
                  <div className="w-full max-w-md text-left bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-semibold text-gray-700">Confidence:</span>
                       <div className="flex items-center gap-1.5">
                         <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                            results.confidence === 'high' ? 'bg-green-500' :
                            results.confidence === 'medium' ? 'bg-yellow-400' :
                            'bg-red-500'
                          }`}></span>
                          <span className="capitalize font-medium text-gray-900 flex items-center">{results.confidence}</span>
                       </div>
                    </div>
                    <div className="text-sm text-gray-600 block">
                      <strong>Notes:</strong> {results.explanation}
                    </div>
                  </div>
                )}
                
                {activeStage.note && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-lg w-full max-w-md">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>{activeStage.note}</p>
                  </div>
                )}
              </div>

              {/* Stage Selector & Modifiers (Right) */}
              <div className="xl:col-span-5 space-y-6 flex flex-col">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    1. Select Dentition Stage
                  </h3>
                  <div className="space-y-2">
                    {livestockTeethStages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => setDentition(stage.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex flex-col ${
                          dentition === stage.id
                            ? 'border-[#1a5f3f] bg-green-50/50 shadow-sm'
                            : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-bold text-gray-900">{stage.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    2. Adjust Modifiers
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed Type</label>
                    <select 
                      value={breed}
                      onChange={(e) => setBreed(e.target.value as Breed)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1a5f3f] focus:border-[#1a5f3f] sm:text-sm bg-white"
                    >
                      <option value="british">British Cattle (Angus, Hereford)</option>
                      <option value="brahman-cross">Brahman / Bos Indicus Cross</option>
                      <option value="unknown">Unknown Breed</option>
                    </select>
                  </div>

                  {dentition !== 'milk' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tooth Wear Level</label>
                      <select 
                        value={wearLevel}
                        onChange={(e) => setWearLevel(e.target.value as WearLevel)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1a5f3f] focus:border-[#1a5f3f] sm:text-sm bg-white"
                      >
                        <option value="none">None / Minimal</option>
                        <option value="mild">Mild Wear</option>
                        <option value="moderate">Moderate Wear</option>
                        <option value="severe">Severe Wear (Broken-Mouth, Smooth)</option>
                      </select>
                    </div>
                  )}

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Secondary: Horn Rings (Optional)</label>
                      <input
                        type="number"
                        value={hornRings}
                        onChange={(e) => setHornRings(e.target.value)}
                        min="0"
                        step="1"
                        placeholder="e.g. 2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1a5f3f] focus:border-[#1a5f3f] sm:text-sm bg-white"
                      />
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto text-center space-y-8">
              <div className="bg-green-50 text-[#1a5f3f] p-6 rounded-full inline-flex border border-green-200">
                <Calculator className="w-16 h-16" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Horn Ring Estimator</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Count the visible growth rings on the cow's horn. Focus only on clearly defined rings, starting from the base.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <label htmlFor="rings" className="font-semibold text-gray-700">
                    Number of visible horn rings:
                  </label>
                  <input
                    id="rings"
                    type="number"
                    min="0"
                    max="20"
                    value={hornRings}
                    onChange={(e) => setHornRings(e.target.value)}
                    placeholder="e.g. 3"
                    className="text-center text-2xl p-4 w-32 rounded-xl border-2 border-gray-300 focus:border-[#1a5f3f] focus:ring-0 outline-none transition-colors"
                  />
                </div>
              </div>

              {results && evaluationMethod === 'horns' && (
                <div className="w-full bg-gray-50 border border-gray-200 p-6 rounded-2xl">
                  <span className="block text-gray-500 text-sm font-medium mb-1">Estimated Age</span>
                  <span className="block text-4xl font-bold text-[#1a5f3f]">
                    {results.minYears}-{results.maxYears} Years
                  </span>
                  <p className="mt-2 text-sm text-gray-600">{results.explanation}</p>
                </div>
              )}

              <div className="flex items-start gap-3 text-sm text-gray-500 bg-gray-100 p-4 rounded-xl text-left border border-gray-200">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                <p>
                  <strong>Rough Estimate Only:</strong> Horn rings provide only a rough estimate of age. The first ring typically appears at around 2-3 years of age, with one ring added per year thereafter. Stress, nutrition, and calving can affect ring clarity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <div className="flex justify-end mt-2">
         <ExportActions 
            title="Cattle Age Estimate" 
            targetRef={resultRef}
            data={results ? {
               minMonths: results.minMonths,
               maxMonths: results.maxMonths,
               confidence: results.confidence,
               method: results.methodUsed,
               notes: results.explanation
            } : undefined}
          />
      </div>

      {/* HOW TO CHECK TEETH GUIDE & AI FAQ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I correctly check a cow's teeth?</h3>
            <p className="text-gray-600 mb-2">
              Restrain the animal carefully in a squeeze chute. Wearing sturdy gloves, gently part the lips. Cattle only have bottom incisors; the top jaw features a hard "dental pad" used for grabbing grass.
            </p>
            <p className="text-gray-600">
              Count the permanent (adult) incisors. Milk teeth are smaller, triangular, and temporary. Permanent incisors are significantly larger, wider, and more rectangular. They erupt in pairs starting from the center and moving outwards.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does the breed change the estimated age?</h3>
            <p className="text-gray-600 mb-2">
              Different physiological traits dictate maturity speed. British breeds like Angus and Hereford tend to mature quickly, meaning their permanent teeth erupt earlier. 
            </p>
            <p className="text-gray-600">
              Brahman (Bos Indicus) influenced cattle mature slower, meaning their permanent incisors can erupt months later than their British counterparts. If breed is unknown, the age range must be widened to account for this variable.
            </p>
          </div>
          
          <div className="md:col-span-2">
             <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-md">
                <h3 className="text-sm font-bold text-orange-800 mb-1">Disclaimer: Official Records Required for Exact Age</h3>
                <p className="text-xs text-orange-700 max-w-3xl">
                  This calculator provides an approximate estimate based on physical eruption averages. Individual growth rates, breed influences, local nutrition, and severe grazing wear can all skew eruption and wear patterns. Do not use this tool as a veterinary diagnosis. If you need exact age certification, official birth records must be used.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
