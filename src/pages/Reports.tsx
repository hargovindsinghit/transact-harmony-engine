
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Download, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reportType, setReportType] = useState('all');

  const reports = [
    {
      id: 'RPT001',
      name: 'Daily Reconciliation Summary',
      type: 'reconciliation',
      period: 'Daily',
      lastGenerated: '2024-06-27 09:00:00',
      status: 'completed',
      size: '2.1 MB',
      records: 15420
    },
    {
      id: 'RPT002',
      name: 'Exception Report',
      type: 'exceptions',
      period: 'Real-time',
      lastGenerated: '2024-06-27 10:30:00',
      status: 'completed',
      size: '156 KB',
      records: 52
    },
    {
      id: 'RPT003',
      name: 'Monthly Transaction Volume',
      type: 'analytics',
      period: 'Monthly',
      lastGenerated: '2024-06-01 08:00:00',
      status: 'completed',
      size: '8.7 MB',
      records: 245000
    },
    {
      id: 'RPT004',
      name: 'Audit Trail Report',
      type: 'audit',
      period: 'Weekly',
      lastGenerated: '2024-06-26 18:00:00',
      status: 'completed',
      size: '1.8 MB',
      records: 3420
    },
    {
      id: 'RPT005',
      name: 'Compliance Summary',
      type: 'compliance',
      period: 'Quarterly',
      lastGenerated: '2024-06-27 11:15:00',
      status: 'generating',
      size: 'N/A',
      records: 0
    },
    {
      id: 'RPT006',
      name: 'Performance Metrics',
      type: 'analytics',
      period: 'Daily',
      lastGenerated: '2024-06-26 23:59:00',
      status: 'failed',
      size: 'N/A',
      records: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Generating</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      reconciliation: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      exceptions: 'bg-red-100 text-red-800 hover:bg-red-100',
      analytics: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      audit: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
      compliance: 'bg-green-100 text-green-800 hover:bg-green-100'
    };

    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleDownload = (reportId: string, reportName: string) => {
    toast({
      title: "Download Started",
      description: `Report "${reportName}" download has been initiated.`,
    });
  };

  const handleView = (reportId: string, reportName: string) => {
    toast({
      title: "Opening Report",
      description: `Report "${reportName}" is opening in a new window.`,
    });
  };

  const handleGenerate = () => {
    toast({
      title: "Report Generation",
      description: "New report generation has been started. You'll be notified when complete.",
    });
  };

  const filteredReports = reportType === 'all' 
    ? reports 
    : reports.filter(report => report.type === reportType);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600">Generate and manage reconciliation reports</p>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{reports.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {reports.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">
                {reports.filter(r => r.status === 'generating').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {reports.filter(r => r.status === 'failed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <Select defaultValue="reconciliation">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reconciliation">Reconciliation Summary</SelectItem>
                    <SelectItem value="exceptions">Exception Report</SelectItem>
                    <SelectItem value="analytics">Analytics Report</SelectItem>
                    <SelectItem value="audit">Audit Trail</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <Select defaultValue="xlsx">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="reconciliation">Reconciliation</SelectItem>
                  <SelectItem value="exceptions">Exceptions</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <p className="text-sm text-slate-600">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Report Name</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Last Generated</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Records</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">{report.name}</div>
                        <div className="text-sm text-slate-600">{report.size}</div>
                      </td>
                      <td className="py-3 px-4">{getTypeBadge(report.type)}</td>
                      <td className="py-3 px-4 text-sm">{report.period}</td>
                      <td className="py-3 px-4 text-sm">{report.lastGenerated}</td>
                      <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                      <td className="py-3 px-4 text-sm">
                        {report.records > 0 ? report.records.toLocaleString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {report.status === 'completed' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleView(report.id, report.name)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDownload(report.id, report.name)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
