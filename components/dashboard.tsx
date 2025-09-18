"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartGovernance } from "./smart-governance"
import { HistoricReports } from "./historic-reports"
import { ModeToggle } from "./mode-toggle"
import { RiskIntelligence } from "./risk-intelligence"
import { ProjectHealthCheck } from "./project-health-check"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">FireBreak Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="governance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="governance"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20"
            >
              Smart Governance
            </TabsTrigger>
            <TabsTrigger
              value="risk-intelligence"
              className="bg-gradient-to-r from-violet-500 to-purple-500 data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20"
            >
              Risk Intelligence
            </TabsTrigger>
            <TabsTrigger
              value="historic-reports"
              className="bg-gradient-to-r from-purple-500 to-violet-500 data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20"
            >
              Historic Reports
            </TabsTrigger>
            <TabsTrigger
              value="project-health"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20"
            >
              Project Health Check
            </TabsTrigger>
          </TabsList>

          <TabsContent value="governance" className="space-y-4">
            <SmartGovernance />
          </TabsContent>

          <TabsContent value="risk-intelligence" className="space-y-4">
            <RiskIntelligence />
          </TabsContent>

          <TabsContent value="historic-reports" className="space-y-4">
            <HistoricReports />
          </TabsContent>

          <TabsContent value="project-health" className="space-y-4">
            <ProjectHealthCheck />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
