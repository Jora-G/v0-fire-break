"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Activity,
  Target,
  BarChart3,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  Settings,
  Brain,
  Database,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Historic project outcomes data for predictive modeling
const historicProjectOutcomes = [
  {
    id: "HIST-001",
    name: "Legacy System Migration",
    budgetBurnAt65Percent: 78,
    finalBudgetVariance: 15,
    decisionLatencyAvg: 12,
    riskEscalations: 4,
    milestoneVarianceAvg: 8,
    outcome: "Over Budget",
    completionDelay: 21,
  },
  {
    id: "HIST-002",
    name: "Customer Portal Redesign",
    budgetBurnAt65Percent: 62,
    finalBudgetVariance: -3,
    decisionLatencyAvg: 5,
    riskEscalations: 1,
    milestoneVarianceAvg: 2,
    outcome: "Success",
    completionDelay: 0,
  },
  {
    id: "HIST-003",
    name: "ERP Implementation",
    budgetBurnAt65Percent: 85,
    finalBudgetVariance: 32,
    decisionLatencyAvg: 18,
    riskEscalations: 7,
    milestoneVarianceAvg: 15,
    outcome: "Failed",
    completionDelay: 45,
  },
  {
    id: "HIST-004",
    name: "Mobile Platform Launch",
    budgetBurnAt65Percent: 58,
    finalBudgetVariance: 2,
    decisionLatencyAvg: 4,
    riskEscalations: 2,
    milestoneVarianceAvg: 3,
    outcome: "Success",
    completionDelay: -5,
  },
  {
    id: "HIST-005",
    name: "Data Warehouse Migration",
    budgetBurnAt65Percent: 72,
    finalBudgetVariance: 18,
    decisionLatencyAvg: 14,
    riskEscalations: 5,
    milestoneVarianceAvg: 12,
    outcome: "Over Budget",
    completionDelay: 28,
  },
  {
    id: "HIST-006",
    name: "Security Infrastructure Upgrade",
    budgetBurnAt65Percent: 68,
    finalBudgetVariance: 8,
    decisionLatencyAvg: 7,
    riskEscalations: 2,
    milestoneVarianceAvg: 5,
    outcome: "Success",
    completionDelay: 3,
  },
]

// Enhanced project data with additional governance information
const projectsData = [
  {
    id: "WEB-2026",
    code: "WEB26",
    name: "Website Redesign",
    bu: "Marketing",
    initiative: "Digital Transformation",
    status: "In Progress",
    trending: "green",
    progress: 65,
    completionDate: "15-12-2026",
    budget: "On Track",
    timeline: "On Track",
    risks: 2,
    totalBudget: 250000,
    spentBudget: 162500,
    budgetBurnRate: 65,
    riskStatus: "Low",
    pid: {
      approved: true,
      version: "1.2",
      lastUpdated: "15-10-2024",
      nextReview: "15-11-2024",
    },
    stageGates: [
      { name: "Initiation", status: "Complete", completedDate: "01-09-2024" },
      { name: "Planning", status: "Complete", completedDate: "15-09-2024" },
      { name: "Execution", status: "In Progress", expectedDate: "30-11-2024" },
      { name: "Closure", status: "Planned", expectedDate: "15-12-2026" },
    ],
    milestones: [
      { name: "Design Phase Complete", status: "Complete", date: "30-09-2024", variance: 0 },
      { name: "Development Phase 1", status: "In Progress", date: "15-11-2024", variance: 2 },
      { name: "User Testing", status: "Planned", date: "01-12-2024", variance: 0 },
    ],
    changeRequests: [
      {
        id: "CR-001",
        title: "Additional Mobile Responsiveness",
        status: "Approved",
        impact: "Low",
        budgetImpact: 15000,
      },
      {
        id: "CR-002",
        title: "Enhanced Analytics Integration",
        status: "Under Review",
        impact: "Medium",
        budgetImpact: 25000,
      },
    ],
  },
  {
    id: "APP-2026",
    code: "APP26",
    name: "Mobile App Development",
    bu: "Technology",
    initiative: "Customer Experience",
    status: "In Progress",
    trending: "amber",
    progress: 45,
    completionDate: "30-01-2026",
    budget: "At Risk",
    timeline: "At Risk",
    risks: 5,
    totalBudget: 400000,
    spentBudget: 220000,
    budgetBurnRate: 55,
    riskStatus: "High",
    pid: {
      approved: true,
      version: "2.1",
      lastUpdated: "01-10-2024",
      nextReview: "01-11-2024",
    },
    stageGates: [
      { name: "Initiation", status: "Complete", completedDate: "15-08-2024" },
      { name: "Planning", status: "Complete", completedDate: "01-09-2024" },
      { name: "Execution", status: "In Progress", expectedDate: "15-01-2026", delay: 14 },
      { name: "Closure", status: "Planned", expectedDate: "30-01-2026" },
    ],
    milestones: [
      { name: "API Integration", status: "Delayed", date: "15-10-2024", variance: 7 },
      { name: "Beta Testing", status: "At Risk", date: "01-12-2024", variance: 14 },
      { name: "App Store Submission", status: "Planned", date: "15-01-2026", variance: 0 },
    ],
    changeRequests: [
      { id: "CR-003", title: "Additional Security Features", status: "Approved", impact: "High", budgetImpact: 50000 },
      { id: "CR-004", title: "iOS 18 Compatibility", status: "Approved", impact: "Medium", budgetImpact: 30000 },
      {
        id: "CR-005",
        title: "Enhanced Push Notifications",
        status: "Under Review",
        impact: "Low",
        budgetImpact: 15000,
      },
    ],
  },
  {
    id: "CLD-2026",
    code: "CLD26",
    name: "Cloud Migration",
    bu: "Technology",
    initiative: "Operational Excellence",
    status: "In Progress",
    trending: "red",
    progress: 30,
    completionDate: "28-02-2026",
    budget: "Over Budget",
    timeline: "Delayed",
    risks: 7,
    totalBudget: 600000,
    spentBudget: 420000,
    budgetBurnRate: 70,
    riskStatus: "High",
    pid: {
      approved: true,
      version: "1.8",
      lastUpdated: "20-09-2024",
      nextReview: "20-10-2024",
    },
    stageGates: [
      { name: "Initiation", status: "Complete", completedDate: "01-07-2024" },
      { name: "Planning", status: "Complete", completedDate: "15-08-2024" },
      { name: "Execution", status: "In Progress", expectedDate: "15-02-2026", delay: 21 },
      { name: "Closure", status: "Planned", expectedDate: "28-02-2026" },
    ],
    milestones: [
      { name: "Infrastructure Setup", status: "Complete", date: "01-09-2024", variance: 5 },
      { name: "Data Migration Phase 1", status: "Delayed", date: "15-10-2024", variance: 21 },
      { name: "Application Migration", status: "At Risk", date: "01-01-2026", variance: 28 },
    ],
    changeRequests: [
      {
        id: "CR-006",
        title: "Additional Security Compliance",
        status: "Approved",
        impact: "High",
        budgetImpact: 80000,
      },
      {
        id: "CR-007",
        title: "Extended Data Backup Requirements",
        status: "Approved",
        impact: "High",
        budgetImpact: 60000,
      },
      {
        id: "CR-008",
        title: "Multi-Region Deployment",
        status: "Under Review",
        impact: "Critical",
        budgetImpact: 120000,
      },
    ],
  },
  {
    id: "SEC-2026",
    code: "SEC26",
    name: "Security Upgrade",
    bu: "Technology",
    initiative: "Risk Management",
    status: "Not Started",
    trending: "grey",
    progress: 0,
    completionDate: "31-03-2026",
    budget: "Not Allocated",
    timeline: "Planned",
    risks: 0,
    totalBudget: 300000,
    spentBudget: 0,
    budgetBurnRate: 0,
    riskStatus: "Medium",
    pid: {
      approved: false,
      version: "0.9",
      lastUpdated: "10-10-2024",
      nextReview: "25-10-2024",
    },
    stageGates: [
      { name: "Initiation", status: "Planned", expectedDate: "01-11-2024" },
      { name: "Planning", status: "Planned", expectedDate: "15-11-2024" },
      { name: "Execution", status: "Planned", expectedDate: "15-03-2026" },
      { name: "Closure", status: "Planned", expectedDate: "31-03-2026" },
    ],
    milestones: [
      { name: "Security Assessment", status: "Planned", date: "15-11-2024", variance: 0 },
      { name: "Implementation Phase 1", status: "Planned", date: "15-01-2026", variance: 0 },
      { name: "Security Testing", status: "Planned", date: "15-03-2026", variance: 0 },
    ],
    changeRequests: [],
  },
]

const risksIssuesData = [
  {
    id: "R001",
    type: "Risk",
    title: "API Integration Delay",
    project: "Mobile App Development",
    category: "Technical",
    severity: "High",
    status: "Open",
    escalationCount: 2,
    firstRaised: "15-09-2024",
  },
  {
    id: "I001",
    type: "Issue",
    title: "Database Performance",
    project: "Website Redesign",
    category: "Technical",
    severity: "Medium",
    status: "In Progress",
    escalationCount: 1,
    firstRaised: "01-10-2024",
  },
  {
    id: "R003",
    type: "Risk",
    title: "Cloud Migration Data Loss",
    project: "Cloud Migration",
    category: "Technical",
    severity: "Critical",
    status: "Open",
    escalationCount: 3,
    firstRaised: "20-08-2024",
  },
  {
    id: "I002",
    type: "Issue",
    title: "Budget Overrun Alert",
    project: "Cloud Migration",
    category: "Financial",
    severity: "High",
    status: "Open",
    escalationCount: 2,
    firstRaised: "05-09-2024",
  },
]

const decisionsData = [
  {
    id: "DEC-001",
    title: "Technology Stack Selection",
    project: "Website Redesign",
    status: "Implemented",
    latencyDays: 5,
    requestedDate: "10-09-2024",
    approvedDate: "15-09-2024",
  },
  {
    id: "DEC-002",
    title: "Cloud Provider Selection",
    project: "Cloud Migration",
    status: "Under Review",
    latencyDays: 12,
    requestedDate: "03-10-2024",
    approvedDate: null,
  },
  {
    id: "DEC-003",
    title: "API Architecture Decision",
    project: "Mobile App Development",
    status: "Under Review",
    latencyDays: 8,
    requestedDate: "07-10-2024",
    approvedDate: null,
  },
  {
    id: "DEC-004",
    title: "Security Framework Implementation",
    project: "Security Upgrade",
    status: "Under Review",
    latencyDays: 4,
    requestedDate: "11-10-2024",
    approvedDate: null,
  },
]

export function RiskIntelligence() {
  const [expandedCards, setExpandedCards] = useState<string[]>([])
  const [authorizedRisks, setAuthorizedRisks] = useState<string[]>([])

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  const authorizeRiskTransfer = (projectId: string, riskData: any) => {
    console.log(`Authorizing risk transfer for project ${projectId}:`, riskData)
    setAuthorizedRisks((prev) => [...prev, projectId])
    // In real implementation, would call Smart Governance API
  }

  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Predictive modeling functions with clear explanations
  const calculatePredictiveScore = (project: any, projectRisks: any[], projectDecisions: any[]) => {
    let budgetScore = 100
    let decisionScore = 100
    let riskScore = 100
    let overallScore = 100

    const explanations = {
      budget: "",
      decision: "",
      risk: "",
      overall: "",
    }

    // Budget Score Calculation
    const budgetVariance = project.budgetBurnRate - project.progress
    if (budgetVariance > 20) {
      budgetScore = 30
      explanations.budget = `CRITICAL: Budget burn (${project.budgetBurnRate}%) exceeds progress (${project.progress}%) by ${budgetVariance}%. Historic projects with >20% variance had 80% failure rate.`
    } else if (budgetVariance > 10) {
      budgetScore = 60
      explanations.budget = `CONCERN: Budget burn ahead of progress by ${budgetVariance}%. Historic projects with 10-20% variance had 40% budget overrun rate.`
    } else if (budgetVariance > 5) {
      budgetScore = 80
      explanations.budget = `WATCH: Budget burn slightly ahead by ${budgetVariance}%. Monitor for trend changes.`
    } else {
      explanations.budget = `HEALTHY: Budget burn aligned with progress. Historic success rate: 85%.`
    }

    // Decision Score Calculation
    const avgDecisionDelay =
      projectDecisions.length > 0
        ? projectDecisions.reduce((acc, d) => acc + d.latencyDays, 0) / projectDecisions.length
        : 0
    const criticalDecisions = projectDecisions.filter((d) => d.latencyDays > 10).length

    if (avgDecisionDelay > 15) {
      decisionScore = 25
      explanations.decision = `CRITICAL: Average decision delay (${avgDecisionDelay.toFixed(0)} days) with ${criticalDecisions} critical delays. Historic projects with >15-day avg had 70% completion delays averaging 35 days.`
    } else if (avgDecisionDelay > 10) {
      decisionScore = 50
      explanations.decision = `HIGH RISK: Average decision delay (${avgDecisionDelay.toFixed(0)} days). Historic projects with 10-15 day avg had 45% completion delays averaging 20 days.`
    } else if (avgDecisionDelay > 7) {
      decisionScore = 75
      explanations.decision = `MODERATE RISK: Average decision delay (${avgDecisionDelay.toFixed(0)} days). Monitor for escalation.`
    } else {
      explanations.decision = `HEALTHY: Decision latency (${avgDecisionDelay.toFixed(0)} days) within governance standards.`
    }

    // Risk Score Calculation
    const totalEscalations = projectRisks.reduce((acc, r) => acc + r.escalationCount, 0)
    const criticalRisks = projectRisks.filter((r) => r.severity === "Critical").length

    if (totalEscalations > 6) {
      riskScore = 20
      explanations.risk = `CRITICAL: ${totalEscalations} risk escalations with ${criticalRisks} critical risks. Historic projects with >6 escalations had 60% failure rate.`
    } else if (totalEscalations > 3) {
      riskScore = 55
      explanations.risk = `HIGH RISK: ${totalEscalations} risk escalations. Historic projects with 3-6 escalations had 30% budget overrun rate.`
    } else if (totalEscalations > 1) {
      riskScore = 80
      explanations.risk = `MODERATE: ${totalEscalations} risk escalations. Continue monitoring.`
    } else {
      explanations.risk = `HEALTHY: Minimal risk escalations (${totalEscalations}). Good risk management.`
    }

    // Overall Score (weighted average)
    overallScore = Math.round(budgetScore * 0.4 + decisionScore * 0.3 + riskScore * 0.3)

    if (overallScore < 40) {
      explanations.overall = "IMMEDIATE EXECUTIVE INTERVENTION REQUIRED"
    } else if (overallScore < 60) {
      explanations.overall = "ENHANCED GOVERNANCE REQUIRED"
    } else if (overallScore < 80) {
      explanations.overall = "INCREASED MONITORING REQUIRED"
    } else {
      explanations.overall = "STANDARD MONITORING SUFFICIENT"
    }

    return {
      budgetScore,
      decisionScore,
      riskScore,
      overallScore,
      explanations,
    }
  }

  const generateActionablePredictions = (project: any, projectRisks: any[], projectDecisions: any[]) => {
    const predictions = []
    const scores = calculatePredictiveScore(project, projectRisks, projectDecisions)

    // Budget overrun prediction with specific actions
    if (scores.budgetScore < 60) {
      const budgetVariance = project.budgetBurnRate - project.progress
      const pendingChanges = project.changeRequests.filter((cr) => cr.status === "Under Review")
      const pendingValue = pendingChanges.reduce((acc, cr) => acc + cr.budgetImpact, 0)

      let action = ""
      let reasoning = ""

      if (pendingValue > 0) {
        action = `IMMEDIATE ACTION: Approve £${pendingValue.toLocaleString()} in pending changes OR reduce scope to prevent ${(budgetVariance * 0.8).toFixed(0)}% budget overrun`
        reasoning = `Budget variance of ${budgetVariance}% with £${pendingValue.toLocaleString()} pending changes. ${scores.explanations.budget}`
      } else {
        action = `IMMEDIATE ACTION: Reduce project scope or increase budget by ${(budgetVariance * 0.6).toFixed(0)}% to prevent overrun`
        reasoning = scores.explanations.budget
      }

      predictions.push({
        type: "Budget Crisis",
        action,
        reasoning,
        timeframe: "Next 2-4 weeks",
        priority: scores.budgetScore < 40 ? "CRITICAL" : "HIGH",
      })
    }

    // Decision delay cascade with specific actions
    if (scores.decisionScore < 60) {
      const criticalDecisions = projectDecisions.filter((d) => d.latencyDays > 10)
      const delayedMilestones = project.milestones.filter((m) => m.variance > 7)

      if (criticalDecisions.length > 0 && delayedMilestones.length > 0) {
        const topDecision = criticalDecisions[0]
        const affectedMilestone = delayedMilestones[0]

        predictions.push({
          type: "Decision Bottleneck",
          action: `IMMEDIATE ACTION: Escalate ${topDecision.title} decision to executive level - currently blocking ${affectedMilestone.name} (${affectedMilestone.variance} days delayed)`,
          reasoning: `${scores.explanations.decision} Decision ${topDecision.id} (${topDecision.latencyDays} days pending) is directly causing milestone delays.`,
          timeframe: "Next 1-2 weeks",
          priority: "CRITICAL",
        })
      } else if (criticalDecisions.length > 0) {
        const topDecision = criticalDecisions[0]
        predictions.push({
          type: "Decision Delay Risk",
          action: `URGENT ACTION: Resolve ${topDecision.title} decision within 3 days to prevent cascade delays`,
          reasoning: scores.explanations.decision,
          timeframe: "Next 1 week",
          priority: "HIGH",
        })
      }
    }

    // Risk escalation with specific actions
    if (scores.riskScore < 60) {
      const criticalRisks = projectRisks.filter((r) => r.severity === "Critical")
      const highEscalationRisks = projectRisks.filter((r) => r.escalationCount > 2)

      if (criticalRisks.length > 0) {
        const topRisk = criticalRisks[0]
        predictions.push({
          type: "Risk Crisis",
          action: `IMMEDIATE ACTION: Assign dedicated risk owner to ${topRisk.title} and implement emergency mitigation plan`,
          reasoning: `${scores.explanations.risk} Critical risk ${topRisk.id} has escalated ${topRisk.escalationCount} times since ${topRisk.firstRaised}.`,
          timeframe: "Next 1 week",
          priority: "CRITICAL",
        })
      } else if (highEscalationRisks.length > 0) {
        predictions.push({
          type: "Risk Escalation Pattern",
          action: `URGENT ACTION: Review risk management process - ${highEscalationRisks.length} risks showing repeat escalation patterns`,
          reasoning: scores.explanations.risk,
          timeframe: "Next 2 weeks",
          priority: "HIGH",
        })
      }
    }

    // Success prediction for well-performing projects
    if (scores.overallScore > 80) {
      predictions.push({
        type: "Success Trajectory",
        action: `MAINTAIN COURSE: Project on track for successful completion - continue current governance approach`,
        reasoning: `All governance indicators healthy: Budget (${scores.budgetScore}/100), Decisions (${scores.decisionScore}/100), Risks (${scores.riskScore}/100)`,
        timeframe: "Project completion",
        priority: "LOW",
      })
    }

    return { predictions, scores }
  }

  const getFireBreakInsight = (project: any) => {
    const projectRisks = risksIssuesData.filter((r) => r.project === project.name)
    const projectDecisions = decisionsData.filter((d) => d.project === project.name)
    const pendingDecisions = projectDecisions.filter((d) => d.status === "Under Review")
    const delayedMilestones = project.milestones.filter((m: any) => m.variance > 7)
    const highImpactChanges = project.changeRequests.filter(
      (cr: any) => cr.impact === "High" || cr.impact === "Critical",
    )

    const { predictions, scores } = generateActionablePredictions(project, projectRisks, projectDecisions)

    const actions = []
    const analysis = []
    let timeHorizon = "2 weeks"
    let priority = "Low"

    // Add prediction-based actions first (these are the most important)
    if (predictions.length > 0) {
      const criticalPredictions = predictions.filter((p) => p.priority === "CRITICAL")
      const highPredictions = predictions.filter((p) => p.priority === "HIGH")

      if (criticalPredictions.length > 0) {
        const topPrediction = criticalPredictions[0]
        actions.push(topPrediction.action)
        analysis.push(topPrediction.reasoning)
        priority = "High"
        timeHorizon = topPrediction.timeframe
      } else if (highPredictions.length > 0) {
        const topPrediction = highPredictions[0]
        actions.push(topPrediction.action)
        analysis.push(topPrediction.reasoning)
        priority = "Medium"
        timeHorizon = topPrediction.timeframe
      } else {
        const topPrediction = predictions[0]
        actions.push(topPrediction.action)
        analysis.push(topPrediction.reasoning)
        priority = "Low"
      }
    }

    // Add current governance issues
    const criticalDecisions = pendingDecisions.filter((d) => d.latencyDays > 7)
    if (criticalDecisions.length > 0 && !actions.some((a) => a.includes("decision"))) {
      const affectedMilestones = delayedMilestones.filter((m: any) => m.variance > 0)
      if (affectedMilestones.length > 0) {
        actions.push(
          `Expedite ${criticalDecisions[0].title} decision (${criticalDecisions[0].latencyDays} days overdue) - blocking ${affectedMilestones[0].name} milestone`,
        )
        analysis.push(
          `Decision ${criticalDecisions[0].id} latency is causing ${affectedMilestones[0].name} delay of ${affectedMilestones[0].variance} days. Each additional day of delay increases completion risk by 3%.`,
        )
        timeHorizon = "1 week"
        priority = "High"
      }
    }

    // Budget variance with clear explanation
    if (project.budgetBurnRate > project.progress + 15 && !actions.some((a) => a.includes("budget"))) {
      const variance = project.budgetBurnRate - project.progress
      const pendingChange = highImpactChanges.find((cr: any) => cr.status === "Under Review")

      if (pendingChange) {
        actions.push(
          `Approve £${pendingChange.budgetImpact.toLocaleString()} for ${pendingChange.title} OR reduce scope by ${variance}% to prevent budget overrun`,
        )
        analysis.push(
          `Budget burn rate (${project.budgetBurnRate}%) exceeds progress (${project.progress}%) by ${variance}%. Pending ${pendingChange.title} change worth £${pendingChange.budgetImpact.toLocaleString()} must be approved or scope reduced to maintain budget.`,
        )
      } else {
        actions.push(`Reduce project scope by ${variance}% or increase budget allocation to prevent overrun`)
        analysis.push(
          `Budget consumption (${project.budgetBurnRate}%) significantly ahead of delivery (${project.progress}%). This ${variance}% variance indicates scope creep or inefficient resource utilization.`,
        )
      }
      priority = priority === "Low" ? "Medium" : priority
    }

    return {
      actions: actions.length > 0 ? actions : ["Continue standard governance monitoring"],
      analysis:
        analysis.length > 0
          ? analysis
          : [`Project governance health: ${scores.overallScore}/100 (${scores.explanations.overall})`],
      timeHorizon,
      priority,
      predictiveScores: scores,
    }
  }

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Risk Intelligence</h1>
          <p className="text-gray-600 text-sm mb-3">
            AI-powered predictive governance analysis using historic project patterns and current project data
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <Brain className="h-3 w-3 text-blue-500" />
              Predictive Models: ACTIVE
            </span>
            <span className="flex items-center gap-2">
              <Database className="h-3 w-3 text-green-500" />
              Historic Data: {historicProjectOutcomes.length} projects analyzed
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Real-time monitoring: ACTIVE
            </span>
            <span>
              Projects: {projectsData.filter((p) => p.status === "In Progress").length} active, {projectsData.length}{" "}
              total
            </span>
          </div>
        </div>
      </div>

      {/* Project Cards - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => {
          const isExpanded = expandedCards.includes(project.id)
          const projectRisks = risksIssuesData.filter((r) => r.project === project.name)
          const projectDecisions = decisionsData.filter((d) => d.project === project.name)
          const firebreakInsight = getFireBreakInsight(project)

          return (
            <Card key={project.id} className="border border-gray-300 bg-white">
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-gray-900">{project.name}</CardTitle>
                      <Badge className={`${getRiskStatusColor(project.riskStatus)} border`}>
                        {project.riskStatus} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {project.bu} • {project.initiative}
                    </p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Current Status</p>
                    <p className="font-semibold text-gray-900">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Progress</p>
                    <p className="font-semibold text-gray-900">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Budget Burn</p>
                    <p className="font-semibold text-gray-900">{project.budgetBurnRate}%</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* FireBreak Insight - Enhanced with Predictive Context */}
                <div
                  className={`p-4 border-l-4 ${
                    firebreakInsight.priority === "High"
                      ? "bg-red-50 border-red-400"
                      : firebreakInsight.priority === "Medium"
                        ? "bg-amber-50 border-amber-400"
                        : "bg-green-50 border-green-400"
                  }`}
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-600" />
                    FireBreak Executive Insight
                    {firebreakInsight.predictiveScores && (
                      <Badge
                        className={`text-xs ${
                          firebreakInsight.predictiveScores.overallScore >= 80
                            ? "bg-green-100 text-green-800"
                            : firebreakInsight.predictiveScores.overallScore >= 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        Governance Score: {firebreakInsight.predictiveScores.overallScore}/100
                      </Badge>
                    )}
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">EXECUTIVE ACTION REQUIRED:</p>
                      {firebreakInsight.actions.map((action, index) => (
                        <p key={index} className="text-sm text-gray-700">
                          • {action}
                        </p>
                      ))}
                    </div>

                    {firebreakInsight.predictiveScores && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-2">PREDICTIVE SCORE BREAKDOWN:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Budget Health: {firebreakInsight.predictiveScores.budgetScore}/100</span>
                            <span className="text-gray-600">
                              {firebreakInsight.predictiveScores.explanations.budget}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Decision Velocity: {firebreakInsight.predictiveScores.decisionScore}/100</span>
                            <span className="text-gray-600">
                              {firebreakInsight.predictiveScores.explanations.decision}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Management: {firebreakInsight.predictiveScores.riskScore}/100</span>
                            <span className="text-gray-600">{firebreakInsight.predictiveScores.explanations.risk}</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs font-semibold">
                            Intervention Level: {firebreakInsight.predictiveScores.explanations.overall}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        Priority: <span className="font-semibold">{firebreakInsight.priority}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        Time Horizon: <span className="font-semibold">{firebreakInsight.timeHorizon}</span>
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {authorizedRisks.includes(project.id) ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Risks authorized for Smart Governance</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => authorizeRiskTransfer(project.id, { projectRisks, projectDecisions })}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                          size="sm"
                        >
                          Authorize Risk Transfer to Smart Governance
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Smart Governance Section - Expandable */}
                <Collapsible open={isExpanded} onOpenChange={() => toggleCard(project.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-gray-700 border-gray-300 bg-transparent"
                    >
                      <span className="font-medium flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Smart Governance Details
                      </span>
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4">
                    <div className="space-y-6">
                      {/* PID Section */}
                      <div className="p-4 bg-white border border-gray-300">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          Project Initiation Document (PID)
                        </h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="text-gray-900 flex items-center gap-1">
                              {project.pid.approved ? (
                                <>
                                  <CheckCircle className="h-3 w-3 text-green-600" /> Approved
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 text-red-600" /> Pending
                                </>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Version</p>
                            <p className="text-gray-900">{project.pid.version}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Last Updated</p>
                            <p className="text-gray-900">{project.pid.lastUpdated}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Next Review</p>
                            <p className="text-gray-900">{project.pid.nextReview}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stage Gates */}
                      <div className="p-4 bg-gray-50 border border-gray-300">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-gray-600" />
                          Stage Gates Progress
                        </h5>
                        <div className="space-y-2">
                          {project.stageGates.map((gate, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-white border border-gray-200"
                            >
                              <div className="flex items-center gap-2">
                                {gate.status === "Complete" ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : gate.status === "In Progress" ? (
                                  <Clock className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-900">{gate.name}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">{gate.status}</p>
                                <p className="text-xs text-gray-600">
                                  {gate.completedDate || gate.expectedDate}
                                  {gate.delay && <span className="text-red-600 ml-1">(+{gate.delay}d)</span>}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Governance Milestones */}
                      <div className="p-4 bg-white border border-gray-300">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          Governance Milestones
                        </h5>
                        <div className="space-y-2">
                          {project.milestones.map((milestone, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200"
                            >
                              <div className="flex items-center gap-2">
                                {milestone.status === "Complete" ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : milestone.status === "Delayed" ? (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                ) : milestone.status === "At Risk" ? (
                                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                                ) : (
                                  <Clock className="h-4 w-4 text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-900">{milestone.name}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-600">{milestone.date}</p>
                                {milestone.variance > 0 && (
                                  <p className="text-xs text-red-600">+{milestone.variance} days</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risks and Issues */}
                      {projectRisks.length > 0 && (
                        <div className="p-4 bg-red-50 border border-red-300">
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            Risks & Issues (Escalation Patterns)
                          </h5>
                          <div className="space-y-2">
                            {projectRisks.map((risk) => (
                              <div key={risk.id} className="p-2 bg-white border border-red-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">{risk.title}</span>
                                  <Badge
                                    className={`text-xs ${
                                      risk.severity === "Critical"
                                        ? "bg-red-100 text-red-800"
                                        : risk.severity === "High"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {risk.severity}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <span>
                                    {risk.id} • {risk.category} • {risk.status}
                                  </span>
                                  <span>
                                    Escalated {risk.escalationCount}x since {risk.firstRaised}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decision Repository */}
                      {projectDecisions.length > 0 && (
                        <div className="p-4 bg-blue-50 border border-blue-300">
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            Decision Repository (Bottlenecks & Delays)
                          </h5>
                          <div className="space-y-2">
                            {projectDecisions.map((decision) => (
                              <div key={decision.id} className="p-2 bg-white border border-blue-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">{decision.title}</span>
                                  <Badge
                                    className={`text-xs ${
                                      decision.status === "Under Review"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {decision.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <span>
                                    {decision.id} • Requested: {decision.requestedDate}
                                  </span>
                                  <span className={decision.latencyDays > 7 ? "text-red-600 font-semibold" : ""}>
                                    {decision.latencyDays} days pending
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Change Requests & Approvals */}
                      {project.changeRequests.length > 0 && (
                        <div className="p-4 bg-purple-50 border border-purple-300">
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-600" />
                            Change Requests & Approvals
                          </h5>
                          <div className="space-y-2">
                            {project.changeRequests.map((cr) => (
                              <div key={cr.id} className="p-2 bg-white border border-purple-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">{cr.title}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={`text-xs ${
                                        cr.impact === "Critical"
                                          ? "bg-red-100 text-red-800"
                                          : cr.impact === "High"
                                            ? "bg-orange-100 text-orange-800"
                                            : cr.impact === "Medium"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {cr.impact}
                                    </Badge>
                                    <Badge
                                      className={`text-xs ${
                                        cr.status === "Under Review"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {cr.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <span>{cr.id}</span>
                                  <span className="font-semibold">£{cr.budgetImpact.toLocaleString()} impact</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Status & Budget Summary */}
                      <div className="p-4 bg-gray-100 border border-gray-300">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          Project Status & Budget
                        </h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Total Budget</p>
                            <p className="text-gray-900 font-semibold">£{project.totalBudget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Spent to Date</p>
                            <p className="text-gray-900 font-semibold">£{project.spentBudget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Budget Status</p>
                            <p
                              className={`font-semibold ${
                                project.budget === "On Track"
                                  ? "text-green-600"
                                  : project.budget === "At Risk"
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }`}
                            >
                              {project.budget}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Timeline Status</p>
                            <p
                              className={`font-semibold ${
                                project.timeline === "On Track"
                                  ? "text-green-600"
                                  : project.timeline === "At Risk"
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }`}
                            >
                              {project.timeline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
