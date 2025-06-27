
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Search, Filter, Download, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Transactions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      date: '2024-06-27',
      amount: 1250.00,
      description: 'Credit Card Payment - Visa ****4532',
      source: 'Credit Card',
      status: 'matched',
      reference: 'REF123456'
    },
    {
      id: 'TXN002',
      date: '2024-06-27',
      amount: 750.50,
      description: 'ACH Transfer - ABC Corp',
      source: 'Bank Transfer',
      status: 'pending',
      reference: 'ACH789012'
    },
    {
      id: 'TXN003',
      date: '2024-06-26',
      amount: 2100.00,
      description: 'Wire Transfer - XYZ Ltd',
      source: 'Wire',
      status: 'exception',
      reference: 'WIRE345678'
    },
    {
      id: 'TXN004',
      date: '2024-06-26',
      amount: 450.75,
      description: 'Online Payment - PayPal',
      source: 'Online Payment',
      status: 'matched',
      reference: 'PP901234'
    },
    {
      id: 'TXN005',
      date: '2024-06-25',
      amount: 3200.00,
      description: 'Merchant Settlement',
      source: 'Settlement',
      status: 'pending',
      reference: 'SET567890'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Matched</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'exception':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Exception</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "Transaction file processing initiated. You'll be notified when complete.",
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">Transaction Management</h1>
        <p className="text-slate-600">Import, process, and reconcile financial transactions</p>
      </div>

      <div className="p-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Import Transactions
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions, references, descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="matched">Matched</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="exception">Exception</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <p className="text-sm text-slate-600">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Transaction ID</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Source</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                      <td className="py-3 px-4 text-sm">{transaction.date}</td>
                      <td className="py-3 px-4 text-sm">{transaction.description}</td>
                      <td className="py-3 px-4 text-sm">{transaction.source}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">
                        ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {transaction.status === 'exception' && (
                            <Button size="sm" variant="ghost" className="text-red-600">
                              <AlertCircle className="h-4 w-4" />
                            </Button>
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

export default Transactions;
