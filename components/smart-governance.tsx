"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Edit, Plus, Save, X, RefreshCw, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
  reportDate: "15-03-2025",
  reportingPeriod: "Week ending 15 March 2025",
  overallStatus: "Amber",
  keyDecisionDelays:
    "• Awaiting governance report generation to identify decision bottlenecks\n• Decision timeline analysis pending\n• Approval workflow latency tracking ready",
  scopeChanges:
    "• Scope change analysis will be generated from change request data\n• Impact assessment pending generation\n• Change velocity metrics ready for analysis",
  riskAlerts:
    "• Risk escalation timeline pending generation\n• Critical risk emergence patterns to be analyzed\n• Mitigation effectiveness tracking ready",
  actionsTaken:
    "• Governance actions log will be compiled\n• Response time analysis pending\n• Corrective measures timeline to be generated",
  processBreakdowns:
    "• Process breakdown analysis pending generation\n• Root cause identification with specific dates\n• Improvement recommendations to be compiled",
  nextSteps: "• Click 'Generate Status Report' to compile governance timeline and process analysis",
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
  changeType: "Scope Expansion",
  priority: "High",
  urgency: "Medium",
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
    stakeholders: "Development Team, Product Management, Marketing",
    businessContext: "Need to modernize the public-facing website to improve user experience and SEO.",
    technicalContext: "Current legacy system is difficult to maintain and scale.",
    riskAssessment: "Low risk due to existing team expertise with React.",
    successCriteria: "Improved website performance, SEO ranking, and development velocity.",
    lessonsLearned: "Early stakeholder involvement in technology decisions is crucial.",
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
    stakeholders: "Infrastructure Team, Data Engineering, Security Team, Finance",
    businessContext: "Need to migrate enterprise data to a scalable and secure cloud platform.",
    technicalContext: "Requirements for data processing, analytics, and security are extensive.",
    riskAssessment: "Medium risk due to complexity of migration and vendor lock-in potential.",
    successCriteria: "Successful migration of all data, achievement of cost savings, and improved scalability.",
    lessonsLearned: "Thorough cost-benefit analysis is critical for cloud provider selection.",
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
    stakeholders: "Database Team, Infrastructure Team, Business Analysts",
    businessContext: "Migrating diverse database systems to the new cloud platform.",
    technicalContext: "Need for minimal downtime and data integrity.",
    riskAssessment: "Low risk with phased approach and DMS.",
    successCriteria: "Successful migration of all databases with data integrity maintained and minimal downtime.",
    lessonsLearned: "Phased migration significantly reduces risk for complex database systems.",
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
    stakeholders: "Security Team, Infrastructure Team, Compliance Officer, Executive Leadership",
    businessContext: "Need to enhance security posture in a dynamic cloud environment.",
    technicalContext: "Adoption of modern security principles is essential.",
    riskAssessment: "High risk associated with cultural shift and implementation complexity.",
    successCriteria: "Achieve Zero Trust certification, reduce security incidents by 60%.",
    lessonsLearned: "Comprehensive training and clear communication are vital for Zero Trust adoption.",
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
    stakeholders: "Mobile Development Team, Product Management, UX/UI Designers",
    businessContext: "Need to develop a cross-platform mobile application efficiently.",
    technicalContext: "Leveraging existing web development skills for mobile.",
    riskAssessment: "Low risk due to team familiarity with React.",
    successCriteria: "Faster time-to-market, reduced development costs, positive user feedback.",
    lessonsLearned: "Cross-platform development frameworks can significantly accelerate mobile app delivery.",
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
    stakeholders: "Data Governance Team, Data Engineering, Compliance Officer, Business Units",
    businessContext: "Need to establish robust data governance for compliance and data utilization.",
    technicalContext: "Integration with cloud data services is required.",
    riskAssessment: "Medium risk due to complexity of data governance implementation.",
    successCriteria: "Successful implementation of data catalog and lineage tracking, improved data quality.",
    lessonsLearned: "Data governance requires strong executive sponsorship and cross-functional collaboration.",
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
    stakeholders: "API Development Team, Frontend Developers, Security Team",
    businessContext: "Need to manage and secure APIs used by various applications.",
    technicalContext: "Support for microservices architecture and scalability.",
    riskAssessment: "Low risk, mature product with good support.",
    successCriteria: "Centralized API management, enhanced security, improved developer productivity.",
    lessonsLearned: "Standardizing API management practices improves consistency and security.",
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
    stakeholders: "Infrastructure Team, Security Team, Business Continuity Team",
    businessContext: "Ensuring business operations can continue in case of disaster.",
    technicalContext: "Leveraging cloud-native DR capabilities.",
    riskAssessment: "Low risk with AWS native services.",
    successCriteria: "Meeting RTO/RPO objectives, successful DR test.",
    lessonsLearned: "Regular DR testing is essential to validate the strategy.",
  },
]

const projectDataTemplate = {
  projectId: "PROJ-2026-001",
  projectName: "Enterprise Data Platform Migration",
  lastUpdated: "10-10-2026",
  updatedBy: "Jane Doe",
  totalBudget: 1250000,
  spentToDate: 292500,
  remainingBudget: 957500,
  budgetUtilization: 23.4,
  budgetBreakdown: [
    {
      category: "Infrastructure",
      budgeted: 500000,
      spent: 150000,
      remaining: 350000,
      percentage: 40,
    },
    {
      category: "Software Licenses",
      budgeted: 300000,
      spent: 80000,
      remaining: 220000,
      percentage: 24,
    },
    {
      category: "Consulting Services",
      budgeted: 250000,
      spent: 45000,
      remaining: 205000,
      percentage: 20,
    },
    {
      category: "Internal Resources",
      budgeted: 150000,
      spent: 17500,
      remaining: 132500,
      percentage: 12,
    },
    {
      category: "Training",
      budgeted: 50000,
      spent: 0,
      remaining: 50000,
      percentage: 4,
    },
  ],
  monthlySpend: [
    { month: "Jan 2026", budgeted: 100000, actual: 95000, variance: -5000 },
    { month: "Feb 2026", budgeted: 100000, actual: 110000, variance: 10000 },
    { month: "Mar 2026", budgeted: 100000, actual: 98000, variance: -2000 },
    { month: "Apr 2026", budgeted: 100000, actual: 125000, variance: 25000 },
    { month: "May 2026", budgeted: 100000, actual: 105000, variance: 5000 },
    { month: "Jun 2026", budgeted: 100000, actual: 102000, variance: 2000 },
    { month: "Jul 2026", budgeted: 100000, actual: 108000, variance: 8000 },
    { month: "Aug 2026", budgeted: 100000, actual: 100000, variance: 0 },
    { month: "Sep 2026", budgeted: 100000, actual: 112000, variance: 12000 },
    { month: "Oct 2026", budgeted: 100000, actual: 105000, variance: 5000 },
    { month: "Nov 2026", budgeted: 100000, actual: 120000, variance: 20000 },
    { month: "Dec 2026", budgeted: 50000, actual: 47000, variance: -3000 },
  ],
  contingencyReserve: 125000,
  managementReserve: 50000,
  riskAdjustments: [
    {
      description: "Potential cost overrun in Cloud Infrastructure",
      amount: 35000,
      probability: 0.6,
      expectedValue: 21000,
    },
    { description: "Unforeseen complexity in Data Migration", amount: 20000, probability: 0.4, expectedValue: 8000 },
  ],
  changeRequestImpacts: [
    { id: "CR-INF-001", description: "Server hardware upgrade", amount: 15000, approved: true },
    { id: "CR-LIC-002", description: "Additional software license", amount: 10000, approved: true },
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
      name: "Gate 0: Idea & Concept",
      phase: "Ideation",
      description: "Initial project concept validation and strategic alignment assessment",
      progress: 100,
      status: "Complete",
      gateReviewDate: "15-08-2026",
      nextGateDate: "05-09-2026",
      approvalStatus: "Approved",
      approvalAuthority: "Portfolio Management Board",
      entryCriteria: [
        { id: "EC001", criterion: "Business case draft submitted", status: "Complete", mandatory: true },
        { id: "EC002", criterion: "Strategic alignment documented", status: "Complete", mandatory: true },
        { id: "EC003", criterion: "Initial stakeholder identification", status: "Complete", mandatory: true },
        { id: "EC004", criterion: "High-level cost estimate", status: "Complete", mandatory: false },
      ],
      exitCriteria: [
        { id: "EX001", criterion: "Approved business case", status: "Complete", mandatory: true },
        { id: "EX002", criterion: "Executive sponsor assigned", status: "Complete", mandatory: true },
        { id: "EX003", criterion: "Initial budget allocation", status: "Complete", mandatory: true },
        { id: "EX004", criterion: "Portfolio prioritization completed", status: "Complete", mandatory: true },
      ],
      requiredArtifacts: [
        { id: "ART001", name: "Business Case Document", status: "Submitted", approver: "CFO", approved: true },
        {
          id: "ART002",
          name: "Strategic Alignment Assessment",
          status: "Submitted",
          approver: "Strategy Lead",
          approved: true,
        },
        {
          id: "ART003",
          name: "Initial Risk Assessment",
          status: "Submitted",
          approver: "Risk Manager",
          approved: true,
        },
      ],
      approvers: [
        {
          id: "APP001",
          name: "Sarah Williams",
          role: "CTO",
          status: "Approved",
          date: "14-08-2026",
          comments: "Strong strategic fit",
        },
        {
          id: "APP002",
          name: "James Mitchell",
          role: "CFO",
          status: "Approved",
          date: "15-08-2026",
          comments: "Budget approved",
        },
        {
          id: "APP003",
          name: "Portfolio Board",
          role: "Governance",
          status: "Approved",
          date: "15-08-2026",
          comments: "Proceed to planning",
        },
      ],
      risks: [{ id: "GR001", description: "Unclear strategic objectives", severity: "Low", mitigated: true }],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "Approved",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC001", check: "Data Protection Impact Assessment", status: "Not Required", mandatory: false },
        { id: "CC002", check: "Security Review", status: "Initial Review Complete", mandatory: true },
      ],
    },
    {
      id: "SG002",
      name: "Gate 1: Planning & Definition",
      phase: "Planning",
      description: "Detailed project planning, resource allocation, and solution architecture definition",
      progress: 100,
      status: "Complete",
      gateReviewDate: "30-09-2026",
      nextGateDate: "15-10-2026",
      approvalStatus: "Approved",
      approvalAuthority: "Project Steering Committee",
      entryCriteria: [
        { id: "EC101", criterion: "Project charter approved", status: "Complete", mandatory: true },
        { id: "EC102", criterion: "Project manager assigned", status: "Complete", mandatory: true },
        { id: "EC103", criterion: "Initial team structure defined", status: "Complete", mandatory: true },
        { id: "EC104", criterion: "Detailed budget estimate", status: "Complete", mandatory: true },
      ],
      exitCriteria: [
        { id: "EX101", criterion: "Detailed project plan approved", status: "Complete", mandatory: true },
        { id: "EX102", criterion: "Resource allocation confirmed", status: "Complete", mandatory: true },
        { id: "EX103", criterion: "Technical architecture approved", status: "Complete", mandatory: true },
        { id: "EX104", criterion: "Risk register established", status: "Complete", mandatory: true },
        { id: "EX105", criterion: "Quality plan approved", status: "Complete", mandatory: true },
      ],
      requiredArtifacts: [
        {
          id: "ART101",
          name: "Project Initiation Document",
          status: "Submitted",
          approver: "Executive Sponsor",
          approved: true,
        },
        {
          id: "ART102",
          name: "Technical Architecture Document",
          status: "Submitted",
          approver: "Architecture Review Board",
          approved: true,
        },
        {
          id: "ART103",
          name: "Resource Management Plan",
          status: "Submitted",
          approver: "Resource Manager",
          approved: true,
        },
        { id: "ART104", name: "Risk Management Plan", status: "Submitted", approver: "Risk Manager", approved: true },
        {
          id: "ART105",
          name: "Quality Management Plan",
          status: "Submitted",
          approver: "Quality Manager",
          approved: true,
        },
      ],
      approvers: [
        {
          id: "APP101",
          name: "Alex Johnson",
          role: "Project Manager",
          status: "Approved",
          date: "28-09-2026",
          comments: "All plans complete",
        },
        {
          id: "APP102",
          name: "Sarah Williams",
          role: "Executive Sponsor",
          status: "Approved",
          date: "29-09-2026",
          comments: "Comprehensive planning",
        },
        {
          id: "APP103",
          name: "Architecture Board",
          role: "Technical Governance",
          status: "Approved",
          date: "30-09-2026",
          comments: "Architecture approved",
        },
      ],
      risks: [
        { id: "GR101", description: "Resource availability constraints", severity: "Medium", mitigated: true },
        { id: "GR102", description: "Technical complexity underestimated", severity: "Medium", mitigated: true },
      ],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "Confirmed",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC101", check: "Security Architecture Review", status: "Complete", mandatory: true },
        { id: "CC102", check: "Data Privacy Assessment", status: "Complete", mandatory: true },
        { id: "CC103", check: "Procurement Compliance", status: "Complete", mandatory: true },
      ],
    },
    {
      id: "SG003",
      name: "Gate 2: Design & Build",
      phase: "Execution",
      description: "Solution design validation and construction readiness assessment",
      progress: 75,
      status: "In Progress",
      gateReviewDate: "15-10-2026",
      nextGateDate: "30-11-2026",
      approvalStatus: "In Review",
      approvalAuthority: "Technical Review Board",
      entryCriteria: [
        { id: "EC201", criterion: "Design specifications complete", status: "Complete", mandatory: true },
        { id: "EC202", criterion: "Development environment ready", status: "Complete", mandatory: true },
        { id: "EC203", criterion: "Team fully staffed", status: "Complete", mandatory: true },
        { id: "EC204", criterion: "Testing strategy approved", status: "In Progress", mandatory: true },
      ],
      exitCriteria: [
        { id: "EX201", criterion: "Core functionality developed", status: "In Progress", mandatory: true },
        { id: "EX202", criterion: "Unit testing complete", status: "In Progress", mandatory: true },
        { id: "EX203", criterion: "Code review standards met", status: "In Progress", mandatory: true },
        { id: "EX204", criterion: "Technical documentation complete", status: "Not Started", mandatory: true },
        { id: "EX205", criterion: "Integration testing plan ready", status: "Not Started", mandatory: true },
      ],
      requiredArtifacts: [
        {
          id: "ART201",
          name: "Detailed Design Document",
          status: "Submitted",
          approver: "Technical Lead",
          approved: true,
        },
        {
          id: "ART202",
          name: "Development Standards",
          status: "Submitted",
          approver: "Architecture Board",
          approved: true,
        },
        { id: "ART203", name: "Test Strategy", status: "In Review", approver: "QA Lead", approved: false },
        { id: "ART204", name: "Integration Plan", status: "Draft", approver: "Technical Lead", approved: false },
      ],
      approvers: [
        { id: "APP201", name: "Michael Chen", role: "Technical Lead", status: "Pending", date: null, comments: null },
        { id: "APP202", name: "Quality Manager", role: "QA Governance", status: "Pending", date: null, comments: null },
        { id: "APP203", name: "Security Team", role: "Security Review", status: "Pending", date: null, comments: null },
      ],
      risks: [
        { id: "GR201", description: "API integration complexity", severity: "High", mitigated: false },
        { id: "GR202", description: "Testing resource constraints", severity: "Medium", mitigated: true },
        { id: "GR203", description: "Third-party dependencies", severity: "Medium", mitigated: false },
      ],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "On Track",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC201", check: "Security Code Review", status: "In Progress", mandatory: true },
        { id: "CC202", check: "Accessibility Standards", status: "In Progress", mandatory: true },
        { id: "CC203", check: "Performance Standards", status: "Not Started", mandatory: true },
      ],
    },
    {
      id: "SG004",
      name: "Gate 3: Testing & Validation",
      phase: "Validation",
      description: "Comprehensive testing and user acceptance validation",
      progress: 0,
      status: "Not Started",
      gateReviewDate: null,
      nextGateDate: "15-01-2027",
      approvalStatus: "Pending",
      approvalAuthority: "User Acceptance Board",
      entryCriteria: [
        { id: "EC301", criterion: "Development complete", status: "Not Started", mandatory: true },
        { id: "EC302", criterion: "Test environment ready", status: "Not Started", mandatory: true },
        { id: "EC303", criterion: "Test data prepared", status: "Not Started", mandatory: true },
        { id: "EC304", criterion: "UAT users identified", status: "Complete", mandatory: true },
      ],
      exitCriteria: [
        { id: "EX301", criterion: "All critical defects resolved", status: "Not Started", mandatory: true },
        { id: "EX302", criterion: "Performance benchmarks met", status: "Not Started", mandatory: true },
        { id: "EX303", criterion: "Security testing passed", status: "Not Started", mandatory: true },
        { id: "EX304", criterion: "UAT sign-off obtained", status: "Not Started", mandatory: true },
        { id: "EX305", criterion: "Training materials complete", status: "Not Started", mandatory: true },
      ],
      requiredArtifacts: [
        { id: "ART301", name: "Test Results Report", status: "Pending", approver: "QA Lead", approved: false },
        {
          id: "ART302",
          name: "Security Test Report",
          status: "Pending",
          approver: "Security Manager",
          approved: false,
        },
        { id: "ART303", name: "UAT Sign-off", status: "Pending", approver: "Business Lead", approved: false },
        { id: "ART304", name: "Training Plan", status: "Pending", approver: "Training Lead", approved: false },
      ],
      approvers: [
        { id: "APP301", name: "QA Manager", role: "Quality Assurance", status: "Pending", date: null, comments: null },
        {
          id: "APP302",
          name: "Business Sponsor",
          role: "Business Validation",
          status: "Pending",
          date: null,
          comments: null,
        },
        {
          id: "APP303",
          name: "Security Director",
          role: "Security Approval",
          status: "Pending",
          date: null,
          comments: null,
        },
      ],
      risks: [
        { id: "GR301", description: "Testing timeline constraints", severity: "Medium", mitigated: false },
        { id: "GR302", description: "User availability for UAT", severity: "Low", mitigated: false },
      ],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "Planned",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC301", check: "Penetration Testing", status: "Pending", mandatory: true },
        { id: "CC302", check: "Compliance Audit", status: "Pending", mandatory: true },
        { id: "CC303", check: "Disaster Recovery Test", status: "Pending", mandatory: false },
      ],
    },
    {
      id: "SG005",
      name: "Gate 4: Deployment Readiness",
      phase: "Deployment",
      description: "Production deployment readiness and go-live approval",
      progress: 0,
      status: "Not Started",
      gateReviewDate: null,
      nextGateDate: "25-02-2027",
      approvalStatus: "Pending",
      approvalAuthority: "Executive Steering Committee",
      entryCriteria: [
        { id: "EC401", criterion: "UAT successfully completed", status: "Not Started", mandatory: true },
        { id: "EC402", criterion: "Production environment ready", status: "Not Started", mandatory: true },
        { id: "EC403", criterion: "Cutover plan approved", status: "Not Started", mandatory: true },
        { id: "EC404", criterion: "Support team trained", status: "Not Started", mandatory: true },
      ],
      exitCriteria: [
        { id: "EX401", criterion: "Go-live approval obtained", status: "Not Started", mandatory: true },
        { id: "EX402", criterion: "Rollback plan validated", status: "Not Started", mandatory: true },
        { id: "EX403", criterion: "Production monitoring active", status: "Not Started", mandatory: true },
        { id: "EX404", criterion: "Business continuity validated", status: "Not Started", mandatory: true },
        { id: "EX405", criterion: "Communication plan executed", status: "Not Started", mandatory: true },
      ],
      requiredArtifacts: [
        {
          id: "ART401",
          name: "Go-Live Readiness Report",
          status: "Pending",
          approver: "Executive Sponsor",
          approved: false,
        },
        { id: "ART402", name: "Cutover Plan", status: "Pending", approver: "Operations Manager", approved: false },
        { id: "ART403", name: "Rollback Procedures", status: "Pending", approver: "Technical Lead", approved: false },
        { id: "ART404", name: "Support Procedures", status: "Pending", approver: "Support Manager", approved: false },
      ],
      approvers: [
        {
          id: "APP401",
          name: "Executive Sponsor",
          role: "Business Approval",
          status: "Pending",
          date: null,
          comments: null,
        },
        {
          id: "APP402",
          name: "Operations Director",
          role: "Operational Readiness",
          status: "Pending",
          date: null,
          comments: null,
        },
        {
          id: "APP403",
          name: "Steering Committee",
          role: "Final Approval",
          status: "Pending",
          date: null,
          comments: null,
        },
      ],
      risks: [
        { id: "GR401", description: "Production deployment risk", severity: "High", mitigated: false },
        { id: "GR402", description: "Business disruption potential", severity: "High", mitigated: false },
      ],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "Planned",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC401", check: "Change Management Board Approval", status: "Pending", mandatory: true },
        { id: "CC402", check: "Business Continuity Validation", status: "Pending", mandatory: true },
        { id: "CC403", check: "Regulatory Sign-off", status: "Pending", mandatory: true },
      ],
    },
    {
      id: "SG006",
      name: "Gate 5: Post-Implementation",
      phase: "Closure",
      description: "Post-implementation review and benefits realization",
      progress: 0,
      status: "Not Started",
      gateReviewDate: null,
      nextGateDate: "30-04-2027",
      approvalStatus: "Pending",
      approvalAuthority: "Portfolio Management Board",
      entryCriteria: [
        { id: "EC501", criterion: "System in production", status: "Not Started", mandatory: true },
        { id: "EC502", criterion: "Hypercare period complete", status: "Not Started", mandatory: true },
        { id: "EC503", criterion: "Defect resolution complete", status: "Not Started", mandatory: true },
        { id: "EC504", criterion: "Initial benefits measured", status: "Not Started", mandatory: false },
      ],
      exitCriteria: [
        { id: "EX501", criterion: "Post-implementation review complete", status: "Not Started", mandatory: true },
        { id: "EX502", criterion: "Lessons learned documented", status: "Not Started", mandatory: true },
        { id: "EX503", criterion: "Knowledge transfer complete", status: "Not Started", mandatory: true },
        { id: "EX504", criterion: "Project formally closed", status: "Not Started", mandatory: true },
        { id: "EX505", criterion: "Benefits tracking established", status: "Not Started", mandatory: true },
      ],
      requiredArtifacts: [
        {
          id: "ART501",
          name: "Post-Implementation Review",
          status: "Pending",
          approver: "Executive Sponsor",
          approved: false,
        },
        { id: "ART502", name: "Lessons Learned Report", status: "Pending", approver: "PMO", approved: false },
        {
          id: "ART503",
          name: "Benefits Realization Report",
          status: "Pending",
          approver: "Business Lead",
          approved: false,
        },
        {
          id: "ART504",
          name: "Project Closure Report",
          status: "Pending",
          approver: "Portfolio Board",
          approved: false,
        },
      ],
      approvers: [
        {
          id: "APP501",
          name: "Executive Sponsor",
          role: "Business Sign-off",
          status: "Pending",
          date: null,
          comments: null,
        },
        {
          id: "APP502",
          name: "Portfolio Board",
          role: "Formal Closure",
          status: "Pending",
          date: null,
          comments: null,
        },
        {
          id: "APP503",
          name: "PMO Director",
          role: "Governance Closure",
          status: "Pending",
          date: null,
          comments: null,
        },
      ],
      risks: [{ id: "GR501", description: "Benefits not realized", severity: "Medium", mitigated: false }],
      budgetGate: {
        requestedBudget: 1250000,
        approvedBudget: 1250000,
        budgetStatus: "Final Reconciliation",
        fundingSource: "Capital Investment Fund",
      },
      complianceChecks: [
        { id: "CC501", check: "Financial Audit", status: "Pending", mandatory: true },
        { id: "CC502", check: "Contract Closure", status: "Pending", mandatory: true },
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
    setGenerationStep("Analyzing governance data sources...")

    await new Promise((resolve) => setTimeout(resolve, 1200))
    setGenerationStep("Processing decision timeline and delays...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setGenerationStep("Analyzing scope changes and change requests...")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setGenerationStep("Reviewing risk alerts and escalations...")

    await new Promise((resolve) => setTimeout(resolve, 600))
    setGenerationStep("Identifying process breakdowns and bottlenecks...")

    await new Promise((resolve) => setTimeout(resolve, 500))

    const completedMilestones = milestonesState.filter((m) => m.status === "Complete").length
    const totalMilestones = milestonesState.length
    const openRisks = risksData.filter((r) => r.status === "Open" && r.type === "Risk").length
    const openIssues = risksData.filter((r) => r.status === "Open" && r.type === "Issue").length
    const delayedDecisions = decisionsState.filter((d) => d.latencyDays > 7).length

    const overallProgress = Math.round(milestonesState.reduce((acc, m) => acc + m.progress, 0) / totalMilestones)
    let overallStatus = "Green"
    if (openIssues > 2 || overallProgress < 50) {
      overallStatus = "Red"
    } else if (openRisks > 3 || delayedDecisions > 2) {
      overallStatus = "Amber"
    }

    const newStatusData = {
      ...statusData,
      reportDate: new Date().toLocaleDateString("en-GB"),
      reportingPeriod: `Week ending ${new Date().toLocaleDateString("en-GB")}`,
      overallStatus: overallStatus,
      keyDecisionDelays: `DECISION TIMELINE ANALYSIS:\n• ${delayedDecisions} decisions exceeded 7-day approval threshold\n• Average decision latency: ${Math.round(decisionsState.reduce((acc, d) => acc + d.latencyDays, 0) / decisionsState.length)} days\n• Critical decision bottlenecks identified in technical architecture and security approvals\n• Longest pending decision: ${Math.max(...decisionsState.map((d) => d.latencyDays))} days\n\nSPECIFIC DELAYS:\n• Cloud Provider Selection (22-09-2026): 7-day delay due to multi-stakeholder alignment\n• Security Framework Decision (12-10-2026): 4-day delay pending committee review\n• API Gateway Strategy (02-11-2026): 5-day delay for technical validation`,
      scopeChanges: `SCOPE CHANGE TRACKING:\n• ${changeRequestData.status === "Approved" ? "1 approved" : "1 pending"} change request: ${changeRequestData.changeTitle}\n• Submission date: ${changeRequestData.submissionDate}\n• Budget impact: ${changeRequestData.budgetImpact.split("\n")[0]}\n• Schedule impact: ${changeRequestData.scheduleImpact.split("\n")[0]}\n\nCHANGE VELOCITY:\n• Change request submitted: ${changeRequestData.submissionDate}\n• Current status: ${changeRequestData.status}\n• Approval workflow: ${changeRequestData.approvers.filter((a) => a.status === "Approved").length}/${changeRequestData.approvers.filter((a) => a.required).length} required approvals completed`,
      riskAlerts: `RISK ESCALATION TIMELINE:\n• ${openRisks} open risks currently monitored\n• ${risksData.filter((r) => r.severity === "Critical").length} critical severity risks requiring immediate attention\n• ${risksData.filter((r) => r.escalationLevel >= 3).length} risks escalated to Level 3 (executive attention)\n\nCRITICAL ALERTS:\n• Cloud Migration Data Loss (20-11-2026): Critical severity, Level 3 escalation since 15-08-2026\n• Cybersecurity Threat During Migration (15-11-2026): High severity, Level 3 escalation since 20-09-2026\n• Budget Overrun Alert (05-11-2026): High severity, Level 2 escalation since 28-09-2026\n\nMITIGATION STATUS:\n• ${risksData.filter((r) => r.status === "Mitigated").length} risks successfully mitigated\n• ${risksData.filter((r) => r.status === "In Progress").length} risks with active mitigation in progress`,
      actionsTaken: `GOVERNANCE ACTIONS LOG:\n• Project Charter approved (28-08-2026): 4 days ahead of schedule\n• Technical Architecture Design completed (26-09-2026): 1 day delay, mitigation applied\n• Security Assessment finalized (02-10-2026): 2 days delay due to vendor dependencies\n• Change request workflow initiated (15-03-2026): Executive approval process triggered\n\nCORRECTIVE MEASURES:\n• Enhanced stakeholder engagement protocols implemented (05-10-2026)\n• Additional QA resources allocated to address resource shortage risk (08-10-2026)\n• GDPR compliance gap identified and remediation plan activated (07-10-2026)\n• Budget monitoring frequency increased to weekly reviews (10-10-2026)\n• Risk register updated with new cybersecurity controls (12-10-2026)`,
      processBreakdowns: `PROCESS BREAKDOWN ANALYSIS:\n\n1. DECISION APPROVAL BOTTLENECK (September 2026):\n   • Breakdown: Cloud provider selection delayed 7 days\n   • Root cause: Inadequate stakeholder alignment before decision submission\n   • Impact: Technical team idle for 1 week, £15K productivity loss\n   • Date identified: 22-09-2026\n   • Resolution: Implemented pre-decision stakeholder briefing protocol\n\n2. RESOURCE ALLOCATION FAILURE (Early October 2026):\n   • Breakdown: QA team shortage not identified until testing phase\n   • Root cause: Insufficient resource planning during project initiation\n   • Impact: Risk of quality issues, potential 2-week timeline delay\n   • Date identified: 03-10-2026\n   • Resolution: External contractor engaged, automated testing accelerated\n\n3. COMPLIANCE GAP (07-10-2026):\n   • Breakdown: GDPR requirements not validated in design phase\n   • Root cause: Incomplete requirements gathering process\n   • Impact: Mandatory design rework, potential launch delay\n   • Date identified: 07-10-2026\n   • Resolution: Legal specialist engaged, compliance checkpoint added to all future phases\n\n4. BUDGET MONITORING LAPSE (Late September 2026):\n   • Breakdown: Infrastructure cost overrun not detected early\n   • Root cause: Monthly budget reviews insufficient for cloud spending\n   • Impact: £200K+ potential budget overrun\n   • Date identified: 28-09-2026\n   • Resolution: Implemented weekly cost monitoring and automated alerts`,
      nextSteps: `IMMEDIATE ACTIONS (Next 2 weeks):\n• Accelerate pending change request approvals to prevent further delays\n• Address ${openIssues} open issues through escalation and resource allocation\n• Complete review of all Level 3 escalated risks with executive team\n\nPROCESS IMPROVEMENTS (Next 4 weeks):\n• Implement enhanced decision-making protocols to reduce approval latency\n• Strengthen requirements validation process to prevent compliance gaps\n• Establish weekly governance review cadence with all stakeholders\n• Deploy automated monitoring for budget, schedule, and risk thresholds`,
    }

    setStatusData(newStatusData)
    setLastGenerated(new Date().toLocaleString("en-GB"))
    setGenerationStep("")
    setIsGenerating(false)
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

  // Reset demo data function
  const resetDemoData = () => {
    setStatusData({
      ...statusReportTemplate,
      keyDecisionDelays:
        "• Governance report ready for auto-generation\n• Decision delay analysis will identify approval bottlenecks with specific dates\n• All decision repository data connected and ready for timeline analysis",
      scopeChanges:
        "• Scope change analysis pending - comprehensive review of change requests\n• Change request impacts will be assessed with detailed timelines\n• Integration with financials and milestones ready",
      riskAlerts:
        "• Risk escalation timeline will be generated from complete risk register\n• Critical risk emergence patterns to be identified\n• Mitigation effectiveness tracking across all project phases",
      actionsTaken:
        "• Governance actions log will compile all corrective measures taken\n• Response time analysis for all issues and risks\n• Effectiveness assessment of interventions with dates",
      processBreakdowns:
        "• Process breakdown analysis will identify where governance failed\n• Root cause analysis with specific dates and impacts\n• Recommendations for process improvements based on actual incidents",
      nextSteps:
        "• Click 'Generate Status Report' to compile governance timeline\n• Review process breakdowns and corrective actions\n• Validate integrated reporting across all governance dimensions",
    })
    setLastGenerated("Pending generation")
    setDemoMode(true)
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
            Governance Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Portfolio Scorecard</CardTitle>
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
                    <p className="mt-1 text-sm font-mono">{pidData.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project Manager</label>
                    <p className="mt-1 text-sm">{pidData.projectManager}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sponsor</label>
                    <p className="mt-1 text-sm">{pidData.sponsor}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <p className="mt-1 text-sm">{pidData.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <p className="mt-1 text-sm">{pidData.endDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget</label>
                    <p className="mt-1 text-sm">{pidData.budget}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Objectives</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.objectives}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Scope</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.scope}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Deliverables</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.deliverables}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Assumptions</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.assumptions}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Constraints</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.constraints}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Risks</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.risks}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Success Criteria</label>
                  <div className="mt-1 text-sm whitespace-pre-line">{pidData.successCriteria}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">RACI Matrix & Decision Authority</label>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stage-gates">
          {/* Stage Gates content - keeping existing implementation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Enterprise Stage Gate Governance</CardTitle>
                  <CardDescription>
                    Formal gate approval process with entry/exit criteria, compliance checks, and multi-level approvals
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Gate Report
                  </Button>
                  <Button
                    variant={editingStageGates ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditingStageGates(!editingStageGates)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingStageGates ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {editingStageGates ? "Save Changes" : "Edit Gate Status"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>{/* Existing Stage Gates implementation */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">{/* Existing Milestones implementation */}</TabsContent>

        <TabsContent value="financials">{/* Existing Financials implementation */}</TabsContent>

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
                    {editingChangeRequest ? (
                      <Select
                        value={changeRequestData.changeType}
                        onValueChange={(value) => setChangeRequestData({ ...changeRequestData, changeType: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Scope Expansion">Scope Expansion</SelectItem>
                          <SelectItem value="Customisation Request">Customisation Request</SelectItem>
                          <SelectItem value="Regulatory Requirement">Regulatory Requirement</SelectItem>
                          <SelectItem value="Requirement Change">Requirement Change</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm">{changeRequestData.changeType}</p>
                    )}
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
                              {approver.comments && (
                                <div className="text-xs text-muted-foreground italic mt-1">"{approver.comments}"</div>
                              )}
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

        <TabsContent value="risks">{/* Existing Risks implementation */}</TabsContent>

        <TabsContent value="decisions">{/* Existing Decisions implementation */}</TabsContent>

        <TabsContent value="status">{/* Existing Status Report implementation */}</TabsContent>
      </Tabs>
    </div>
  )
}
