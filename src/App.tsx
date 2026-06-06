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

export default function App() {
  return (
    <A11yProvider>
      <GoogleAnalytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
