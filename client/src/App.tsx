/**
 * App.tsx — root component
 * Design: "Midnight Ops" dark dashboard
 * Stack: React Router v6, React Query, Zustand, shadcn/ui
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Overview from "@/pages/Overview";
import Inventory from "@/pages/Inventory";
import Posture from "@/pages/Posture";
import Activity from "@/pages/Activity";
import Policies from "@/pages/Policies";
import Login from "@/pages/Login";
import { isAuthenticated } from "@/lib/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  if (!isAuthenticated()) {
    return <Login />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/posture" element={<Posture />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Router />
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}