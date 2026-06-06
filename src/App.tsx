import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { A11yProvider } from './components/A11yProvider';
import { CookieBanner } from './components/CookieBanner';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import Home from './pages/Home';
import WaterFill from './features/WaterFill/WaterFill';
import Septic from './features/Septic/Septic';
import FillDirt from './features/FillDirt/FillDirt';
import Gravel from './features/Gravel/Gravel';
import Well from './features/Well/Well';
import Livestock from './features/Livestock/Livestock';
import Solar from './features/Solar/Solar';
import Internet from './features/Internet/Internet';
import Cable from './features/Cable/Cable';
import Fencing from './features/Fencing/Fencing';
import Propane from './features/Propane/Propane';
import Gestation from './features/Gestation/Gestation';
import Incubation from './features/Incubation/Incubation';
import CutCost from './features/CutCost/CutCost';
import ExpandProfit from './features/ExpandProfit/ExpandProfit';
import GrantFinder from './features/GrantFinder/GrantFinder';
import EnergyDemand from './features/EnergyDemand/EnergyDemand';
import RuralLand from './features/RuralLand/RuralLand';
import HabitatCost from './features/HabitatCost/HabitatCost';
import FoodProcessingCompliance from './features/FoodProcessingCompliance/FoodProcessingCompliance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';
import Contact from './pages/Contact';
import About from './pages/About';
import GeneratorHub from './pages/GeneratorHub';
import UtilityCostHub from './pages/UtilityCostHub';
import WaterPlanningHub from './pages/WaterPlanningHub';
import FarmCostsHub from './pages/FarmCostsHub';
import LandConstructionHub from './pages/LandConstructionHub';
import AgribusinessHub from './pages/AgribusinessHub';
import HiveStartup from './features/HiveStartup/HiveStartup';
import HoneyYield from './features/HoneyYield/HoneyYield';
import SyrupMix from './features/SyrupMix/SyrupMix';
import MeatYield from './features/MeatYield/MeatYield';
import MeatProcessing from './features/MeatProcessing/MeatProcessing';
import MeatCostPerLb from './features/MeatCostPerLb/MeatCostPerLb';
import LivestockAge from './features/LivestockAge/LivestockAge';
import GenRuntime from './features/GenRuntime/GenRuntime';
import GenFuelCost from './features/GenFuelCost/GenFuelCost';
import GenCriticalLoad from './features/GenCriticalLoad/GenCriticalLoad';
import PainPointPriority from './features/PainPointPriority/PainPointPriority';
import GrantReadiness from './features/GrantReadiness/GrantReadiness';

export default function App() {
  return (
    <A11yProvider>
      <GoogleAnalytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/generator-planning" element={<GeneratorHub />} />
          <Route path="/utility-cost" element={<UtilityCostHub />} />
          <Route path="/water-planning" element={<WaterPlanningHub />} />
          <Route path="/farm-costs" element={<FarmCostsHub />} />
          <Route path="/land-and-construction" element={<LandConstructionHub />} />
          <Route path="/agribusiness" element={<AgribusinessHub />} />
          <Route path="/water-fill" element={<WaterFill />} />
          <Route path="/septic" element={<Septic />} />
          <Route path="/fill-dirt" element={<FillDirt />} />
          <Route path="/gravel" element={<Gravel />} />
          <Route path="/well" element={<Well />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/solar" element={<Solar />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/cable" element={<Cable />} />
          <Route path="/fencing" element={<Fencing />} />
          <Route path="/propane" element={<Propane />} />
          <Route path="/rural-land" element={<RuralLand />} />
          <Route path="/habitat-cost" element={<HabitatCost />} />
          <Route path="/hive-startup" element={<HiveStartup />} />
          <Route path="/honey-yield" element={<HoneyYield />} />
          <Route path="/syrup-mix" element={<SyrupMix />} />
          <Route path="/meat-yield" element={<MeatYield />} />
          <Route path="/meat-processing" element={<MeatProcessing />} />
          <Route path="/meat-cost-per-lb" element={<MeatCostPerLb />} />
          <Route path="/livestock-age" element={<LivestockAge />} />
          <Route path="/gen-runtime" element={<GenRuntime />} />
          <Route path="/gen-fuel-cost" element={<GenFuelCost />} />
          <Route path="/gen-critical-load" element={<GenCriticalLoad />} />
          <Route path="/pain-point-priority" element={<PainPointPriority />} />
          <Route path="/grant-readiness" element={<GrantReadiness />} />
          <Route path="/energy-demand" element={<EnergyDemand />} />
          <Route path="/gestation" element={<Gestation />} />
          <Route path="/incubation" element={<Incubation />} />
          <Route path="/cut-cost" element={<CutCost />} />
          <Route path="/expand-profit" element={<ExpandProfit />} />
          <Route path="/grant-finder" element={<GrantFinder />} />
          <Route path="/compliance" element={<FoodProcessingCompliance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <CookieBanner />
    </A11yProvider>
  );
}
