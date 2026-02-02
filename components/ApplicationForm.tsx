import React, { useState } from 'react';
import { ApplicantData, EmploymentType } from '../types';
import { DollarSign, User, Briefcase, Calendar, CreditCard } from 'lucide-react';

interface ApplicationFormProps {
  onSubmit: (data: ApplicantData) => void;
  isLoading: boolean;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<ApplicantData, 'id'>>({
    fullName: 'Maria González',
    age: 34,
    monthlyIncome: 3500,
    monthlyDebt: 800,
    employmentType: EmploymentType.FULL_TIME,
    employmentDurationYears: 4,
    creditHistoryScore: 720,
    loanAmountRequest: 25000,
    loanTermMonths: 36,
    missedPaymentsLast2Years: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fullName' || name === 'employmentType' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: crypto.randomUUID()
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Ingresar Datos del Cliente</h3>
        <button
          onClick={() => {
            setFormData({
              fullName: 'Carlos Rodriguez',
              age: 28,
              monthlyIncome: 1200,
              monthlyDebt: 700,
              employmentType: EmploymentType.PART_TIME,
              employmentDurationYears: 0.5,
              creditHistoryScore: 580,
              loanAmountRequest: 15000,
              loanTermMonths: 24,
              missedPaymentsLast2Years: 2
            })
          }}
          className="text-sm text-indigo-600 hover:text-indigo-800 underline"
        >
          Cargar Ejemplo (Alto Riesgo)
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Info */}
          <div className="col-span-full mb-2">
            <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">Información Personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Edad</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Employment */}
          <div className="col-span-full md:col-span-1">
             <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">Empleo</h4>
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Empleo</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {Object.values(EmploymentType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Antigüedad (Años)</label>
                  <input
                    type="number"
                    step="0.5"
                    name="employmentDurationYears"
                    value={formData.employmentDurationYears}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
             </div>
          </div>

          {/* Finances */}
          <div className="col-span-full md:col-span-1">
            <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">Finanzas</h4>
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ingreso Mensual (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deuda Mensual Actual (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="monthlyDebt"
                      value={formData.monthlyDebt}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Loan Request */}
          <div className="col-span-full border-t border-slate-200 pt-6">
            <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">Detalles del Préstamo & Historial</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monto Solicitado</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="loanAmountRequest"
                      value={formData.loanAmountRequest}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plazo (Meses)</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="loanTermMonths"
                      value={formData.loanTermMonths}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Score Crediticio (Bureau)</label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="creditHistoryScore"
                      value={formData.creditHistoryScore}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
              </div>
              <div className="md:col-span-3">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Pagos Atrasados (Últimos 2 años)</label>
                 <input
                      type="number"
                      name="missedPaymentsLast2Years"
                      value={formData.missedPaymentsLast2Years}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 transition-all ${
              isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Evaluando...
              </>
            ) : (
              <>
                Evaluar Riesgo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};