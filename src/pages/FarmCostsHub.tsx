import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Tractor, Bug, Beef, CalendarClock, ChevronRight, Info } from 'lucide-react';

export default function FarmCostsHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate the cost of raising livestock?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Livestock costs include the initial purchase price, daily feed consumption rates, veterinary care, infrastructure (fencing/shelter), and processing fees. Calculating feed cost per head per day is usually your largest ongoing expense."
        }
      },
      {
        "@type": "Question",
        "name": "Is raising your own beef cheaper than buying it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your feed costs and pasture quality. If you have free, high-quality grass, raising beef can be cost-effective. However, if you must buy all your hay and grain, commercial beef might be cheaper. Doing the math on feed-to-weight conversion is critical."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Farm & Livestock Costs Hub" 
        description="Calculators and planning tools for managing agricultural and livestock costs, from raising cattle to starting a commercial apiary."
        url="/farm-costs"
        jsonLd={jsonLd}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Farm & Livestock Costs Hub</h1>
        <p className="text-xl text-gray-600">
          Make data-driven decisions on the farm. Budget for feed costs, track processing yields, manage breeding schedules, and plan apiary startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Tractor className="text-amber-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Livestock Budget</h2>
          <p className="text-gray-600 mb-4">
            Calculate the exact cost of raising an animal from purchase to harvest, factoring in daily feed rates and vet care.
          </p>
          <Link to="/livestock" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Feed Costs <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-rose-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Beef className="text-rose-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Meat & Processing</h2>
          <p className="text-gray-600 mb-4">
            Estimate live weight to hanging weight yields, and calculate your true cost per pound of packaged meat.
          </p>
          <Link to="/meat-cost-per-lb" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Meat Cost <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Bug className="text-yellow-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Apiary & Beekeeping</h2>
          <p className="text-gray-600 mb-4">
            Start a beekeeping operation by budgeting for hives, nucs/packages, equipment, and estimating honey yields.
          </p>
          <Link to="/hive-startup" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Plan Apiary <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <CalendarClock className="text-emerald-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Breeding & Gestation</h2>
          <p className="text-gray-600 mb-4">
            Track serving dates and calculate expected birth windows for cows, pigs, goats, sheep, and other farm animals.
          </p>
          <Link to="/gestation" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Dates <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Beef className="text-indigo-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Livestock Age Estimator</h2>
          <p className="text-gray-600 mb-4">
            Estimate the approximate age of a cow or steer using dentition (teeth eruption) and wear stages.
          </p>
          <Link to="/livestock-age" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Estimate Age <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">Why is feed conversion ratio (FCR) important?</h3>
            <p className="text-gray-600">FCR measures how many pounds of feed it takes to produce one pound of animal body weight. Improving your FCR or buying animals genetically predisposed to better FCRs will drastically lower your total cost to raise livestock, as feed is your highest variable cost.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">What is hanging weight vs. packaged weight?</h3>
            <p className="text-gray-600">Live weight is the animal on the hoof. Hanging weight is after the animal is dispatched and skinned/gutted (typically 60% of live weight for beef). Packaged weight is what you put in the freezer after de-boning and trimming (often 60-70% of hanging weight).</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Pro-Tip for Farmers</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Always budget 10-15% extra for veterinary emergencies, equipment failure, or unexpected feed price spikes due to local droughts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
