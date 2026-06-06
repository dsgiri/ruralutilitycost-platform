export type Dentition = 'milk' | '2-incisors' | '4-incisors' | '6-incisors' | '8-incisors' | 'unknown';
export type Breed = 'british' | 'brahman-cross' | 'unknown';
export type WearLevel = 'none' | 'mild' | 'moderate' | 'severe';
export type ConfidenceMode = 'teeth-only' | 'teeth-and-horn' | 'horn-only';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AgeEstimateInput {
  dentition: Dentition;
  breed: Breed;
  hornRings?: number;
  wearLevel: WearLevel;
  confidenceMode: ConfidenceMode;
}

export interface AgeEstimateResult {
  minMonths: number;
  maxMonths: number;
  minYears: number;
  maxYears: number;
  confidence: ConfidenceLevel;
  methodUsed: string;
  explanation: string;
}

export function estimateLivestockAge(input: AgeEstimateInput): AgeEstimateResult {
  let minMonths = 0;
  let maxMonths = 0;
  let confidence: ConfidenceLevel = 'high';
  let methodUsed = '';
  let explanation = '';

  if (input.confidenceMode === 'horn-only') {
    if (input.hornRings === undefined || input.hornRings < 0 || isNaN(input.hornRings)) {
      throw new Error("Invalid horn rings count.");
    }
    // Very rough estimate based on horn rings: 
    // Typically, first ring appears at 2-3 years, then one ring per year
    minMonths = Math.max(0, (input.hornRings + 2) * 12 - 6);
    maxMonths = (input.hornRings + 2) * 12 + 18;
    confidence = 'low';
    methodUsed = 'Horn Rings Only';
    explanation = `Based on ${input.hornRings} horn ring(s). Horn rings are highly unreliable. Use teeth for better accuracy.`;
  } else {
    // Teeth based
    switch (input.dentition) {
      case 'milk':
        minMonths = 1;
        maxMonths = 18; 
        explanation = 'Milk teeth present. Exact age depends on which milk teeth are present and wear level.';
        break;
      case '2-incisors':
        if (input.breed === 'british') { minMonths = 24; maxMonths = 26; }
        else if (input.breed === 'brahman-cross') { minMonths = 21; maxMonths = 27; }
        else { minMonths = 21; maxMonths = 28; }
        break;
      case '4-incisors':
        if (input.breed === 'british') { minMonths = 31; maxMonths = 33; }
        else if (input.breed === 'brahman-cross') { minMonths = 26; maxMonths = 38; }
        else { minMonths = 26; maxMonths = 39; }
        break;
      case '6-incisors':
        if (input.breed === 'british') { minMonths = 38; maxMonths = 41; }
        else if (input.breed === 'brahman-cross') { minMonths = 32; maxMonths = 47; }
        else { minMonths = 32; maxMonths = 48; }
        break;
      case '8-incisors':
        if (input.breed === 'british') { minMonths = 46; maxMonths = 51; }
        else if (input.breed === 'brahman-cross') { minMonths = 39; maxMonths = 58; }
        else { minMonths = 39; maxMonths = 60; }
        break;
      case 'unknown':
        throw new Error("Dentition is unknown. Cannot estimate age reliably without teeth.");
    }

    if (input.dentition !== 'milk') {
        explanation += `${input.dentition.replace('-incisors', ' permanent incisors')} erupted.`;
    }

    if (input.breed === 'unknown' && input.dentition !== 'milk') {
      confidence = 'medium';
      explanation += ' Wide range applied due to unknown breed.';
    }

    if (input.dentition !== 'milk') {
      if (input.wearLevel === 'moderate') {
        maxMonths += 6;
        if (confidence === 'high') confidence = 'medium';
        explanation += ' Upper age bound extended due to moderate tooth wear.';
      } else if (input.wearLevel === 'severe') {
        maxMonths += 12;
        confidence = 'low';
        explanation += ' Upper age bound significantly extended due to severe tooth wear.';
      } else if (input.wearLevel === 'mild' && input.breed === 'unknown') {
        // already medium
      } else if (input.wearLevel === 'mild') {
        maxMonths += 2;
        if (confidence === 'high') confidence = 'medium';
        explanation += ' Upper age bound slightly extended due to mild tooth wear.';
      }
    }

    methodUsed = 'Teeth (Dentition)';
    
    if (input.confidenceMode === 'teeth-and-horn' && input.hornRings !== undefined && input.hornRings >= 0) {
      explanation += ` Horn rings (${input.hornRings}) noted but teeth drive the estimate.`;
      if (confidence === 'high') confidence = 'medium';
      methodUsed = 'Teeth & Horn Rings';
    }
  }

  const minYears = Number((minMonths / 12).toFixed(1));
  const maxYears = Number((maxMonths / 12).toFixed(1));

  return {
    minMonths,
    maxMonths,
    minYears,
    maxYears,
    confidence,
    methodUsed,
    explanation: explanation.trim()
  };
}
