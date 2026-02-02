export enum EmploymentType {
  FULL_TIME = 'Tiempo Completo',
  PART_TIME = 'Medio Tiempo',
  SELF_EMPLOYED = 'Autónomo',
  UNEMPLOYED = 'Desempleado',
  RETIRED = 'Jubilado'
}

export enum RiskLevel {
  LOW = 'Bajo',
  MEDIUM = 'Medio',
  HIGH = 'Alto',
  CRITICAL = 'Crítico'
}

export interface ApplicantData {
  id: string;
  fullName: string;
  age: number;
  monthlyIncome: number;
  monthlyDebt: number; // Total monthly debt payments
  employmentType: EmploymentType;
  employmentDurationYears: number;
  creditHistoryScore: number; // External bureau score (e.g., FICO equivalent)
  loanAmountRequest: number;
  loanTermMonths: number;
  missedPaymentsLast2Years: number;
}

export interface AssessmentResult {
  method: 'TRADITIONAL' | 'AI';
  score: number; // 0-100
  riskLevel: RiskLevel;
  recommendedInterestRate: number;
  maxApprovedAmount: number;
  reasoning: string[];
  processingTimeMs: number;
  timestamp: string;
}

export interface ApplicationRecord {
  applicant: ApplicantData;
  traditionalAssessment: AssessmentResult | null;
  aiAssessment: AssessmentResult | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  finalDecision?: string;
}
