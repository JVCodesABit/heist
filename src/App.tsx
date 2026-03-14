import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import CaseFile from "@/pages/CaseFile";
import EvidenceViewer from "@/pages/EvidenceViewer";
import Hypothesis from "@/pages/Hypothesis";
import Breakdown from "@/pages/Breakdown";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
