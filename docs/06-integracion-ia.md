# Integración con IA

## Visión General
Train Body Analyzer utiliza inteligencia artificial para analizar los datos del usuario, calcular puntuaciones, generar recomendaciones personalizadas y predecir tendencias. La IA actúa como un entrenador personal virtual que interpreta los datos y proporciona insights valiosos.

## Plataforma de IA: OpenRouter

Train Body Analyzer utiliza OpenRouter como plataforma de integración con modelos de IA. OpenRouter es un servicio que proporciona acceso unificado a múltiples modelos de IA de diferentes proveedores a través de una única API.

### Ventajas de OpenRouter
- **Acceso a múltiples modelos**: Permite utilizar modelos de Google (Gemini), OpenAI (GPT), Anthropic (Claude) y otros a través de una única integración.
- **Flexibilidad**: Facilita cambiar entre modelos sin modificar la estructura de la aplicación.
- **Optimización de costos**: Permite seleccionar el modelo más adecuado según la relación precio/rendimiento para cada tipo de análisis.
- **Redundancia**: Si un proveedor de IA tiene problemas, se puede cambiar a otro sin interrupciones.

### Modelos utilizados
- **Análisis principal**: Google Gemini 2.0 Pro (modelo principal)
- **Análisis de respaldo**: OpenAI GPT-4o (alternativa)
- **Análisis de texto simple**: Mistral Large (para procesamiento de descripciones)

## Arquitectura de IA

### 1. Modelo de Análisis
El sistema utiliza un modelo de IA entrenado para:
- Analizar patrones en los datos del usuario
- Identificar correlaciones entre diferentes métricas
- Calcular puntuaciones (Fit Score, DNA Grade)
- Generar recomendaciones personalizadas
- Analizar logs de entrenamiento y nutrición
- Proporcionar recomendaciones dietéticas específicas
- Analizar el árbol genealógico y características heredadas

### 2. Flujo de Datos
```
Datos del Usuario → Preprocesamiento → Modelo de IA → Interpretación → Resultados
```

1. **Datos del Usuario**: Métricas físicas, genéticas, historial de entrenamiento, logs dietéticos, árbol genealógico
2. **Preprocesamiento**: Normalización, validación, transformación
3. **Modelo de IA**: Procesamiento mediante prompts estructurados
4. **Interpretación**: Conversión de resultados en formato utilizable
5. **Resultados**: Puntuaciones, recomendaciones, predicciones, análisis de herencia

## Prompt Engineering

### Estructura del Prompt
Los prompts enviados al modelo de IA siguen una estructura JSON estandarizada:

```json
{
  "user_id": "12345",
  "timestamp": "2023-06-15T14:30:00Z",
  "task": "analyze_fitness",
  "data": {
    "physical_metrics": {
      "volume": 75,
      "endurance": 68,
      "strength": 82,
      "coordination": 70,
      "agility": 65,
      "consistency": 80
    },
    "genetic_data": {
      "dna_haplogroup": "R1b",
      "known_polymorphisms": ["ACTN3 RR", "ACE DD"],
      "family_history": "Father: athletic, Mother: average"
    },
    "training_history": {
      "sessions_last_month": 18,
      "average_intensity": 0.75,
      "recovery_quality": 0.8
    },
    "user_profile": {
      "age": 32,
      "gender": "male",
      "height": 180,
      "weight": 78,
      "goals": ["muscle_gain", "endurance_improvement"],
      "somatotype": "mesomorph",
      "physical_traits": {
        "eye_color": "brown",
        "hair_color": "black",
        "skin_tone": "medium"
      }
    },
    "family_tree": {
      "father": {
        "origin": "Spain",
        "ethnicity": "Basque",
        "somatotype": "mesomorph",
        "physical_traits": {
          "eye_color": "brown",
          "hair_color": "black",
          "height": "tall",
          "build": "athletic"
        },
        "athletic_history": "soccer player, good endurance"
      },
      "mother": {
        "origin": "Italy",
        "ethnicity": "Sicilian",
        "somatotype": "ectomorph",
        "physical_traits": {
          "eye_color": "green",
          "hair_color": "brown",
          "height": "average",
          "build": "slim"
        },
        "athletic_history": "dancer, good flexibility"
      },
      "paternal_grandfather": {
        "origin": "Spain",
        "ethnicity": "Basque",
        "somatotype": "mesomorph",
        "physical_traits": {
          "eye_color": "brown",
          "hair_color": "black",
          "height": "very tall",
          "build": "muscular"
        },
        "longevity": 85,
        "health_issues": ["hypertension"]
      },
      // Más miembros de la familia...
    },
    "dietary_logs": [
      {
        "meal_type": "breakfast",
        "description": "4 huevos revueltos, 2 rebanadas de pan integral, 1 aguacate",
        "time": "07:30",
        "date": "2023-06-14"
      },
      {
        "meal_type": "lunch",
        "description": "200g de pechuga de pollo, 1 taza de arroz, ensalada mixta",
        "time": "13:00",
        "date": "2023-06-14"
      }
      // Más entradas de dieta
    ],
    "previous_scores": {
      "fit_score_history": [720, 735, 748],
      "dna_grade": "A"
    }
  },
  "output_format": {
    "fit_score": "number",
    "dna_grade": "letter",
    "potential": "decimal",
    "recommendations": "array",
    "dietary_recommendations": "array",
    "genetic_insights": "object",
    "insights": "object"
  }
}
```

### Elementos Clave del Prompt
Cada prompt debe contener:

1. **Instrucciones claras**: Directrices específicas para interpretar métricas y generar resultados.
2. **Rangos de valores**: Definición explícita de los rangos para cada parámetro (ej: Volume: 0-100).
3. **Fórmulas de conversión**: Reglas para convertir valores numéricos a letras (E, C, B, A, S, SS).
4. **Ejemplos de salida**: Formato esperado para guiar a la IA.

### Ejemplo de Instrucciones en el Prompt
```
Eres un analizador de rendimiento físico-genético. 
Debes calcular el *Fit Score* y *DNA Grade* usando estas reglas:

### Parámetros y Rangos:
1. **Volume** (0-100): 
   - <50: Penaliza 10% del Fit Score.
   - 50-80: +15 puntos.
   - >80: +25 puntos.

2. **Strength** (0-100):
   - <60: Letra -1 nivel (ej: A → B).
   - 60-90: Mantiene nivel.
   - >90: Letra +1 nivel (ej: A → S).

3. **Endurance** (0-100):
   - <40: -20 puntos.
   - 40-70: +10 puntos.
   - >70: +30 puntos.

4. **DNA Potential** (E, C, B, A, S, SS):
   - Base: [valor_base].
   - Si hay mutación ACTN3: +1 nivel (ej: A → S).

5. **Adaptabilidad**:
   - Altitude (low/moderate/high): +5/10/15 puntos.
   - Recovery Time (horas): <3h: +10, >3h: -5.
```

### Respuesta de la IA
La respuesta del modelo sigue una estructura similar:

```json
{
  "fit_score": 765,
  "dna_grade": "A",
  "potential": 0.82,
  "recommendations": [
    {
      "category": "training",
      "title": "Aumentar entrenamiento de resistencia",
      "description": "Tus métricas de endurance están por debajo de tu potencial genético. Añade 1-2 sesiones semanales de cardio de intensidad moderada.",
      "priority": "high",
      "expected_impact": 0.15
    },
    {
      "category": "recovery",
      "title": "Mejorar calidad del sueño",
      "description": "Tu recuperación podría optimizarse. Intenta dormir 7-8 horas consistentemente y evita pantallas 1 hora antes de acostarte.",
      "priority": "medium",
      "expected_impact": 0.08
    }
  ],
  "dietary_recommendations": [
    {
      "category": "macronutrients",
      "title": "Ajustar distribución de macronutrientes",
      "description": "Basado en tu biotipo mesomorfo y objetivos, aumenta la ingesta de proteínas a 2g/kg de peso corporal y mantén los carbohidratos en 4g/kg en días de entrenamiento.",
      "priority": "high",
      "expected_impact": 0.12
    },
    {
      "category": "meal_timing",
      "title": "Optimizar timing de comidas",
      "description": "Consume una comida rica en proteínas y carbohidratos dentro de los 30 minutos posteriores al entrenamiento para maximizar la recuperación.",
      "priority": "medium",
      "expected_impact": 0.08
    },
    {
      "category": "hydration",
      "title": "Aumentar hidratación",
      "description": "Tu consumo de agua parece insuficiente. Aumenta a 3L diarios, especialmente en días de entrenamiento.",
      "priority": "high",
      "expected_impact": 0.10
    }
  ],
  "genetic_insights": {
    "ancestry_influence": {
      "primary_influences": ["Basque", "Sicilian"],
      "athletic_predispositions": ["power-based sports", "endurance activities"],
      "notable_traits": "Combinación de fuerza explosiva (herencia vasca) con flexibilidad (herencia italiana)"
    },
    "inherited_traits": {
      "dominant_somatotype": "mesomorph tendency from paternal line",
      "physical_advantages": ["natural muscle development", "good recovery capacity"],
      "potential_limitations": ["moderate flexibility", "possible hypertension risk"]
    },
    "genetic_markers": {
      "confirmed": ["ACTN3 RR (power variant)"],
      "predicted": ["likely ACE DD based on family athletic history"]
    }
  },
  "insights": {
    "strengths": ["fuerza", "consistencia"],
    "weaknesses": ["endurance", "agility"],
    "genetic_advantages": ["respuesta hipertrófica favorable"],
    "limiting_factors": ["recuperación subóptima"],
    "progress_rate": "above_average",
    "dietary_patterns": {
      "protein_intake": "adequate",
      "carb_timing": "suboptimal",
      "meal_frequency": "good",
      "hydration": "insufficient"
    }
  }
}
```

### Ejemplo de Output Esperado (Simplificado)
```json
{
  "fit_score": 864,
  "dna_grade": "S",
  "recommendations": [
    "Mejorar capacidad aeróbica (endurance: 78/100)",
    "Aprovechar mutación ACTN3 con entrenamiento explosivo",
    "Monitorizar recuperación (2.5h está en rango óptimo)"
  ]
}
```

### Mecánica Clave del Prompt

1. **Variables Obligatorias**: El prompt siempre incluye todas las métricas (no se omiten parámetros).
2. **Determinismo**: Se utiliza `temperature=0.2` para obtener respuestas consistentes y precisas.
3. **Validación**: 
   - La IA debe devolver JSON válido.
   - Los rangos se aplican estrictamente (ej: `fit_score` no puede ser >1000).
   - Se verifican todos los campos requeridos.

### Escalabilidad del Sistema de Prompts
- **Nuevos Parámetros**: Se pueden añadir reglas al prompt sin cambiar el código.
- **Localización**: El prompt puede traducirse a otros idiomas manteniendo la estructura.
- **Logging**: Se guardan prompts/respuestas para mejorar el modelo con el tiempo.

## Casos de Uso de la IA

### 1. Análisis Inicial
Cuando un usuario se registra, la IA analiza sus datos iniciales para:
- Establecer líneas base para todas las métricas
- Calcular el Fit Score inicial
- Determinar el DNA Grade preliminar
- Analizar el árbol genealógico y características heredadas
- Generar recomendaciones iniciales

### 2. Análisis Periódico
Con cada actualización de datos, la IA:
- Recalcula el Fit Score
- Ajusta el potencial (considerando edad y progreso)
- Actualiza recomendaciones basadas en nuevos datos
- Identifica tendencias y patrones

### 3. Análisis de Logs Completo
Cuando el usuario solicita un análisis completo mediante el botón de análisis:
- Se recopilan todos los logs (entrenamiento, dieta, medidas)
- Se procesan en conjunto para identificar patrones y correlaciones
- Se generan recomendaciones holísticas que consideran todas las variables
- Se destacan cambios significativos desde el último análisis completo

### 4. Análisis Dietético
La IA analiza los logs de alimentación para:
- Evaluar la distribución de macronutrientes
- Identificar patrones de timing nutricional
- Detectar posibles deficiencias o excesos
- Correlacionar la dieta con el rendimiento físico
- Generar recomendaciones dietéticas personalizadas

### 5. Predicciones y Simulaciones
La IA puede predecir:
- Progreso esperado basado en el plan actual
- Impacto potencial de diferentes intervenciones
- Tiempo estimado para alcanzar objetivos específicos
- Riesgo de lesiones o sobreentrenamiento

### 6. Recomendaciones Personalizadas
Las recomendaciones de la IA se adaptan a:
- Perfil genético del usuario
- Biotipo (somatotipo)
- Historial de entrenamiento
- Patrones dietéticos
- Objetivos específicos
- Limitaciones (lesiones, tiempo disponible)
- Preferencias personales

### 7. Análisis Genealógico
La IA analiza el árbol genealógico para:
- Identificar patrones hereditarios relevantes para el rendimiento físico
- Detectar predisposiciones genéticas basadas en orígenes étnicos
- Correlacionar características físicas heredadas con potencial atlético
- Evaluar la influencia de biotipos familiares en la respuesta al entrenamiento
- Generar insights sobre fortalezas y debilidades heredadas

## Implementación Técnica

### 1. API de IA con OpenRouter
El sistema se comunica con el modelo de IA a través de OpenRouter, un servicio que proporciona acceso unificado a diferentes modelos de IA como Google Gemini y OpenAI:

```javascript
// Implementación real con OpenRouter
import axios from 'axios';

async function analyzeUserData(userData) {
  try {
    const prompt = buildPrompt(userData);
    
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "google/gemini-2.0-pro-exp-02-05:free", // O cualquier otro modelo disponible
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.2 // Precisión sobre creatividad
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com", // URL del sitio
          "X-Title": "Train Body Analyzer" // Nombre del sitio
        }
      }
    );
    
    const result = response.data.choices[0].message.content;
    return processIAResponse(JSON.parse(result));
  } catch (error) {
    console.error('Error analyzing user data:', error);
    return fallbackAnalysis(userData);
  }
}
```

### 2. Análisis de Logs Completo
Implementación del análisis completo solicitado mediante el botón:

```javascript
// Implementación real con OpenRouter
async function performCompleteAnalysis(userId) {
  try {
    // 1. Recopilar todos los datos relevantes
    const user = await getUserProfile(userId);
    const metrics = await getUserMetrics(userId);
    const trainingLogs = await getTrainingLogs(userId);
    const dietaryLogs = await getDietaryLogs(userId);
    const biometricLogs = await getBiometricLogs(userId);
    const familyMembers = await getFamilyMembers(userId);
    
    // 2. Construir prompt completo
    const prompt = buildComprehensivePrompt({
      user,
      metrics,
      trainingLogs,
      dietaryLogs,
      biometricLogs,
      familyMembers
    });
    
    // 3. Enviar a OpenRouter para análisis
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "google/gemini-2.0-pro-exp-02-05:free", // O cualquier otro modelo disponible
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.2 // Precisión sobre creatividad
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com",
          "X-Title": "Train Body Analyzer"
        }
      }
    );
    
    // 4. Procesar y formatear respuesta
    const result = response.data.choices[0].message.content;
    return processComprehensiveResponse(JSON.parse(result));
  } catch (error) {
    console.error('Error performing complete analysis:', error);
    return fallbackComprehensiveAnalysis(userId);
  }
}
```

### 3. Procesamiento de Respuestas
Las respuestas de la IA se procesan para extraer información relevante:

```javascript
// Ejemplo conceptual
function processIAResponse(response) {
  // Validar respuesta
  if (!response.fit_score || !response.dna_grade) {
    throw new Error('Invalid IA response');
  }
  
  // Formatear recomendaciones
  const formattedRecommendations = response.recommendations.map(rec => ({
    id: generateId(),
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    category: rec.category,
    impact: rec.expected_impact,
    isImplemented: false
  }));
  
  // Formatear recomendaciones dietéticas
  const formattedDietaryRecommendations = response.dietary_recommendations?.map(rec => ({
    id: generateId(),
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    category: rec.category,
    impact: rec.expected_impact,
    isImplemented: false
  })) || [];
  
  return {
    fitScore: response.fit_score,
    dnaGrade: response.dna_grade,
    potential: response.potential,
    recommendations: formattedRecommendations,
    dietaryRecommendations: formattedDietaryRecommendations,
    insights: response.insights
  };
}
```

### 4. Fallback Mechanism
En caso de fallo en la IA, el sistema tiene un mecanismo de respaldo:

```javascript
// Ejemplo conceptual
function fallbackAnalysis(userData) {
  // Cálculo simplificado basado en reglas predefinidas
  const fitScore = calculateBasicFitScore(userData.physical_metrics);
  const dnaGrade = estimateBasicDNAGrade(userData.genetic_data, userData.user_profile);
  
  return {
    fitScore,
    dnaGrade,
    potential: 0.5, // Valor conservador por defecto
    recommendations: getDefaultRecommendations(fitScore, dnaGrade),
    dietaryRecommendations: getDefaultDietaryRecommendations(userData.user_profile.somatotype),
    insights: {
      strengths: [],
      weaknesses: [],
      genetic_advantages: [],
      limiting_factors: [],
      progress_rate: "average",
      dietary_patterns: {
        protein_intake: "unknown",
        carb_timing: "unknown",
        meal_frequency: "unknown",
        hydration: "unknown"
      }
    }
  };
}
```

### 5. Análisis del Árbol Genealógico
Implementación del análisis de características heredadas:

```javascript
// Implementación real con OpenRouter
async function analyzeGeneticHeritage(userId) {
  try {
    // 1. Obtener datos del árbol genealógico
    const user = await getUserProfile(userId);
    const familyMembers = await getFamilyMembers(userId);
    const userTraits = await getUserPhysicalTraits(userId);
    
    // 2. Construir prompt para análisis genealógico
    const prompt = buildGenealogyPrompt({
      user,
      familyMembers,
      userTraits
    });
    
    // 3. Enviar a OpenRouter para análisis
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "google/gemini-2.0-pro-exp-02-05:free", // O cualquier otro modelo disponible
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.3 // Ligeramente más creativo para análisis genealógico
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com",
          "X-Title": "Train Body Analyzer"
        }
      }
    );
    
    // 4. Procesar y formatear respuesta
    const result = response.data.choices[0].message.content;
    return processGenealogyResponse(JSON.parse(result));
  } catch (error) {
    console.error('Error analyzing genetic heritage:', error);
    return fallbackGenealogyAnalysis(userId);
  }
}
```

## Procesamiento de Texto Natural

### 1. Análisis de Descripciones Dietéticas
La IA procesa las descripciones textuales de comidas:

```javascript
// Implementación real con OpenRouter
async function processDietaryDescription(description) {
  try {
    // Construir prompt para análisis de dieta
    const prompt = `
      Analiza la siguiente descripción de comida y extrae:
      1. Macronutrientes aproximados (proteínas, carbohidratos, grasas)
      2. Calorías totales estimadas
      3. Calidad nutricional (alta, media, baja)
      4. Posibles deficiencias o excesos
      
      Descripción: "${description}"
      
      Responde solo en formato JSON con esta estructura:
      {
        "macros": {
          "proteinas": "Xg",
          "carbohidratos": "Xg",
          "grasas": "Xg"
        },
        "calorias": X,
        "calidad": "alta/media/baja",
        "observaciones": ["observación 1", "observación 2"]
      }
    `;
    
    // Enviar a OpenRouter para análisis
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "mistralai/mistral-large-latest:free", // Modelo más económico para análisis simple
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.1 // Alta precisión
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com",
          "X-Title": "Train Body Analyzer"
        }
      }
    );
    
    // Procesar respuesta
    const result = response.data.choices[0].message.content;
    return JSON.parse(result);
  } catch (error) {
    console.error('Error analyzing dietary description:', error);
    return fallbackDietaryAnalysis(description);
  }
}
```

### 2. Extracción de Información de Logs
La IA extrae información estructurada de descripciones de entrenamiento:

```javascript
// Implementación real con OpenRouter
async function processTrainingDescription(description) {
  try {
    // Construir prompt para análisis de entrenamiento
    const prompt = `
      Analiza la siguiente descripción de entrenamiento y extrae:
      1. Tipo de entrenamiento (fuerza, cardio, flexibilidad, etc.)
      2. Grupos musculares trabajados
      3. Intensidad estimada (1-10)
      4. Volumen total (bajo, medio, alto)
      
      Descripción: "${description}"
      
      Responde solo en formato JSON con esta estructura:
      {
        "tipo": "fuerza/cardio/flexibilidad/etc",
        "grupos_musculares": ["grupo1", "grupo2", ...],
        "intensidad": X,
        "volumen": "bajo/medio/alto",
        "observaciones": ["observación 1", "observación 2"]
      }
    `;
    
    // Enviar a OpenRouter para análisis
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "mistralai/mistral-large-latest:free", // Modelo más económico para análisis simple
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.1 // Alta precisión
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com",
          "X-Title": "Train Body Analyzer"
        }
      }
    );
    
    // Procesar respuesta
    const result = response.data.choices[0].message.content;
    return JSON.parse(result);
  } catch (error) {
    console.error('Error analyzing training description:', error);
    return fallbackTrainingAnalysis(description);
  }
}
```

### 3. Análisis de Descripciones Familiares
La IA procesa las descripciones textuales de características familiares:

```javascript
// Implementación real con OpenRouter
async function processFamilyDescription(description, relationship) {
  try {
    // Construir prompt para análisis familiar
    const prompt = `
      Analiza la siguiente descripción de un familiar (${relationship}) y extrae:
      1. Rasgos físicos principales
      2. Posible somatotipo
      3. Predisposiciones atléticas
      4. Características relevantes para rendimiento físico
      5. Posibles condiciones hereditarias
      
      Descripción: "${description}"
      
      Responde solo en formato JSON con esta estructura:
      {
        "rasgos_fisicos": ["rasgo1", "rasgo2", ...],
        "somatotipo": "ectomorfo/mesomorfo/endomorfo/mixto",
        "predisposiciones_atleticas": ["predisposición1", "predisposición2", ...],
        "caracteristicas_rendimiento": ["característica1", "característica2", ...],
        "condiciones_hereditarias": ["condición1", "condición2", ...]
      }
    `;
    
    // Enviar a OpenRouter para análisis
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        "model": "google/gemini-2.0-pro-exp-02-05:free", // Modelo más avanzado para análisis complejo
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.2 // Balance entre precisión y creatividad
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://trainbodyanalyzer.com",
          "X-Title": "Train Body Analyzer"
        }
      }
    );
    
    // Procesar respuesta
    const result = response.data.choices[0].message.content;
    return JSON.parse(result);
  } catch (error) {
    console.error('Error analyzing family description:', error);
    return fallbackFamilyAnalysis(description, relationship);
  }
}
```

## Mejora Continua del Modelo

### 1. Retroalimentación del Usuario
El sistema recopila retroalimentación para mejorar el modelo:
- Calificaciones de utilidad de las recomendaciones
- Seguimiento de recomendaciones implementadas
- Resultados reales vs. predicciones
- Valoración de recomendaciones dietéticas

### 2. Actualización del Modelo
El modelo se actualiza periódicamente con:
- Nuevos datos científicos sobre fitness y genética
- Investigación nutricional actualizada
- Patrones identificados en la base de usuarios
- Mejoras en los algoritmos de análisis

## Consideraciones Éticas y de Privacidad

### 1. Transparencia
- Los usuarios son informados sobre cómo se utilizan sus datos
- Se explica que las recomendaciones son sugerencias, no diagnósticos médicos
- Se aclara que las recomendaciones dietéticas no sustituyen el consejo de un nutricionista

### 2. Privacidad
- Los datos sensibles (genéticos, médicos, dietéticos) se cifran
- Se implementa anonimización para análisis agregados
- Los usuarios controlan qué datos comparten

### 3. Sesgo y Equidad
- El modelo se entrena con datos diversos para minimizar sesgos
- Se realizan auditorías periódicas para identificar y corregir sesgos
- Las recomendaciones se adaptan a diferentes perfiles y necesidades

## Conexión con Otros Componentes
- Para entender las métricas que analiza la IA, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para comprender cómo se calculan las puntuaciones, consulta [Sistema de Puntuación](04-sistema-puntuacion.md)
- Para ver cómo se visualizan los resultados de la IA, consulta [Interfaz de Usuario](05-interfaz-usuario.md)
- Para conocer el proceso de registro y recopilación de datos, consulta [Proceso de Registro](09-proceso-registro.md) 