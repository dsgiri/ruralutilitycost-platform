import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { A11yProvider } from './components/A11yProvider';
import { CookieBanner } from './components/CookieBanner';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import Home from './pages/Home';
import WaterFill from './pages/WaterFill';
import Septic from './pages/Septic';
import FillDirt from './pages/FillDirt';
import Gravel from './pages/Gravel';
import Well from './pages/Well';
import Livestock from './pages/Livestock';
import Solar from './pages/Solar';
import Internet from './pages/Internet';
import Cable from './pages/Cable';
import Fencing from './pages/Fencing';
import Propane from './pages/Propane';
import Gestation from './pages/Gestation';
import Incubation from './pages/Incubation';
import CutCost from './pages/CutCost';
import ExpandProfit from './pages/ExpandProfit';
import GrantFinder from './pages/GrantFinder';
import EnergyDemand from './pages/EnergyDemand';
import RuralLand from './pages/RuralLand';
import HabitatCost from './pages/HabitatCost';
import FoodProcessingCompliance from './pages/FoodProcessingCompliance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';
import Contact from './pages/Contact';
import About from './pages/About';
import HiveStartup from './pages/HiveStartup';
import HoneyYield from './pages/HoneyYield';
import SyrupMix from './pages/SyrupMix';
import MeatYield from './pages/MeatYield';
import MeatProcessing from './pages/MeatProcessing';
import MeatCostPerLb from './pages/MeatCostPerLb';
import GenRuntime from './pages/GenRuntime';
import GenFuelCost from './pages/GenFuelCost';
import GenCriticalLoad from './pages/GenCriticalLoad';
import PainPointPriority from './pages/PainPointPriority';
import GrantReadiness from './pages/GrantReadiness';

export default function App() {
  return (
    <A11yProvider>
      <GoogleAnalytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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
