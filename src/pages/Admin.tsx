
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, Settings, Database, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-06-27 09:15:00',
      permissions: ['Full Access']
    },
    {
      id: 'USR002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Reconciliation Manager',
      status: 'Active',
      lastLogin: '2024-06-27 08:30:00',
      permissions: ['View Reports', 'Manage Rules', 'Process Transactions']
    },
    {
      id: 'USR003',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '2024-06-26 16:45:00',
      permissions: ['View Reports', 'Export Data']
    },
    {
      id: 'USR004',
      name: 'Lisa Wong',
      email: 'lisa.wong@company.com',
      role: 'Auditor',
      status: 'Inactive',
      lastLogin: '2024-06-25 11:20:00',
      permissions: ['View Reports', 'Audit Trail']
    }
  ]);

  const systemSettings = [
    { key: 'Auto-reconciliation', value: 'Enabled', category: 'Processing' },
    { key: 'Match tolerance', value: '±$0.05', category: 'Processing' },
    { key: 'Batch size', value: '10,000 transactions', category: 'Performance' },
    { key: 'Retention period', value: '7 years', category: 'Compliance' },
    { key: 'Encryption level', value: 'AES-256', category: 'Security' },
    { key: 'Session timeout', value: '30 minutes', category: 'Security' }
  ];

  const auditLogs = [
    {
      timestamp: '2024-06-27 10:30:15',
      user: 'john.smith@company.com',
      action: 'Created matching rule',
      details: 'Rule: Credit Card Amount Match',
      severity: 'Info'
    },
    {
      timestamp: '2024-06-27 09:45:22',
      user: 'sarah.johnson@company.com',
      action: 'Processed transaction batch',
      details: 'Batch ID: BATCH_20240627_001 (2,450 transactions)',
      severity: 'Info'
    },
    {
      timestamp: '2024-06-27 09:12:03',
      user: 'system',
      action: 'Authentication failure',
      details: 'Failed login attempt from IP: 192.168.1.100',
      severity: 'Warning'
    },
    {
      timestamp: '2024-06-26 18:30:45',
      user: 'mike.davis@company.com',
      action: 'Exported reconciliation report',
      details: 'Report: Monthly_Reconciliation_June2024.xlsx',
      severity: 'Info'
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Admin</Badge>;
      case 'Reconciliation Manager':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Manager</Badge>;
      case 'Analyst':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Analyst</Badge>;
      case 'Auditor':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Auditor</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>;
      case 'Error':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Info</Badge>;
    }
  };

  const handleCreateUser = () => {
    toast({
      title: "User Management",
      description: "New user creation form would open in a production system.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
        <p className="text-slate-600">Manage users, settings, and system configuration</p>
      </div>

      <div className="p-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{users.length}</div>
              <p className="text-xs text-blue-600">{users.filter(u => u.status === 'Active').length} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">System Status</CardTitle>
              <Database className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">Healthy</div>
              <p className="text-xs text-green-600">99.9% uptime</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Security</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">Secure</div>
              <p className="text-xs text-purple-600">No threats detected</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">Performance</CardTitle>
              <Settings className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">Optimal</div>
              <p className="text-xs text-amber-600">2.3s avg response</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">User Management</h3>
              <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left py-3 px-4 font-medium text-slate-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Last Login</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-slate-900">{user.name}</div>
                              <div className="text-sm text-slate-600">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                          <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{user.lastLogin}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-lg font-medium">System Configuration</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemSettings.map((setting, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                      <div>
                        <div className="font-medium text-slate-900">{setting.key}</div>
                        <div className="text-sm text-slate-600">{setting.category}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{setting.value}</span>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <h3 className="text-lg font-medium">Audit Trail</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-4 py-3 border-b border-slate-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-medium text-slate-900">{log.action}</span>
                          {getSeverityBadge(log.severity)}
                        </div>
                        <div className="text-sm text-slate-600 mb-1">{log.details}</div>
                        <div className="text-xs text-slate-500">
                          {log.user} • {log.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <h3 className="text-lg font-medium">Security Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Two-Factor Authentication</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Password Policy</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Strong</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Session Management</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>PCI DSS</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>SOX Controls</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Data Encryption</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">AES-256</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
