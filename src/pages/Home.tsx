import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Droplet, LayoutGrid, Shovel, Trees, ArrowDownToDot, PawPrint, Sun, Wifi, Tv, ArrowRight, CheckCircle2, Flame, Crop, CalendarHeart, Bird, Scissors, TrendingUp, Search, Zap, ShieldCheck, Map, Leaf } from 'lucide-react';

const calculatorCategories = [
  {
    title: "Property & Construction",
    desc: "Building, land prep, site work",
    items: [
      {
        path: '/rural-land',
        title: 'Rural Land Value',
        desc: 'Estimate selling proceeds or evaluate a parcel\'s suitability score for buying.',
        icon: Map,
        features: ['Net Proceeds Est.', 'Buyer Suitability Score', 'Cost to improve', 'Red flag analysis'],
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
      },
      {
        path: '/septic',
        title: 'Septic Tank Size',
        desc: 'Calculate the right septic tank size based on bedrooms, state codes, and soil type.',
        icon: LayoutGrid,
        features: ['EPA sizing formulas', 'Soil type impact', 'State requirements', 'Installation cost est.'],
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
      },
      {
        path: '/fill-dirt',
        title: 'Fill Dirt Cost',
        desc: 'Calculate fill dirt cost for grading, backfill, landscaping, and construction.',
        icon: Shovel,
        features: ['Cubic yards to tons', 'Delivery fee guide', 'Regional cost averages', 'Truckload count'],
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
      },
      {
        path: '/gravel',
        title: 'Gravel Cost',
        desc: 'Calculate gravel cost per ton for driveways, landscaping, and base materials.',
        icon: Trees,
        features: ['Crushed, Pea, River', 'Volume to weight', 'Delivery fee guide', 'Driveway depth guide'],
        color: 'text-stone-600',
        bg: 'bg-stone-50',
        border: 'border-stone-200',
      },
      {
        path: '/fencing',
        title: 'Fencing Cost',
        desc: 'Estimate the cost of rural fencing, including barbed wire, woven wire, wood, and electric.',
        icon: Crop,
        features: ['Material type pricing', 'Gate cost additions', 'Labor estimation', 'Custom perimeters'],
        color: 'text-lime-600',
        bg: 'bg-lime-50',
        border: 'border-lime-100',
      },
      {
        path: '/well',
        title: 'Well Water Drilling',
        desc: 'Calculate well drilling cost per foot based on depth, soil type, and region.',
        icon: ArrowDownToDot,
        features: ['Cost by soil type', 'Pump hardware estimates', 'Dry-hole warnings', 'Overall system cost'],
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-100',
      }
    ]
  },
  {
    title: "Energy & Utilities",
    desc: "Water, propane, solar, internet, power",
    items: [
      {
        path: '/energy-demand',
        title: 'Peak Energy Demand',
        desc: 'Calculate peak kW demand charges by simulating simultaneous household appliance usage patterns.',
        icon: Zap,
        features: ['15-minute interval est.', 'Staggering advice', 'kW vs kWh impact', 'Rural co-op rates'],
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        border: 'border-violet-100',
      },
      {
        path: '/water-fill',
        title: 'Water Fill Charge',
        desc: 'Calculate water delivery cost for rural homes, wells, septic, and pools.',
        icon: Droplet,
        features: ['Base delivery fees', 'Mileage calculations', 'Potable vs Non-potable', 'Truckload estimates'],
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
      },
      {
        path: '/propane',
        title: 'Propane Refill',
        desc: 'Calculate cost and volume to refill residential and agricultural propane tanks.',
        icon: Flame,
        features: ['80% max safe fill', 'Gallon estimates', 'Total cost estimation', 'Tank size selection'],
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
      },
      {
        path: '/solar',
        title: 'Off-Grid Solar',
        desc: 'Calculate solar panel and battery size for off-grid homes, cabins, and homesteads.',
        icon: Sun,
        features: ['Load profiling', 'Battery DoD sizing', 'Inverter inefficiency', 'Panel count by sun hours'],
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-100',
      },
      {
        path: '/internet',
        title: 'Rural Internet Cost',
        desc: 'Compare internet options for rural homes: Starlink, 5G cell tower, DSL, fiber, cable.',
        icon: Wifi,
        features: ['Provider availability', 'Speed comparisons', 'Price analysis', 'Mesh network alerts'],
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
      },
      {
        path: '/cable',
        title: 'Cable TV Cost',
        desc: 'Compare cable TV package costs: Satellite, Streaming Bundles by ZIP.',
        icon: Tv,
        features: ['Dish vs DirecTV', 'Streaming alternatives', 'Hardware fee warnings', 'Channel volume comparison'],
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
      }
    ]
  },
  {
    title: "Agriculture & Habitat",
    desc: "Habitats, livestock, breeding, poultry",
    items: [
      {
        path: '/habitat-cost',
        title: 'Habitat Restoration Cost',
        desc: 'Estimate site prep, seed, planting, and protection costs for converting acreage to native habitat.',
        icon: Leaf,
        features: ['Pollinator & Forest presets', 'Site prep included', 'Tree protection costs', 'NRCS Grant context'],
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
      },
      {
        path: '/livestock',
        title: 'Livestock Water',
        desc: 'Calculate daily water needs for cattle, sheep, goats, horses, pigs, and chickens.',
        icon: PawPrint,
        features: ['USDA water guidelines', 'Temperature adjustments', 'Lactation overhead', 'Trough sizing'],
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
      },
      {
        path: '/gestation',
        title: 'Animal Gestation',
        desc: 'Estimate due dates for livestock and farm animals based on breeding and service dates.',
        icon: CalendarHeart,
        features: ['Multiple animal types', 'Forward/backward dates', 'Gestation length', 'Due date calculation'],
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
      },
      {
        path: '/incubation',
        title: 'Egg Incubation',
        desc: 'Calculate chicken egg hatch dates, lockdown day, and stop-turning date for poultry.',
        icon: Bird,
        features: ['Set date tracking', 'Lockdown day', 'Stop turning dates', 'Multiple bird species'],
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
      }
    ]
  },
  {
    title: "Business & Profit",
    desc: "Revenue, savings, profit planning",
    items: [
      {
        path: '/cut-cost',
        title: 'Cut Cost Calculator',
        desc: 'Estimate the expense reduction needed to hit profit targets for your business.',
        icon: Scissors,
        features: ['Monthly savings targets', 'Profit margin optimization', 'Variable vs fixed splits', 'Annual savings tracking'],
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
      },
      {
        path: '/expand-profit',
        title: 'Expand Profit Calculator',
        desc: 'Calculate the required revenue growth to reach break-even or target margins.',
        icon: TrendingUp,
        features: ['Revenue forecasting', 'Profit targeting', 'Margin impact analysis', 'Break-even assessment'],
        color: 'text-fuchsia-600',
        bg: 'bg-fuchsia-50',
        border: 'border-fuchsia-100',
      },
      {
        path: '/compliance',
        title: 'Food Processing Compliance',
        desc: 'Estimate organic certification costs, calculate organic label %, and assess FDA inspection readiness.',
        icon: ShieldCheck,
        features: ['Organic Cert Fee Est.', 'Label % Calculator', 'Exclude water/salt rules', 'FDA Readiness Score'],
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        border: 'border-sky-100',
      }
    ]
  },
  {
    title: "Government Aid & Grants",
    desc: "Funding, rebates, eligibility",
    items: [
      {
        path: '/grant-finder',
        title: 'Grant & Aid Finder',
        desc: 'Search for static government programs, rebates, and aid fitting your business.',
        icon: Search,
        features: ['USDA & SBA loans', 'Sector-based search', 'Disaster relief resources', 'Eligibility basics'],
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
      }
    ]
  },
  {
    title: "Home Services / Rural Living",
    desc: "Misc rural living tools",
    items: []
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = calculatorCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="flex flex-col w-full h-full">
      <SEO 
        title="Rural Utility Cost Calculators - Water, Septic, Well, Solar, Internet & More" 
        description="Free online calculators for rural homeowners. Calculate water fill cost, septic tank size, well drilling cost, fill dirt, gravel, solar battery, livestock water, internet & cable TV."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Rural Utility Cost Calculators",
          "url": "https://ruralutilitycost.com",
          "description": "Free online calculators for rural homeowners and off-grid living."
        }}
      />
      
      {/* CALCULATOR GRID & UTILITY SEARCH (COMMAND CENTER) */}
      <section className="px-4 py-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">Calculation Tools</h1>
            <p className="text-gray-500 font-medium tracking-wide">Select a utility to start calculating, or search for a specific tool.</p>
          </div>
          
          <div className="w-full md:w-[400px] relative shadow-sm shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools, features, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border-gray-200 rounded-xl focus:ring-[#1a5f3f] focus:border-[#1a5f3f] text-gray-900 placeholder-gray-400 text-base shadow-sm bg-white"
            />
          </div>
        </div>

        <div className="space-y-16">
          {filteredCategories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No calculators found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#1a5f3f] hover:underline font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category, catIdx) => {
              if (category.items.length === 0) return null;
              return (
              <div key={catIdx} className="space-y-6">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-500 mt-1">{category.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((calc, idx) => {
                    const Icon = calc.icon;
                    return (
                      <Link key={idx} to={calc.path} className="group h-full min-h-[340px] flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className={`p-6 pb-5 border-b ${calc.border} flex items-start gap-4 transition-colors duration-300 group-hover:${calc.bg}`}>
                          <div className={`p-3 rounded-xl bg-white shadow-sm border ${calc.border}`}>
                            <Icon className={`w-7 h-7 ${calc.color}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1a5f3f] transition-colors">{calc.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{calc.desc}</p>
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <ul className="space-y-3 flex-grow mb-6">
                            {calc.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-auto flex items-center justify-between text-sm font-bold text-white bg-[#1a5f3f] group-hover:bg-[#154d32] transition-colors p-3.5 rounded-xl uppercase tracking-wider shadow-sm">
                            <span>Calculate Now</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            );
            })
          )}
        </div>
      </section>
      
      {/* FAQ SECTION */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">FAQs About Rural Utility Costs</h2>
            <div className="h-1 w-16 bg-[#1a5f3f] mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Why are rural utility costs generally higher than urban?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Urban environments benefit from massive economies of scale. High-density housing divides the cost of municipal sewer pipes, water mains, and internet fiber among thousands of users per square mile. In rural environments, you bear 100% of the infrastructure cost for the final mile to your home (e.g., drilling the well or installing the satellite dish).</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are these estimates accurate for 2026?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Yes, our formulas embed baseline costs projected for 2026, accounting for inflation and current aggregate demands. However, isolated rural properties far from supplier depots will always incur higher delivery and mileage surcharges than standard regional averages.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How frequently is the data updated?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We cross-reference our price matrices quarterly using data from USDA guidelines, EPA code updates, and commercial provider tariffs (like Starlink rate sheets, or regional gravel quarry averages).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
