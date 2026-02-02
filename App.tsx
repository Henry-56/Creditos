import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ApplicationForm } from './components/ApplicationForm';
import { ComparisonView } from './components/ComparisonView';
import { Dashboard } from './components/Dashboard';
import { ApplicantData, ApplicationRecord } from './types';
import { calculateTraditionalRisk } from './services/ruleEngine';
import { calculateAIRisk } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new-application');
  const [currentRecord, setCurrentRecord] = useState<ApplicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssessment = async (data: ApplicantData) => {
    setIsLoading(true);
    
    try {
      // Run Traditional Logic (Sync)
      const traditionalResult = calculateTraditionalRisk(data);

      // Run AI Logic (Async)
      const aiResult = await calculateAIRisk(data);

      const newRecord: ApplicationRecord = {
        applicant: data,
        traditionalAssessment: traditionalResult,
        aiAssessment: aiResult,
        status: 'PENDING'
      };

      setCurrentRecord(newRecord);
      setActiveTab('analysis'); // Switch to results view
    } catch (e) {
      console.error(e);
      alert("Error processing application");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-application':
        return <ApplicationForm onSubmit={handleAssessment} isLoading={isLoading} />;
      case 'analysis':
        return currentRecord 
          ? <ComparisonView record={currentRecord} />
          : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <p>No hay una evaluación activa.</p>
              <button 
                onClick={() => setActiveTab('new-application')}
                className="mt-4 text-indigo-600 hover:underline"
              >
                Crear nueva solicitud
              </button>
            </div>
          );
      case 'reports':
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
             <div className="text-center">
               <h3 className="text-xl font-medium mb-2">Módulo de Reportes Avanzados</h3>
               <p>Disponible en versión completa.</p>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;