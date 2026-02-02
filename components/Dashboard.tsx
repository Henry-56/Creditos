import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Dashboard: React.FC = () => {
  // Mock data for visualization
  const accuracyData = [
    { name: 'Ene', tradicional: 65, ia: 78 },
    { name: 'Feb', tradicional: 68, ia: 82 },
    { name: 'Mar', tradicional: 64, ia: 85 },
    { name: 'Abr', tradicional: 70, ia: 88 },
    { name: 'May', tradicional: 69, ia: 92 },
  ];

  const riskDistribution = [
    { name: 'Bajo', count: 45, fill: '#10b981' },
    { name: 'Medio', count: 30, fill: '#f59e0b' },
    { name: 'Alto', count: 15, fill: '#f97316' },
    { name: 'Crítico', count: 10, fill: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Solicitudes Procesadas (Mes)</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">1,248</h3>
          <span className="text-xs text-emerald-600 font-semibold flex items-center mt-1">
            +12% vs mes anterior
          </span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Precisión Predictiva (IA)</p>
          <h3 className="text-3xl font-bold text-indigo-600 mt-2">92.4%</h3>
          <span className="text-xs text-slate-400 mt-1">
            Validado con historial de pagos real
          </span>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Tiempo Promedio Evaluación</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">1.2s</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1">
            -98% vs proceso manual
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Evolution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Precisión: Tradicional vs IA</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="tradicional" stroke="#94a3b8" strokeWidth={2} name="Método Tradicional" />
              <Line type="monotone" dataKey="ia" stroke="#4f46e5" strokeWidth={3} name="Modelo IA" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Risk Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
           <h3 className="text-lg font-semibold text-slate-800 mb-6">Distribución de Riesgo (Últimos 100)</h3>
           <ResponsiveContainer width="100%" height="85%">
            <BarChart data={riskDistribution}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
               <XAxis dataKey="name" stroke="#64748b" />
               <YAxis stroke="#64748b" />
               <Tooltip 
                 cursor={{fill: 'transparent'}}
                 contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
               />
               <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};