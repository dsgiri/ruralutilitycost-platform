import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Battery, Droplet, Zap, ChevronRight, Info } from 'lucide-react';

export default function GeneratorHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I choose the right size generator for a rural property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Identify your critical loads (well pump, refrigerator, essential heating). Add up their combined running wattage and their starting wattage requirements to determine the minimum generator size."
        }
      },
      {
        "@type": "Question",
        "name": "How much fuel does a backup generator use during an outage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fuel consumption varies greatly by load and generator type. A typical portable generator might use 0.5 to 1 gallon of gas per hour, while standby generators can use 1-2 gallons of propane per hour under full load."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Rural Generator Planning Hub" 
        description="Comprehensive tools and calculators for planning rural backup power. Estimate runtime, fuel costs, and required generator sizing for well pumps and critical house loads."
        url="/generator-planning"
        jsonLd={jsonLd}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Rural Generator Planning Hub</h1>
        <p className="text-xl text-gray-600">
          Everything you need to size, budget, and plan for backup power on a rural property. Our suite of calculators helps you take the guesswork out of off-grid readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Hub to Calculator internal links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Zap className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Critical Load Sizing</h2>
          <p className="text-gray-600 mb-4">
            Figure out exactly how large your generator needs to be to run a well pump and essential appliances without stalling out.
          </p>
          <Link to="/gen-critical-load" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Sizing <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Droplet className="text-green-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fuel Cost Estimator</h2>
          <p className="text-gray-600 mb-4">
            Budget for extended outages. Estimate how much you're going to spend on diesel, gasoline, or propane per day or week.
          </p>
          <Link to="/gen-fuel-cost" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Estimate Fuel Cost <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Battery className="text-purple-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Runtime Calculator</h2>
          <p className="text-gray-600 mb-4">
            Input your generator's tank capacity, fuel consumption rate, and tank level to find out when the lights will actually go out.
          </p>
          <Link to="/gen-runtime" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Runtime <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">How do I choose the right size generator for a rural property?</h3>
            <p className="text-gray-600">Identify your critical loads (well pump, refrigerator, essential heating). Add up their combined running wattage and their starting wattage requirements to determine the minimum generator size. Starting a 240V well pump requires a massive initial surge compared to its running load.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">How much fuel does a backup generator use during an outage?</h3>
            <p className="text-gray-600">Fuel consumption varies greatly by load and generator type. A typical 7,500W portable generator might use 0.5 to 1 gallon of gas per hour, while 20kW standby generators can use 1.5-2.5 gallons of propane per hour under heavy load. Always plan for a 50% load as your baseline average.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Pro-Tip for Rural Planners</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Consider staggering your heavy loads. If you can fill your water pressure tank and warm the house at different times, you can often buy a much smaller, more fuel-efficient generator.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
