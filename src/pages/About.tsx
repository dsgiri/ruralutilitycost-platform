import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Target, Lightbulb, Calculator, CheckCircle2, ShieldCheck, Compass, Map, LineChart, Network } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <SEO 
        title="About Us | Rural Utility Cost" 
        description="Learn why Rural Utility Cost exists, how our calculators help rural users make smarter decisions, and explore our specialized subdomains for planning and predicting."
        keywords={['rural calculators', 'farm planning tools', 'cost calculators', 'forecasting tools', 'scenario calculators', 'rural decision tools']}
      />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16 px-4 shadow-sm shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Better decisions for rural living.
          </h1>
          <p className="text-gray-600 text-lg sm:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Rural Utility Cost exists to help farmers, ranchers, and rural property owners make practical decisions with simple, useful calculators and planning tools.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-grow bg-slate-50 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Compass className="h-6 w-6 text-[#1a5f3f]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We aim to become the most trusted destination for rural planning, forecasting, and scenario-based decision support. Our vision is a future where rural decision-makers save time, reduce uncertainty, and make smarter choices with confidence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-[#1a5f3f]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We build clear, easy-to-use tools that help users understand costs, compare choices, forecast outcomes, and plan with confidence. We turn guesswork into actionable math.
              </p>
            </div>
          </div>

          {/* What We Build */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight flex items-center gap-3">
              <Calculator className="h-8 w-8 text-[#1a5f3f]" /> What We Build
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-3xl">
              Every tool we build is designed to answer a specific question quickly, with simple inputs and meaningful outputs. We don't build generic spreadsheets; we build practical calculators that solve real problems.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900">Farm Finance & Budgets</h3>
                  <p className="text-sm text-gray-600 mt-1">Farm budget calculators, land affordability, and equipment payments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900">Input & Production</h3>
                  <p className="text-sm text-gray-600 mt-1">Fertilizer, seed cost tools, cattle growth, and livestock management.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900">Scenarios & What-Ifs</h3>
                  <p className="text-sm text-gray-600 mt-1">Tools to test different scenarios and compare the financial outcomes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900">Forecasting & Predictions</h3>
                  <p className="text-sm text-gray-600 mt-1">Track trends and use model-based predictors for future outlooks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subdomains */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-3 border-b border-gray-100 pb-6">
              <Network className="h-8 w-8 text-[#1a5f3f]" /> The Rural Utility Ecosystem
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-3xl">
              We organize our capabilities into specialized subdomains to give you the exact environment you need for different types of decision-making.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
                <Map className="w-8 h-8 text-[#1a5f3f] mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">plan.ruralutilitycost.com</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The foundation. Use this space for tactical planning, budgeting, and preparing for known costs. When you need to know exactly what a fence or a well will cost today, start here.
                </p>
              </div>

              <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
                <LineChart className="w-8 h-8 text-[#1a5f3f] mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">forecast.ruralutilitycost.com</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The horizon. Use this environment for trend analysis and future outlooks. Understand how changing fuel prices or feed costs might affect your margins next season.
                </p>
              </div>

              <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
                <Calculator className="w-8 h-8 text-[#1a5f3f] mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">whatif.ruralutilitycost.com</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The sandbox. Test scenarios and compare outcomes side-by-side. "What if I buy 20 more head of cattle vs upgrade my tractor?" Compare the exact financial tradeoffs.
                </p>
              </div>

              <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
                <Target className="w-8 h-8 text-[#1a5f3f] mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">predictor.ruralutilitycost.com</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The models. Access model-based predictions and confidence-based insights. For advanced decision-makers looking for data-driven probabilities on crop yields or market timing.
                </p>
              </div>
            </div>
          </div>

          {/* How Our Tools Help */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">How We Help You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Save Time</h3>
                  <p className="text-gray-600 text-sm">Get answers faster. Stop wrestling with broken spreadsheets and get straight to the math that matters.</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Compare Decisions</h3>
                  <p className="text-gray-600 text-sm">Understand the financial tradeoffs and compare choices before you spend any real money.</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Reduce Guesswork</h3>
                  <p className="text-gray-600 text-sm">Turn complex, overwhelming choices into clear sequential steps backed by practical formulas.</p>
               </div>
            </div>
          </div>

          {/* Why Trust Us */}
          <div className="bg-[#1a5f3f] rounded-3xl p-8 sm:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6 tracking-tight flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-green-300" /> Why Trust Us
            </h2>
            <div className="space-y-6 text-green-50 text-lg leading-relaxed max-w-3xl">
              <p>
                We focus on useful over flashy. We prioritize clarity and mathematical accuracy, avoiding industry fluff and marketing hype.
              </p>
              <p>
                We design our tools for real-world rural decisions. We keep our assumptions visible—never hiding the math in a black box—so you can easily verify and understand the logic behind every outcome.
              </p>
              <p className="text-sm text-green-200 italic mt-8 border-t border-green-800 pt-6">
                * Note: Our calculators are meant to support your decision-making and planning processes, not replace the judgment of local certified experts, accountants, or agronomists.
              </p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center pt-8 pb-12">
             <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg">
               Explore Calculators
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
