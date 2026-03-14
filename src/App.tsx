import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Landing048 from "@/pages/Landing048";
import CaseFile from "@/pages/CaseFile";
import CaseFile048 from "@/pages/CaseFile048";
import EvidenceViewer from "@/pages/EvidenceViewer";
import Hypothesis from "@/pages/Hypothesis";
import Hypothesis048 from "@/pages/Hypothesis048";
import Breakdown from "@/pages/Breakdown";
import Breakdown048 from "@/pages/Breakdown048";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner
        toastOptions={{
          className: 'font-typewriter bg-bg-elevated border-border text-foreground',
        }}
      />
      <BrowserRouter>
        <NavBar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-047" element={<Landing />} />
            <Route path="/case" element={<CaseFile />} />
            <Route path="/evidence/:type" element={<EvidenceViewer />} />
            <Route path="/hypothesis" element={<Hypothesis />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/profile" element={<Profile />} />
            {/* Case 048 routes */}
            <Route path="/case-048" element={<Landing048 />} />
            <Route path="/case-048/evidence" element={<CaseFile048 />} />
            <Route path="/case-048/evidence/:type" element={<EvidenceViewer />} />
            <Route path="/case-048/hypothesis" element={<Hypothesis048 />} />
            <Route path="/case-048/breakdown" element={<Breakdown048 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
