import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { A11yProvider } from './components/A11yProvider';
import { CookieBanner } from './components/CookieBanner';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { FavoritesProvider } from './features/favorites/favoritesHook';
import Home from './pages/Home';

// Lazy load FavoritesPage if needed, but direct import is fine for now
import FavoritesPage from './features/favorites/FavoritesPage';

import WaterFill from './features/calculators/WaterFill/WaterFill';
import Septic from './features/calculators/Septic/Septic';
import FillDirt from './features/calculators/FillDirt/FillDirt';
import Gravel from './features/calculators/Gravel/Gravel';
import Well from './features/calculators/Well/Well';
import Livestock from './features/calculators/Livestock/Livestock';
import Solar from './features/calculators/Solar/Solar';
import Internet from './features/calculators/Internet/Internet';
import Cable from './features/calculators/Cable/Cable';
import Fencing from './features/calculators/Fencing/Fencing';
import Propane from './features/calculators/Propane/Propane';
import Gestation from './features/calculators/Gestation/Gestation';
import Incubation from './features/calculators/Incubation/Incubation';
import CutCost from './features/calculators/CutCost/CutCost';
import ExpandProfit from './features/calculators/ExpandProfit/ExpandProfit';
import GrantFinder from './features/calculators/GrantFinder/GrantFinder';
import EnergyDemand from './features/calculators/EnergyDemand/EnergyDemand';
import RuralLand from './features/calculators/RuralLand/RuralLand';
import HabitatCost from './features/calculators/HabitatCost/HabitatCost';
import FoodProcessingCompliance from './features/calculators/FoodProcessingCompliance/FoodProcessingCompliance';
import FarmInputCost from './features/farm-input-cost/FarmInputCost';
import CropPestEconomics from './features/crop-pest-economics/CropPestEconomics';
import FreeResourcesPage from './features/free-resources/FreeResourcesPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';
import Contact from './pages/Contact';
import About from './pages/About';
import FarmFinanceLandingPage from './features/farm-finance/index';
import LoanPaymentPage from './features/farm-finance/loan-payment/LoanPaymentPage';
import EquipmentPaymentPage from './features/farm-finance/equipment-payment/EquipmentPaymentPage';
import LandAffordabilityPage from './features/farm-finance/land-affordability/LandAffordabilityPage';
import GeneratorHub from './pages/GeneratorHub';
import UtilityCostHub from './pages/UtilityCostHub';
import WaterPlanningHub from './pages/WaterPlanningHub';
import FarmCostsHub from './pages/FarmCostsHub';
import LandConstructionHub from './pages/LandConstructionHub';
import AgribusinessHub from './pages/AgribusinessHub';
import HiveStartup from './features/calculators/HiveStartup/HiveStartup';
import HoneyYield from './features/calculators/HoneyYield/HoneyYield';
import SyrupMix from './features/calculators/SyrupMix/SyrupMix';
import MeatYield from './features/calculators/MeatYield/MeatYield';
import MeatProcessing from './features/calculators/MeatProcessing/MeatProcessing';
import MeatCostPerLb from './features/calculators/MeatCostPerLb/MeatCostPerLb';
import LivestockAge from './features/calculators/LivestockAge/LivestockAge';
import CattleGrowthChart from './features/calculators/CattleGrowthChart/CattleGrowthChart';
import GenRuntime from './features/calculators/GenRuntime/GenRuntime';
import GenFuelCost from './features/calculators/GenFuelCost/GenFuelCost';
import GenCriticalLoad from './features/calculators/GenCriticalLoad/GenCriticalLoad';
import PainPointPriority from './features/calculators/PainPointPriority/PainPointPriority';
import GrantReadiness from './features/calculators/GrantReadiness/GrantReadiness';

import Sources from './pages/Sources';
import Credits from './pages/Credits';
import Partners from './pages/Partners';
import AdsDemo from './pages/AdsDemo';

export default function App() {
  return (
    <FavoritesProvider>
      <A11yProvider>
        <GoogleAnalytics />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/free-resources" element={<FreeResourcesPage />} />
          <Route path="/generator-planning" element={<GeneratorHub />} />
          <Route path="/utility-cost" element={<UtilityCostHub />} />
          <Route path="/water-planning" element={<WaterPlanningHub />} />
          <Route path="/farm-costs" element={<FarmCostsHub />} />
          <Route path="/farm-inputs" element={<FarmInputCost />} />
          <Route path="/farm-finance" element={<FarmFinanceLandingPage />} />
          <Route path="/farm-finance/loan-payment" element={<LoanPaymentPage />} />
          <Route path="/farm-finance/equipment-payment" element={<EquipmentPaymentPage />} />
          <Route path="/farm-finance/land-affordability" element={<LandAffordabilityPage />} />
          <Route path="/crop-pest-economics" element={<CropPestEconomics />} />
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
          <Route path="/cattle-growth-chart" element={<CattleGrowthChart />} />
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
          <Route path="/sources" element={<Sources />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/ads-demo" element={<AdsDemo />} />
        </Routes>
      </Layout>
      <CookieBanner />
      </A11yProvider>
    </FavoritesProvider>
  );
}
