
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  Shield,
  FileText,
  Users
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Rules', href: '/rules', icon: Settings },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <nav className="bg-white border-r border-slate-200 w-64 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Frontier</div>
            <div className="text-xs text-slate-600">Reconciliation</div>
          </div>
        </div>

        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-slate-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-900">Admin User</div>
            <div className="text-xs text-slate-600">admin@company.com</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
