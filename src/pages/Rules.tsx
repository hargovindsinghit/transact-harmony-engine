
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Rules = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [rules, setRules] = useState([
    {
      id: 'RULE001',
      name: 'Credit Card Amount Match',
      description: 'Match transactions by exact amount and date within 3 days',
      conditions: 'Amount = Exact AND Date ± 3 days',
      priority: 1,
      isActive: true,
      matchCount: 1542,
      type: 'automatic'
    },
    {
      id: 'RULE002',
      name: 'Reference Number Match',
      description: 'Match by reference number with fuzzy matching',
      conditions: 'Reference Number = Fuzzy Match (95% confidence)',
      priority: 2,
      isActive: true,
      matchCount: 832,
      type: 'automatic'
    },
    {
      id: 'RULE003',
      name: 'Manual Review Required',
      description: 'Flag for manual review when amount > $10,000',
      conditions: 'Amount > $10,000',
      priority: 3,
      isActive: true,
      matchCount: 23,
      type: 'manual'
    },
    {
      id: 'RULE004',
      name: 'Merchant Settlement',
      description: 'Auto-match merchant settlement batches',
      conditions: 'Source = Settlement AND Description contains "BATCH"',
      priority: 4,
      isActive: false,
      matchCount: 156,
      type: 'automatic'
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    conditions: '',
    priority: 5,
    type: 'automatic'
  });

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const rule = {
      id: `RULE${String(rules.length + 1).padStart(3, '0')}`,
      ...newRule,
      isActive: true,
      matchCount: 0
    };

    setRules([...rules, rule]);
    setNewRule({ name: '', description: '', conditions: '', priority: 5, type: 'automatic' });
    setIsCreating(false);

    toast({
      title: "Rule Created",
      description: `Matching rule "${rule.name}" has been created successfully.`,
    });
  };

  const toggleRuleStatus = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    toast({
      title: "Rule Updated",
      description: `Rule "${rule?.name}" has been ${rule?.isActive ? 'disabled' : 'enabled'}.`,
    });
  };

  const deleteRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    setRules(rules.filter(rule => rule.id !== id));
    
    toast({
      title: "Rule Deleted",
      description: `Rule "${rule?.name}" has been deleted.`,
    });
  };

  const getPriorityBadge = (priority: number) => {
    if (priority <= 2) return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
    if (priority <= 4) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return type === 'automatic' 
      ? <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Automatic</Badge>
      : <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Manual</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">Matching Rules</h1>
        <p className="text-slate-600">Configure automated reconciliation rules and priorities</p>
      </div>

      <div className="p-6">
        {/* Create Rule Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setIsCreating(true)} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isCreating}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Rule
          </Button>
        </div>

        {/* Create Rule Form */}
        {isCreating && (
          <Card className="mb-6 border-blue-200">
            <CardHeader>
              <CardTitle>Create New Matching Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rule Name *</label>
                  <Input
                    placeholder="Enter rule name"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rule Type</label>
                  <Select value={newRule.type} onValueChange={(value) => setNewRule({ ...newRule, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Input
                  placeholder="Describe what this rule does"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Matching Conditions</label>
                <Input
                  placeholder="e.g., Amount = Exact AND Date ± 2 days"
                  value={newRule.conditions}
                  onChange={(e) => setNewRule({ ...newRule, conditions: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority (1-10)</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newRule.priority}
                  onChange={(e) => setNewRule({ ...newRule, priority: parseInt(e.target.value) || 5 })}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleCreateRule} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Rule
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rules List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Matching Rules</CardTitle>
            <p className="text-sm text-slate-600">
              {rules.filter(r => r.isActive).length} active rules, {rules.filter(r => !r.isActive).length} inactive
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rules.sort((a, b) => a.priority - b.priority).map((rule) => (
                <div key={rule.id} className={`p-4 border rounded-lg ${rule.isActive ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-slate-900">{rule.name}</h3>
                        {getPriorityBadge(rule.priority)}
                        {getTypeBadge(rule.type)}
                        <span className="text-xs text-slate-500">#{rule.priority}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{rule.description}</p>
                      {rule.conditions && (
                        <p className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                          {rule.conditions}
                        </p>
                      )}
                      <div className="mt-2 text-xs text-slate-500">
                        Matched {rule.matchCount} transactions
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => toggleRuleStatus(rule.id)}
                        />
                        <span className="text-xs text-slate-600">
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rules;
