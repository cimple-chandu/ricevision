
interface Disease {
  name: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

interface DetectionResult {
  detectedDisease: Disease | null;
  healthStatus: string;
  otherPossibilities: Disease[];
}

// Mock database of rice diseases
const diseaseDatabase = [
  {
    name: 'Rice Blast',
    description: 'Rice blast is a destructive fungal disease caused by Magnaporthe oryzae. It can affect all above-ground parts of the rice plant and is particularly damaging to leaves and panicles. The disease thrives in conditions of high humidity and moderate temperatures.',
    treatment: 'Apply fungicides like propiconazole or tricyclazole at first signs. Plant resistant varieties and maintain proper field drainage. Avoid excessive nitrogen fertilization.',
    severity: 'high' as const
  },
  {
    name: 'Bacterial Leaf Blight',
    description: 'Bacterial leaf blight is caused by Xanthomonas oryzae pv. oryzae. It initially appears as water-soaked lesions on leaf edges that turn yellow and eventually dry out. The disease can cause significant yield losses in susceptible rice varieties.',
    treatment: 'Use copper-based bactericides as preventive measures. Plant resistant varieties and practice crop rotation. Remove infected plant debris and avoid overhead irrigation.',
    severity: 'medium' as const
  },
  {
    name: 'Brown Spot',
    description: 'Brown spot is a fungal disease caused by Cochliobolus miyabeanus. It appears as brown, oval-shaped lesions with yellow halos on leaves. The disease is often associated with nutrient deficiencies, particularly potassium.',
    treatment: 'Apply balanced fertilization, especially adequate potassium. Use fungicides like iprodione or propiconazole. Improve soil drainage and avoid water stress.',
    severity: 'medium' as const
  },
  {
    name: 'Sheath Blight',
    description: 'Sheath blight is caused by Rhizoctonia solani and appears as oval lesions on the leaf sheath that can spread to the leaves. The lesions have grayish-white centers with brown margins. Dense planting and high nitrogen levels increase disease severity.',
    treatment: 'Apply fungicides like azoxystrobin or hexaconazole. Reduce planting density and avoid excessive nitrogen. Remove plant debris after harvest and practice crop rotation.',
    severity: 'high' as const
  },
  {
    name: 'Leaf Scald',
    description: 'Leaf scald is caused by the fungus Microdochium oryzae. It appears as zonate lesions with alternating light and dark brown bands. The disease typically develops during the later growth stages of the rice plant.',
    treatment: 'Use balanced fertilization and proper water management. Apply fungicides like propiconazole. Plant resistant varieties when available and avoid dense planting.',
    severity: 'low' as const
  }
];

// Mock detection function
export const detectDisease = async (imageFile: File): Promise<DetectionResult> => {
  // In a real application, this would send the image to a backend service or ML model
  // For this demo, we'll simulate processing time and return random results
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomize whether the plant is healthy or diseased (70% chance of disease for demo purposes)
      const isHealthy = Math.random() > 0.7;
      
      if (isHealthy) {
        resolve({
          detectedDisease: null,
          healthStatus: 'healthy',
          otherPossibilities: []
        });
      } else {
        // Randomly select a disease from our database
        const mainDiseaseIndex = Math.floor(Math.random() * diseaseDatabase.length);
        const mainDisease = diseaseDatabase[mainDiseaseIndex];
        
        // Generate a confidence score between 70% and 95%
        const mainConfidence = 70 + Math.random() * 25;
        
        // Create a list of other possible diseases with lower confidence
        let otherPossibilities: Disease[] = [];
        
        for (let i = 0; i < diseaseDatabase.length; i++) {
          if (i !== mainDiseaseIndex) {
            // Only include some diseases as possibilities, with lower confidence
            if (Math.random() > 0.5) {
              const confidence = 10 + Math.random() * 30; // 10% to 40%
              otherPossibilities.push({
                ...diseaseDatabase[i],
                confidence
              });
            }
          }
        }
        
        // Sort by confidence
        otherPossibilities.sort((a, b) => b.confidence - a.confidence);
        
        // Limit to top 2
        otherPossibilities = otherPossibilities.slice(0, 2);
        
        resolve({
          detectedDisease: {
            ...mainDisease,
            confidence: mainConfidence
          },
          healthStatus: 'diseased',
          otherPossibilities
        });
      }
    }, 2000); // 2 second delay to simulate processing
  });
};
