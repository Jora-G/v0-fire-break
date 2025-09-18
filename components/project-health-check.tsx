"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  DollarSign,
  Settings,
  Download,
  Brain,
  RotateCcw,
} from "lucide-react"

// Sample project scenarios for demonstration
const projectScenarios = [
  {
    name: "ERP Implementation Failure",
    documents: [
      "ERP_Business_Case_v2.1.pptx",
      "Project_Charter_Final.docx",
      "Budget_Tracking_Q3.xlsx",
      "Risk_Register_Current.xlsx",
      "Vendor_Contracts_SAP.pdf",
    ],
    healthScores: {
      valueDelivery: 25,
      managementGovernance: 35,
      resourcesCosts: 20,
    },
    findings: {
      valueDelivery: {
        "1.1": {
          score: 30,
          status: "Critical",
          findings: [
            "Business case objectives misaligned with actual implementation scope",
            "No clear linkage between ERP capabilities and strategic business priorities",
            "ROI calculations based on outdated assumptions from 2019",
          ],
          recommendations: [
            "Realign project scope with original business case or update business case",
            "Establish clear traceability matrix between business strategy and ERP modules",
            "Recalculate ROI based on current market conditions and business requirements",
          ],
          evidence: ["ERP_Business_Case_v2.1.pptx (slides 12-15)", "Project_Charter_Final.docx (section 3.2)"],
        },
        "1.2": {
          score: 20,
          status: "Critical",
          findings: [
            "No defined benefits realization plan found in any documentation",
            "Success metrics are vague and not measurable (e.g., 'improve efficiency')",
            "No baseline measurements established for comparison",
          ],
          recommendations: [
            "Develop comprehensive benefits realization framework with SMART metrics",
            "Establish baseline measurements for all claimed benefits",
            "Create benefits tracking dashboard with regular review cycles",
          ],
          evidence: ["ERP_Business_Case_v2.1.pptx (slides 8-10)", "No benefits plan document found"],
        },
      },
      managementGovernance: {
        "2.1": {
          score: 40,
          status: "High Risk",
          findings: [
            "PMO structure unclear with overlapping responsibilities between IT and Business teams",
            "No clear escalation paths defined for critical decisions",
            "Governance board meetings irregular (last meeting 6 weeks ago)",
            "Absence of formal change control processes leading to scope creep",
            "Lack of documented decision-making framework impacting project velocity",
          ],
          recommendations: [
            "Clarify PMO structure with defined RACI matrix for all key roles",
            "Establish weekly governance rhythm with clear decision-making authority",
            "Implement structured escalation process for issues and risks",
            "Establish a change control board and document change management processes",
            "Define a clear decision-making framework with defined roles and responsibilities",
          ],
          evidence: [
            "Project_Charter_Final.docx (section 5.1)",
            "Meeting minutes gap identified",
            "No change control log found",
          ],
        },
        "2.2": {
          score: 25,
          status: "Critical",
          findings: [
            "Project timeline has slipped 8 months with no updated schedule",
            "Critical path dependencies not identified or managed",
            "No contingency planning for key milestones",
            "Inconsistent status reporting practices hindering transparency",
          ],
          recommendations: [
            "Conduct full schedule rebaseline with realistic timelines",
            "Implement critical path method with dependency management",
            "Develop contingency plans for all critical milestones",
            "Establish consistent status reporting templates and frequencies",
          ],
          evidence: [
            "Budget_Tracking_Q3.xlsx (Timeline tab)",
            "No current project schedule found",
            "Inconsistent status reports",
          ],
        },
      },
      resourcesCosts: {
        "3.1": {
          score: 15,
          status: "Critical",
          findings: [
            "Budget overrun of 180% with no updated forecasting",
            "No cost tracking below program level - no visibility into module costs",
            "Financial reporting inconsistent and delayed by 6 weeks",
          ],
          recommendations: [
            "Implement immediate cost control measures and spending freeze",
            "Establish module-level cost tracking with weekly reporting",
            "Engage CFO for emergency budget review and reforecasting",
          ],
          evidence: ["Budget_Tracking_Q3.xlsx shows 180% overrun", "No detailed cost breakdown available"],
        },
        "3.2": {
          score: 30,
          status: "Critical",
          findings: [
            "Key technical resources departed with no knowledge transfer",
            "Skills gap analysis shows 60% of team lacks required ERP expertise",
            "No resource contingency planning for critical roles",
          ],
          recommendations: [
            "Conduct immediate skills assessment and training needs analysis",
            "Engage specialized ERP consultants for knowledge transfer",
            "Develop resource contingency plans for all critical roles",
          ],
          evidence: ["No resource management plan found", "HR departure records indicate knowledge loss"],
        },
        "3.3": {
          score: 15,
          status: "Critical",
          findings: [
            "SAP contract terms unfavorable with significant penalty clauses",
            "No vendor performance management or SLA monitoring",
            "Multiple vendor conflicts due to unclear contract boundaries",
          ],
          recommendations: [
            "Renegotiate SAP contract terms or engage legal for penalty mitigation",
            "Implement vendor performance dashboard with SLA tracking",
            "Clarify vendor responsibilities and resolve boundary conflicts",
          ],
          evidence: ["Vendor_Contracts_SAP.pdf (penalty clauses section 12)", "No vendor management framework found"],
        },
      },
    },
  },
]

export function ProjectHealthCheck() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [currentScenario, setCurrentScenario] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const analyzeDocuments = async () => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)

    setAnalysisStep("Connecting to data sources...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAnalysisStep("Extracting content from PowerPoint presentations...")
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setAnalysisStep("Analyzing Excel spreadsheets and financial data...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAnalysisStep("Processing Word documents and project plans...")
    await new Promise((resolve) => setTimeout(resolve, 800))

    setAnalysisStep("Retrieving Jira project data and issue tracking...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAnalysisStep("AI analysis: Evaluating value delivery alignment...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAnalysisStep("AI analysis: Assessing management and governance structures...")
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setAnalysisStep("AI analysis: Reviewing resource and cost management...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAnalysisStep("AI analysis: Assessing change control, decision-making, and status reporting...")
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setAnalysisStep("Generating health scores and recommendations...")
    await new Promise((resolve) => setTimeout(resolve, 800))

    setAnalysisStep("Compiling explainability references...")
    await new Promise((resolve) => setTimeout(resolve, 600))

    setIsAnalyzing(false)
    setAnalysisComplete(true)
    setAnalysisStep("")
  }

  const resetAnalysis = () => {
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setAnalysisStep("")
    setUploadedFiles([])
  }

  const getHealthColor = (score: number) => {
    if (score >= 70) return "bg-green-500"
    if (score >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-500"
      case "Medium Risk":
        return "bg-amber-500"
      case "High Risk":
        return "bg-orange-500"
      case "Critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const scenario = projectScenarios[currentScenario]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Health Check</h2>
          <p className="text-muted-foreground">
            AI-powered analysis of project documentation to identify governance and management gaps
          </p>
        </div>
        <div className="flex items-center gap-2">
          {analysisComplete && (
            <Button variant="outline" size="sm" onClick={resetAnalysis}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Analysis
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* AI Analysis & Data Sources */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Analysis & Data Sources
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of project data from multiple sources including documentation and Jira
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAnalyzing && (
            <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                <span className="font-medium text-blue-900">Analyzing Project Data...</span>
              </div>
              <p className="text-sm text-blue-700">{analysisStep}</p>
              <div className="mt-2">
                <Progress value={analysisStep ? 75 : 0} className="h-2" />
              </div>
            </div>
          )}

          {!analysisComplete && !isAnalyzing && (
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-blue-900 mb-2">Ready to Analyze Project Health</h3>
              <p className="text-sm text-blue-600 mb-4">
                AI will analyze project documentation, Jira data, and other sources for comprehensive health assessment
              </p>
              <Button onClick={() => analyzeDocuments()} className="bg-blue-600 text-white hover:bg-blue-700">
                <Brain className="mr-2 h-4 w-4" />
                Analyse Project
              </Button>
              <p className="text-xs text-blue-500 mt-2">
                Sources: Project Documents • Jira • Financial Data • Will analyze {scenario.name} scenario
              </p>
            </div>
          )}

          {analysisComplete && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Analysis Complete!</span>
              </div>
              <p className="text-sm text-green-700 mb-2">
                Successfully analyzed project data from: <strong>{scenario.name}</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {scenario.documents.map((doc, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <FileText className="mr-1 h-3 w-3" />
                    {doc}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">
                  <Settings className="mr-1 h-3 w-3" />
                  Jira Data
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Check Results */}
      {analysisComplete && (
        <>
          {/* Overall Health Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Overall Health Assessment
              </CardTitle>
              <CardDescription>AI-generated health scores across the three key assessment areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Value Delivery</h3>
                  <div className="mb-2">
                    <div
                      className={`w-16 h-16 rounded-full ${getHealthColor(scenario.healthScores.valueDelivery)} mx-auto flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {scenario.healthScores.valueDelivery}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Programme objectives, business case alignment, and benefits realization
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Settings className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Management & Governance</h3>
                  <div className="mb-2">
                    <div
                      className={`w-16 h-16 rounded-full ${getHealthColor(scenario.healthScores.managementGovernance)} mx-auto flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {scenario.healthScores.managementGovernance}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Programme management, schedule, scope, and risk management
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Resources & Costs</h3>
                  <div className="mb-2">
                    <div
                      className={`w-16 h-16 rounded-full ${getHealthColor(scenario.healthScores.resourcesCosts)} mx-auto flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {scenario.healthScores.resourcesCosts}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cost management, resource management, and vendor management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Assessment Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Value Delivery */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  1. Value Delivery
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${getHealthColor(scenario.healthScores.valueDelivery)} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {scenario.healthScores.valueDelivery}
                  </div>
                  <Badge className={getHealthColor(scenario.healthScores.valueDelivery)}>
                    {scenario.healthScores.valueDelivery >= 70
                      ? "Good"
                      : scenario.healthScores.valueDelivery >= 50
                        ? "Medium Risk"
                        : scenario.healthScores.valueDelivery >= 30
                          ? "High Risk"
                          : "Critical"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">1.1 Programme Objectives & Business Case</span>
                      <Badge className={`${getStatusColor(scenario.findings.valueDelivery["1.1"].status)} text-xs`}>
                        {scenario.findings.valueDelivery["1.1"].score}/100
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Findings:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.1"].findings.map((finding, index) => (
                            <li key={index} className="text-xs">
                              • {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Recommendations:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.1"].recommendations.map((rec, index) => (
                            <li key={index} className="text-xs">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Evidence Sources:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.1"].evidence.map((evidence, index) => (
                            <li key={index} className="text-xs text-muted-foreground">
                              • {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">1.2 Benefits Realization</span>
                      <Badge className={`${getStatusColor(scenario.findings.valueDelivery["1.2"].status)} text-xs`}>
                        {scenario.findings.valueDelivery["1.2"].score}/100
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Findings:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.2"].findings.map((finding, index) => (
                            <li key={index} className="text-xs">
                              • {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Recommendations:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.2"].recommendations.map((rec, index) => (
                            <li key={index} className="text-xs">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Evidence Sources:</h4>
                        <ul className="space-y-1">
                          {scenario.findings.valueDelivery["1.2"].evidence.map((evidence, index) => (
                            <li key={index} className="text-xs text-muted-foreground">
                              • {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Management & Governance */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  2. Management & Governance
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${getHealthColor(scenario.healthScores.managementGovernance)} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {scenario.healthScores.managementGovernance}
                  </div>
                  <Badge className={getHealthColor(scenario.healthScores.managementGovernance)}>
                    {scenario.healthScores.managementGovernance >= 70
                      ? "Good"
                      : scenario.healthScores.managementGovernance >= 50
                        ? "Medium Risk"
                        : scenario.healthScores.managementGovernance >= 30
                          ? "High Risk"
                          : "Critical"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(scenario.findings.managementGovernance).map(([key, section]) => (
                    <div key={key} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {key === "2.1"
                            ? "2.1 Programme Management"
                            : key === "2.2"
                              ? "2.2 Schedule Management"
                              : key === "2.3"
                                ? "2.3 Scope Management"
                                : "2.4 Risk Management"}
                        </span>
                        <Badge className={`${getStatusColor(section.status)} text-xs`}>{section.score}/100</Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Key Findings:</h4>
                          <ul className="space-y-1">
                            {section.findings.map((finding, index) => (
                              <li key={index} className="text-xs">
                                • {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Recommendations:</h4>
                          <ul className="space-y-1">
                            {section.recommendations.map((rec, index) => (
                              <li key={index} className="text-xs">
                                • {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Evidence Sources:</h4>
                          <ul className="space-y-1">
                            {section.evidence.map((evidence, index) => (
                              <li key={index} className="text-xs text-muted-foreground">
                                • {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 3. Resources & Costs */}
            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  3. Resources & Costs
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${getHealthColor(scenario.healthScores.resourcesCosts)} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {scenario.healthScores.resourcesCosts}
                  </div>
                  <Badge className={getHealthColor(scenario.healthScores.resourcesCosts)}>
                    {scenario.healthScores.resourcesCosts >= 70
                      ? "Good"
                      : scenario.healthScores.resourcesCosts >= 50
                        ? "Medium Risk"
                        : scenario.healthScores.resourcesCosts >= 30
                          ? "High Risk"
                          : "Critical"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(scenario.findings.resourcesCosts).map(([key, section]) => (
                    <div key={key} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {key === "3.1"
                            ? "3.1 Cost Management"
                            : key === "3.2"
                              ? "3.2 Resource Management"
                              : "3.3 Vendor Management"}
                        </span>
                        <Badge className={`${getStatusColor(section.status)} text-xs`}>{section.score}/100</Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Key Findings:</h4>
                          <ul className="space-y-1">
                            {section.findings.map((finding, index) => (
                              <li key={index} className="text-xs">
                                • {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Recommendations:</h4>
                          <ul className="space-y-1">
                            {section.recommendations.map((rec, index) => (
                              <li key={index} className="text-xs">
                                • {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Evidence Sources:</h4>
                          <ul className="space-y-1">
                            {section.evidence.map((evidence, index) => (
                              <li key={index} className="text-xs text-muted-foreground">
                                • {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
                Executive Summary & Immediate Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Critical Issues Requiring Immediate Attention:</h4>
                  <ul className="space-y-2 text-sm">
                    {scenario.name === "ERP Implementation Failure" ? (
                      <>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Budget overrun of 180% requires immediate CFO intervention and spending freeze</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Project timeline slipped 8 months with no updated schedule or recovery plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>No benefits realization plan exists - unclear what success looks like</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Key technical resources departed with no knowledge transfer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Absence of formal change control processes leading to scope creep</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Inconsistent status reporting practices hindering transparency</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>
                            Multiple vendors with inconsistent contract terms creating coordination challenges
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Skills gap in digital technologies requires immediate upskilling program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Benefits measurement framework missing - no baseline metrics established</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Recommended Recovery Actions (Next 30 Days):</h4>
                  <ul className="space-y-2 text-sm">
                    {scenario.name === "ERP Implementation Failure" ? (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Engage emergency project recovery team with ERP expertise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Conduct full project reset with updated business case and timeline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Implement weekly governance with clear decision-making authority</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Renegotiate vendor contracts to reduce penalty exposure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Establish a change control board and document change management processes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Implement consistent status reporting templates and frequencies</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Establish integrated vendor governance framework with standardized contracts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Implement comprehensive digital skills assessment and training program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Develop benefits measurement framework with baseline metrics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Streamline decision-making process with delegated authorities</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
