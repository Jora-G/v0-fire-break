"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Clock,
  DollarSign,
  FileX,
  Shield,
  GitBranch,
  XCircle,
  Target,
  FileWarning,
  Gauge,
  Scale,
  UserX,
} from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

// Enhanced project data with comprehensive governance tracking
const projectsData = [
  {
    id: "WEB-2026",
    name: "Website Redesign",
    pidBaseline: {
      budget: 250000,
      objectives: [
        "Modernize website with React.js framework",
        "Improve SEO rankings by 40%",
        "Enhance mobile user experience",
        "Implement new CMS system",
      ],
      scope: "Redesign public website with React.js, implement CMS, mobile optimization, basic analytics",
      version: "1.0",
      approvedDate: "01-09-2024",
      approvedBy: "Executive Sponsor",
      successCriteria: [
        "40% improvement in page load times",
        "90% mobile responsiveness score",
        "Zero critical security vulnerabilities",
      ],
    },
    currentState: {
      spentBudget: 162500,
      totalBudget: 250000,
      approvedChangeValue: 15000,
      pendingChangeValue: 25000,
      burnRate: 0.65, // 65% budget consumed
      progressRate: 0.65, // 65% progress
      daysElapsed: 45,
      daysRemaining: 70,
      objectives: [
        "Modernize website with React.js framework",
        "Improve SEO rankings by 40%",
        "Enhance mobile user experience with native app features", // CHANGED
        "Implement new CMS system",
        "Add advanced analytics dashboard", // NEW - not in PID
      ],
    },
    stageGates: [
      {
        id: "G1",
        name: "Gate 0: Initiation",
        status: "Complete",
        entryCriteria: ["PID Approved", "Executive Sponsor Assigned"],
        entryStatus: [true, true],
        exitCriteria: ["Budget Approved", "Team Assigned"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "01-09-2024",
      },
      {
        id: "G2",
        name: "Gate 1: Planning",
        status: "Complete",
        entryCriteria: ["Gate 0 Complete", "Requirements 100%", "Architecture Approved"],
        entryStatus: [true, true, true],
        exitCriteria: ["Detailed Plan Approved", "Risk Register Established"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "15-09-2024",
      },
      {
        id: "G3",
        name: "Gate 2: Design",
        status: "Complete",
        entryCriteria: ["Gate 1 Complete", "Design Specs Complete", "Security Review Passed"],
        entryStatus: [true, true, true],
        exitCriteria: ["Design Approved", "Prototype Validated"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "30-09-2024",
      },
      {
        id: "G4",
        name: "Gate 3: Development",
        status: "In Progress",
        entryCriteria: ["Gate 2 Complete", "Development Environment Ready", "Resources Allocated"],
        entryStatus: [true, true, true],
        exitCriteria: ["Code Complete", "Unit Tests Pass", "Security Scan Clean"],
        exitStatus: [false, false, false],
        progress: 65,
        approvalDate: null,
      },
      {
        id: "G5",
        name: "Gate 4: Testing",
        status: "Not Started",
        entryCriteria: ["Gate 3 Complete", "Test Plan Approved", "Test Environment Ready"],
        entryStatus: [false, false, false],
        exitCriteria: ["UAT Complete", "Performance Tests Pass", "Security Audit Pass"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
      {
        id: "G6",
        name: "Gate 5: Deployment",
        status: "Not Started",
        entryCriteria: ["Gate 4 Complete", "Go-Live Approval", "Rollback Plan Tested"],
        entryStatus: [false, false, false],
        exitCriteria: ["Production Deployment", "Monitoring Active", "Support Handover"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
    ],
    changeRequests: [
      {
        id: "CR-001",
        title: "Additional Mobile Responsiveness",
        status: "Approved",
        budgetImpact: 15000,
        submittedDate: "01-10-2024",
        approvedDate: "05-10-2024",
        approvalAuthority: "Project Manager",
        requiredAuthority: "Project Manager", // Within authority
        scopeChange: false,
        daysPending: 4,
      },
      {
        id: "CR-002",
        title: "Enhanced Analytics Integration",
        status: "Under Review",
        budgetImpact: 25000,
        submittedDate: "08-10-2024",
        approvedDate: null,
        approvalAuthority: null,
        requiredAuthority: "Executive Sponsor", // Requires escalation
        scopeChange: true,
        daysPending: 7,
      },
    ],
    decisions: [
      {
        id: "DEC-001",
        title: "Technology Stack Selection",
        status: "Approved",
        latencyDays: 5,
        submitted: "10-09-2024",
        approved: "15-09-2024",
        decisionMaker: "Technical Lead",
        requiredLevel: "Technical Lead",
        blocking: [],
      },
    ],
    risks: [
      {
        id: "R001",
        title: "Database Performance Degradation",
        severity: "Medium",
        status: "In Progress",
        daysOpen: 10,
        mitigationStatus: "Active",
        mitigationPlan: "Database optimization in progress",
        owner: "Jane Smith",
        escalationCount: 1,
        firstIdentified: "05-10-2024",
      },
      {
        id: "R002",
        title: "Resource Shortage for QA Testing",
        severity: "Medium",
        status: "Mitigated",
        daysOpen: 18,
        mitigationStatus: "Complete",
        mitigationPlan: "External QA contractor engaged",
        owner: "Sarah Johnson",
        escalationCount: 1,
        firstIdentified: "20-09-2024",
      },
    ],
    complianceChecks: [
      { id: "CC001", name: "GDPR Compliance Review", required: true, status: "Complete", dueDate: "01-10-2024" },
      { id: "CC002", name: "Security Audit", required: true, status: "Complete", dueDate: "15-10-2024" },
      { id: "CC003", name: "Accessibility Standards", required: true, status: "Pending", dueDate: "01-11-2024" },
    ],
    approvalHistory: [
      { item: "PID v1.0", approver: "Executive Sponsor", date: "01-09-2024", authority: "Executive" },
      { item: "Architecture Design", approver: "Technical Lead", date: "15-09-2024", authority: "Technical" },
      { item: "CR-001", approver: "Project Manager", date: "05-10-2024", authority: "Project" },
    ],
  },
  {
    id: "APP-2026",
    name: "Mobile App Development",
    pidBaseline: {
      budget: 400000,
      objectives: [
        "Launch iOS and Android app",
        "Implement payment integration",
        "User authentication system",
        "Basic analytics tracking",
      ],
      scope: "React Native app, payment gateway integration, OAuth authentication, analytics SDK, push notifications",
      version: "1.0",
      approvedDate: "15-08-2024",
      approvedBy: "Executive Sponsor",
      successCriteria: [
        "Support 10,000 concurrent users",
        "99.5% uptime",
        "Payment processing <3 seconds",
        "App store rating >4.5",
      ],
    },
    currentState: {
      spentBudget: 220000,
      totalBudget: 400000,
      approvedChangeValue: 80000,
      pendingChangeValue: 15000,
      burnRate: 0.55, // 55% budget consumed
      progressRate: 0.45, // 45% progress - BEHIND schedule
      daysElapsed: 60,
      daysRemaining: 120,
      objectives: [
        "Launch iOS and Android app",
        "Implement payment integration",
        "User authentication system",
        "Basic analytics tracking",
        "Social media integration", // NEW - not in PID
        "Advanced push notifications", // EXPANDED from basic
      ],
    },
    stageGates: [
      {
        id: "G1",
        name: "Gate 0: Initiation",
        status: "Complete",
        entryCriteria: ["PID Approved", "Executive Sponsor Assigned"],
        entryStatus: [true, true],
        exitCriteria: ["Budget Approved", "Team Assigned"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "15-08-2024",
      },
      {
        id: "G2",
        name: "Gate 1: Planning",
        status: "Complete",
        entryCriteria: ["Gate 0 Complete", "Requirements 100%", "Architecture Approved"],
        entryStatus: [true, true, true],
        exitCriteria: ["Detailed Plan Approved", "Risk Register Established"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "01-09-2024",
      },
      {
        id: "G3",
        name: "Gate 2: Design",
        status: "Complete",
        entryCriteria: ["Gate 1 Complete", "API Design Complete", "Security Review Passed"],
        entryStatus: [true, false, true], // API Design NOT complete but gate passed anyway
        exitCriteria: ["Design Approved", "Prototype Validated"],
        exitStatus: [true, false], // Prototype NOT validated
        progress: 100,
        approvalDate: "15-09-2024",
      },
      {
        id: "G4",
        name: "Gate 3: Development",
        status: "In Progress",
        entryCriteria: ["Gate 2 Complete", "Development Environment Ready", "Resources Allocated"],
        entryStatus: [true, true, false], // Resources NOT fully allocated but started anyway
        exitCriteria: ["Code Complete", "Unit Tests Pass", "Security Scan Clean"],
        exitStatus: [false, false, false],
        progress: 45,
        approvalDate: null,
      },
      {
        id: "G5",
        name: "Gate 4: Testing",
        status: "Not Started",
        entryCriteria: ["Gate 3 Complete", "Test Plan Approved", "Test Environment Ready"],
        entryStatus: [false, false, false],
        exitCriteria: ["UAT Complete", "Performance Tests Pass", "Security Audit Pass"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
      {
        id: "G6",
        name: "Gate 5: Deployment",
        status: "Not Started",
        entryCriteria: ["Gate 4 Complete", "Go-Live Approval", "Rollback Plan Tested"],
        entryStatus: [false, false, false],
        exitCriteria: ["Production Deployment", "Monitoring Active", "Support Handover"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
    ],
    changeRequests: [
      {
        id: "CR-003",
        title: "Additional Security Features",
        status: "Approved",
        budgetImpact: 50000,
        submittedDate: "15-09-2024",
        approvedDate: "20-09-2024",
        approvalAuthority: "Executive Sponsor",
        requiredAuthority: "Executive Sponsor",
        scopeChange: true,
        daysPending: 5,
      },
      {
        id: "CR-004",
        title: "iOS 18 Compatibility",
        status: "Approved",
        budgetImpact: 30000,
        submittedDate: "20-09-2024",
        approvedDate: "25-09-2024",
        approvalAuthority: "Executive Sponsor",
        requiredAuthority: "Executive Sponsor",
        scopeChange: true,
        daysPending: 5,
      },
      {
        id: "CR-005",
        title: "Enhanced Push Notifications",
        status: "Under Review",
        budgetImpact: 15000,
        submittedDate: "05-10-2024",
        approvedDate: null,
        approvalAuthority: null,
        requiredAuthority: "Project Manager",
        scopeChange: false,
        daysPending: 10,
      },
    ],
    decisions: [
      {
        id: "DEC-002",
        title: "API Architecture Decision",
        status: "Under Review",
        latencyDays: 14,
        submitted: "07-10-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "Technical Lead",
        blocking: ["G4 Development"],
      },
      {
        id: "DEC-003",
        title: "Framework Selection",
        status: "Approved",
        latencyDays: 4,
        submitted: "25-09-2024",
        approved: "29-09-2024",
        decisionMaker: "Technical Lead",
        requiredLevel: "Technical Lead",
        blocking: [],
      },
      {
        id: "DEC-004",
        title: "Payment Gateway Selection",
        status: "Under Review",
        latencyDays: 21,
        submitted: "24-09-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "Executive Sponsor",
        blocking: ["Payment Integration Milestone"],
      },
    ],
    risks: [
      {
        id: "R001",
        title: "API Integration Delay",
        severity: "High",
        status: "Open",
        daysOpen: 28,
        mitigationStatus: "Documented",
        mitigationPlan: "Engage with API vendor for dedicated support",
        owner: "Michael Chen",
        escalationCount: 3,
        firstIdentified: "01-09-2024",
      },
      {
        id: "R002",
        title: "Third-party API Stability Concerns",
        severity: "High",
        status: "Open",
        daysOpen: 21,
        mitigationStatus: "Documented",
        mitigationPlan: "Establish alternative payment gateway as backup",
        owner: "Michael Chen",
        escalationCount: 2,
        firstIdentified: "10-09-2024",
      },
      {
        id: "R003",
        title: "Resource Availability Constraints",
        severity: "Medium",
        status: "Open",
        daysOpen: 14,
        mitigationStatus: "Active",
        mitigationPlan: "Engaging external contractor",
        owner: "Lisa Park",
        escalationCount: 1,
        firstIdentified: "01-10-2024",
      },
      {
        id: "R004",
        title: "Testing Phase Compression Risk",
        severity: "High",
        status: "Open",
        daysOpen: 7,
        mitigationStatus: "Documented",
        mitigationPlan: "Plan to be developed",
        owner: "QA Lead",
        escalationCount: 0,
        firstIdentified: "08-10-2024",
      },
    ],
    complianceChecks: [
      { id: "CC001", name: "PCI DSS Compliance", required: true, status: "Pending", dueDate: "01-11-2024" },
      { id: "CC002", name: "GDPR Data Privacy", required: true, status: "In Progress", dueDate: "15-10-2024" },
      { id: "CC003", name: "App Store Guidelines", required: true, status: "Not Started", dueDate: "01-12-2024" },
      { id: "CC004", name: "Security Penetration Test", required: true, status: "Not Started", dueDate: "15-11-2024" },
    ],
    approvalHistory: [
      { item: "PID v1.0", approver: "Executive Sponsor", date: "15-08-2024", authority: "Executive" },
      { item: "CR-003", approver: "Executive Sponsor", date: "20-09-2024", authority: "Executive" },
      { item: "CR-004", approver: "Executive Sponsor", date: "25-09-2024", authority: "Executive" },
      {
        item: "Gate 2 Override",
        approver: "Project Manager",
        date: "15-09-2024",
        authority: "Project",
        note: "Approved despite incomplete entry criteria",
      },
    ],
  },
  {
    id: "CLD-2026",
    name: "Cloud Migration",
    pidBaseline: {
      budget: 600000,
      objectives: [
        "Migrate enterprise data to cloud",
        "Reduce operational costs by 25%",
        "Improve system scalability",
        "Enhance disaster recovery capabilities",
      ],
      scope:
        "Database migration, security compliance implementation, data governance framework, staff training, monitoring setup",
      version: "1.0",
      approvedDate: "01-07-2024",
      approvedBy: "CTO",
      successCriteria: [
        "Zero data loss during migration",
        "99.9% system uptime",
        "25% cost reduction achieved",
        "Complete SOC2 compliance",
      ],
    },
    currentState: {
      spentBudget: 420000,
      totalBudget: 600000,
      approvedChangeValue: 140000,
      pendingChangeValue: 120000,
      burnRate: 0.7, // 70% budget consumed
      progressRate: 0.3, // 30% progress - SEVERELY behind
      daysElapsed: 105,
      daysRemaining: 150,
      objectives: [
        "Migrate enterprise data to cloud",
        "Reduce operational costs by 20%", // REDUCED from 25%
        "Improve system scalability",
        "Enhance disaster recovery capabilities",
        "Implement AI-powered monitoring", // NEW - not in PID
        "Multi-region redundancy", // NEW - not in PID
      ],
    },
    stageGates: [
      {
        id: "G1",
        name: "Gate 0: Initiation",
        status: "Complete",
        entryCriteria: ["PID Approved", "Executive Sponsor Assigned", "Budget Secured"],
        entryStatus: [true, true, true],
        exitCriteria: ["Business Case Approved", "Team Assigned", "Initial Risk Assessment"],
        exitStatus: [true, true, true],
        progress: 100,
        approvalDate: "01-07-2024",
      },
      {
        id: "G2",
        name: "Gate 1: Planning",
        status: "Complete",
        entryCriteria: ["Gate 0 Complete", "Requirements 100%", "Architecture Approved", "Security Review"],
        entryStatus: [true, true, true, false], // Security review NOT complete
        exitCriteria: ["Migration Plan Approved", "Risk Register Established", "Compliance Framework"],
        exitStatus: [true, true, false], // Compliance framework NOT complete
        progress: 100,
        approvalDate: "15-08-2024",
      },
      {
        id: "G3",
        name: "Gate 2: Design",
        status: "Complete",
        entryCriteria: [
          "Gate 1 Complete",
          "Technical Design Complete",
          "Security Architecture Approved",
          "Data Mapping Complete",
        ],
        entryStatus: [true, true, false, false], // Security AND Data Mapping NOT complete
        exitCriteria: ["Design Approved", "POC Successful", "Vendor Contracts Signed"],
        exitStatus: [true, false, true], // POC NOT successful
        progress: 100,
        approvalDate: "20-09-2024",
      },
      {
        id: "G4",
        name: "Gate 3: Execution",
        status: "In Progress",
        entryCriteria: [
          "Gate 2 Complete",
          "Infrastructure Ready",
          "Security Compliance Validated",
          "Migration Tools Tested",
        ],
        entryStatus: [true, true, false, false], // Security AND Tools NOT ready
        exitCriteria: ["Migration Complete", "Data Validation Pass", "Performance Tests Pass"],
        exitStatus: [false, false, false],
        progress: 30,
        approvalDate: null,
      },
      {
        id: "G5",
        name: "Gate 4: Validation",
        status: "Not Started",
        entryCriteria: ["Gate 3 Complete", "All Data Migrated", "UAT Complete"],
        entryStatus: [false, false, false],
        exitCriteria: ["Production Validation", "Compliance Audit Pass", "Performance Baseline Met"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
      {
        id: "G6",
        name: "Gate 5: Closure",
        status: "Not Started",
        entryCriteria: ["Gate 4 Complete", "Legacy Systems Decommissioned", "Knowledge Transfer Complete"],
        entryStatus: [false, false, false],
        exitCriteria: ["Project Closed", "Lessons Learned", "Support Handover"],
        exitStatus: [false, false, false],
        progress: 0,
        approvalDate: null,
      },
    ],
    changeRequests: [
      {
        id: "CR-006",
        title: "Additional Security Compliance Requirements",
        status: "Approved",
        budgetImpact: 80000,
        submittedDate: "01-09-2024",
        approvedDate: "15-09-2024",
        approvalAuthority: "CTO",
        requiredAuthority: "CTO",
        scopeChange: true,
        daysPending: 14,
      },
      {
        id: "CR-007",
        title: "Extended Data Backup Requirements",
        status: "Approved",
        budgetImpact: 60000,
        submittedDate: "10-09-2024",
        approvedDate: "25-09-2024",
        approvalAuthority: "CTO",
        requiredAuthority: "CTO",
        scopeChange: true,
        daysPending: 15,
      },
      {
        id: "CR-008",
        title: "Multi-Region Deployment Architecture",
        status: "Under Review",
        budgetImpact: 120000,
        submittedDate: "25-09-2024",
        approvedDate: null,
        approvalAuthority: null,
        requiredAuthority: "Board",
        scopeChange: true,
        daysPending: 20,
      },
      {
        id: "CR-009",
        title: "AI-Powered Monitoring System",
        status: "Under Review",
        budgetImpact: 45000,
        submittedDate: "01-10-2024",
        approvedDate: null,
        approvalAuthority: null,
        requiredAuthority: "CTO",
        scopeChange: true,
        daysPending: 14,
      },
    ],
    decisions: [
      {
        id: "DEC-004",
        title: "Cloud Provider Final Selection",
        status: "Under Review",
        latencyDays: 28,
        submitted: "03-10-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "CTO",
        blocking: ["G4 Execution", "Infrastructure Setup", "Security Implementation"],
      },
      {
        id: "DEC-005",
        title: "Budget Reallocation Request (£140K)",
        status: "Under Review",
        latencyDays: 35,
        submitted: "27-09-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "CFO",
        blocking: ["CR-008", "CR-009"],
      },
      {
        id: "DEC-006",
        title: "Security Framework Implementation Approach",
        status: "Under Review",
        latencyDays: 21,
        submitted: "01-10-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "Security Director",
        blocking: ["Security Compliance Validation", "G4 Entry Criteria"],
      },
      {
        id: "DEC-007",
        title: "Data Migration Phasing Strategy",
        status: "Under Review",
        latencyDays: 18,
        submitted: "05-10-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "Technical Lead",
        blocking: ["Migration Execution"],
      },
    ],
    risks: [
      {
        id: "R001",
        title: "Critical Data Loss Risk During Migration",
        severity: "Critical",
        status: "Open",
        daysOpen: 75,
        mitigationStatus: "Documented",
        mitigationPlan: "Comprehensive data backup strategy documented but not implemented",
        owner: "Robert Garcia",
        escalationCount: 5,
        firstIdentified: "20-08-2024",
      },
      {
        id: "R002",
        title: "Budget Overrun - £200K+ Projected",
        severity: "Critical",
        status: "Open",
        daysOpen: 49,
        mitigationStatus: "Documented",
        mitigationPlan: "Budget reallocation request pending CFO approval",
        owner: "Emma Rodriguez",
        escalationCount: 4,
        firstIdentified: "05-09-2024",
      },
      {
        id: "R003",
        title: "Single Vendor Dependency Risk",
        severity: "High",
        status: "Open",
        daysOpen: 42,
        mitigationStatus: "Documented",
        mitigationPlan: "Multi-cloud strategy evaluation pending",
        owner: "David Wilson",
        escalationCount: 3,
        firstIdentified: "10-09-2024",
      },
      {
        id: "R004",
        title: "SOC2 Compliance Gap",
        severity: "Critical",
        status: "Open",
        daysOpen: 56,
        mitigationStatus: "Documented",
        mitigationPlan: "Compliance specialist engaged but framework not complete",
        owner: "Security Team Lead",
        escalationCount: 4,
        firstIdentified: "25-08-2024",
      },
      {
        id: "R005",
        title: "Cybersecurity Threat During Migration",
        severity: "High",
        status: "Open",
        daysOpen: 35,
        mitigationStatus: "Documented",
        mitigationPlan: "Enhanced security monitoring planned but not implemented",
        owner: "Security Team Lead",
        escalationCount: 2,
        firstIdentified: "20-09-2024",
      },
      {
        id: "R006",
        title: "Resource Skills Gap for Cloud Platform",
        severity: "High",
        status: "Open",
        daysOpen: 28,
        mitigationStatus: "Active",
        mitigationPlan: "Training program initiated",
        owner: "HR Lead",
        escalationCount: 1,
        firstIdentified: "28-09-2024",
      },
    ],
    complianceChecks: [
      { id: "CC001", name: "SOC2 Type II Certification", required: true, status: "Not Started", dueDate: "01-12-2024" },
      { id: "CC002", name: "GDPR Data Protection", required: true, status: "In Progress", dueDate: "15-11-2024" },
      { id: "CC003", name: "ISO 27001 Security", required: true, status: "Not Started", dueDate: "01-01-2027" },
      { id: "CC004", name: "Data Migration Audit", required: true, status: "Not Started", dueDate: "15-12-2024" },
      { id: "CC005", name: "Disaster Recovery Test", required: true, status: "Not Started", dueDate: "01-11-2024" },
    ],
    approvalHistory: [
      { item: "PID v1.0", approver: "CTO", date: "01-07-2024", authority: "Executive" },
      { item: "CR-006", approver: "CTO", date: "15-09-2024", authority: "Executive" },
      { item: "CR-007", approver: "CTO", date: "25-09-2024", authority: "Executive" },
      {
        item: "Gate 1 Override",
        approver: "Project Manager",
        date: "15-08-2024",
        authority: "Project",
        note: "Approved despite incomplete security review and compliance framework",
      },
      {
        item: "Gate 2 Override",
        approver: "Project Manager",
        date: "20-09-2024",
        authority: "Project",
        note: "Approved despite incomplete security architecture, data mapping, and failed POC",
      },
      {
        item: "Gate 3 Early Start",
        approver: "Project Manager",
        date: "25-09-2024",
        authority: "Project",
        note: "Started execution despite incomplete security compliance and untested migration tools",
      },
    ],
  },
  {
    id: "SEC-2026",
    name: "Security Upgrade",
    pidBaseline: {
      budget: 300000,
      objectives: [
        "Implement zero-trust security framework",
        "Enhance security monitoring capabilities",
        "Achieve ISO 27001 certification",
        "Train all staff on security protocols",
      ],
      scope:
        "Zero-trust implementation, SIEM deployment, monitoring tools, training program, compliance audit preparation",
      version: "1.0",
      approvedDate: "10-10-2024",
      approvedBy: "CISO",
      successCriteria: [
        "Zero security incidents in first 6 months",
        "100% staff training completion",
        "ISO 27001 certification achieved",
        "Mean time to detect <5 minutes",
      ],
    },
    currentState: {
      spentBudget: 0,
      totalBudget: 300000,
      approvedChangeValue: 0,
      pendingChangeValue: 0,
      burnRate: 0,
      progressRate: 0.15, // 15% progress in planning
      daysElapsed: 5,
      daysRemaining: 175,
      objectives: [
        "Implement zero-trust security framework",
        "Enhance security monitoring capabilities",
        "Achieve ISO 27001 certification",
        "Train all staff on security protocols",
      ],
    },
    stageGates: [
      {
        id: "G1",
        name: "Gate 0: Initiation",
        status: "Complete",
        entryCriteria: ["PID Approved", "Executive Sponsor Assigned", "Budget Secured"],
        entryStatus: [true, true, true],
        exitCriteria: ["Business Case Approved", "Team Assigned"],
        exitStatus: [true, true],
        progress: 100,
        approvalDate: "10-10-2024",
      },
      {
        id: "G2",
        name: "Gate 1: Planning",
        status: "In Progress",
        entryCriteria: ["Gate 0 Complete", "Requirements Gathered"],
        entryStatus: [true, true],
        exitCriteria: ["Security Framework Selected", "Implementation Plan Approved"],
        exitStatus: [false, false],
        progress: 75,
        approvalDate: null,
      },
      {
        id: "G3",
        name: "Gate 2: Design",
        status: "Not Started",
        entryCriteria: ["Gate 1 Complete", "Architecture Approved"],
        entryStatus: [false, false],
        exitCriteria: ["Design Complete", "Security Controls Defined"],
        exitStatus: [false, false],
        progress: 0,
        approvalDate: null,
      },
    ],
    changeRequests: [],
    decisions: [
      {
        id: "DEC-007",
        title: "Zero-Trust Framework Vendor Selection",
        status: "Under Review",
        latencyDays: 4,
        submitted: "11-10-2024",
        approved: null,
        decisionMaker: null,
        requiredLevel: "CISO",
        blocking: ["G2 Planning"],
      },
    ],
    risks: [],
    complianceChecks: [
      { id: "CC001", name: "Current Security Baseline", required: true, status: "Complete", dueDate: "10-10-2024" },
      { id: "CC002", name: "Gap Analysis", required: true, status: "In Progress", dueDate: "20-10-2024" },
    ],
    approvalHistory: [{ item: "PID v1.0", approver: "CISO", date: "10-10-2024", authority: "Executive" }],
  },
]

// Historic patterns with more detail
const historicPatterns = {
  scopeCreep: {
    threshold: 0.3,
    criticalThreshold: 0.4,
    message: "Historic data: Projects exceeding +30% scope have 67% failure rate; >40% have 85% failure rate",
    avgDelay: 35,
    budgetOverrun: 0.45,
  },
  requirementsDrift: {
    threshold: 2,
    message: "Historic data: Objective changes not re-baselined in PID increase project failure by 40%",
  },
  gateEntryViolation: {
    threshold: 0.15,
    message:
      "Historic data: Starting gates with <85% entry criteria complete adds avg 28 days delay and increases risk by 35%",
    avgDelay: 28,
    riskIncrease: 0.35,
  },
  gateExitViolation: {
    threshold: 0.15,
    message: "Historic data: Approving gates with <85% exit criteria complete leads to 55% rework rate",
    reworkRate: 0.55,
  },
  decisionBacklog: {
    threshold: 10,
    criticalThreshold: 21,
    message:
      "Historic data: Each week of decision delay adds 8% project risk; >21 days pending leads to 70% project delay",
    riskIncrease: 0.08,
    projectDelayRate: 0.7,
  },
  criticalRiskOpen: {
    threshold: 45,
    highThreshold: 30,
    message:
      "Historic data: Critical risks open >45 days escalate to project failure 80% of the time; High risks >30 days have 60% failure correlation",
    criticalFailureRate: 0.8,
    highFailureRate: 0.6,
  },
  riskMitigationGap: {
    message:
      "Historic data: High+ severity risks with 'Documented' only status for >21 days become critical 65% of the time",
    escalationRate: 0.65,
  },
  budgetCascade: {
    threshold: 0.15,
    message: "Historic data: Projects with <15% budget buffer have 55% overrun rate",
    overrunRate: 0.55,
  },
  burnRateDeviation: {
    threshold: 0.15,
    message: "Historic data: Burn rate >15% ahead of progress rate correlates with 70% probability of budget overrun",
    overrunProbability: 0.7,
  },
  approvalAuthorityViolation: {
    message: "Historic data: Decisions made below required authority level have 45% reversal rate later",
    reversalRate: 0.45,
  },
  complianceDelay: {
    message: "Historic data: Compliance checks past due date add avg 42 days to project timeline",
    avgDelay: 42,
  },
  crApprovalVelocity: {
    threshold: 14,
    message: "Historic data: CRs pending >14 days have 40% rejection rate vs 15% for faster approvals",
    rejectionRate: 0.4,
  },
}

interface ViolationDetection {
  type: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  title: string
  evidence: string[]
  pattern: string
  recommendation: string
  financialImpact?: string
  timelineImpact?: string
  icon: any
  dataSource: string[]
}

export function RiskIntelligence() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([])

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const detectViolations = (project: any): ViolationDetection[] => {
    const violations: ViolationDetection[] = []

    // 1. SCOPE CREEP DETECTION (PID baseline vs current)
    const totalChangeValue = project.currentState.approvedChangeValue + project.currentState.pendingChangeValue
    const scopeCreepRatio = totalChangeValue / project.pidBaseline.budget

    if (scopeCreepRatio > historicPatterns.scopeCreep.threshold) {
      const severity = scopeCreepRatio > historicPatterns.scopeCreep.criticalThreshold ? "CRITICAL" : "HIGH"
      const scopeCreepPercent = (scopeCreepRatio * 100).toFixed(0)
      const approvedPercent = ((project.currentState.approvedChangeValue / project.pidBaseline.budget) * 100).toFixed(0)
      const pendingPercent = ((project.currentState.pendingChangeValue / project.pidBaseline.budget) * 100).toFixed(0)

      violations.push({
        type: "SCOPE_CREEP",
        severity,
        title: "Severe Scope Creep Detected",
        evidence: [
          `PID v${project.pidBaseline.version} approved ${project.pidBaseline.approvedDate} by ${project.pidBaseline.approvedBy}`,
          `Original baseline budget: £${project.pidBaseline.budget.toLocaleString()}`,
          `Approved scope changes: +£${project.currentState.approvedChangeValue.toLocaleString()} (+${approvedPercent}% over baseline)`,
          `Pending scope changes: +£${project.currentState.pendingChangeValue.toLocaleString()} (+${pendingPercent}% over baseline)`,
          `Total scope expansion: +${scopeCreepPercent}% beyond approved PID`,
          `${project.changeRequests.filter((cr: any) => cr.scopeChange).length} change requests expanded original scope`,
        ],
        pattern: historicPatterns.scopeCreep.message,
        recommendation: `IMMEDIATE: Freeze all scope changes. Re-baseline PID to v${Number.parseFloat(project.pidBaseline.version) + 0.1} with updated objectives, budget, and timeline. Current trajectory indicates ${historicPatterns.scopeCreep.avgDelay}-day delay risk and ${(historicPatterns.scopeCreep.budgetOverrun * 100).toFixed(0)}% budget overrun probability.`,
        financialImpact: `£${totalChangeValue.toLocaleString()} scope expansion (${scopeCreepPercent}% over PID baseline)`,
        timelineImpact: `+${historicPatterns.scopeCreep.avgDelay} days projected delay`,
        icon: TrendingUp,
        dataSource: ["PID Baseline", "Change Request Register", "Budget Tracking"],
      })
    }

    // 2. REQUIREMENTS DRIFT DETECTION (PID objectives vs current objectives)
    const originalObjectives = project.pidBaseline.objectives
    const currentObjectives = project.currentState.objectives
    const newObjectives = currentObjectives.filter((obj: string) => !originalObjectives.includes(obj))
    const changedObjectives = currentObjectives.filter((curr: string) => {
      const matchingOriginal = originalObjectives.find((orig: string) =>
        curr.toLowerCase().includes(orig.toLowerCase().split(" ").slice(0, 3).join(" ")),
      )
      return matchingOriginal && curr !== matchingOriginal
    })

    if (newObjectives.length > 0 || changedObjectives.length > 0) {
      violations.push({
        type: "REQUIREMENTS_DRIFT",
        severity: newObjectives.length + changedObjectives.length >= 3 ? "CRITICAL" : "HIGH",
        title: "Project Objectives Drift from PID Baseline",
        evidence: [
          `PID v${project.pidBaseline.version} defined ${originalObjectives.length} objectives`,
          `Current state shows ${currentObjectives.length} objectives`,
          `${newObjectives.length} NEW objective(s) not in original PID:`,
          ...newObjectives.map((obj: string) => `  → "${obj}"`),
          `${changedObjectives.length} CHANGED objective(s) from PID baseline:`,
          ...changedObjectives.map((obj: string) => `  → "${obj}"`),
          `No PID re-baselining has occurred since v${project.pidBaseline.version}`,
        ],
        pattern: historicPatterns.requirementsDrift.message,
        recommendation: `IMMEDIATE: Halt work on new/changed objectives. Submit Change Request to formally update PID to v${Number.parseFloat(project.pidBaseline.version) + 0.1} with revised objectives. All objective changes require Executive Sponsor approval and budget/timeline impact assessment.`,
        icon: Target,
        dataSource: ["PID Baseline Objectives", "Current Project Objectives", "Change Request Register"],
      })
    }

    // 3. GOVERNANCE GATE ENTRY CRITERIA VIOLATIONS
    const activeGate = project.stageGates.find((g: any) => g.status === "In Progress")
    if (activeGate) {
      const totalEntryCriteria = activeGate.entryCriteria.length
      const metEntryCriteria = activeGate.entryStatus.filter((status: boolean) => status === true).length
      const entryCompletionRate = metEntryCriteria / totalEntryCriteria
      const unmetCriteria = activeGate.entryCriteria.filter(
        (_: string, index: number) => activeGate.entryStatus[index] === false,
      )

      if (entryCompletionRate < 1 - historicPatterns.gateEntryViolation.threshold) {
        violations.push({
          type: "GATE_ENTRY_VIOLATION",
          severity: entryCompletionRate < 0.7 ? "CRITICAL" : "HIGH",
          title: "Governance Gate Started Without Meeting Entry Criteria",
          evidence: [
            `Active gate: "${activeGate.name}" (${activeGate.progress}% complete)`,
            `Entry criteria completion: ${(entryCompletionRate * 100).toFixed(0)}% (${metEntryCriteria}/${totalEntryCriteria} criteria met)`,
            `UNMET entry criteria:`,
            ...unmetCriteria.map((criterion: string) => `  ✗ ${criterion}`),
            `Gate started on: ${project.approvalHistory.find((h: any) => h.item === `${activeGate.name} Start`)?.date || "Date not recorded"}`,
            `Previous gate approval: ${project.stageGates[project.stageGates.indexOf(activeGate) - 1]?.approvalDate || "N/A"}`,
          ],
          pattern: historicPatterns.gateEntryViolation.message,
          recommendation: `IMMEDIATE: Suspend "${activeGate.name}" activities. Complete all ${unmetCriteria.length} outstanding entry criteria. Conduct formal gate review before resuming. Gate entry violations increase rework risk by ${(historicPatterns.gateEntryViolation.riskIncrease * 100).toFixed(0)}%.`,
          timelineImpact: `+${historicPatterns.gateEntryViolation.avgDelay} days delay risk`,
          icon: AlertCircle,
          dataSource: ["Stage Gate Register", "Gate Entry/Exit Criteria", "Approval History"],
        })
      }
    }

    // 4. GOVERNANCE GATE EXIT CRITERIA VIOLATIONS
    const completedGatesWithIssues = project.stageGates.filter((gate: any) => {
      if (gate.status !== "Complete") return false
      const totalExitCriteria = gate.exitCriteria.length
      const metExitCriteria = gate.exitStatus.filter((status: boolean) => status === true).length
      const exitCompletionRate = metExitCriteria / totalExitCriteria
      return exitCompletionRate < 1 - historicPatterns.gateExitViolation.threshold
    })

    if (completedGatesWithIssues.length > 0) {
      const worstGate = completedGatesWithIssues.reduce((worst: any, gate: any) => {
        const currentRate = gate.exitStatus.filter((s: boolean) => s).length / gate.exitCriteria.length
        const worstRate = worst.exitStatus.filter((s: boolean) => s).length / worst.exitCriteria.length
        return currentRate < worstRate ? gate : worst
      })

      const metExitCriteria = worstGate.exitStatus.filter((s: boolean) => s).length
      const totalExitCriteria = worstGate.exitCriteria.length
      const unmetExitCriteria = worstGate.exitCriteria.filter(
        (_: string, index: number) => worstGate.exitStatus[index] === false,
      )

      violations.push({
        type: "GATE_EXIT_VIOLATION",
        severity: completedGatesWithIssues.length > 1 ? "CRITICAL" : "HIGH",
        title: "Gate(s) Approved Without Meeting Exit Criteria",
        evidence: [
          `${completedGatesWithIssues.length} gate(s) marked complete with incomplete exit criteria`,
          `Most severe: "${worstGate.name}" approved ${worstGate.approvalDate}`,
          `Exit criteria: ${metExitCriteria}/${totalExitCriteria} met (${((metExitCriteria / totalExitCriteria) * 100).toFixed(0)}%)`,
          `UNMET exit criteria:`,
          ...unmetExitCriteria.map((criterion: string) => `  ✗ ${criterion}`),
          `Gate approval authority: ${project.approvalHistory.find((h: any) => h.item.includes(worstGate.name))?.approver || "Unknown"}`,
          `Subsequent work already in progress despite incomplete gate`,
        ],
        pattern: historicPatterns.gateExitViolation.message,
        recommendation: `CRITICAL: This represents governance process failure. ${unmetExitCriteria.length} incomplete exit criteria must be completed immediately. Expected rework rate: ${(historicPatterns.gateExitViolation.reworkRate * 100).toFixed(0)}%. Escalate to PMO for gate process review.`,
        icon: XCircle,
        dataSource: ["Stage Gate Register", "Gate Exit Criteria", "Approval History"],
      })
    }

    // 5. CRITICAL DECISION BACKLOG
    const pendingDecisions = project.decisions.filter((d: any) => d.status === "Under Review")
    const criticalDecisions = pendingDecisions.filter(
      (d: any) => d.latencyDays > historicPatterns.decisionBacklog.criticalThreshold,
    )
    const highLatencyDecisions = pendingDecisions.filter(
      (d: any) =>
        d.latencyDays > historicPatterns.decisionBacklog.threshold &&
        d.latencyDays <= historicPatterns.decisionBacklog.criticalThreshold,
    )

    if (criticalDecisions.length > 0 || highLatencyDecisions.length > 0) {
      const oldestDecision = [...criticalDecisions, ...highLatencyDecisions].reduce((oldest: any, d: any) =>
        d.latencyDays > oldest.latencyDays ? d : oldest,
      )
      const totalBlocked = pendingDecisions.reduce((acc: string[], d: any) => [...acc, ...d.blocking], [])
      const uniqueBlocked = [...new Set(totalBlocked)]

      violations.push({
        type: "DECISION_BACKLOG",
        severity: criticalDecisions.length > 0 ? "CRITICAL" : "HIGH",
        title: "Critical Decision Backlog Blocking Progress",
        evidence: [
          `${criticalDecisions.length} decision(s) pending >${historicPatterns.decisionBacklog.criticalThreshold} days`,
          `${highLatencyDecisions.length} decision(s) pending ${historicPatterns.decisionBacklog.threshold}-${historicPatterns.decisionBacklog.criticalThreshold} days`,
          `Oldest decision: "${oldestDecision.title}"`,
          `  → Submitted: ${oldestDecision.submitted}`,
          `  → Latency: ${oldestDecision.latencyDays} days`,
          `  → Required authority: ${oldestDecision.requiredLevel}`,
          `  → Currently blocking: ${oldestDecision.blocking.length > 0 ? oldestDecision.blocking.join(", ") : "No items tagged but likely blocking progress"}`,
          `Total unique items blocked across all pending decisions: ${uniqueBlocked.length}`,
          `Average decision latency: ${Math.round(pendingDecisions.reduce((sum: number, d: any) => sum + d.latencyDays, 0) / pendingDecisions.length)} days`,
        ],
        pattern: historicPatterns.decisionBacklog.message,
        recommendation: `IMMEDIATE EXECUTIVE INTERVENTION: Escalate "${oldestDecision.title}" to ${oldestDecision.requiredLevel} for decision within 48 hours. Each additional week of delay adds ${(historicPatterns.decisionBacklog.riskIncrease * 100).toFixed(0)}% to overall project risk. At current latency (${oldestDecision.latencyDays} days), probability of project delay is ${(historicPatterns.decisionBacklog.projectDelayRate * 100).toFixed(0)}%.`,
        timelineImpact: `Each week of delay adds ${(historicPatterns.decisionBacklog.riskIncrease * 100).toFixed(0)}% project risk`,
        icon: Clock,
        dataSource: ["Decision Repository", "Approval History", "Dependencies Tracking"],
      })
    }

    // 6. UNAPPROVED CHANGE REQUEST FINANCIAL RISK
    const pendingCRs = project.changeRequests.filter((cr: any) => cr.status === "Under Review")
    const pendingCRValue = pendingCRs.reduce((sum: number, cr: any) => sum + cr.budgetImpact, 0)
    const remainingBudget = project.currentState.totalBudget - project.currentState.spentBudget
    const bufferAfterCRs = remainingBudget - pendingCRValue
    const bufferPercent = ((bufferAfterCRs / project.currentState.totalBudget) * 100).toFixed(0)
    const slowCRs = pendingCRs.filter((cr: any) => cr.daysPending > historicPatterns.crApprovalVelocity.threshold)

    if (
      pendingCRValue > 0 &&
      (bufferAfterCRs < project.currentState.totalBudget * historicPatterns.budgetCascade.threshold ||
        slowCRs.length > 0)
    ) {
      const severity =
        bufferAfterCRs < 0 ? "CRITICAL" : slowCRs.length > 2 || bufferPercent < "10" ? "CRITICAL" : "HIGH"

      violations.push({
        type: "BUDGET_CASCADE_RISK",
        severity,
        title: "Pending Change Requests Threaten Budget Control",
        evidence: [
          `Current budget status:`,
          `  → Total budget: £${project.currentState.totalBudget.toLocaleString()}`,
          `  → Spent to date: £${project.currentState.spentBudget.toLocaleString()} (${((project.currentState.spentBudget / project.currentState.totalBudget) * 100).toFixed(0)}%)`,
          `  → Remaining: £${remainingBudget.toLocaleString()}`,
          `Pending change requests:`,
          `  → Count: ${pendingCRs.length} CRs awaiting approval`,
          `  → Total value: £${pendingCRValue.toLocaleString()}`,
          `  → Slowest CR: "${pendingCRs.reduce((slowest: any, cr: any) => (cr.daysPending > slowest.daysPending ? cr : slowest), pendingCRs[0]).title}" (${pendingCRs.reduce((slowest: any, cr: any) => (cr.daysPending > slowest.daysPending ? cr : slowest), pendingCRs[0]).daysPending} days pending)`,
          `Post-approval budget projection:`,
          `  → Buffer remaining: £${bufferAfterCRs.toLocaleString()} (${bufferPercent}% of total)`,
          ...(bufferAfterCRs < 0
            ? [`  ⚠️ BUDGET OVERRUN: -£${Math.abs(bufferAfterCRs).toLocaleString()} if all CRs approved`]
            : []),
          `${slowCRs.length} CR(s) pending >${historicPatterns.crApprovalVelocity.threshold} days (${(historicPatterns.crApprovalVelocity.rejectionRate * 100).toFixed(0)}% historic rejection rate)`,
        ],
        pattern: `${historicPatterns.budgetCascade.message}. Additionally, ${historicPatterns.crApprovalVelocity.message}`,
        recommendation:
          bufferAfterCRs < 0
            ? `IMMEDIATE: Current pending CRs exceed remaining budget by £${Math.abs(bufferAfterCRs).toLocaleString()}. REJECT minimum £${Math.abs(bufferAfterCRs).toLocaleString()} in CRs OR secure additional budget approval within 48 hours. Cannot proceed with all pending changes.`
            : `URGENT: Approve or reject all ${pendingCRs.length} pending CRs within 7 days. Post-approval buffer of ${bufferPercent}% is below ${(historicPatterns.budgetCascade.threshold * 100).toFixed(0)}% safety threshold. Prioritize ${slowCRs.length} slow-moving CRs to prevent ${(historicPatterns.crApprovalVelocity.rejectionRate * 100).toFixed(0)}% rejection waste.`,
        financialImpact: `£${pendingCRValue.toLocaleString()} pending approval; £${Math.abs(bufferAfterCRs).toLocaleString()} ${bufferAfterCRs < 0 ? "OVERRUN" : "buffer remaining"}`,
        icon: DollarSign,
        dataSource: ["Change Request Register", "Budget Tracking", "Approval History"],
      })
    }

    // 7. CRITICAL RISK MITIGATION FAILURE
    const criticalRisksLongOpen = project.risks.filter(
      (r: any) =>
        r.severity === "Critical" && r.status === "Open" && r.daysOpen > historicPatterns.criticalRiskOpen.threshold,
    )
    const highRisksLongOpen = project.risks.filter(
      (r: any) =>
        r.severity === "High" &&
        r.status === "Open" &&
        r.daysOpen > historicPatterns.criticalRiskOpen.highThreshold &&
        r.daysOpen <= historicPatterns.criticalRiskOpen.threshold,
    )

    if (criticalRisksLongOpen.length > 0) {
      const oldestRisk = criticalRisksLongOpen.reduce((oldest: any, r: any) =>
        r.daysOpen > oldest.daysOpen ? r : oldest,
      )

      violations.push({
        type: "RISK_MITIGATION_FAILURE",
        severity: "CRITICAL",
        title: "Critical Risks Open Beyond Acceptable Timeframe",
        evidence: [
          `${criticalRisksLongOpen.length} CRITICAL risk(s) open >${historicPatterns.criticalRiskOpen.threshold} days`,
          `${highRisksLongOpen.length} HIGH risk(s) open >${historicPatterns.criticalRiskOpen.highThreshold} days`,
          `Oldest critical risk: "${oldestRisk.title}"`,
          `  → Severity: ${oldestRisk.severity}`,
          `  → Days open: ${oldestRisk.daysOpen} (${oldestRisk.daysOpen - historicPatterns.criticalRiskOpen.threshold} days over threshold)`,
          `  → First identified: ${oldestRisk.firstIdentified}`,
          `  → Owner: ${oldestRisk.owner}`,
          `  → Mitigation status: ${oldestRisk.mitigationStatus}`,
          `  → Escalation count: ${oldestRisk.escalationCount}x`,
          `  → Mitigation plan: "${oldestRisk.mitigationPlan}"`,
          `Pattern: Risk has mitigation plan DOCUMENTED but NOT EXECUTED`,
        ],
        pattern: historicPatterns.criticalRiskOpen.message,
        recommendation: `CRITICAL GOVERNANCE FAILURE: Assign dedicated resource to EXECUTE (not document) mitigation plan for "${oldestRisk.title}" within 48 hours. Risk owner ${oldestRisk.owner} must provide daily status updates. At ${oldestRisk.daysOpen} days open with ${oldestRisk.escalationCount} escalations, probability of project failure is ${(historicPatterns.criticalRiskOpen.criticalFailureRate * 100).toFixed(0)}%.`,
        icon: Shield,
        dataSource: ["Risk Register", "Mitigation Tracking", "Escalation History"],
      })
    }

    // 8. RISK MITIGATION DOCUMENTATION-ONLY PATTERN
    const documentedOnlyRisks = project.risks.filter(
      (r: any) =>
        (r.severity === "High" || r.severity === "Critical") &&
        r.status === "Open" &&
        r.mitigationStatus === "Documented" &&
        r.daysOpen > 21,
    )

    if (documentedOnlyRisks.length > 1) {
      violations.push({
        type: "MITIGATION_EXECUTION_GAP",
        severity: documentedOnlyRisks.length > 3 ? "CRITICAL" : "HIGH",
        title: 'Systemic "Documentation-Only" Risk Management Failure',
        evidence: [
          `${documentedOnlyRisks.length} high/critical risk(s) with "Documented" mitigation status >21 days`,
          `Pattern indicates risk management process breakdown:`,
          ...documentedOnlyRisks.map(
            (r: any) =>
              `  → ${r.id}: "${r.title}" (${r.severity}) - ${r.daysOpen} days open, ${r.escalationCount}x escalated`,
          ),
          `All have mitigation PLANS but zero EXECUTION evidence`,
          `Average days open: ${Math.round(documentedOnlyRisks.reduce((sum: number, r: any) => sum + r.daysOpen, 0) / documentedOnlyRisks.length)} days`,
          `Total escalations: ${documentedOnlyRisks.reduce((sum: number, r: any) => sum + r.escalationCount, 0)}`,
        ],
        pattern: historicPatterns.riskMitigationGap.message,
        recommendation: `IMMEDIATE PROCESS INTERVENTION: Current risk management is documentation theater, not mitigation. Assign dedicated risk execution team to convert ${documentedOnlyRisks.length} plans to actions within 1 week. ${(historicPatterns.riskMitigationGap.escalationRate * 100).toFixed(0)}% probability these risks escalate to critical if not actioned now.`,
        icon: AlertTriangle,
        dataSource: ["Risk Register", "Mitigation Status Tracking", "Risk Review History"],
      })
    }

    // 9. BURN RATE VS PROGRESS RATE DEVIATION
    const burnRateDeviation = project.currentState.burnRate - project.currentState.progressRate

    if (burnRateDeviation > historicPatterns.burnRateDeviation.threshold) {
      const projectedBudgetAtCompletion =
        project.currentState.totalBudget * (project.currentState.burnRate / project.currentState.progressRate)
      const projectedOverrun = projectedBudgetAtCompletion - project.currentState.totalBudget

      violations.push({
        type: "BURN_RATE_DEVIATION",
        severity: burnRateDeviation > 0.25 ? "CRITICAL" : "HIGH",
        title: "Budget Burn Rate Significantly Ahead of Progress",
        evidence: [
          `Budget burn rate: ${(project.currentState.burnRate * 100).toFixed(0)}% (£${project.currentState.spentBudget.toLocaleString()} of £${project.currentState.totalBudget.toLocaleString()})`,
          `Progress rate: ${(project.currentState.progressRate * 100).toFixed(0)}%`,
          `Deviation: +${(burnRateDeviation * 100).toFixed(0)}% (burn rate ahead of progress)`,
          `Days elapsed: ${project.currentState.daysElapsed} of ${project.currentState.daysElapsed + project.currentState.daysRemaining} total`,
          `Projection at current rate:`,
          `  → Budget at completion: £${Math.round(projectedBudgetAtCompletion).toLocaleString()}`,
          `  → Projected overrun: £${Math.round(projectedOverrun).toLocaleString()} (${((projectedOverrun / project.currentState.totalBudget) * 100).toFixed(0)}% over budget)`,
          `This pattern persisted for ${project.currentState.daysElapsed} days without intervention`,
        ],
        pattern: historicPatterns.burnRateDeviation.message,
        recommendation: `IMMEDIATE FINANCIAL CONTROLS: Current burn rate trajectory indicates ${((projectedOverrun / project.currentState.totalBudget) * 100).toFixed(0)}% budget overrun. Implement spending freeze on non-critical items. Conduct cost-benefit analysis on all remaining work. Probability of budget overrun: ${(historicPatterns.burnRateDeviation.overrunProbability * 100).toFixed(0)}%.`,
        financialImpact: `£${Math.round(projectedOverrun).toLocaleString()} projected overrun at current burn rate`,
        icon: Gauge,
        dataSource: ["Budget Tracking", "Progress Reporting", "Financial Forecasting"],
      })
    }

    // 10. APPROVAL AUTHORITY VIOLATIONS
    const authorityViolations = project.approvalHistory.filter((approval: any) => {
      if (approval.item.startsWith("CR-")) {
        const cr = project.changeRequests.find((c: any) => c.id === approval.item)
        return cr && approval.authority !== "Executive" && cr.requiredAuthority === "Executive Sponsor"
      }
      if (approval.item.includes("Gate") && approval.item.includes("Override")) {
        return true
      }
      return false
    })

    if (authorityViolations.length > 0) {
      violations.push({
        type: "APPROVAL_AUTHORITY_VIOLATION",
        severity: authorityViolations.length > 2 ? "CRITICAL" : "HIGH",
        title: "Decisions Made Below Required Authority Level",
        evidence: [
          `${authorityViolations.length} approval(s) made below required authority level:`,
          ...authorityViolations.map(
            (v: any) =>
              `  → ${v.item} approved by ${v.approver} (${v.authority} level) on ${v.date}${v.note ? ` - ${v.note}` : ""}`,
          ),
          `Pattern shows systematic governance bypass`,
          `All approvals should follow Decision Authority Matrix in PID`,
        ],
        pattern: historicPatterns.approvalAuthorityViolation.message,
        recommendation: `GOVERNANCE PROCESS FAILURE: ${authorityViolations.length} approval(s) made without proper authority. Escalate all ${authorityViolations.length} decision(s) to correct authority level for ratification within 3 days. Review Decision Authority Matrix with all stakeholders. ${(historicPatterns.approvalAuthorityViolation.reversalRate * 100).toFixed(0)}% historic reversal rate when wrong authority approves.`,
        icon: Scale,
        dataSource: ["Approval History", "Decision Authority Matrix", "Change Request Register"],
      })
    }

    // 11. COMPLIANCE CHECKS OVERDUE
    const overdueCompliance = project.complianceChecks.filter((check: any) => {
      if (!check.required) return false
      const today = new Date()
      const dueDate = new Date(check.dueDate)
      return check.status !== "Complete" && today > dueDate
    })

    if (overdueCompliance.length > 0) {
      const daysPastDue = overdueCompliance.map((check: any) => {
        const today = new Date()
        const dueDate = new Date(check.dueDate)
        const diffTime = Math.abs(today.getTime() - dueDate.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      })
      const maxDaysPastDue = Math.max(...daysPastDue)

      violations.push({
        type: "COMPLIANCE_FAILURE",
        severity: overdueCompliance.length > 2 || maxDaysPastDue > 14 ? "CRITICAL" : "HIGH",
        title: "Required Compliance Checks Past Due",
        evidence: [
          `${overdueCompliance.length} REQUIRED compliance check(s) overdue:`,
          ...overdueCompliance.map(
            (check: any, index: number) =>
              `  → ${check.name}: Due ${check.dueDate}, Status: ${check.status} (${daysPastDue[index]} days overdue)`,
          ),
          `Most overdue: ${maxDaysPastDue} days`,
          `All marked as REQUIRED for project progression`,
          `Pattern indicates compliance process breakdown`,
        ],
        pattern: historicPatterns.complianceDelay.message,
        recommendation: `IMMEDIATE: Compliance failures create legal/regulatory risk. Assign dedicated resources to complete all ${overdueCompliance.length} overdue compliance checks within 7 days. Each overdue check adds avg ${historicPatterns.complianceDelay.avgDelay} days to project timeline. Consider project pause if critical compliance cannot be achieved.`,
        timelineImpact: `+${historicPatterns.complianceDelay.avgDelay} days avg delay per overdue compliance check`,
        icon: FileWarning,
        dataSource: ["Compliance Register", "Audit Schedule", "Regulatory Requirements"],
      })
    }

    // 12. RESOURCE ALLOCATION GAPS
    const openRisksWithoutOwner = project.risks.filter((r: any) => !r.owner || r.owner === "")
    const pendingDecisionsWithoutOwner = project.decisions.filter(
      (d: any) => d.status === "Under Review" && (!d.decisionMaker || d.decisionMaker === null),
    )

    if (openRisksWithoutOwner.length > 0 || pendingDecisionsWithoutOwner.length > 0) {
      violations.push({
        type: "RESOURCE_ACCOUNTABILITY_GAP",
        severity: openRisksWithoutOwner.length + pendingDecisionsWithoutOwner.length > 5 ? "HIGH" : "MEDIUM",
        title: "Critical Items Without Assigned Ownership",
        evidence: [
          `${openRisksWithoutOwner.length} open risk(s) without assigned owner`,
          ...openRisksWithoutOwner.map((r: any) => `  → ${r.id}: "${r.title}" (${r.severity})`),
          `${pendingDecisionsWithoutOwner.length} pending decision(s) without assigned decision-maker`,
          ...pendingDecisionsWithoutOwner.map((d: any) => `  → ${d.id}: "${d.title}" (${d.latencyDays} days pending)`),
          `Ownership gaps create accountability vacuum`,
        ],
        pattern: "Historic data: Items without clear ownership have 3x longer resolution time and 50% escalation rate",
        recommendation: `IMMEDIATE: Assign owners to all ${openRisksWithoutOwner.length + pendingDecisionsWithoutOwner.length} unowned items in next standup. Update RACI matrix if ownership unclear. No risk/decision should exist without a named, accountable individual.`,
        icon: UserX,
        dataSource: ["Risk Register", "Decision Repository", "RACI Matrix"],
      })
    }

    // 13. CHANGE REQUEST APPROVAL VELOCITY CRISIS
    const scopeChangingCRs = project.changeRequests.filter((cr: any) => cr.scopeChange && cr.status === "Under Review")
    if (scopeChangingCRs.length > 2) {
      const totalScopeChangeValue = scopeChangingCRs.reduce((sum: number, cr: any) => sum + cr.budgetImpact, 0)
      const avgDaysPending = Math.round(
        scopeChangingCRs.reduce((sum: number, cr: any) => sum + cr.daysPending, 0) / scopeChangingCRs.length,
      )

      violations.push({
        type: "SCOPE_CHANGE_BACKLOG",
        severity: "HIGH",
        title: "Multiple Scope-Changing CRs Pending Decision",
        evidence: [
          `${scopeChangingCRs.length} scope-changing change requests pending approval`,
          `Total scope change value: £${totalScopeChangeValue.toLocaleString()}`,
          `Average days pending: ${avgDaysPending} days`,
          `Scope-changing CRs pending:`,
          ...scopeChangingCRs.map(
            (cr: any) =>
              `  → ${cr.id}: "${cr.title}" - £${cr.budgetImpact.toLocaleString()} (${cr.daysPending} days pending)`,
          ),
          `Each represents potential PID baseline deviation`,
          `All require ${scopeChangingCRs[0].requiredAuthority} level approval`,
        ],
        pattern:
          "Historic data: Multiple concurrent scope changes create requirements instability and increase failure risk by 40%",
        recommendation: `URGENT: Scope instability crisis. Prioritize and decide on all ${scopeChangingCRs.length} scope-changing CRs within 5 days. Consider temporary scope freeze until baseline is re-established. May require PID v${Number.parseFloat(project.pidBaseline.version) + 0.1} re-baselining.`,
        financialImpact: `£${totalScopeChangeValue.toLocaleString()} in pending scope changes`,
        icon: GitBranch,
        dataSource: ["Change Request Register", "Scope Baseline", "Approval Workflow"],
      })
    }

    return violations
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-900 border-red-300"
      case "HIGH":
        return "bg-orange-100 text-orange-900 border-orange-300"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-900 border-yellow-300"
      case "LOW":
        return "bg-blue-100 text-blue-900 border-blue-300"
      default:
        return "bg-gray-100 text-gray-900 border-gray-300"
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600 text-white"
      case "HIGH":
        return "bg-orange-600 text-white"
      case "MEDIUM":
        return "bg-yellow-600 text-white"
      case "LOW":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getProjectStatusColor = (project: any) => {
    const violations = detectViolations(project)
    const criticalCount = violations.filter((v) => v.severity === "CRITICAL").length
    const highCount = violations.filter((v) => v.severity === "HIGH").length

    if (criticalCount > 0) return "border-red-500 bg-red-50"
    if (highCount > 0) return "border-orange-500 bg-orange-50"
    if (violations.length > 0) return "border-yellow-500 bg-yellow-50"
    return "border-green-500 bg-green-50"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-500 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-purple-600" />
            Risk Intelligence: Governance Violation Detection System
          </CardTitle>
          <p className="text-sm text-gray-700 mt-2">
            Pattern-matching governance anti-patterns against historic project failures. Detects: Scope creep,
            requirements drift, gate violations, decision bottlenecks, unapproved change cascades, risk mitigation
            failures, burn rate deviations, authority violations, compliance gaps, and resource accountability issues.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-4 text-xs">
            <div className="p-3 bg-white border border-purple-200 rounded">
              <div className="font-semibold text-purple-900">Data Sources</div>
              <div className="text-gray-600 mt-1">
                PID Baselines • Gate Registers • Change Requests • Decision Repository • Risk Logs • Budget Tracking •
                Approval History
              </div>
            </div>
            <div className="p-3 bg-white border border-purple-200 rounded">
              <div className="font-semibold text-purple-900">Detection Methods</div>
              <div className="text-gray-600 mt-1">
                Baseline Comparison • Criteria Validation • Authority Verification • Timeline Analysis • Financial
                Projection
              </div>
            </div>
            <div className="p-3 bg-white border border-purple-200 rounded">
              <div className="font-semibold text-purple-900">Historic Patterns</div>
              <div className="text-gray-600 mt-1">
                {historicPatterns.scopeCreep.threshold * 100}% scope threshold •{" "}
                {historicPatterns.criticalRiskOpen.threshold} day risk limit •{" "}
                {historicPatterns.decisionBacklog.threshold} day decision SLA
              </div>
            </div>
            <div className="p-3 bg-white border border-purple-200 rounded">
              <div className="font-semibold text-purple-900">Active Monitoring</div>
              <div className="text-gray-600 mt-1">
                {projectsData.length} projects • Real-time violation detection • Multi-source data integration
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Project Violations */}
      <div className="space-y-6">
        {projectsData.map((project) => {
          const violations = detectViolations(project)
          const isExpanded = expandedProjects.includes(project.id)
          const criticalCount = violations.filter((v) => v.severity === "CRITICAL").length
          const highCount = violations.filter((v) => v.severity === "HIGH").length
          const mediumCount = violations.filter((v) => v.severity === "MEDIUM").length
          const totalViolations = violations.length

          return (
            <Card key={project.id} className={`border-2 ${getProjectStatusColor(project)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      {totalViolations === 0 ? (
                        <Badge className="bg-green-600 text-white">✓ All Governance Controls Healthy</Badge>
                      ) : (
                        <>
                          {criticalCount > 0 && (
                            <Badge className={getSeverityBadgeColor("CRITICAL")}>
                              {criticalCount} Critical Violation{criticalCount > 1 ? "s" : ""}
                            </Badge>
                          )}
                          {highCount > 0 && (
                            <Badge className={getSeverityBadgeColor("HIGH")}>
                              {highCount} High Violation{highCount > 1 ? "s" : ""}
                            </Badge>
                          )}
                          {mediumCount > 0 && (
                            <Badge className={getSeverityBadgeColor("MEDIUM")}>
                              {mediumCount} Medium Violation{mediumCount > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm mt-3">
                      <div>
                        <p className="text-gray-600 text-xs">PID Baseline</p>
                        <p className="font-semibold">
                          v{project.pidBaseline.version} • £{project.pidBaseline.budget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Budget Status</p>
                        <p className="font-semibold">
                          £{project.currentState.spentBudget.toLocaleString()} / £
                          {project.currentState.totalBudget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Scope Changes</p>
                        <p className="font-semibold">
                          +£
                          {(
                            project.currentState.approvedChangeValue + project.currentState.pendingChangeValue
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Progress vs Burn</p>
                        <p className="font-semibold">
                          {(project.currentState.progressRate * 100).toFixed(0)}% vs{" "}
                          {(project.currentState.burnRate * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Active Gate</p>
                        <p className="font-semibold">
                          {project.stageGates.find((g: any) => g.status === "In Progress")?.name || "None"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleProject(project.id)} className="ml-4">
                    {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </Button>
                </div>
              </CardHeader>

              <Collapsible open={isExpanded} onOpenChange={() => toggleProject(project.id)}>
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    {totalViolations === 0 ? (
                      <div className="p-8 bg-white border-2 border-green-300 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 text-green-700 mb-3">
                          <Shield className="h-8 w-8" />
                          <span className="font-bold text-2xl">All Governance Controls Healthy</span>
                        </div>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p>
                            ✓ Scope within PID baseline (+
                            {(
                              ((project.currentState.approvedChangeValue + project.currentState.pendingChangeValue) /
                                project.pidBaseline.budget) *
                              100
                            ).toFixed(0)}
                            %)
                          </p>
                          <p>✓ Objectives aligned with PID v{project.pidBaseline.version}</p>
                          <p>✓ Gate entry/exit criteria validated</p>
                          <p>✓ Decision velocity within acceptable range</p>
                          <p>✓ Budget burn rate aligned with progress</p>
                          <p>✓ Risk mitigation plans being executed</p>
                          <p>✓ Compliance checks on schedule</p>
                          <p>✓ Proper approval authorities observed</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {violations.map((violation, index) => {
                          const IconComponent = violation.icon
                          return (
                            <div
                              key={index}
                              className={`p-5 border-l-4 ${getSeverityColor(violation.severity)} border rounded-lg`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <IconComponent className="h-6 w-6 flex-shrink-0" />
                                  <h4 className="font-bold text-lg">{violation.title}</h4>
                                </div>
                                <Badge className={getSeverityBadgeColor(violation.severity)}>
                                  {violation.severity}
                                </Badge>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-bold uppercase text-gray-600 mb-2">EVIDENCE:</p>
                                  <ul className="text-sm space-y-1.5">
                                    {violation.evidence.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-gray-500 mt-0.5 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="pt-3 border-t border-gray-300">
                                  <p className="text-xs font-bold uppercase text-gray-600 mb-2">HISTORIC PATTERN:</p>
                                  <p className="text-sm italic bg-white/50 p-2 rounded">{violation.pattern}</p>
                                </div>

                                <div className="pt-3 border-t border-gray-300">
                                  <p className="text-xs font-bold uppercase text-gray-600 mb-2">RECOMMENDED ACTION:</p>
                                  <p className="text-sm font-semibold bg-white/50 p-3 rounded border-l-2 border-gray-400">
                                    {violation.recommendation}
                                  </p>
                                </div>

                                {(violation.financialImpact || violation.timelineImpact) && (
                                  <div className="pt-3 border-t border-gray-300 grid grid-cols-2 gap-4">
                                    {violation.financialImpact && (
                                      <div>
                                        <p className="text-xs font-bold uppercase text-gray-600 mb-1">
                                          FINANCIAL IMPACT:
                                        </p>
                                        <p className="text-sm font-bold text-red-700">{violation.financialImpact}</p>
                                      </div>
                                    )}
                                    {violation.timelineImpact && (
                                      <div>
                                        <p className="text-xs font-bold uppercase text-gray-600 mb-1">
                                          TIMELINE IMPACT:
                                        </p>
                                        <p className="text-sm font-bold text-orange-700">{violation.timelineImpact}</p>
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="pt-3 border-t border-gray-300">
                                  <p className="text-xs font-bold uppercase text-gray-600 mb-1">DATA SOURCES:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {violation.dataSource.map((source, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {source}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    )}

                    {/* PID Baseline Reference */}
                    <div className="p-4 bg-white border-2 border-gray-300 rounded-lg mt-6">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <FileX className="h-4 w-4 text-gray-600" />
                        PID Baseline Reference (v{project.pidBaseline.version})
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Approved:</span>{" "}
                          <span className="font-medium">
                            {project.pidBaseline.approvedDate} by {project.pidBaseline.approvedBy}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Baseline Budget:</span>{" "}
                          <span className="font-medium">£{project.pidBaseline.budget.toLocaleString()}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Original Objectives:</span>
                          <ul className="mt-1 space-y-1">
                            {project.pidBaseline.objectives.map((obj: string, i: number) => (
                              <li key={i} className="text-xs">
                                • {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Original Scope:</span>
                          <p className="text-xs mt-1">{project.pidBaseline.scope}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
