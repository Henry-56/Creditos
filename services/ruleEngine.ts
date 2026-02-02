import { ApplicantData, AssessmentResult, RiskLevel } from '../types';

export const calculateTraditionalRisk = (data: ApplicantData): AssessmentResult => {
  const startTime = performance.now();
  const reasons: string[] = [];
  
  // Base Score
  let score = 100;

  // 1. Debt-to-Income Ratio (DTI)
  const dti = data.monthlyDebt / data.monthlyIncome;
  if (dti > 0.5) {
    score -= 30;
    reasons.push(`DTI alto (${(dti * 100).toFixed(1)}%)`);
  } else if (dti > 0.35) {
    score -= 15;
    reasons.push(`DTI moderado (${(dti * 100).toFixed(1)}%)`);
  }

  // 2. Credit History Score Impact
  if (data.creditHistoryScore < 600) {
    score -= 40;
    reasons.push('Puntaje crediticio externo bajo');
  } else if (data.creditHistoryScore < 700) {
    score -= 15;
  }

  // 3. Employment Stability
  if (data.employmentDurationYears < 1) {
    score -= 20;
    reasons.push('Antigüedad laboral menor a 1 año');
  }

  // 4. Missed Payments
  if (data.missedPaymentsLast2Years > 0) {
    score -= (data.missedPaymentsLast2Years * 15);
    reasons.push(`${data.missedPaymentsLast2Years} pagos atrasados recientes`);
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine Level and Rate
  let level = RiskLevel.LOW;
  let rate = 12.0; // Base rate

  if (score < 40) {
    level = RiskLevel.CRITICAL;
    rate = 25.0;
  } else if (score < 60) {
    level = RiskLevel.HIGH;
    rate = 18.5;
  } else if (score < 80) {
    level = RiskLevel.MEDIUM;
    rate = 14.5;
  } else {
    level = RiskLevel.LOW;
    rate = 10.5;
  }

  // Max Amount Rule
  const maxAmount = data.monthlyIncome * 12 * 0.4; // Max 40% of annual income

  return {
    method: 'TRADITIONAL',
    score: Math.round(score),
    riskLevel: level,
    recommendedInterestRate: rate,
    maxApprovedAmount: Math.round(maxAmount),
    reasoning: reasons.length > 0 ? reasons : ['Perfil crediticio estándar'],
    processingTimeMs: Math.round(performance.now() - startTime),
    timestamp: new Date().toISOString()
  };
};