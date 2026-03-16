import React, { useMemo } from 'react';
import { Users, TrendingUp, BarChart3, Clock, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Lead {
  id: string;
  name: string | null;
  status?: string;
  created_at: string;
}

interface DashboardProps {
  leads: Lead[];
}

export default function DashboardOverview({ leads }: DashboardProps) {
  
  const metrics = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(l => l.status === 'Convertido').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';
    
    // Mocking MRR & LTV based on conversions for SaaS effect
    const avgTicket = 197; // Anual plan monthly equiv cost
    const mrr = converted * avgTicket;
    
    // Simulate chart data from leads over time (mocked for past 6 months)
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    const chartData = monthNames.map((month, index) => {
      // Create an upward trend based on real conversions
      const baseVal = 1200 + (index * 400); 
      return {
        name: month,
        MRR: baseVal + (converted * 50) + Math.random() * 500,
        Leads: Math.floor(baseVal / 100) + Math.floor(total / 3)
      };
    });

    return { total, converted, conversionRate, mrr, chartData };
  }, [leads]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* SaaS KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* MRR Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500/10 p-2.5 rounded-lg text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 font-medium text-sm">Receita Recorrente (MRR)</h3>
          </div>
          <p className="text-3xl font-display font-bold text-slate-900 mb-2">
            {formatCurrency(metrics.mrr)}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5% em relação ao mês anterior</span>
          </div>
        </div>

        {/* Conversions Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 font-medium text-sm">Taxa de Conversão</h3>
          </div>
          <p className="text-3xl font-display font-bold text-slate-900 mb-2">
            {metrics.conversionRate}%
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+2.1% no período</span>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 font-medium text-sm">Total de Leads Base</h3>
          </div>
          <p className="text-3xl font-display font-bold text-slate-900 mb-2">
            {metrics.total}
          </p>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
            <span>Volume registrado na plataforma</span>
          </div>
        </div>

        {/* Churn Mock */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500/10 p-2.5 rounded-lg text-rose-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 font-medium text-sm">Taxa de Churn</h3>
          </div>
          <p className="text-3xl font-display font-bold text-slate-900 mb-2">
            1.2%
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>-0.4% variação mensal</span>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Evolução do MRR</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `R$${(value/1000).toFixed(1)}k`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [formatCurrency(value), 'MRR']}
              />
              <Area 
                type="monotone" 
                dataKey="MRR" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMrr)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
