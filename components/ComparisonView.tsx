import React from 'react';
import { ApplicationRecord, RiskLevel, AssessmentResult } from '../types';
import { CheckCircle, AlertTriangle, XCircle, BrainCircuit, FileSpreadsheet, ArrowRight, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ComparisonViewProps {
  record: ApplicationRecord;
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const colors = {
    [RiskLevel.LOW]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    [RiskLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [RiskLevel.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [RiskLevel.CRITICAL]: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${colors[level]}`}>
      {level.toUpperCase()}
    </span>
  );
};

const AssessmentCard: React.FC<{ 
  title: string; 
  result: AssessmentResult | null; 
  icon: React.ElementType; 
  isAi?: boolean 
}> = ({ title, result, icon: Icon, isAi = false }) => {
  if (!result) return <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 h-full flex items-center justify-center text-slate-400">Sin datos</div>;

  const data = [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ];
  
  // Color based on score (High score = Good = Green)
  const scoreColor = result.score >= 80 ? '#10b981' : result.score >= 60 ? '#f59e0b' : '#f43f5e';

  return (
    <div className={`rounded-xl shadow-lg border overflow-hidden flex flex-col h-full ${isAi ? 'border-indigo-200 ring-2 ring-indigo-50 shadow-indigo-100' : 'border-slate-200 bg-white'}`}>
      <div className={`p-4 border-b flex items-center justify-between ${isAi ? 'bg-gradient-to-r from-indigo-50 to-blue-50' : 'bg-slate-50'}`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isAi ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'}`}>
            <Icon size={20} />
          </div>
          <h3 className={`font-semibold ${isAi ? 'text-indigo-900' : 'text-slate-700'}`}>{title}</h3>
        </div>
        {isAi && <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">IA ENHANCED</span>}
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        {/* Score Visual */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 relative flex-shrink-0">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={scoreColor} />
                  <Cell fill="#f1f5f9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xl font-bold text-slate-800">{result.score}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 mb-1">Nivel de Riesgo</p>
            <RiskBadge level={result.riskLevel} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-500 uppercase">Tasa Sugerida</p>
            <p className="text-lg font-bold text-slate-800">{result.recommendedInterestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase">Aprobación Máx</p>
            <p className="text-lg font-bold text-slate-800">${result.maxApprovedAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Reasoning */}
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase mb-2">Análisis</p>
          <ul className="space-y-2">
            {result.reasoning.map((reason, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
                <Clock size={12} />
                {result.processingTimeMs.toFixed(0)} ms
            </span>
            <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({ record }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Evaluación de Riesgo</h2>
           <p className="text-slate-500">Comparativa: Motor de Reglas vs Inteligencia Artificial</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
           <div className="text-right border-r border-slate-200 pr-4 mr-2">
              <p className="text-xs text-slate-500">Solicitante</p>
              <p className="font-semibold text-slate-800">{record.applicant.fullName}</p>
           </div>
           <div>
              <p className="text-xs text-slate-500">Monto</p>
              <p className="font-semibold text-slate-800">${record.applicant.loanAmountRequest.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
        <AssessmentCard 
          title="Método Tradicional" 
          result={record.traditionalAssessment} 
          icon={FileSpreadsheet} 
        />
        <AssessmentCard 
          title="Análisis Gemini AI" 
          result={record.aiAssessment} 
          icon={BrainCircuit} 
          isAi={true} 
        />
      </div>

      <div className="mt-8 p-6 bg-slate-900 rounded-xl text-white flex items-center justify-between shadow-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-1">Decisión Final del Analista</h3>
          <p className="text-slate-400 text-sm">Seleccione la recomendación que considere más adecuada para finalizar.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-lg border border-rose-500 text-rose-400 hover:bg-rose-900/30 font-medium transition-colors flex items-center gap-2">
            <XCircle size={18} /> Rechazar
          </button>
           <button className="px-6 py-2 rounded-lg border border-emerald-500 text-emerald-400 hover:bg-emerald-900/30 font-medium transition-colors flex items-center gap-2">
            <CheckCircle size={18} /> Aprobar Crédito
          </button>
        </div>
      </div>
    </div>
  );
};