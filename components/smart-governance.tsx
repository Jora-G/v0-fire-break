"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Edit, Plus, Save, X, ChevronRight, RefreshCw, Eye, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Template data
const portfolioScorecardData = [
  {
    id: "WEB-2026",
    code: "WEB26",
    name: "Website Redesign",
    bu: "Marketing",
    initiative: "Digital Transformation",
    status: "In Progress",
    trending: "green",
    trendingReason: "All milestones on track with strong stakeholder engagement and no critical issues identified.",
    progress: 65,
    completionDate: "15-12-2026",
    budget: "On Track",
    timeline: "On Track",
    risks: 2,
  },
  {
    id: "APP-2026",
    code: "APP26",
    name: "Mobile App Development",
    bu: "Technology",
    initiative: "Customer Experience",
    status: "In Progress",
    trending: "amber",
    trendingReason:
      "API integration delays and resource constraints affecting testing timeline but mitigation plans in place.",
    progress: 45,
    completionDate: "30-01-2026",
    budget: "At Risk",
    timeline: "At Risk",
    risks: 5,
  },
  {
    id: "CLD-2026",
    code: "CLD26",
    name: "Cloud Migration",
    bu: "Technology",
    initiative: "Operational Excellence",
    status: "In Progress",
    trending: "red",
    trendingReason:
      "Database migration complexity and budget overrun risks require immediate executive attention and intervention.",
    progress: 30,
    completionDate: "28-02-2026",
    budget: "Over Budget",
    timeline: "Delayed",
    risks: 7,
  },
  {
    id: "MKT-2026",
    code: "MKT26",
    name: "Marketing Campaign",
    bu: "Marketing",
    initiative: "Market Expansion",
    status: "In Progress",
    trending: "green",
    trendingReason: "Campaign execution ahead of schedule with positive early feedback and all deliverables on track.",
    progress: 80,
    completionDate: "31-10-2026",
    budget: "On Track",
    timeline: "On Track",
    risks: 1,
  },
  {
    id: "SEC-2026",
    code: "SEC26",
    name: "Security Upgrade",
    bu: "Technology",
    initiative: "Risk Management",
    status: "Not Started",
    trending: "grey",
    trendingReason: "Project not yet started, awaiting resource allocation and final budget approval.",
    progress: 0,
    completionDate: "31-03-2026",
    budget: "Not Allocated",
    timeline: "Planned",
    risks: 0,
  },
]

const pidTemplate = {
  projectName: "Enterprise Data Platform Migration",
  projectManager: "Alex Johnson",
  sponsor: "Sarah Williams, CTO",
  startDate: "01-11-2026",
  endDate: "30-06-2026",
  budget: "£1,250,000",
  objectives:
    "• Migrate all enterprise data from legacy systems to the new cloud-based data platform\n• Implement enhanced data governance and security controls\n• Reduce operational costs by 25% within 12 months\n• Enable real-time analytics capabilities across all business units\n• Ensure compliance with latest regulatory requirements",
  scope:
    "IN SCOPE:\n• Migration of all structured data from Oracle and SQL Server databases\n• Implementation of data quality monitoring tools\n• Development of self-service analytics dashboards\n• Training for all data stewards and analysts\n• Data governance framework implementation\n\nOUT OF SCOPE:\n• Migration of archived data older than 7 years\n• Hardware procurement and infrastructure setup\n• Changes to source systems architecture\n• Business process reengineering initiatives",
  deliverables:
    "• Detailed migration strategy and execution plan\n• Data mapping and transformation rules documentation\n• Fully operational cloud data platform\n• Data governance framework and policies\n• Self-service analytics portal\n• Training materials and knowledge transfer sessions\n• Post-implementation support model and procedures",
  assumptions:
    "• Source system owners will provide timely access and support\n• Business users will be available for testing and validation phases\n• No significant changes to source systems during migration period\n• Cloud infrastructure team will provide necessary resources on schedule\n• Existing data quality issues will be addressed before migration\n• Required licenses and subscriptions will be procured on time",
  constraints:
    "• Limited downtime window for cutover (48 hours maximum)\n• Budget cap of £1.25M with no additional funding available\n• Must complete before fiscal year end (June 30, 2026)\n• Limited availability of subject matter experts during peak periods\n• Compliance requirements must be met throughout the transition\n• No impact to critical business operations during migration",
  risks:
    "• Data quality issues may impact migration timeline and accuracy\n• Resource constraints in key technical areas may cause delays\n• Potential resistance from business users to new processes\n• Vendor delays in providing necessary API access and support\n• Security vulnerabilities during transition period\n• Unexpected complexity in legacy data structures",
  successCriteria:
    "• All critical data successfully migrated with 100% validation\n• Zero security or compliance incidents during migration\n• System performance meets or exceeds defined SLAs\n• 90% user satisfaction rating post-implementation\n• 25% reduction in data management operational costs achieved\n• Successful audit of new data governance controls\n• All training completed with 95% attendance rate",
  raciMatrix: [
    {
      activity: "Project Charter Approval",
      responsible: "Project Manager",
      accountable: "Executive Sponsor",
      consulted: "Steering Committee",
      informed: "All Stakeholders",
    },
    {
      activity: "Technical Architecture Design",
      responsible: "Solution Architect",
      accountable: "Technical Lead",
      consulted: "Security Team, Infrastructure Team",
      informed: "Development Team",
    },
    {
      activity: "Data Migration Execution",
      responsible: "Data Migration Team",
      accountable: "Data Lead",
      consulted: "Business Users, QA Team",
      informed: "Project Manager, Stakeholders",
    },
    {
      activity: "User Acceptance Testing",
      responsible: "Business Users",
      accountable: "Business Lead",
      consulted: "QA Team, Technical Team",
      informed: "Project Manager, Executive Sponsor",
    },
    {
      activity: "Go-Live Decision",
      responsible: "Project Manager",
      accountable: "Executive Sponsor",
      consulted: "Technical Lead, Business Lead",
      informed: "All Project Team",
    },
  ],
  decisionAuthorities: [
    {
      decisionType: "Budget Changes (< £50K)",
      authorityLevel: "Project Manager",
      approvalLimit: "£50,000",
      escalationThreshold: "£25,000 variance",
    },
    {
      decisionType: "Budget Changes (£50K - £100K)",
      authorityLevel: "Executive Sponsor",
      approvalLimit: "£100,000",
      escalationThreshold: "£50,000 cumulative",
    },
    {
      decisionType: "Scope Changes (Minor)",
      authorityLevel: "Project Manager + Business Lead",
      approvalLimit: "No budget impact",
      escalationThreshold: "Any timeline impact",
    },
    {
      decisionType: "Scope Changes (Major)",
      authorityLevel: "Steering Committee",
      approvalLimit: "Unlimited",
      escalationThreshold: "> 10% budget or timeline impact",
    },
    {
      decisionType: "Technical Architecture Changes",
      authorityLevel: "Technical Lead + Solution Architect",
      approvalLimit: "Within approved budget",
      escalationThreshold: "Security or compliance impact",
    },
    {
      decisionType: "Resource Allocation Changes",
      authorityLevel: "Project Manager",
      approvalLimit: "Within team budget",
      escalationThreshold: "Cross-project resource conflicts",
    },
  ],
}

const risksIssuesData = [
  {
    id: "R001",
    type: "Risk",
    title: "API Integration Delay",
    project: "Mobile App Development",
    category: "Technical",
    severity: "High",
    probability: "Medium",
    impact: "High",
    owner: "Michael Chen",
    status: "Open",
    dueDate: "15-10-2026",
    description:
      "Third-party payment API integration is delayed due to documentation issues and lack of test environment access. This could impact the mobile app launch timeline and user payment functionality.",
    mitigationPlan:
      "Engage with API vendor for dedicated support, establish alternative payment gateway as backup, allocate additional development resources for integration testing.",
    contingencyPlan:
      "Implement alternative payment solution if primary API integration cannot be completed within 2 weeks of deadline.",
    riskResponse: "Mitigate",
    dateIdentified: "01-09-2026",
    lastUpdated: "10-10-2026",
    escalationLevel: 2,
    businessImpact: "Potential delay in mobile app launch affecting revenue targets by £150K in Q1",
  },
  {
    id: "I001",
    type: "Issue",
    title: "Database Performance Degradation",
    project: "Website Redesign",
    category: "Technical",
    severity: "Medium",
    probability: "N/A",
    impact: "Medium",
    owner: "Jane Smith",
    status: "In Progress",
    dueDate: "12-10-2026",
    description:
      "Database queries are taking longer than expected, affecting page load times on the customer portal. Average response time has increased from 200ms to 800ms.",
    mitigationPlan:
      "Database optimization in progress, query tuning, index optimization, and connection pooling improvements being implemented.",
    contingencyPlan: "Scale up database resources temporarily while permanent optimization is completed.",
    riskResponse: "Accept",
    dateIdentified: "05-10-2026",
    lastUpdated: "11-10-2026",
    escalationLevel: 1,
    businessImpact: "Customer experience degradation, potential 15% increase in page abandonment rate",
  },
  {
    id: "R002",
    type: "Risk",
    title: "Resource Shortage for QA Testing",
    project: "Website Redesign",
    category: "Resource",
    severity: "Medium",
    probability: "High",
    impact: "Medium",
    owner: "Sarah Johnson",
    status: "Mitigated",
    dueDate: "12-10-2026",
    description:
      "QA team is understaffed for the upcoming testing phase due to concurrent project demands and unexpected team member departure.",
    mitigationPlan:
      "External QA contractor engaged, cross-training of development team members on testing procedures, automated testing tools implementation accelerated.",
    contingencyPlan: "Extend testing timeline by 1 week if quality standards cannot be met with current resources.",
    riskResponse: "Mitigate",
    dateIdentified: "20-09-2026",
    lastUpdated: "08-10-2026",
    escalationLevel: 1,
    businessImpact: "Potential quality issues in production, increased post-launch support costs",
  },
  {
    id: "R003",
    type: "Risk",
    title: "Cloud Migration Data Loss",
    project: "Cloud Migration",
    category: "Technical",
    severity: "Critical",
    probability: "Low",
    impact: "Critical",
    owner: "Robert Garcia",
    status: "Open",
    dueDate: "20-11-2026",
    description:
      "Potential data loss during migration due to complex legacy database structures, interdependencies, and lack of comprehensive data mapping documentation.",
    mitigationPlan:
      "Comprehensive data backup strategy, phased migration approach, extensive testing in staging environment, data validation checkpoints at each phase.",
    contingencyPlan: "Full rollback procedure with complete data restoration from verified backups within 4 hours.",
    riskResponse: "Mitigate",
    dateIdentified: "15-08-2026",
    lastUpdated: "12-10-2026",
    escalationLevel: 3,
    businessImpact:
      "Catastrophic business disruption, potential regulatory compliance violations, estimated £2M+ recovery costs",
  },
  {
    id: "I002",
    type: "Issue",
    title: "Budget Overrun Alert - Cloud Infrastructure",
    project: "Cloud Migration",
    category: "Financial",
    severity: "High",
    probability: "N/A",
    impact: "High",
    owner: "Emma Rodriguez",
    status: "Open",
    dueDate: "05-11-2026",
    description:
      "Current cloud infrastructure spending trajectory indicates 25% budget overrun due to higher than expected data transfer costs and additional security compliance requirements.",
    mitigationPlan:
      "Immediate cost optimization review, renegotiation of cloud service contracts, implementation of cost monitoring and alerting systems.",
    contingencyPlan:
      "Secure additional budget approval or reduce project scope to fit within original budget constraints.",
    riskResponse: "Mitigate",
    dateIdentified: "28-09-2026",
    lastUpdated: "10-10-2026",
    escalationLevel: 2,
    businessImpact: "£200K+ budget overrun, potential impact on other project funding, CFO escalation required",
  },
  {
    id: "R004",
    type: "Risk",
    title: "Vendor Dependency - Single Point of Failure",
    project: "Cloud Migration",
    category: "External",
    severity: "High",
    probability: "Medium",
    impact: "High",
    owner: "David Wilson",
    status: "Open",
    dueDate: "30-10-2026",
    description:
      "Heavy reliance on single cloud vendor creates vendor lock-in risk and potential service disruption if vendor experiences outages or changes service terms.",
    mitigationPlan:
      "Multi-cloud strategy evaluation, vendor diversification plan, service level agreement strengthening, exit strategy documentation.",
    contingencyPlan:
      "Alternative vendor evaluation and rapid migration plan if primary vendor relationship deteriorates.",
    riskResponse: "Mitigate",
    dateIdentified: "10-09-2026",
    lastUpdated: "09-10-2026",
    escalationLevel: 2,
    businessImpact: "Potential service disruption, increased long-term costs, reduced negotiating power",
  },
  {
    id: "R005",
    type: "Risk",
    title: "Skills Gap in Development Team",
    project: "Mobile App Development",
    category: "Resource",
    severity: "Medium",
    probability: "High",
    impact: "Medium",
    owner: "Lisa Park",
    status: "In Progress",
    dueDate: "25-10-2026",
    description:
      "Development team lacks sufficient experience with React Native framework and mobile-specific security requirements, potentially impacting code quality and delivery timeline.",
    mitigationPlan:
      "Intensive training program initiated, senior mobile developer consultant engaged, pair programming sessions with experienced developers, code review process strengthened.",
    contingencyPlan:
      "Engage additional external mobile development resources if internal team cannot achieve required competency levels.",
    riskResponse: "Mitigate",
    dateIdentified: "15-09-2026",
    lastUpdated: "11-10-2026",
    escalationLevel: 1,
    businessImpact: "Potential code quality issues, increased technical debt, possible timeline delays of 2-3 weeks",
  },
  {
    id: "I003",
    type: "Issue",
    title: "GDPR Compliance Gap Identified",
    project: "Website Redesign",
    category: "Compliance",
    severity: "High",
    probability: "N/A",
    impact: "High",
    owner: "Mark Thompson",
    status: "Open",
    dueDate: "18-10-2026",
    description:
      "Current website design does not meet GDPR requirements for data processing consent, cookie management, and user data deletion capabilities.",
    mitigationPlan:
      "Legal team consultation scheduled, GDPR compliance specialist engaged, design modifications to include proper consent mechanisms and data management features.",
    contingencyPlan: "Delay website launch until full GDPR compliance is achieved to avoid regulatory penalties.",
    riskResponse: "Mitigate",
    dateIdentified: "07-10-2026",
    lastUpdated: "11-10-2026",
    escalationLevel: 2,
    businessImpact: "Potential regulatory fines up to £500K, reputational damage, mandatory launch delay",
  },
  {
    id: "R006",
    type: "Risk",
    title: "Integration Complexity Underestimated",
    project: "Marketing Campaign",
    category: "Technical",
    severity: "Low",
    probability: "Low",
    impact: "Medium",
    owner: "Anna Martinez",
    status: "Closed",
    dueDate: "10-10-2026",
    description:
      "Initial assessment may have underestimated the complexity of integrating marketing automation platform with existing CRM and analytics systems.",
    mitigationPlan:
      "Detailed technical assessment completed, integration approach simplified, phased rollout plan implemented.",
    contingencyPlan:
      "Manual data synchronization processes as temporary measure if automated integration proves too complex.",
    riskResponse: "Mitigate",
    dateIdentified: "25-09-2026",
    lastUpdated: "10-10-2026",
    escalationLevel: 0,
    businessImpact: "Minimal - alternative approaches available with acceptable manual overhead",
  },
  {
    id: "I004",
    type: "Issue",
    title: "Stakeholder Availability Constraints",
    project: "Cloud Migration",
    category: "Resource",
    severity: "Medium",
    probability: "N/A",
    impact: "Medium",
    owner: "Tom Wilson",
    status: "In Progress",
    dueDate: "22-10-2026",
    description:
      "Key business stakeholders have limited availability for requirements validation sessions due to competing priorities and year-end business activities.",
    mitigationPlan:
      "Flexible meeting scheduling, asynchronous review processes implemented, stakeholder proxy identification, extended review periods allocated.",
    contingencyPlan:
      "Proceed with technical implementation based on documented requirements, with formal sign-off deferred to next available window.",
    riskResponse: "Accept",
    dateIdentified: "03-10-2026",
    lastUpdated: "11-10-2026",
    escalationLevel: 1,
    businessImpact: "Potential requirements misalignment, increased change requests post-implementation",
  },
  {
    id: "R007",
    type: "Risk",
    title: "Cybersecurity Threat During Migration",
    project: "Cloud Migration",
    category: "Security",
    severity: "High",
    probability: "Medium",
    impact: "Critical",
    owner: "Security Team Lead",
    status: "Open",
    dueDate: "15-11-2026",
    description:
      "Increased cybersecurity risk during migration period due to data in transit, temporary security configurations, and potential exposure of sensitive systems.",
    mitigationPlan:
      "Enhanced security monitoring, encrypted data transfer protocols, temporary security hardening, incident response team on standby.",
    contingencyPlan: "Immediate migration halt and security lockdown if any security breach indicators detected.",
    riskResponse: "Mitigate",
    dateIdentified: "20-09-2026",
    lastUpdated: "12-10-2026",
    escalationLevel: 3,
    businessImpact: "Potential data breach, regulatory violations, customer trust damage, estimated £5M+ impact",
  },
  {
    id: "I005",
    type: "Issue",
    title: "Third-Party License Renewal Delay",
    project: "Website Redesign",
    category: "Procurement",
    severity: "Medium",
    probability: "N/A",
    impact: "Low",
    owner: "Procurement Manager",
    status: "In Progress",
    dueDate: "20-10-2026",
    description:
      "Renewal of critical third-party software licenses delayed due to procurement process bottlenecks and vendor contract negotiations.",
    mitigationPlan:
      "Expedited procurement process, temporary license extension negotiated, alternative vendor evaluation as backup.",
    contingencyPlan:
      "Temporary downgrade to basic license tier or switch to alternative solution if renewal cannot be completed.",
    riskResponse: "Mitigate",
    dateIdentified: "08-10-2026",
    lastUpdated: "11-10-2026",
    escalationLevel: 1,
    businessImpact: "Minor feature limitations, potential temporary service degradation",
  },
  {
    id: "R008",
    type: "Risk",
    title: "API Integration Delay - Mobile App Development",
    project: "Mobile App Development",
    category: "Technical",
    severity: "High",
    probability: "Medium",
    impact: "High",
    owner: "Michael Chen",
    status: "Open",
    dueDate: "15-10-2026",
    description:
      "Third-party payment API integration is delayed due to documentation issues and lack of test environment access. This could impact the mobile app launch timeline and user payment functionality. Source: Risk Intelligence analysis.",
    mitigationPlan:
      "Engage with API vendor for dedicated support, establish alternative payment gateway as backup, allocate additional development resources for integration testing.",
    contingencyPlan:
      "Implement alternative payment solution if primary API integration cannot be completed within 2 weeks of deadline.",
    riskResponse: "Mitigate",
    dateIdentified: "01-09-2026",
    lastUpdated: "10-10-2026",
    escalationLevel: 2,
    businessImpact: "Potential delay in mobile app launch affecting revenue targets by £150K in Q1",
  },
  {
    id: "R009",
    type: "Risk",
    title: "Cloud Migration Data Loss - Critical Systems",
    project: "Cloud Migration",
    category: "Technical",
    severity: "Critical",
    probability: "Low",
    impact: "Critical",
    owner: "Robert Garcia",
    status: "Open",
    dueDate: "20-11-2026",
    description:
      "Potential data loss during migration due to complex legacy database structures, interdependencies, and lack of comprehensive data mapping documentation. Source: Risk Intelligence predictive analysis.",
    mitigationPlan:
      "Comprehensive data backup strategy, phased migration approach, extensive testing in staging environment, data validation checkpoints at each phase.",
    contingencyPlan: "Full rollback procedure with complete data restoration from verified backups within 4 hours.",
    riskResponse: "Mitigate",
    dateIdentified: "15-08-2026",
    lastUpdated: "12-10-2026",
    escalationLevel: 3,
    businessImpact:
      "Catastrophic business disruption, potential regulatory compliance violations, estimated £2M+ recovery costs",
  },
]

const statusReportTemplate = {
  reportDate: "15-03-2026",
  reportingPeriod: "Week ending 15 March 2026",
  overallStatus: "Amber",
  keyAccomplishments:
    "• Status report ready for auto-generation\n• All project data sources connected\n• Governance framework active and monitoring",
  upcomingMilestones:
    "• Auto-generate comprehensive status report\n• Review integrated project metrics\n• Validate data accuracy across all sources",
  issues: "• Awaiting status report generation",
  risks: "• No current risks - data pending analysis",
  budgetStatus: "Budget status will be calculated during generation...",
  nextSteps: "• Click 'Generate Status Report' to compile latest project data",
}

const milestonesData = [
  {
    id: "M001",
    name: "Project Charter Approval",
    dueDate: "01-09-2026",
    status: "Complete",
    owner: "Project Manager",
    progress: 100,
    purpose: "Establish project foundation and secure executive approval",
    priority: "Critical",
    category: "Initiation",
    dependencies: "None",
    deliverables: "Signed Project Charter, Executive Approval",
    actualCompletionDate: "28-08-2026",
    variance: -4,
  },
  {
    id: "M002",
    name: "Stakeholder Analysis Complete",
    dueDate: "05-09-2026",
    status: "Complete",
    owner: "Business Analyst",
    progress: 100,
    purpose: "Identify and analyze all project stakeholders",
    priority: "High",
    category: "Planning",
    dependencies: "M001",
    deliverables: "Stakeholder Register, Communication Plan",
    actualCompletionDate: "04-09-2026",
    variance: -1,
  },
  {
    id: "M003",
    name: "Requirements Gathering Complete",
    dueDate: "15-09-2026",
    status: "Complete",
    owner: "Business Analyst",
    progress: 100,
    purpose: "Define and document all functional and non-functional requirements",
    priority: "Critical",
    category: "Analysis",
    dependencies: "M002",
    deliverables: "Requirements Document, User Stories, Acceptance Criteria",
    actualCompletionDate: "18-09-2026",
    variance: 3,
  },
  {
    id: "M004",
    name: "Technical Architecture Design",
    dueDate: "25-09-2026",
    status: "Complete",
    owner: "Solution Architect",
    progress: 100,
    purpose: "Define technical architecture and system design",
    priority: "Critical",
    category: "Design",
    dependencies: "M003",
    deliverables: "Architecture Document, Technical Specifications",
    actualCompletionDate: "26-09-2026",
    variance: 1,
  },
  {
    id: "M005",
    name: "Security Assessment Complete",
    dueDate: "30-09-2026",
    status: "Complete",
    owner: "Security Lead",
    progress: 100,
    purpose: "Conduct comprehensive security risk assessment",
    priority: "High",
    category: "Security",
    dependencies: "M004",
    deliverables: "Security Assessment Report, Risk Register",
    actualCompletionDate: "02-10-2026",
    variance: 2,
  },
  {
    id: "M006",
    name: "Vendor Selection Complete",
    dueDate: "05-10-2026",
    status: "Complete",
    owner: "Procurement Lead",
    progress: 100,
    purpose: "Select and contract key technology vendors",
    priority: "High",
    category: "Procurement",
    dependencies: "M004",
    deliverables: "Vendor Contracts, Service Level Agreements",
    actualCompletionDate: "07-10-2026",
    variance: 2,
  },
  {
    id: "M007",
    name: "Development Environment Setup",
    dueDate: "10-10-2026",
    status: "Complete",
    owner: "DevOps Lead",
    progress: 100,
    purpose: "Establish development and testing environments",
    priority: "High",
    category: "Infrastructure",
    dependencies: "M006",
    deliverables: "Development Environment, CI/CD Pipeline",
    actualCompletionDate: "09-10-2026",
    variance: -1,
  },
  {
    id: "M008",
    name: "UI/UX Design Complete",
    dueDate: "15-10-2026",
    status: "In Progress",
    owner: "Design Lead",
    progress: 85,
    purpose: "Finalize user interface and user experience designs",
    priority: "High",
    category: "Design",
    dependencies: "M003",
    deliverables: "UI Mockups, UX Wireframes, Design System",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M009",
    name: "Data Migration Strategy",
    dueDate: "20-10-2026",
    status: "In Progress",
    owner: "Data Lead",
    progress: 70,
    purpose: "Define comprehensive data migration approach",
    priority: "Critical",
    category: "Data Management",
    dependencies: "M004",
    deliverables: "Migration Plan, Data Mapping, Validation Rules",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M010",
    name: "Core Development Phase 1",
    dueDate: "30-11-2026",
    status: "Not Started",
    owner: "Development Lead",
    progress: 0,
    purpose: "Implement core system functionality",
    priority: "Critical",
    category: "Development",
    dependencies: "M008, M009",
    deliverables: "Core Application, Unit Tests, Code Documentation",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M011",
    name: "Integration Testing Phase 1",
    dueDate: "15-12-2026",
    status: "Not Started",
    owner: "QA Lead",
    progress: 0,
    purpose: "Test system integrations and interfaces",
    priority: "High",
    category: "Testing",
    dependencies: "M010",
    deliverables: "Integration Test Results, Defect Reports",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M012",
    name: "User Acceptance Testing",
    dueDate: "10-01-2027",
    status: "Not Started",
    owner: "Business Lead",
    progress: 0,
    purpose: "Validate system meets business requirements",
    priority: "Critical",
    category: "Testing",
    dependencies: "M011",
    deliverables: "UAT Results, User Sign-off, Change Requests",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M013",
    name: "Performance Testing Complete",
    dueDate: "20-01-2027",
    status: "Not Started",
    owner: "Performance Lead",
    progress: 0,
    purpose: "Validate system performance under load",
    priority: "High",
    category: "Testing",
    dependencies: "M011",
    deliverables: "Performance Test Results, Optimization Plan",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M014",
    name: "Security Penetration Testing",
    dueDate: "25-01-2027",
    status: "Not Started",
    owner: "Security Lead",
    progress: 0,
    purpose: "Comprehensive security testing and validation",
    priority: "Critical",
    category: "Security",
    dependencies: "M012",
    deliverables: "Security Test Report, Vulnerability Assessment",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M015",
    name: "Data Migration Phase 1",
    dueDate: "05-02-2027",
    status: "Not Started",
    owner: "Data Lead",
    progress: 0,
    purpose: "Migrate critical business data to new platform",
    priority: "Critical",
    category: "Migration",
    dependencies: "M014",
    deliverables: "Migrated Data, Validation Reports, Rollback Plan",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M016",
    name: "User Training Program Delivery",
    dueDate: "15-02-2027",
    status: "Not Started",
    owner: "Training Lead",
    progress: 0,
    purpose: "Train end users on new system functionality",
    priority: "High",
    category: "Training",
    dependencies: "M015",
    deliverables: "Training Materials, User Certification, Feedback",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M017",
    name: "Production Environment Setup",
    dueDate: "20-02-2027",
    status: "Not Started",
    owner: "DevOps Lead",
    progress: 0,
    purpose: "Prepare production environment for go-live",
    priority: "Critical",
    category: "Infrastructure",
    dependencies: "M014",
    deliverables: "Production Environment, Monitoring Setup",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M018",
    name: "Go-Live Readiness Review",
    dueDate: "25-02-2027",
    status: "Not Started",
    owner: "Project Manager",
    progress: 0,
    purpose: "Final readiness assessment before production deployment",
    priority: "Critical",
    category: "Governance",
    dependencies: "M016, M017",
    deliverables: "Readiness Checklist, Go/No-Go Decision",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M019",
    name: "Production Deployment",
    dueDate: "28-02-2027",
    status: "Not Started",
    owner: "DevOps Lead",
    progress: 0,
    purpose: "Deploy system to production environment",
    priority: "Critical",
    category: "Deployment",
    dependencies: "M018",
    deliverables: "Production System, Deployment Report",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M020",
    name: "Go-Live Support Period",
    dueDate: "15-03-2027",
    status: "Not Started",
    owner: "Support Lead",
    progress: 0,
    purpose: "Provide intensive support during initial go-live period",
    priority: "High",
    category: "Support",
    dependencies: "M019",
    deliverables: "Support Reports, Issue Resolution Log",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M021",
    name: "Post-Implementation Review",
    dueDate: "30-03-2027",
    status: "Not Started",
    owner: "Project Manager",
    progress: 0,
    purpose: "Comprehensive review of project success and lessons learned",
    priority: "Medium",
    category: "Review",
    dependencies: "M020",
    deliverables: "PIR Report, Lessons Learned, Recommendations",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M022",
    name: "Knowledge Transfer Complete",
    dueDate: "15-04-2027",
    status: "Not Started",
    owner: "Technical Lead",
    progress: 0,
    purpose: "Transfer technical knowledge to support teams",
    priority: "Medium",
    category: "Knowledge Transfer",
    dependencies: "M021",
    deliverables: "Technical Documentation, Support Procedures",
    actualCompletionDate: null,
    variance: 0,
  },
  {
    id: "M023",
    name: "Project Closure",
    dueDate: "30-04-2027",
    status: "Not Started",
    owner: "Project Manager",
    progress: 0,
    purpose: "Formal project closure and resource release",
    priority: "Low",
    category: "Closure",
    dependencies: "M022",
    deliverables: "Project Closure Report, Final Sign-off",
    actualCompletionDate: null,
    variance: 0,
  },
]

const changeRequestTemplate = {
  changeRequestId: "CR-SEC-001",
  submissionDate: "15-03-2026",
  status: "Under Review",
  projectName: "Cloud Migration Initiative",
  changeRequestor: "David Wilson",
  changeRequestorRole: "Infrastructure Lead",
  changeRequestorEmail: "david.wilson@company.com",
  changeApprover: "Emma Rodriguez - Project Director",
  changeTitle: "Add Advanced Security Monitoring Package",
  changeType: "Scope Addition",
  priority: "High",
  urgency: "Medium",
  changeCategory: "Technical Enhancement",
  changeDescription:
    "Add the Advanced Security Monitoring package to our cloud services subscription to enhance threat detection, compliance monitoring, and automated incident response capabilities. This enhancement includes AI-powered anomaly detection, real-time threat intelligence, automated incident response workflows, and comprehensive compliance reporting features that were not included in the original project scope.",
  businessJustification:
    "Recent security assessment identified critical gaps in our planned cloud security monitoring capabilities. The Advanced Security Monitoring package provides automated threat detection and response capabilities that would otherwise require significant custom development estimated at £180,000 and 6 months additional timeline. This solution offers immediate implementation with proven enterprise-grade security features, reducing our security risk exposure during the critical migration period.",
  technicalJustification:
    "Current monitoring solution lacks real-time threat detection and automated response capabilities required for cloud environment. Advanced package includes: AI-powered anomaly detection with 99.7% accuracy, automated incident response reducing response time from hours to minutes, comprehensive compliance reporting for SOC2, ISO27001, and GDPR requirements, integration with existing SIEM systems, and 24/7 security operations center support.",
  scheduleImpact:
    "No impact to overall project schedule. Implementation can be performed in parallel with other security configuration activities. Estimated 2 weeks additional effort for security team configuration and testing. Integration testing can be completed during existing security validation phase without extending critical path milestones.",
  budgetImpact:
    "Additional cost of £45,000 for the first year subscription (£3,750/month). This represents a 10% increase to the overall project budget of £450,000. Ongoing annual cost of £45,000 for subsequent years. Cost comparison: Custom development alternative would cost £180,000 upfront plus £25,000 annual maintenance, making this solution 75% more cost-effective over 3 years.",
  resourceImpact:
    "Requires 2 weeks additional effort from security team for configuration and testing (80 hours total). No additional external resources required. Training for 3 security team members estimated at 1 week total effort (120 hours). Ongoing operational impact minimal as solution includes managed services component.",
  approvalStatus: "Pending Review",
  approvalDate: "",
  approvalComments: "",
  implementationPlan:
    "Phase 1: Procurement and licensing (1 week)\n- Complete vendor contract negotiations\n- Finalize licensing agreements\n- Establish service level agreements\n\nPhase 2: Configuration and setup (1 week)\n- Configure monitoring policies and rules\n- Integrate with existing security infrastructure\n- Set up automated response workflows\n\nPhase 3: Testing and validation (3 days)\n- Conduct comprehensive testing of all features\n- Validate integration with existing systems\n- Perform security incident simulation exercises\n\nPhase 4: Training and documentation (2 days)\n- Deliver training to security team\n- Create operational procedures documentation\n- Establish ongoing support processes",
  rollbackPlan:
    "Service can be disabled without impact to existing monitoring capabilities. No data migration required for rollback. Licensing can be cancelled with 30-day notice. Existing security monitoring systems will continue to operate normally. Full rollback can be completed within 4 hours if required.",
  approvers: [
    {
      name: "Emma Rodriguez",
      role: "Project Director",
      status: "Pending",
      approvalDate: "",
      comments: "",
      required: true,
      order: 1,
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      status: "Pending",
      approvalDate: "",
      comments: "",
      required: true,
      order: 2,
    },
    {
      name: "Michael Foster",
      role: "Security Director",
      status: "Pending",
      approvalDate: "",
      comments: "",
      required: true,
      order: 3,
    },
    {
      name: "James Mitchell",
      role: "Finance Director",
      status: "Pending",
      approvalDate: "",
      comments: "",
      required: true,
      order: 4,
    },
    {
      name: "Lisa Chen",
      role: "Compliance Officer",
      status: "Pending",
      approvalDate: "",
      comments: "",
      required: false,
      order: 5,
    },
  ],
}

const decisionsData = [
  {
    id: "DEC-001",
    title: "Technology Stack Selection for Website Redesign",
    project: "Website Redesign",
    decisionDate: "15-09-2026",
    decisionMaker: "Sarah Johnson - Technical Lead",
    category: "Technical",
    priority: "High",
    status: "Implemented",
    submissionDate: "10-09-2026",
    latencyDays: 5,
    description:
      "Selection of React.js with Next.js framework for the new website architecture instead of continuing with the legacy PHP-based system. This decision affects the entire frontend development approach and requires team upskilling.",
    rationale:
      "React.js with Next.js provides the best balance of performance, SEO capabilities, and aligns with our team's existing expertise. The framework offers excellent server-side rendering capabilities which are crucial for our marketing website requirements. Additionally, the component-based architecture will improve maintainability and enable faster feature development. The decision was based on technical evaluation, team capability assessment, and long-term strategic alignment with our technology roadmap.",
    impact:
      "Positive impact on development velocity and website performance. Estimated 30% improvement in page load times and better SEO rankings. Development team productivity expected to increase by 25% after initial learning curve. Long-term maintenance costs reduced by approximately 40% compared to legacy PHP system. Enables modern development practices including automated testing and continuous deployment.",
    reviewDate: "15-12-2026",
    implementationStatus: "Complete",
    alternatives:
      "Vue.js with Nuxt.js, Angular with Universal, PHP Laravel with modern frontend, WordPress headless CMS",
  },
  {
    id: "DEC-002",
    title: "Cloud Provider Selection for Enterprise Migration",
    project: "Cloud Migration",
    decisionDate: "22-09-2026",
    decisionMaker: "Robert Garcia - Infrastructure Lead",
    category: "Infrastructure",
    priority: "Critical",
    status: "Approved",
    submissionDate: "15-09-2026",
    latencyDays: 7,
    description:
      "Selection of AWS as the primary cloud provider for the enterprise data platform migration, replacing the multi-cloud approach initially considered. This decision establishes the foundation for all cloud infrastructure and services.",
    rationale:
      "AWS provides the most comprehensive set of services for our data platform requirements, including advanced analytics tools, robust security features, and excellent integration capabilities. Our team has the most expertise with AWS services, reducing learning curve and implementation risk. Cost analysis showed 20% savings compared to multi-cloud approach due to volume discounts and reduced complexity. AWS also offers the best compliance certifications for our industry requirements.",
    impact:
      "Simplified architecture, reduced complexity, estimated 20% cost savings compared to multi-cloud approach. Faster implementation timeline due to team expertise. Improved security posture through AWS native security services. Better disaster recovery capabilities through AWS global infrastructure. Enables advanced analytics and machine learning capabilities through AWS AI/ML services.",
    reviewDate: "22-12-2026",
    implementationStatus: "In Progress",
    alternatives: "Microsoft Azure, Google Cloud Platform, Multi-cloud approach with AWS/Azure, Hybrid cloud solution",
  },
  {
    id: "DEC-003",
    title: "Database Migration Strategy and Approach",
    project: "Cloud Migration",
    decisionDate: "05-10-2026",
    decisionMaker: "Michael Chen - Database Lead",
    category: "Technical",
    priority: "High",
    status: "Approved",
    submissionDate: "28-09-2026",
    latencyDays: 7,
    description:
      "Decision to use AWS Database Migration Service (DMS) for the primary database migration with a phased approach starting with non-critical systems. This approach minimizes risk and allows for learning and optimization between phases.",
    rationale:
      "AWS DMS provides proven migration capabilities with minimal downtime and built-in data validation. Phased approach reduces risk by allowing us to learn from initial migrations and optimize processes. Starting with non-critical systems provides opportunity to refine procedures before migrating business-critical databases. DMS supports our heterogeneous database environment and provides continuous data replication capabilities.",
    impact:
      "Reduced migration risk, estimated 40% reduction in downtime compared to manual migration approach. Improved data consistency through automated validation. Faster overall migration timeline through parallel processing capabilities. Reduced resource requirements through automation.",
    reviewDate: "05-01-2027",
    implementationStatus: "Planning",
    alternatives:
      "Manual migration with custom scripts, Third-party migration tools (Attunity, Striim), Native database replication, Hybrid approach",
  },
  {
    id: "DEC-004",
    title: "Security Framework Implementation Strategy",
    project: "Security Upgrade",
    decisionDate: "12-10-2026",
    decisionMaker: "Lisa Park - Security Lead",
    category: "Security",
    priority: "Critical",
    status: "Under Review",
    submissionDate: "08-10-2026",
    latencyDays: 4,
    description:
      "Implementation of Zero Trust security model across all cloud infrastructure and applications, replacing traditional perimeter-based security approach. This represents a fundamental shift in our security architecture and operational procedures.",
    rationale:
      "Zero Trust provides the most comprehensive security posture for cloud environments, eliminating implicit trust and continuously validating every transaction. This approach aligns with industry best practices and regulatory requirements. Traditional perimeter security is inadequate for cloud and remote work environments. Zero Trust reduces attack surface and improves incident response capabilities.",
    impact:
      "Significantly improved security posture, compliance with latest security standards, estimated 60% reduction in security incidents. Enhanced visibility and control over all network traffic and user access. Improved compliance reporting and audit capabilities. Better support for remote work and cloud-first architecture.",
    reviewDate: "12-01-2027",
    implementationStatus: "Pending Approval",
    alternatives:
      "Traditional perimeter security with enhancements, Hybrid security model, Enhanced firewall approach with micro-segmentation",
  },
  {
    id: "DEC-005",
    title: "Mobile App Development Framework Selection",
    project: "Mobile App Development",
    decisionDate: "18-10-2026",
    decisionMaker: "Anna Martinez - Mobile Lead",
    category: "Technical",
    priority: "High",
    status: "Implemented",
    submissionDate: "14-10-2026",
    latencyDays: 4,
    description:
      "Selection of React Native for cross-platform mobile app development instead of native iOS and Android development. This decision affects development approach, team structure, and long-term maintenance strategy.",
    rationale:
      "React Native allows for code reuse across platforms, faster development cycles, and leverages existing React expertise in the team. Single codebase reduces maintenance overhead and ensures consistent user experience. Development team already has React skills, reducing learning curve and time to market. Cost analysis shows 40% reduction in development costs compared to native approach.",
    impact:
      "50% reduction in development time, consistent user experience across platforms, reduced maintenance overhead. Faster time to market for new features. Lower long-term development costs. Ability to leverage web development talent for mobile projects.",
    reviewDate: "18-01-2027",
    implementationStatus: "Complete",
    alternatives: "Native iOS/Android development, Flutter, Xamarin, Progressive Web App (PWA), Ionic",
  },
  {
    id: "DEC-006",
    title: "Data Governance Tool Selection",
    project: "Cloud Migration",
    decisionDate: "25-10-2026",
    decisionMaker: "Tom Wilson - Data Lead",
    category: "Data Management",
    priority: "Medium",
    status: "Approved",
    submissionDate: "20-10-2026",
    latencyDays: 5,
    description:
      "Selection of AWS Glue Data Catalog with Apache Atlas for comprehensive data governance and lineage tracking. This decision establishes the foundation for enterprise data management and compliance reporting.",
    rationale:
      "Native AWS integration provides seamless connectivity with our cloud infrastructure. Comprehensive metadata management capabilities support data discovery and governance requirements. Strong lineage tracking capabilities essential for compliance and impact analysis. Cost-effective licensing model compared to enterprise alternatives. Open source Apache Atlas provides flexibility and avoids vendor lock-in.",
    impact:
      "Improved data quality through better governance, enhanced compliance reporting capabilities, better data discovery for business users. Reduced time for impact analysis and change management. Improved data security through better access control and monitoring.",
    reviewDate: "25-01-2027",
    implementationStatus: "Planning",
    alternatives:
      "Collibra Data Governance, Informatica Data Governance, Microsoft Purview, Custom solution with open source tools",
  },
  {
    id: "DEC-007",
    title: "API Gateway and Management Strategy",
    project: "Website Redesign",
    decisionDate: "02-11-2026",
    decisionMaker: "David Kim - API Lead",
    category: "Technical",
    priority: "High",
    status: "Approved",
    submissionDate: "28-10-2026",
    latencyDays: 5,
    description:
      "Implementation of AWS API Gateway for centralized API management, security, and monitoring across all web services and integrations.",
    rationale:
      "Centralized API management provides better security, monitoring, and governance. AWS API Gateway offers native integration with our cloud infrastructure and provides enterprise-grade features including throttling, caching, and authentication. Supports our microservices architecture and enables better API versioning and lifecycle management.",
    impact:
      "Improved API security and monitoring, better performance through caching and throttling, simplified API management and governance. Enhanced developer experience through centralized documentation and testing tools.",
    reviewDate: "02-02-2027",
    implementationStatus: "In Progress",
    alternatives:
      "Kong API Gateway, Azure API Management, Custom API gateway solution, Direct service-to-service communication",
  },
  {
    id: "DEC-008",
    title: "Backup and Disaster Recovery Strategy",
    project: "Cloud Migration",
    decisionDate: "08-11-2026",
    decisionMaker: "Infrastructure Team Lead",
    category: "Infrastructure",
    priority: "Critical",
    status: "Implemented",
    submissionDate: "03-11-2026",
    latencyDays: 5,
    description:
      "Implementation of comprehensive backup and disaster recovery strategy using AWS native services including automated backups, cross-region replication, and disaster recovery testing procedures.",
    rationale:
      "Business continuity requirements demand robust backup and disaster recovery capabilities. AWS native services provide cost-effective and reliable solution with automated testing and validation. Cross-region replication ensures protection against regional outages. Automated backup procedures reduce operational overhead and human error risk.",
    impact:
      "Improved business continuity, reduced recovery time objectives (RTO) and recovery point objectives (RPO), automated backup procedures reduce operational overhead. Enhanced compliance with business continuity requirements.",
    reviewDate: "08-02-2027",
    implementationStatus: "Complete",
    alternatives:
      "Third-party backup solutions, Manual backup procedures, Hybrid backup approach, Multi-cloud backup strategy",
  },
]

const projectDataTemplate = {
  projectId: "WEB-2026",
  projectName: "Website Redesign",
  totalBudget: 450000,
  approvedBudget: 450000,
  spentToDate: 292500,
  remainingBudget: 157500,
  budgetVariance: 0,
  forecastAtCompletion: 450000,
  costPerformanceIndex: 1.0,
  schedulePerformanceIndex: 0.95,
  earnedValue: 292500,
  plannedValue: 307800,
  actualCost: 292500,
  budgetAtCompletion: 450000,
  estimateAtCompletion: 450000,
  varianceAtCompletion: 0,
  contingencyReserve: 22500,
  managementReserve: 45000,
  lastUpdated: "15-03-2026",
  updatedBy: "Finance Controller",
  approvalStatus: "Approved",
  nextReviewDate: "30-03-2026",
  comments: "Project tracking on budget with minor schedule variance. No immediate concerns.",
  budgetBreakdown: [
    { category: "Development Resources", budgeted: 180000, spent: 117000, remaining: 63000, percentage: 40 },
    { category: "Design and UX", budgeted: 90000, spent: 58500, remaining: 31500, percentage: 20 },
    { category: "Infrastructure and Hosting", budgeted: 67500, spent: 43875, remaining: 23625, percentage: 15 },
    { category: "Third-party Licenses", budgeted: 45000, spent: 29250, remaining: 15750, percentage: 10 },
    { category: "Testing and QA", budgeted: 36000, spent: 23400, remaining: 12600, percentage: 8 },
    { category: "Project Management", budgeted: 31500, spent: 20475, remaining: 11025, percentage: 7 },
  ],
  monthlySpend: [
    { month: "Sep 2026", budgeted: 45000, actual: 42000, variance: -3000 },
    { month: "Oct 2026", budgeted: 52000, actual: 55000, variance: 3000 },
    { month: "Nov 2026", budgeted: 48000, actual: 46000, variance: -2000 },
    { month: "Dec 2026", budgeted: 55000, actual: 58000, variance: 3000 },
    { month: "Jan 2027", budgeted: 62000, actual: 59500, variance: -2500 },
    { month: "Feb 2027", budgeted: 58000, actual: 32000, variance: -26000 },
  ],
  riskAdjustments: [
    { description: "API Integration Complexity", amount: 15000, probability: 0.6, expectedValue: 9000 },
    { description: "Additional Security Requirements", amount: 25000, probability: 0.4, expectedValue: 10000 },
    { description: "Extended Testing Period", amount: 12000, probability: 0.3, expectedValue: 3600 },
  ],
  changeRequestImpacts: [
    { id: "CR-001", description: "Enhanced Mobile Responsiveness", approved: true, amount: 18000 },
    { id: "CR-002", description: "Additional Analytics Integration", approved: false, amount: 22000 },
    { id: "CR-003", description: "GDPR Compliance Enhancements", approved: true, amount: 8000 },
  ],
}

export function SmartGovernance() {
  const [activeTemplate, setActiveTemplate] = useState("scorecard")
  const [editingPID, setEditingPID] = useState(false)
  const [pidData, setPidData] = useState(pidTemplate)
  const [editingRisks, setEditingRisks] = useState(false)
  const [risksData, setRisksData] = useState(risksIssuesData)
  const [editingStatus, setEditingStatus] = useState(false)
  const [statusData, setStatusData] = useState(statusReportTemplate)
  const [editingMilestones, setEditingMilestones] = useState(false)
  const [milestonesState, setMilestonesState] = useState(milestonesData)
  const [editingChangeRequest, setEditingChangeRequest] = useState(false)
  const [changeRequestData, setChangeRequestData] = useState(changeRequestTemplate)
  const [editingDecisions, setEditingDecisions] = useState(false)
  const [decisionsState, setDecisionsState] = useState(decisionsData)
  const [editingInception, setEditingInception] = useState(false)
  const [editingProjectData, setEditingProjectData] = useState(false)
  const [projectData, setProjectData] = useState(projectDataTemplate)
  const [riskIssueFilter, setRiskIssueFilter] = useState("all")
  const [editingStageGates, setEditingStageGates] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState(null)

  // Auto-generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState("Pending generation")
  const [generationStep, setGenerationStep] = useState("")
  const [demoMode, setDemoMode] = useState(true)

  // Business case upload state
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)

  // Stage Gates data
  const [stageGatesData, setStageGatesData] = useState([
    {
      id: "SG001",
      name: "Discovery and Validation",
      description: "Initial project discovery and business case validation",
      progress: 100,
      status: "Complete",
      checks: [
        { id: "C001", name: "Business case approved", completed: true, required: true },
        { id: "C002", name: "Stakeholder analysis complete", completed: true, required: true },
        { id: "C003", name: "Initial risk assessment", completed: true, required: true },
        { id: "C004", name: "Budget allocation confirmed", completed: true, required: true },
        { id: "C005", name: "Project charter signed", completed: true, required: true },
      ],
    },
    {
      id: "SG002",
      name: "Planning and Architecture",
      description: "Detailed planning and solution architecture design",
      progress: 100,
      status: "Complete",
      checks: [
        { id: "C006", name: "Technical architecture approved", completed: true, required: true },
        { id: "C007", name: "Project plan finalized", completed: true, required: true },
        { id: "C008", name: "Resource allocation confirmed", completed: true, required: true },
        { id: "C009", name: "Vendor selection complete", completed: true, required: true },
        { id: "C010", name: "Security review passed", completed: true, required: true },
      ],
    },
    {
      id: "SG003",
      name: "Build & Verify",
      description: "Development and progressive verification of solution components",
      progress: 65,
      status: "In Progress",
      checks: [
        { id: "C012", name: "Development environment setup", completed: true, required: true },
        { id: "C013", name: "Core functionality developed", completed: true, required: true },
        { id: "C014", name: "Unit testing complete", completed: true, required: true },
        { id: "C015", name: "Integration testing", completed: false, required: true },
        { id: "C016", name: "Performance testing", completed: false, required: true },
        { id: "C017", name: "Security testing", completed: false, required: true },
      ],
    },
  ])

  // Inception data
  const [inceptionData, setInceptionData] = useState({
    problemStatement:
      "Current legacy systems are causing operational inefficiencies, increased maintenance costs, and limiting our ability to scale and innovate in response to market demands.",
    visionStatement:
      "To modernize our technology infrastructure, enabling seamless operations, improved customer experience, and sustainable business growth through digital transformation.",
    successMetrics: [
      "40% reduction in system downtime",
      "25% improvement in operational efficiency",
      "30% faster time-to-market for new features",
      "90% user satisfaction rating",
    ],
    valueProposition:
      "Deliver £2.3M in cost savings over 3 years while improving system reliability and enabling new revenue streams through enhanced digital capabilities.",
    strategicAlignment: {
      digitalTransformation: true,
      operationalExcellence: true,
      competitiveAdvantage: false,
    },
    charterApproval: {
      executiveSponsor: true,
      steeringCommittee: false,
    },
  })

  // Sample business case data for different scenarios
  const businessCaseScenarios = [
    {
      name: "Cloud Migration Initiative",
      problemStatement:
        "Legacy on-premises infrastructure is creating operational bottlenecks, increasing maintenance costs by 40% annually, and limiting our ability to scale rapidly in response to market demands and customer growth.",
      visionStatement:
        "Transform our technology infrastructure through comprehensive cloud migration, enabling scalable operations, enhanced security, and improved disaster recovery while reducing operational overhead and enabling innovation.",
      successMetrics: [
        "50% reduction in infrastructure maintenance costs",
        "99.9% system uptime and availability",
        "75% faster deployment of new services",
        "Enhanced disaster recovery with 4-hour RTO",
      ],
      valueProposition:
        "Achieve £1.8M in annual cost savings while improving system reliability, security, and scalability to support 300% business growth over the next 3 years.",
      strategicAlignment: {
        digitalTransformation: true,
        operationalExcellence: true,
        competitiveAdvantage: true,
      },
      charterApproval: {
        executiveSponsor: true,
        steeringCommittee: true,
      },
    },
    {
      name: "Customer Experience Platform",
      problemStatement:
        "Fragmented customer touchpoints and disconnected systems are creating inconsistent customer experiences, leading to 25% customer churn and reduced satisfaction scores below industry benchmarks.",
      visionStatement:
        "Create a unified customer experience platform that provides seamless, personalized interactions across all channels, driving customer satisfaction and loyalty while enabling data-driven insights.",
      successMetrics: [
        "85% customer satisfaction score improvement",
        "40% reduction in customer churn rate",
        "60% increase in cross-sell opportunities",
        "Real-time customer insights and analytics",
      ],
      valueProposition:
        "Generate £3.2M in additional revenue through improved customer retention and cross-selling while reducing support costs by £800K annually.",
      strategicAlignment: {
        digitalTransformation: true,
        operationalExcellence: false,
        competitiveAdvantage: true,
      },
      charterApproval: {
        executiveSponsor: true,
        steeringCommittee: false,
      },
    },
    {
      name: "Digital Transformation Initiative",
      problemStatement:
        "Manual processes and legacy systems are hindering productivity, creating data silos, and preventing real-time decision making, resulting in competitive disadvantage and operational inefficiencies.",
      visionStatement:
        "Digitize core business processes through automation, AI, and modern technology platforms to enable data-driven decision making, improve operational efficiency, and accelerate innovation.",
      successMetrics: [
        "70% reduction in manual processing time",
        "Real-time business intelligence and reporting",
        "50% improvement in process efficiency",
        "Enhanced employee productivity and satisfaction",
      ],
      valueProposition:
        "Unlock £4.5M in operational savings over 5 years while positioning the organization for sustainable growth and competitive advantage in the digital economy.",
      strategicAlignment: {
        digitalTransformation: true,
        operationalExcellence: true,
        competitiveAdvantage: true,
      },
      charterApproval: {
        executiveSponsor: true,
        steeringCommittee: true,
      },
    },
  ]

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)

  // Helper functions
  const getTrendingColor = (trending: string) => {
    switch (trending) {
      case "green":
        return "bg-green-500"
      case "amber":
        return "bg-amber-500"
      case "red":
        return "bg-destructive"
      case "blue":
        return "bg-blue-500"
      case "grey":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
      case "Implemented":
        return "bg-blue-500"
      case "In Progress":
      case "Under Review":
        return "bg-green-500"
      case "Not Started":
      case "Pending Approval":
        return "bg-gray-500"
      case "Approved":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-amber-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      case "Pending":
        return "bg-amber-500"
      case "Not Required":
        return "bg-gray-400"
      default:
        return "bg-gray-500"
    }
  }

  const filteredRisksIssues = risksData.filter((item) => {
    if (riskIssueFilter === "all") return true
    return item.type === riskIssueFilter
  })

  // Auto-generation functions
  const generateStatusReport = async () => {
    setIsGenerating(true)
    setDemoMode(false)
    setGenerationStep("Analyzing project data sources...")

    await new Promise((resolve) => setTimeout(resolve, 1200))
    setGenerationStep("Processing Project PID objectives and constraints...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setGenerationStep("Reviewing milestone progress and dependencies...")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setGenerationStep("Assessing risks, issues, and change requests...")

    await new Promise((resolve) => setTimeout(resolve, 600))
    setGenerationStep("Compiling comprehensive status report...")

    await new Promise((resolve) => setTimeout(resolve, 500))

    const completedMilestones = milestonesState.filter((m) => m.status === "Complete").length
    const totalMilestones = milestonesState.length
    const openRisks = risksData.filter((r) => r.status === "Open" && r.type === "Risk").length
    const openIssues = risksData.filter((r) => r.status === "Open" && r.type === "Issue").length

    const overallProgress = Math.round(milestonesState.reduce((acc, m) => acc + m.progress, 0) / totalMilestones)
    let overallStatus = "Green"
    if (openIssues > 2 || overallProgress < 50) {
      overallStatus = "Red"
    } else if (openRisks > 3) {
      overallStatus = "Amber"
    }

    const newStatusData = {
      ...statusData,
      reportDate: new Date().toLocaleDateString("en-GB"),
      reportingPeriod: `Week ending ${new Date().toLocaleDateString("en-GB")}`,
      overallStatus: overallStatus,
      keyAccomplishments: `• Completed ${completedMilestones} of ${totalMilestones} project milestones (${Math.round((completedMilestones / totalMilestones) * 100)}% completion rate)\n• Maintained project alignment with PID objectives: ${pidData.projectName}\n• Achieved ${overallProgress}% overall project progress against planned timeline\n• Established robust governance framework with integrated risk monitoring`,
      upcomingMilestones: `• Progress active milestones toward completion targets\n• Conduct comprehensive project health assessment\n• Review and update risk register based on current project phase\n• Validate project scope alignment with original PID objectives`,
      issues:
        openIssues > 0
          ? `• ${openIssues} active issues requiring immediate attention\n• Resource allocation challenges identified\n• Stakeholder availability constraints during critical review periods`
          : "• No critical issues currently identified\n• All project workstreams operating within normal parameters",
      risks: `• ${openRisks} open risks being actively monitored\n• Budget variance risk assessment ongoing\n• Schedule risk assessment for upcoming milestones\n• Dependency risk management for critical path items`,
      budgetStatus: `PROJECT BUDGET ANALYSIS (from PID: ${pidData.budget})\nCurrent project tracking within approved budget parameters\nRegular budget reviews aligned with milestone completion\nProactive variance monitoring and early warning system active`,
      nextSteps: `IMMEDIATE ACTIONS (Next 2 weeks):\n• Progress active milestones toward completion targets\n• Address any open issues through escalation and resource allocation\n• Complete evaluation of pending change requests\n\nSTRATEGIC ACTIONS (Next 4 weeks):\n• Conduct comprehensive project health assessment\n• Review and update risk register\n• Validate project scope alignment with PID objectives`,
    }

    setStatusData(newStatusData)
    setLastGenerated(new Date().toLocaleString("en-GB"))
    setGenerationStep("")
    setIsGenerating(false)
  }

  const resetDemoData = () => {
    setStatusData({
      ...statusReportTemplate,
      keyAccomplishments:
        "• Status report ready for auto-generation\n• All project data sources connected and integrated\n• Governance framework active with real-time monitoring\n• PID objectives and constraints loaded\n• Milestone dependencies mapped and tracked",
      upcomingMilestones:
        "• Auto-generate comprehensive status report from all data sources\n• Review integrated project metrics and KPIs\n• Validate data accuracy across PID, milestones, risks, and decisions\n• Demonstrate AI-powered governance insights",
      issues:
        "• Awaiting status report generation to identify current issues\n• Data integration complete - ready for analysis",
      risks:
        "• Risk analysis pending - comprehensive assessment will be generated\n• All risk data sources connected and ready",
      budgetStatus: `Budget analysis will be generated from:\n• Project PID budget allocation (${pidData.budget})\n• Change request financial impacts\n• Milestone completion vs spend analysis\n• Variance reporting and forecasting`,
      nextSteps:
        "• Click 'Generate Status Report' to compile latest project data from all governance sources\n• Review AI-generated insights and recommendations\n• Validate integrated reporting accuracy",
    })
    setLastGenerated("Pending generation")
    setDemoMode(true)
  }

  // Business case processing function
  const processBusinessCase = async (file) => {
    setIsProcessing(true)
    setUploadedFile(file)

    setProcessingStep("Uploading business case...")
    await new Promise((resolve) => setTimeout(resolve, 500))

    setProcessingStep("Analyzing document with AI...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setProcessingStep("Extracting key requirements...")
    await new Promise((resolve) => setTimeout(resolve, 800))

    setProcessingStep("Populating inception framework...")
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Get current scenario data
    const scenario = businessCaseScenarios[currentScenarioIndex]

    // Populate inception data with scenario
    setInceptionData(scenario)

    setProcessingStep("")
    setIsProcessing(false)
  }

  // Next business case function
  const nextBusinessCase = () => {
    // Reset to initial state
    setInceptionData({
      problemStatement: "Ready to analyze your next business case...",
      visionStatement: "Upload a business case document to automatically populate the inception framework.",
      successMetrics: [
        "Awaiting business case analysis",
        "Success metrics will be extracted automatically",
        "AI will identify key performance indicators",
        "Measurable outcomes will be populated",
      ],
      valueProposition: "Value proposition will be extracted from your business case document using AI analysis.",
      strategicAlignment: {
        digitalTransformation: false,
        operationalExcellence: false,
        competitiveAdvantage: false,
      },
      charterApproval: {
        executiveSponsor: false,
        steeringCommittee: false,
      },
    })

    // Cycle to next scenario for next upload
    setCurrentScenarioIndex((prev) => (prev + 1) % businessCaseScenarios.length)
    setUploadedFile(null)
  }

  // Change Request Approval Function
  const approveChangeRequest = () => {
    const updatedApprovers = changeRequestData.approvers.map((approver) => ({
      ...approver,
      status: "Approved",
      approvalDate: new Date().toLocaleDateString("en-GB"),
      comments: "Approved via executive workflow",
    }))

    setChangeRequestData({
      ...changeRequestData,
      status: "Approved",
      approvalStatus: "Approved",
      approvalDate: new Date().toLocaleDateString("en-GB"),
      approvalComments: "Change request approved by all required approvers",
      approvers: updatedApprovers,
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart Governance</h2>
          <p className="text-muted-foreground">Intelligent governance framework and project management templates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scorecard" value={activeTemplate} onValueChange={setActiveTemplate} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-10">
          <TabsTrigger
            value="scorecard"
            className="bg-gradient-to-r from-purple-300 to-purple-400 data-[state=active]:from-purple-400 data-[state=active]:to-purple-500 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Portfolio Scorecard
          </TabsTrigger>
          <TabsTrigger
            value="inception"
            className="bg-gradient-to-r from-purple-400 to-purple-500 data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Inception
          </TabsTrigger>
          <TabsTrigger
            value="pid"
            className="bg-gradient-to-r from-purple-500 to-purple-600 data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Project PID
          </TabsTrigger>
          <TabsTrigger
            value="stage-gates"
            className="bg-gradient-to-r from-purple-600 to-purple-700 data-[state=active]:from-purple-700 data-[state=active]:to-purple-800 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Stage Gates
          </TabsTrigger>
          <TabsTrigger
            value="milestones"
            className="bg-gradient-to-r from-purple-700 to-purple-800 data-[state=active]:from-purple-800 data-[state=active]:to-purple-900 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Governance Milestones
          </TabsTrigger>
          <TabsTrigger
            value="financials"
            className="bg-gradient-to-r from-purple-700 to-purple-800 data-[state=active]:from-purple-800 data-[state=active]:to-purple-900 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Financials
          </TabsTrigger>
          <TabsTrigger
            value="change-request"
            className="bg-gradient-to-r from-purple-800 to-purple-900 data-[state=active]:from-purple-900 data-[state=active]:to-purple-950 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Change Request
          </TabsTrigger>
          <TabsTrigger
            value="risks"
            className="bg-gradient-to-r from-purple-900 to-purple-950 data-[state=active]:from-purple-950 data-[state=active]:to-violet-900 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Risks & Issues
          </TabsTrigger>
          <TabsTrigger
            value="decisions"
            className="bg-gradient-to-r from-purple-950 to-violet-900 data-[state=active]:from-violet-900 data-[state=active]:to-violet-950 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Decision Repository
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="bg-gradient-to-r from-violet-900 to-violet-950 data-[state=active]:from-violet-950 data-[state=active]:to-indigo-900 text-white data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 text-xs"
          >
            Status Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Portfolio Programme Scorecard</CardTitle>
                <CardDescription>RAG status summary for all projects - Board view</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Project ID</TableHead>
                      <TableHead className="w-16">Code</TableHead>
                      <TableHead className="min-w-[180px]">Project Name</TableHead>
                      <TableHead className="w-20">BU</TableHead>
                      <TableHead className="w-24">Initiative</TableHead>
                      <TableHead className="w-20">Status</TableHead>
                      <TableHead className="w-24">Trending Status</TableHead>
                      <TableHead className="w-20">% Complete</TableHead>
                      <TableHead className="w-24">Completion Date</TableHead>
                      <TableHead className="w-20">Budget</TableHead>
                      <TableHead className="w-20">Timeline</TableHead>
                      <TableHead className="w-16">Risks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioScorecardData.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.id}</TableCell>
                        <TableCell>{project.code}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.bu}</TableCell>
                        <TableCell>{project.initiative}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${getStatusColor(project.status)} min-w-[60px] justify-center`}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`w-6 h-6 rounded-full ${getTrendingColor(project.trending)}`} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="w-16 h-2" />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{project.completionDate}</TableCell>
                        <TableCell>
                          <Badge variant={project.budget === "On Track" ? "default" : "destructive"}>
                            {project.budget}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.timeline === "On Track" ? "default" : "destructive"}>
                            {project.timeline}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{project.risks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inception">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Inception</CardTitle>
                  <CardDescription>AI-powered business case analysis and inception framework</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={nextBusinessCase}
                    variant="outline"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Next Business Case
                  </Button>
                  <Button
                    onClick={() => {
                      // Auto-generate PID from inception data
                      const generatedPID = {
                        ...pidData,
                        projectName: inceptionData.visionStatement.split(" ").slice(0, 4).join(" ") + " Project",
                        objectives: inceptionData.successMetrics.map((metric) => `• ${metric}`).join("\n"),
                        deliverables: `• ${inceptionData.valueProposition}\n• Implementation of success metrics\n• Stakeholder engagement framework\n• Project governance structure`,
                        successCriteria: inceptionData.successMetrics
                          .map((metric) => `• Achievement of ${metric}`)
                          .join("\n"),
                      }
                      setPidData(generatedPID)
                      setActiveTemplate("pid")
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Generate PID
                  </Button>
                  <Button
                    variant={editingInception ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditingInception(!editingInception)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingInception ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {editingInception ? "Save Changes" : "Edit Inception"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Business Case Upload Section */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Business Case Upload & AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload your business case document to automatically populate the inception framework
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isProcessing && (
                    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="font-medium text-blue-900">Processing Business Case...</span>
                      </div>
                      <p className="text-sm text-blue-700">{processingStep}</p>
                    </div>
                  )}

                  {!uploadedFile && !isProcessing && (
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-blue-900 mb-2">Upload Business Case</h3>
                      <p className="text-sm text-blue-600 mb-4">
                        Drag and drop your business case document or click to browse
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            processBusinessCase(e.target.files[0])
                          }
                        }}
                        className="hidden"
                        id="business-case-upload"
                      />
                      <label
                        htmlFor="business-case-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </label>
                      <p className="text-xs text-blue-500 mt-2">Supports PDF, DOC, DOCX files</p>
                    </div>
                  )}

                  {uploadedFile && !isProcessing && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Analysis Complete!</span>
                      </div>
                      <p className="text-sm text-green-700">Successfully analyzed: {uploadedFile.name}</p>
                      <p className="text-xs text-green-600 mt-1">
                        Inception framework has been automatically populated with extracted data
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      1
                    </div>
                    Project Definition & Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Problem Statement</label>
                        {editingInception ? (
                          <Textarea
                            value={inceptionData.problemStatement}
                            onChange={(e) => setInceptionData({ ...inceptionData, problemStatement: e.target.value })}
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <p className="mt-1 text-sm">{inceptionData.problemStatement}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Vision Statement</label>
                        {editingInception ? (
                          <Textarea
                            value={inceptionData.visionStatement}
                            onChange={(e) => setInceptionData({ ...inceptionData, visionStatement: e.target.value })}
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <p className="mt-1 text-sm">{inceptionData.visionStatement}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Success Metrics</label>
                        {editingInception ? (
                          <div className="mt-1 space-y-2">
                            {inceptionData.successMetrics.map((metric, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={metric}
                                  onChange={(e) => {
                                    const newMetrics = [...inceptionData.successMetrics]
                                    newMetrics[index] = e.target.value
                                    setInceptionData({ ...inceptionData, successMetrics: newMetrics })
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newMetrics = inceptionData.successMetrics.filter((_, i) => i !== index)
                                    setInceptionData({ ...inceptionData, successMetrics: newMetrics })
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setInceptionData({
                                  ...inceptionData,
                                  successMetrics: [...inceptionData.successMetrics, "New success metric"],
                                })
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Metric
                            </Button>
                          </div>
                        ) : (
                          <ul className="mt-1 text-sm space-y-1">
                            {inceptionData.successMetrics.map((metric, index) => (
                              <li key={index}>• {metric}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Value Proposition</label>
                        {editingInception ? (
                          <Textarea
                            value={inceptionData.valueProposition}
                            onChange={(e) => setInceptionData({ ...inceptionData, valueProposition: e.target.value })}
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <p className="mt-1 text-sm">{inceptionData.valueProposition}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                      2
                    </div>
                    Strategic Alignment Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Digital Transformation</h4>
                        <p className="text-sm text-muted-foreground">Aligns with digital strategy</p>
                      </div>
                      <div className="flex items-center">
                        {editingInception ? (
                          <input
                            type="checkbox"
                            checked={inceptionData.strategicAlignment.digitalTransformation}
                            onChange={(e) =>
                              setInceptionData({
                                ...inceptionData,
                                strategicAlignment: {
                                  ...inceptionData.strategicAlignment,
                                  digitalTransformation: e.target.checked,
                                },
                              })
                            }
                            className="rounded"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full ${
                              inceptionData.strategicAlignment.digitalTransformation ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Operational Excellence</h4>
                        <p className="text-sm text-muted-foreground">Improves operations</p>
                      </div>
                      <div className="flex items-center">
                        {editingInception ? (
                          <input
                            type="checkbox"
                            checked={inceptionData.strategicAlignment.operationalExcellence}
                            onChange={(e) =>
                              setInceptionData({
                                ...inceptionData,
                                strategicAlignment: {
                                  ...inceptionData.strategicAlignment,
                                  operationalExcellence: e.target.checked,
                                },
                              })
                            }
                            className="rounded"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full ${
                              inceptionData.strategicAlignment.operationalExcellence ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Competitive Advantage</h4>
                        <p className="text-sm text-muted-foreground">Creates market advantage</p>
                      </div>
                      <div className="flex items-center">
                        {editingInception ? (
                          <input
                            type="checkbox"
                            checked={inceptionData.strategicAlignment.competitiveAdvantage}
                            onChange={(e) =>
                              setInceptionData({
                                ...inceptionData,
                                strategicAlignment: {
                                  ...inceptionData.strategicAlignment,
                                  competitiveAdvantage: e.target.checked,
                                },
                              })
                            }
                            className="rounded"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full ${
                              inceptionData.strategicAlignment.competitiveAdvantage ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                      3
                    </div>
                    Governance & Approval Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Executive Sponsor Approval</h4>
                        <p className="text-sm text-muted-foreground">Senior leadership sign-off</p>
                      </div>
                      <div className="flex items-center">
                        {editingInception ? (
                          <input
                            type="checkbox"
                            checked={inceptionData.charterApproval.executiveSponsor}
                            onChange={(e) =>
                              setInceptionData({
                                ...inceptionData,
                                charterApproval: {
                                  ...inceptionData.charterApproval,
                                  executiveSponsor: e.target.checked,
                                },
                              })
                            }
                            className="rounded"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full ${
                              inceptionData.charterApproval.executiveSponsor ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Steering Committee</h4>
                        <p className="text-sm text-muted-foreground">Committee endorsement</p>
                      </div>
                      <div className="flex items-center">
                        {editingInception ? (
                          <input
                            type="checkbox"
                            checked={inceptionData.charterApproval.steeringCommittee}
                            onChange={(e) =>
                              setInceptionData({
                                ...inceptionData,
                                charterApproval: {
                                  ...inceptionData.charterApproval,
                                  steeringCommittee: e.target.checked,
                                },
                              })
                            }
                            className="rounded"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full ${
                              inceptionData.charterApproval.steeringCommittee ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                      4
                    </div>
                    Readiness Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Resource Availability</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="flex-1" />
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Key resources identified and committed</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Budget Approval</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={100} className="flex-1" />
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Full budget approved and allocated</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Stakeholder Engagement</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="flex-1" />
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Most stakeholders engaged, some pending</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Technical Feasibility</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={90} className="flex-1" />
                          <span className="text-sm font-medium">90%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Technical approach validated and approved</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pid">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Initiation Document (PID)</CardTitle>
                  <CardDescription>Comprehensive project definition and planning document</CardDescription>
                </div>
                <Button
                  variant={editingPID ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingPID(!editingPID)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingPID ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingPID ? "Save Changes" : "Edit PID"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    {editingPID ? (
                      <Input
                        value={pidData.projectName}
                        onChange={(e) => setPidData({ ...pidData, projectName: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.projectName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project Manager</label>
                    {editingPID ? (
                      <Input
                        value={pidData.projectManager}
                        onChange={(e) => setPidData({ ...pidData, projectManager: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.projectManager}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sponsor</label>
                    {editingPID ? (
                      <Input
                        value={pidData.sponsor}
                        onChange={(e) => setPidData({ ...pidData, sponsor: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.sponsor}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    {editingPID ? (
                      <Input
                        value={pidData.startDate}
                        onChange={(e) => setPidData({ ...pidData, startDate: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    {editingPID ? (
                      <Input
                        value={pidData.endDate}
                        onChange={(e) => setPidData({ ...pidData, endDate: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.endDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget</label>
                    {editingPID ? (
                      <Input
                        value={pidData.budget}
                        onChange={(e) => setPidData({ ...pidData, budget: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm">{pidData.budget}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Objectives</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.objectives}
                      onChange={(e) => setPidData({ ...pidData, objectives: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.objectives}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Scope</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.scope}
                      onChange={(e) => setPidData({ ...pidData, scope: e.target.value })}
                      className="mt-1"
                      rows={6}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.scope}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Deliverables</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.deliverables}
                      onChange={(e) => setPidData({ ...pidData, deliverables: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.deliverables}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Assumptions</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.assumptions}
                      onChange={(e) => setPidData({ ...pidData, assumptions: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.assumptions}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Constraints</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.constraints}
                      onChange={(e) => setPidData({ ...pidData, constraints: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.constraints}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Risks</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.risks}
                      onChange={(e) => setPidData({ ...pidData, risks: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.risks}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Success Criteria</label>
                  {editingPID ? (
                    <Textarea
                      value={pidData.successCriteria}
                      onChange={(e) => setPidData({ ...pidData, successCriteria: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <div className="mt-1 text-sm whitespace-pre-line">{pidData.successCriteria}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">RACI Matrix & Decision Authority</label>
                  {editingPID ? (
                    <div className="mt-1 space-y-4">
                      <Textarea
                        placeholder="Edit RACI matrix and decision authorities in text format..."
                        className="min-h-[200px]"
                        defaultValue={`RACI Matrix:
${pidData.raciMatrix.map((item) => `${item.activity}: R-${item.responsible}, A-${item.accountable}, C-${item.consulted}, I-${item.informed}`).join("\n")}

Decision Authorities:
${pidData.decisionAuthorities.map((item) => `${item.decisionType}: ${item.authorityLevel} (Limit: ${item.approvalLimit}, Escalation: ${item.escalationThreshold})`).join("\n")}`}
                      />
                    </div>
                  ) : (
                    <div className="mt-1 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">RACI Matrix</h4>
                        <Table className="rounded-md border">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Activity/Decision</TableHead>
                              <TableHead>Responsible</TableHead>
                              <TableHead>Accountable</TableHead>
                              <TableHead>Consulted</TableHead>
                              <TableHead>Informed</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pidData.raciMatrix.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{item.activity}</TableCell>
                                <TableCell>{item.responsible}</TableCell>
                                <TableCell>{item.accountable}</TableCell>
                                <TableCell>{item.consulted}</TableCell>
                                <TableCell>{item.informed}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Decision Making Authorities & Limits</h4>
                        <Table className="rounded-md border">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Decision Type</TableHead>
                              <TableHead>Authority Level</TableHead>
                              <TableHead>Approval Limit</TableHead>
                              <TableHead>Escalation Threshold</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pidData.decisionAuthorities.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{item.decisionType}</TableCell>
                                <TableCell>{item.authorityLevel}</TableCell>
                                <TableCell>{item.approvalLimit}</TableCell>
                                <TableCell>{item.escalationThreshold}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stage-gates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Stage Gates</CardTitle>
                  <CardDescription>Project stage gates and milestone tracking</CardDescription>
                </div>
                <Button
                  variant={editingStageGates ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingStageGates(!editingStageGates)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingStageGates ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingStageGates ? "Save Changes" : "Edit Stage Gates"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Data Platform Migration</h3>
                    <p className="text-sm text-muted-foreground">Current Stage: Build & Verify</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {stageGatesData.map((stage, stageIndex) => (
                    <Collapsible key={stage.id}>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-3 h-3 rounded-full ${stage.status === "Complete" ? "bg-blue-500" : stage.status === "In Progress" ? "bg-green-500" : "bg-gray-400"}`}
                            />
                            <div>
                              <CollapsibleTrigger className="flex items-center gap-2 hover:text-blue-600">
                                <h4 className="font-semibold">{stage.name}</h4>
                                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                              </CollapsibleTrigger>
                              <p className="text-sm text-muted-foreground">{stage.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Progress value={stage.progress} className="w-24 h-2" />
                              <span className="text-sm font-medium">{stage.progress}%</span>
                            </div>
                            <Badge className={`${getStatusColor(stage.status)} min-w-[80px] justify-center`}>
                              {stage.status}
                            </Badge>
                          </div>
                        </div>

                        <CollapsibleContent className="mt-4">
                          <div className="pl-7">
                            <h5 className="font-medium mb-3">Stage Gate Checks</h5>
                            <div className="space-y-2">
                              {stage.checks.map((check, checkIndex) => (
                                <div key={check.id} className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={check.completed}
                                    onChange={(e) => {
                                      if (editingStageGates) {
                                        const newStageGates = [...stageGatesData]
                                        newStageGates[stageIndex].checks[checkIndex].completed = e.target.checked
                                        const completedChecks = newStageGates[stageIndex].checks.filter(
                                          (c) => c.completed,
                                        ).length
                                        const totalChecks = newStageGates[stageIndex].checks.length
                                        newStageGates[stageIndex].progress = Math.round(
                                          (completedChecks / totalChecks) * 100,
                                        )
                                        if (newStageGates[stageIndex].progress === 100) {
                                          newStageGates[stageIndex].status = "Complete"
                                        } else if (newStageGates[stageIndex].progress > 0) {
                                          newStageGates[stageIndex].status = "In Progress"
                                        } else {
                                          newStageGates[stageIndex].status = "Not Started"
                                        }
                                        setStageGatesData(newStageGates)
                                      }
                                    }}
                                    disabled={!editingStageGates}
                                    className="rounded"
                                  />
                                  <span
                                    className={`text-sm ${check.completed ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {check.name}
                                  </span>
                                  {check.required && (
                                    <Badge variant="outline" className="text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>
                    Key project milestones and delivery dates - {milestonesState.length} total milestones
                  </CardDescription>
                </div>
                <Button
                  variant={editingMilestones ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingMilestones(!editingMilestones)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingMilestones ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingMilestones ? "Save Changes" : "Edit Milestones"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {milestonesState.map((milestone, index) => (
                      <TableRow key={milestone.id}>
                        <TableCell className="font-medium">{milestone.id}</TableCell>
                        <TableCell>
                          {editingMilestones ? (
                            <Input
                              value={milestone.name}
                              onChange={(e) => {
                                const newData = [...milestonesState]
                                newData[index].name = e.target.value
                                setMilestonesState(newData)
                              }}
                            />
                          ) : (
                            milestone.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingMilestones ? (
                            <Input
                              value={milestone.purpose || ""}
                              onChange={(e) => {
                                const newData = [...milestonesState]
                                newData[index].purpose = e.target.value
                                setMilestonesState(newData)
                              }}
                            />
                          ) : (
                            milestone.purpose || ""
                          )}
                        </TableCell>
                        <TableCell>
                          {editingMilestones ? (
                            <Input
                              value={milestone.dueDate}
                              onChange={(e) => {
                                const newData = [...milestonesState]
                                newData[index].dueDate = e.target.value
                                setMilestonesState(newData)
                              }}
                            />
                          ) : (
                            milestone.dueDate
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(milestone.status)} min-w-[80px] justify-center`}>
                            {milestone.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {editingMilestones ? (
                            <Input
                              value={milestone.owner}
                              onChange={(e) => {
                                const newData = [...milestonesState]
                                newData[index].owner = e.target.value
                                setMilestonesState(newData)
                              }}
                            />
                          ) : (
                            milestone.owner
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={milestone.progress} className="w-16 h-2" />
                            <span className="text-sm">{milestone.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(milestone.priority)} min-w-[60px] justify-center`}>
                            {milestone.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{milestone.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {milestone.variance !== undefined && (
                            <Badge
                              className={`${
                                milestone.variance === 0
                                  ? "bg-green-500"
                                  : milestone.variance > 0
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                              }`}
                            >
                              {milestone.variance > 0 ? "+" : ""}
                              {milestone.variance} days
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {editingMilestones && (
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      const newMilestone = {
                        id: `M${String(milestonesState.length + 1).padStart(3, "0")}`,
                        name: "New Milestone",
                        dueDate: "TBD",
                        status: "Not Started",
                        owner: "",
                        progress: 0,
                        purpose: "Define milestone purpose",
                        priority: "Medium",
                        category: "General",
                        dependencies: "TBD",
                        deliverables: "TBD",
                        actualCompletionDate: null,
                        variance: 0,
                      }
                      setMilestonesState([...milestonesState, newMilestone])
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Milestone
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Financials</CardTitle>
                  <CardDescription>
                    Comprehensive financial data and budget tracking for selected project
                  </CardDescription>
                </div>
                <Button
                  variant={editingProjectData ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingProjectData(!editingProjectData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingProjectData ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingProjectData ? "Save Changes" : "Edit Financial Data"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Project ID</label>
                    <p className="mt-1 text-sm font-mono">{projectData.projectId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <p className="mt-1 text-sm">{projectData.projectName}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Last Updated</label>
                    <p className="mt-1 text-sm">{projectData.lastUpdated}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Updated By</label>
                    <p className="mt-1 text-sm">{projectData.updatedBy}</p>
                  </div>
                </div>
              </div>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium">Total Budget</label>
                      <p className="mt-1 text-lg font-bold">£{projectData.totalBudget.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Spent to Date</label>
                      <p className="mt-1 text-lg font-bold text-blue-600">
                        £{projectData.spentToDate.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Remaining Budget</label>
                      <p className="mt-1 text-lg font-bold text-green-600">
                        £{(projectData.totalBudget - projectData.spentToDate).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Budget Utilization</label>
                      <p className="mt-1 text-lg font-bold">
                        {Math.round((projectData.spentToDate / projectData.totalBudget) * 100)}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Budget Progress</span>
                      <span>{Math.round((projectData.spentToDate / projectData.totalBudget) * 100)}%</span>
                    </div>
                    <Progress value={(projectData.spentToDate / projectData.totalBudget) * 100} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Breakdown by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.budgetBreakdown.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.category}</span>
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground">
                              £{category.spent.toLocaleString()} / £{category.budgeted.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Progress value={(category.spent / category.budgeted) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{category.percentage}% of total budget</span>
                          <span>£{category.remaining.toLocaleString()} remaining</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Spend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.monthlySpend.map((month, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">{month.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Budgeted: £{month.budgeted.toLocaleString()}</span>
                          <span className="text-sm">Actual: £{month.actual.toLocaleString()}</span>
                          <Badge className={`${month.variance >= 0 ? "bg-red-500" : "bg-green-500"}`}>
                            {month.variance >= 0 ? "+" : ""}£{month.variance.toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Adjustments & Contingency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Contingency Reserve</label>
                        <p className="mt-1 text-lg font-bold">£{projectData.contingencyReserve.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Management Reserve</label>
                        <p className="mt-1 text-lg font-bold">£{projectData.managementReserve.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Risk-Based Budget Adjustments</h4>
                      <div className="space-y-2">
                        {projectData.riskAdjustments.map((risk, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-amber-50 rounded">
                            <span className="text-sm">{risk.description}</span>
                            <div className="text-right">
                              <span className="text-sm font-medium">
                                £{risk.amount.toLocaleString()} ({Math.round(risk.probability * 100)}% prob)
                              </span>
                              <div className="text-xs text-muted-foreground">
                                Expected: £{risk.expectedValue.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Change Request Financial Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.changeRequestImpacts.map((cr, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <span className="font-medium">{cr.id}</span>
                          <p className="text-sm text-muted-foreground">{cr.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">£{cr.amount.toLocaleString()}</span>
                          <Badge className={`ml-2 ${cr.approved ? "bg-green-500" : "bg-amber-500"}`}>
                            {cr.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change-request">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Change Request</CardTitle>
                  <CardDescription>Project change request documentation and approval tracking</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {changeRequestData.status === "Approved" ? (
                    <Button
                      onClick={() => {
                        // Reset change request to pending
                        const resetApprovers = changeRequestData.approvers.map((approver) => ({
                          ...approver,
                          status: "Pending",
                          approvalDate: "",
                          comments: "",
                        }))

                        setChangeRequestData({
                          ...changeRequestData,
                          status: "Under Review",
                          approvalStatus: "Pending Review",
                          approvalDate: "",
                          approvalComments: "",
                          approvers: resetApprovers,
                        })

                        // Reset financials - remove the change request impact
                        setProjectData({
                          ...projectData,
                          totalBudget: 450000,
                          spentToDate: 292500,
                          remainingBudget: 157500,
                          changeRequestImpacts: projectData.changeRequestImpacts.filter((cr) => cr.id !== "CR-SEC-001"),
                        })

                        // Reset milestones - remove the security monitoring milestone
                        const resetMilestones = milestonesState.filter((m) => m.id !== "M024")
                        setMilestonesState(resetMilestones)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Unapprove Change Request
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // Approve change request
                        const updatedApprovers = changeRequestData.approvers.map((approver) => ({
                          ...approver,
                          status: "Approved",
                          approvalDate: new Date().toLocaleDateString("en-GB"),
                          comments: "Approved via executive workflow",
                        }))

                        setChangeRequestData({
                          ...changeRequestData,
                          status: "Approved",
                          approvalStatus: "Approved",
                          approvalDate: new Date().toLocaleDateString("en-GB"),
                          approvalComments: "Change request approved by all required approvers",
                          approvers: updatedApprovers,
                        })

                        // Update financials - add the change request impact
                        setProjectData({
                          ...projectData,
                          totalBudget: 495000, // Add £45,000
                          remainingBudget: 202500, // Adjust remaining budget
                          changeRequestImpacts: [
                            ...projectData.changeRequestImpacts,
                            {
                              id: "CR-SEC-001",
                              description: "Advanced Security Monitoring Package",
                              approved: true,
                              amount: 45000,
                            },
                          ],
                        })

                        // Update milestones - add security monitoring milestone
                        const newMilestone = {
                          id: "M024",
                          name: "Security Monitoring Implementation",
                          dueDate: "05-04-2027",
                          status: "Not Started",
                          owner: "Security Lead",
                          progress: 0,
                          purpose: "Implement Advanced Security Monitoring package from approved change request",
                          priority: "High",
                          category: "Security",
                          dependencies: "M023",
                          deliverables: "Security Monitoring Configuration, Training Documentation",
                          actualCompletionDate: null,
                          variance: 0,
                        }
                        setMilestonesState([...milestonesState, newMilestone])
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve Change Request
                    </Button>
                  )}
                  <Button
                    variant={editingChangeRequest ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditingChangeRequest(!editingChangeRequest)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingChangeRequest ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {editingChangeRequest ? "Save Changes" : "Edit Change Request"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Change Request ID</label>
                    <p className="mt-1 text-sm font-mono">{changeRequestData.changeRequestId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Submission Date</label>
                    <p className="mt-1 text-sm">{changeRequestData.submissionDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge className={changeRequestData.status === "Approved" ? "bg-green-500" : "bg-amber-500"}>
                      {changeRequestData.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Badge className={`${getPriorityColor(changeRequestData.priority)}`}>
                      {changeRequestData.priority}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <p className="mt-1 text-sm">{changeRequestData.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Change Requestor</label>
                    <p className="mt-1 text-sm">{changeRequestData.changeRequestor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Requestor Role</label>
                    <p className="mt-1 text-sm">{changeRequestData.changeRequestorRole}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Change Type</label>
                    <Badge variant="outline">{changeRequestData.changeType}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Change Approver</label>
                    <p className="mt-1 text-sm">{changeRequestData.changeApprover}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Urgency</label>
                    <Badge variant="outline">{changeRequestData.urgency}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <p className="mt-1 text-sm">{changeRequestData.changeCategory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Requestor Email</label>
                    <p className="mt-1 text-sm">{changeRequestData.changeRequestorEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Change Title</label>
                  <p className="mt-1 text-sm font-semibold">{changeRequestData.changeTitle}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Change Description</label>
                  <div className="mt-1 text-sm">{changeRequestData.changeDescription}</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Business Justification</label>
                    <div className="mt-1 text-sm">{changeRequestData.businessJustification}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Technical Justification</label>
                    <div className="mt-1 text-sm">{changeRequestData.technicalJustification}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Schedule Impact</label>
                    <div className="mt-1 text-sm">{changeRequestData.scheduleImpact}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget Impact</label>
                    <div className="mt-1 text-sm">{changeRequestData.budgetImpact}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Resource Impact</label>
                  <div className="mt-1 text-sm">{changeRequestData.resourceImpact}</div>
                </div>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Approval Workflow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {changeRequestData.approvers.map((approver, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white border rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                              {approver.order}
                            </div>
                            <div>
                              <p className="font-medium">{approver.name}</p>
                              <p className="text-sm text-muted-foreground">{approver.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getApprovalStatusColor(approver.status)} mb-1`}>
                              {approver.status}
                            </Badge>
                            {approver.required && (
                              <div>
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Implementation & Rollback Plans</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Implementation Plan</label>
                      <div className="mt-1 text-sm whitespace-pre-line">{changeRequestData.implementationPlan}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Rollback Plan</label>
                      <div className="mt-1 text-sm">{changeRequestData.rollbackPlan}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Risks & Issues Register</CardTitle>
                  <CardDescription>
                    Comprehensive project risks and issues tracking and management - {risksData.length} total items
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={riskIssueFilter} onValueChange={setRiskIssueFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ({risksData.length})</SelectItem>
                      <SelectItem value="Risk">Risks ({risksData.filter((r) => r.type === "Risk").length})</SelectItem>
                      <SelectItem value="Issue">
                        Issues ({risksData.filter((r) => r.type === "Issue").length})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant={editingRisks ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditingRisks(!editingRisks)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingRisks ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {editingRisks ? "Save Changes" : "Edit Risks & Issues"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Escalation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisksIssues.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "Risk" ? "secondary" : "destructive"}>{item.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="truncate" title={item.title}>
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>{item.project}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              item.severity === "Critical"
                                ? "bg-red-600"
                                : item.severity === "High"
                                  ? "bg-red-500"
                                  : item.severity === "Medium"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                            }`}
                          >
                            {item.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.probability}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              item.impact === "Critical"
                                ? "bg-red-600"
                                : item.impact === "High"
                                  ? "bg-red-500"
                                  : item.impact === "Medium"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                            }`}
                          >
                            {item.impact}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.owner}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              item.status === "Open"
                                ? "bg-red-500"
                                : item.status === "In Progress"
                                  ? "bg-amber-500"
                                  : item.status === "Mitigated"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              item.escalationLevel >= 3
                                ? "bg-red-500"
                                : item.escalationLevel >= 2
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                          >
                            Level {item.escalationLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  {item.id}: {item.title}
                                </DialogTitle>
                                <DialogDescription>
                                  {item.type} • {item.project} • {item.category} • {item.severity} Severity
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Owner</label>
                                    <p className="text-sm">{item.owner}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Due Date</label>
                                    <p className="text-sm">{item.dueDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Date Identified</label>
                                    <p className="text-sm">{item.dateIdentified}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Last Updated</label>
                                    <p className="text-sm">{item.lastUpdated}</p>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm mt-1">{item.description}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Business Impact</label>
                                  <p className="text-sm mt-1">{item.businessImpact}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Mitigation Plan</label>
                                  <p className="text-sm mt-1">{item.mitigationPlan}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Contingency Plan</label>
                                  <p className="text-sm mt-1">{item.contingencyPlan}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Risk Response</label>
                                    <Badge variant="outline">{item.riskResponse}</Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Escalation Level</label>
                                    <Badge
                                      className={`${
                                        item.escalationLevel >= 3
                                          ? "bg-red-500"
                                          : item.escalationLevel >= 2
                                            ? "bg-amber-500"
                                            : "bg-green-500"
                                      }`}
                                    >
                                      Level {item.escalationLevel}
                                    </Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Badge
                                      className={`${
                                        item.status === "Open"
                                          ? "bg-red-500"
                                          : item.status === "In Progress"
                                            ? "bg-amber-500"
                                            : item.status === "Mitigated"
                                              ? "bg-blue-500"
                                              : "bg-green-500"
                                      }`}
                                    >
                                      {item.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {editingRisks && (
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      const newRisk = {
                        id: `R${String(risksData.filter((r) => r.type === "Risk").length + 1).padStart(3, "0")}`,
                        type: "Risk",
                        title: "New Risk",
                        project: "TBD",
                        category: "Technical",
                        severity: "Medium",
                        probability: "Medium",
                        impact: "Medium",
                        owner: "",
                        status: "Open",
                        dueDate: "TBD",
                        description: "Risk description",
                        mitigationPlan: "Mitigation plan to be defined",
                        contingencyPlan: "Contingency plan to be defined",
                        riskResponse: "Mitigate",
                        dateIdentified: new Date().toLocaleDateString("en-GB"),
                        lastUpdated: new Date().toLocaleDateString("en-GB"),
                        escalationLevel: 1,
                        businessImpact: "Business impact to be assessed",
                      }
                      setRisksData([...risksData, newRisk])
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Risk/Issue
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Decision Repository</CardTitle>
                  <CardDescription>
                    Project decision tracking and audit trail - {decisionsState.length} total decisions
                  </CardDescription>
                </div>
                <Button
                  variant={editingDecisions ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingDecisions(!editingDecisions)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingDecisions ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingDecisions ? "Save Changes" : "Edit Decisions"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Decision ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Decision Maker</TableHead>
                      <TableHead>Decision Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Latency</TableHead>
                      <TableHead>Review Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {decisionsState.map((decision) => (
                      <TableRow key={decision.id}>
                        <TableCell className="font-medium">{decision.id}</TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="truncate" title={decision.title}>
                            {decision.title}
                          </div>
                        </TableCell>
                        <TableCell>{decision.project}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{decision.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(decision.priority)}`}>{decision.priority}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <div className="truncate" title={decision.decisionMaker}>
                            {decision.decisionMaker}
                          </div>
                        </TableCell>
                        <TableCell>{decision.decisionDate || "Pending"}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(decision.status)}`}>{decision.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${decision.latencyDays <= 7 ? "bg-green-500" : decision.latencyDays <= 14 ? "bg-amber-500" : "bg-red-500"}`}
                          >
                            {decision.latencyDays} days
                          </Badge>
                        </TableCell>
                        <TableCell>{decision.reviewDate}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  {decision.id}: {decision.title}
                                </DialogTitle>
                                <DialogDescription>
                                  {decision.project} • {decision.category} • {decision.priority} Priority •{" "}
                                  {decision.status}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Decision Maker</label>
                                    <p className="text-sm">{decision.decisionMaker}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Decision Date</label>
                                    <p className="text-sm">{decision.decisionDate || "Pending"}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Submission Date</label>
                                    <p className="text-sm">{decision.submissionDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Review Date</label>
                                    <p className="text-sm">{decision.reviewDate}</p>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm mt-1">{decision.description}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Rationale</label>
                                  <p className="text-sm mt-1">{decision.rationale}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Impact</label>
                                  <p className="text-sm mt-1">{decision.impact}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Business Context</label>
                                  <p className="text-sm mt-1">{decision.businessContext}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Technical Context</label>
                                  <p className="text-sm mt-1">{decision.technicalContext}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Alternatives Considered</label>
                                  <p className="text-sm mt-1">{decision.alternatives}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Stakeholders</label>
                                  <p className="text-sm mt-1">{decision.stakeholders}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Risk Assessment</label>
                                  <p className="text-sm mt-1">{decision.riskAssessment}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Success Criteria</label>
                                  <p className="text-sm mt-1">{decision.successCriteria}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Lessons Learned</label>
                                  <p className="text-sm mt-1">{decision.lessonsLearned}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Implementation Status</label>
                                    <Badge className={`${getStatusColor(decision.implementationStatus)}`}>
                                      {decision.implementationStatus}
                                    </Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Decision Latency</label>
                                    <Badge
                                      className={`${decision.latencyDays <= 7 ? "bg-green-500" : decision.latencyDays <= 14 ? "bg-amber-500" : "bg-red-500"}`}
                                    >
                                      {decision.latencyDays} days
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {editingDecisions && (
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      const newDecision = {
                        id: `DEC-${String(decisionsState.length + 1).padStart(3, "0")}`,
                        title: "New Decision",
                        project: "TBD",
                        decisionDate: "",
                        decisionMaker: "",
                        category: "Technical",
                        priority: "Medium",
                        status: "Under Review",
                        submissionDate: new Date().toLocaleDateString("en-GB"),
                        latencyDays: 0,
                        description: "Decision description to be added",
                        rationale: "Decision rationale to be documented",
                        impact: "Impact assessment to be completed",
                        reviewDate: "",
                        implementationStatus: "Pending Approval",
                        alternatives: "Alternative options to be evaluated",
                        stakeholders: "Stakeholder list to be defined",
                        businessContext: "Business context to be documented",
                        technicalContext: "Technical context to be provided",
                        riskAssessment: "Risk assessment to be completed",
                        successCriteria: "Success criteria to be defined",
                        lessonsLearned: "Lessons learned to be captured post-implementation",
                      }
                      setDecisionsState([...decisionsState, newDecision])
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Decision
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Status Report</CardTitle>
                  <CardDescription>Auto-generated project status report from all governance data</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={resetDemoData}>
                    Reset Demo
                  </Button>
                  <Button
                    onClick={generateStatusReport}
                    disabled={isGenerating}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Status Report
                      </>
                    )}
                  </Button>
                  <Button
                    variant={editingStatus ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditingStatus(!editingStatus)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingStatus ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {editingStatus ? "Save Changes" : "Edit Status"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isGenerating && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="font-medium text-blue-900">Generating Status Report...</span>
                  </div>
                  <p className="text-sm text-blue-700">{generationStep}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Report Date</label>
                    <p className="mt-1 text-sm">{statusData.reportDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Reporting Period</label>
                    <p className="mt-1 text-sm">{statusData.reportingPeriod}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Overall Status</label>
                    <Badge
                      className={`mt-1 ${
                        statusData.overallStatus === "Green"
                          ? "bg-green-500"
                          : statusData.overallStatus === "Amber"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    >
                      {statusData.overallStatus}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Generated</label>
                    <p className="mt-1 text-sm">{lastGenerated}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Key Accomplishments</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.keyAccomplishments}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Upcoming Milestones</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.upcomingMilestones}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Issues</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.issues}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Risks</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.risks}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Budget Status</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.budgetStatus}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Next Steps</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{statusData.nextSteps}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
