import { GoogleGenAI, Type } from "@google/genai";
import { ApplicantData, AssessmentResult, RiskLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Puntaje de crédito calculado de 0 a 100" },
    riskLevel: { type: Type.STRING, enum: ["Bajo", "Medio", "Alto", "Crítico"] },
    recommendedInterestRate: { type: Type.NUMBER, description: "Tasa de interés recomendada en porcentaje (ej. 12.5)" },
    maxApprovedAmount: { type: Type.NUMBER, description: "Monto máximo sugerido para aprobar" },
    reasoning: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Lista de razones clave para la decisión, incluyendo factores sutiles no captados por reglas simples"
    }
  },
  required: ["score", "riskLevel", "recommendedInterestRate", "maxApprovedAmount", "reasoning"]
};

export const calculateAIRisk = async (data: ApplicantData): Promise<AssessmentResult> => {
  const startTime = performance.now();

  const prompt = `
    Actúa como un analista de riesgo de crédito senior en un banco importante.
    Evalúa la siguiente solicitud de crédito.
    
    Analiza no solo los ratios financieros duros (DTI), sino también la estabilidad laboral y el comportamiento de pago histórico.
    Busca correlaciones que un sistema de reglas simples podría pasar por alto.
    
    Datos del solicitante:
    ${JSON.stringify(data, null, 2)}
    
    Proporciona una evaluación justa pero prudente.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for consistent, analytical results
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);

    // Map string risk level to Enum if needed (schema validation handles most)
    let typedRiskLevel = RiskLevel.MEDIUM;
    switch(result.riskLevel) {
      case "Bajo": typedRiskLevel = RiskLevel.LOW; break;
      case "Medio": typedRiskLevel = RiskLevel.MEDIUM; break;
      case "Alto": typedRiskLevel = RiskLevel.HIGH; break;
      case "Crítico": typedRiskLevel = RiskLevel.CRITICAL; break;
    }

    return {
      method: 'AI',
      score: result.score,
      riskLevel: typedRiskLevel,
      recommendedInterestRate: result.recommendedInterestRate,
      maxApprovedAmount: result.maxApprovedAmount,
      reasoning: result.reasoning,
      processingTimeMs: Math.round(performance.now() - startTime),
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback error state
    return {
      method: 'AI',
      score: 0,
      riskLevel: RiskLevel.CRITICAL,
      recommendedInterestRate: 0,
      maxApprovedAmount: 0,
      reasoning: ["Error al conectar con el servicio de IA. Por favor intente nuevamente."],
      processingTimeMs: Math.round(performance.now() - startTime),
      timestamp: new Date().toISOString()
    };
  }
};