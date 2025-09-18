"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter, FileText, BarChart3, PieChart, TrendingUp, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const historicReports = [
  // Digital Transformation Project Reports
  {
    id: "RPT-DT-001",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Digital Transformation",
    createdDate: "2024-01-15",
    format: "PDF",
    period: "January 2024",
    content:
      "Analysis of 12 change requests submitted in January 2024. Major changes include Multi-Region Deployment (£120,000), Enhanced Security Features (£45,000), and API Integration Updates (£25,000). Total change request value: £190,000. 8 approved, 3 pending, 1 rejected.",
  },
  {
    id: "RPT-DT-002",
    title: "Financial Summary",
    type: "Financials",
    project: "Digital Transformation",
    createdDate: "2024-01-14",
    format: "Excel",
    period: "January 2024",
    content:
      "Budget: £850,000 | Spent: £595,000 (70%) | Remaining: £255,000 | Progress: 30% | Variance: 40% over-spend. Key expenses: Development Team (£320,000), Infrastructure (£180,000), Third-party licenses (£95,000).",
  },
  {
    id: "RPT-DT-003",
    title: "Governance Milestones Report",
    type: "Governance Milestones",
    project: "Digital Transformation",
    createdDate: "2024-01-13",
    format: "PDF",
    period: "January 2024",
    content:
      "Stage Gate 2 completed (delayed by 15 days). Next milestone: Technical Architecture Review (due Feb 1). Risk: Data Migration Phase 1 delayed by 21 days due to pending Cloud Provider Selection decision.",
  },
  {
    id: "RPT-DT-004",
    title: "Project Status Update",
    type: "Status",
    project: "Digital Transformation",
    createdDate: "2024-01-12",
    format: "PDF",
    period: "Week 2, 2024",
    content:
      "Overall Status: AMBER. Progress: 30% complete. Key achievements: API framework established, security protocols defined. Blockers: Cloud provider selection pending (12 days), resource allocation conflicts with Mobile App project.",
  },
  {
    id: "RPT-DT-005",
    title: "Risk Assessment",
    type: "Risks",
    project: "Digital Transformation",
    createdDate: "2024-01-11",
    format: "PDF",
    period: "January 2024",
    content:
      "7 active risks identified. HIGH: Budget overrun risk (85% probability), Technical complexity underestimated. MEDIUM: Resource availability, Third-party integration delays. LOW: Stakeholder engagement, Change management resistance.",
  },
  {
    id: "RPT-DT-006",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Digital Transformation",
    createdDate: "2023-12-15",
    format: "PDF",
    period: "December 2023",
    content:
      "Analysis of 8 change requests in December 2023. Notable changes: Database optimization (£30,000), UI/UX enhancements (£55,000). Total value: £125,000. 6 approved, 2 pending review.",
  },
  {
    id: "RPT-DT-007",
    title: "Financial Summary",
    type: "Financials",
    project: "Digital Transformation",
    createdDate: "2023-12-14",
    format: "Excel",
    period: "December 2023",
    content:
      "Budget: £850,000 | Spent: £425,000 (50%) | Progress: 25% | Variance: 25% over-spend. Major expenses: Development (£240,000), Infrastructure setup (£120,000), Consulting (£65,000).",
  },
  {
    id: "RPT-DT-008",
    title: "Governance Milestones Report",
    type: "Governance Milestones",
    project: "Digital Transformation",
    createdDate: "2023-12-13",
    format: "PDF",
    period: "December 2023",
    content:
      "Stage Gate 1 completed successfully. Requirements gathering phase finalized. Next milestone: Technical design review scheduled for January 15, 2024.",
  },
  // Cloud Migration Project Reports
  {
    id: "RPT-CM-001",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Cloud Migration",
    createdDate: "2024-01-10",
    format: "PDF",
    period: "January 2024",
    content:
      "5 change requests processed. Key changes: Additional storage capacity (£15,000), Enhanced monitoring tools (£8,000). Total value: £35,000. All approved and implemented.",
  },
  {
    id: "RPT-CM-002",
    title: "Financial Summary",
    type: "Financials",
    project: "Cloud Migration",
    createdDate: "2024-01-09",
    format: "Excel",
    period: "January 2024",
    content:
      "Budget: £450,000 | Spent: £270,000 (60%) | Progress: 55% | Variance: 5% over-spend. Expenses: Cloud infrastructure (£180,000), Migration tools (£60,000), Training (£30,000).",
  },
  {
    id: "RPT-CM-003",
    title: "Governance Milestones Report",
    type: "Governance Milestones",
    project: "Cloud Migration",
    createdDate: "2024-01-08",
    format: "PDF",
    period: "January 2024",
    content:
      "Migration Phase 2 completed on schedule. 75% of applications successfully migrated. Next milestone: Performance testing and optimization (due Jan 25).",
  },
  {
    id: "RPT-CM-004",
    title: "Project Status Update",
    type: "Status",
    project: "Cloud Migration",
    createdDate: "2024-01-07",
    format: "PDF",
    period: "Week 1, 2024",
    content:
      "Overall Status: GREEN. Progress: 55% complete. Key achievements: Core applications migrated, performance benchmarks met. No major blockers identified.",
  },
  {
    id: "RPT-CM-005",
    title: "Risk Assessment",
    type: "Risks",
    project: "Cloud Migration",
    createdDate: "2024-01-06",
    format: "PDF",
    period: "January 2024",
    content:
      "3 active risks. MEDIUM: Data transfer bandwidth limitations, Legacy system compatibility. LOW: Staff training completion. Overall risk profile: LOW.",
  },
  {
    id: "RPT-CM-006",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Cloud Migration",
    createdDate: "2023-12-10",
    format: "PDF",
    period: "December 2023",
    content:
      "3 change requests in December. Changes: Security compliance updates (£12,000), Backup strategy enhancement (£18,000). Total: £30,000. All approved.",
  },
  {
    id: "RPT-CM-007",
    title: "Financial Summary",
    type: "Financials",
    project: "Cloud Migration",
    createdDate: "2023-12-09",
    format: "Excel",
    period: "December 2023",
    content:
      "Budget: £450,000 | Spent: £180,000 (40%) | Progress: 35% | Variance: 5% over-spend. Focus on infrastructure setup and initial migrations.",
  },
  // Mobile App Project Reports
  {
    id: "RPT-MA-001",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Mobile App",
    createdDate: "2024-01-05",
    format: "PDF",
    period: "January 2024",
    content:
      "4 change requests submitted. Major change: iOS compatibility updates (£25,000), Push notification enhancements (£10,000). Total: £40,000. 3 approved, 1 under review.",
  },
  {
    id: "RPT-MA-002",
    title: "Financial Summary",
    type: "Financials",
    project: "Mobile App",
    createdDate: "2024-01-04",
    format: "Excel",
    period: "January 2024",
    content:
      "Budget: £320,000 | Spent: £192,000 (60%) | Progress: 45% | Variance: 15% over-spend. Key expenses: Development team (£120,000), Testing tools (£42,000), App store fees (£30,000).",
  },
  {
    id: "RPT-MA-003",
    title: "Governance Milestones Report",
    type: "Governance Milestones",
    project: "Mobile App",
    createdDate: "2024-01-03",
    format: "PDF",
    period: "January 2024",
    content:
      "Beta testing phase completed. User feedback incorporated. Next milestone: App store submission (due Jan 20). Risk: iOS review process may cause 2-week delay.",
  },
  {
    id: "RPT-MA-004",
    title: "Project Status Update",
    type: "Status",
    project: "Mobile App",
    createdDate: "2024-01-02",
    format: "PDF",
    period: "Week 1, 2024",
    content:
      "Overall Status: AMBER. Progress: 45% complete. Achievements: Core features implemented, beta testing completed. Concern: Resource conflicts with Digital Transformation project.",
  },
  {
    id: "RPT-MA-005",
    title: "Risk Assessment",
    type: "Risks",
    project: "Mobile App",
    createdDate: "2024-01-01",
    format: "PDF",
    period: "January 2024",
    content:
      "5 active risks. HIGH: App store approval delays. MEDIUM: Cross-platform compatibility issues, Resource allocation conflicts. LOW: User adoption, Performance optimization.",
  },
  {
    id: "RPT-MA-006",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Mobile App",
    createdDate: "2023-12-05",
    format: "PDF",
    period: "December 2023",
    content:
      "6 change requests processed. Notable: Enhanced security features (£15,000), Offline functionality (£20,000). Total: £45,000. 5 approved, 1 deferred.",
  },
  // Website Redesign Project Reports
  {
    id: "RPT-WR-001",
    title: "Change Request Analysis",
    type: "Change Requests",
    project: "Website Redesign",
    createdDate: "2023-12-30",
    format: "PDF",
    period: "December 2023",
    content:
      "7 change requests in December. Major changes: Accessibility compliance updates (£18,000), SEO optimization (£12,000). Total: £42,000. 6 approved, 1 pending.",
  },
  {
    id: "RPT-WR-002",
    title: "Financial Summary",
    type: "Financials",
    project: "Website Redesign",
    createdDate: "2023-12-29",
    format: "Excel",
    period: "December 2023",
    content:
      "Budget: £180,000 | Spent: £162,000 (90%) | Progress: 85% | Variance: 5% over-spend. Near completion with final testing and deployment phases remaining.",
  },
  {
    id: "RPT-WR-003",
    title: "Governance Milestones Report",
    type: "Governance Milestones",
    project: "Website Redesign",
    createdDate: "2023-12-28",
    format: "PDF",
    period: "December 2023",
    content:
      "User acceptance testing completed successfully. Final milestone: Production deployment scheduled for January 5, 2024. All quality gates passed.",
  },
  {
    id: "RPT-WR-004",
    title: "Project Status Update",
    type: "Status",
    project: "Website Redesign",
    createdDate: "2023-12-27",
    format: "PDF",
    period: "Week 52, 2023",
    content:
      "Overall Status: GREEN. Progress: 85% complete. Final testing phase in progress. Ready for production deployment. No blockers identified.",
  },
  {
    id: "RPT-WR-005",
    title: "Risk Assessment",
    type: "Risks",
    project: "Website Redesign",
    createdDate: "2023-12-26",
    format: "PDF",
    period: "December 2023",
    content:
      "2 active risks. LOW: Browser compatibility edge cases, Content migration validation. Overall risk profile very low as project nears completion.",
  },
]

const reportTypes = ["All Types", "Change Requests", "Financials", "Governance Milestones", "Status", "Risks"]

const reportFormats = ["All Formats", "PDF", "Excel", "PowerPoint"]

const projects = ["All Projects", "Digital Transformation", "Cloud Migration", "Mobile App", "Website Redesign"]

export function HistoricReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedFormat, setSelectedFormat] = useState("All Formats")
  const [selectedProject, setSelectedProject] = useState("All Projects")
  const [selectedReport, setSelectedReport] = useState<(typeof historicReports)[0] | null>(null)

  const filteredReports = historicReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All Types" || report.type === selectedType
    const matchesFormat = selectedFormat === "All Formats" || report.format === selectedFormat
    const matchesProject = selectedProject === "All Projects" || report.project === selectedProject

    return matchesSearch && matchesType && matchesFormat && matchesProject
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Change Requests":
        return <FileText className="h-4 w-4" />
      case "Financials":
        return <TrendingUp className="h-4 w-4" />
      case "Governance Milestones":
        return <BarChart3 className="h-4 w-4" />
      case "Risks":
        return <PieChart className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case "PDF":
        return "bg-red-100 text-red-800"
      case "Excel":
        return "bg-green-100 text-green-800"
      case "PowerPoint":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Historic Reports</h2>
          <p className="text-muted-foreground">Access and manage previously generated reports</p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {reportFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedProject("All Projects")
                setSelectedType("All Types")
                setSelectedFormat("All Formats")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Report Archive</CardTitle>
          <CardDescription>
            Showing {filteredReports.length} of {historicReports.length} reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">{report.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{report.project}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <span className="text-sm">{report.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.createdDate}</TableCell>
                    <TableCell className="text-sm">{report.period}</TableCell>
                    <TableCell>
                      <Badge className={getFormatColor(report.format)}>{report.format}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{report.title}</DialogTitle>
                              <DialogDescription>
                                {report.project} • {report.type} • {report.period}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm leading-relaxed">{report.content}</p>
                              </div>
                              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                  Report ID: {report.id} • Created: {report.createdDate}
                                </div>
                                <Button size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download {report.format}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
