# Guía de Implementación

## Visión General
Esta guía proporciona los pasos necesarios para implementar Train Body Analyzer desde cero. Está dirigida a desarrolladores y detalla el proceso de configuración, desarrollo y despliegue de la aplicación.

## Requisitos Previos

### Conocimientos Técnicos
- Experiencia con React y Next.js
- Familiaridad con TypeScript
- Conocimientos básicos de bases de datos relacionales
- Comprensión de APIs REST

### Herramientas Necesarias
- Node.js (v16.0.0 o superior)
- npm o yarn
- Editor de código (VS Code recomendado)
- Git
- Cliente de base de datos (opcional)

## Configuración del Entorno

### 1. Crear Proyecto Next.js
```bash
# Crear un nuevo proyecto Next.js con TypeScript
npx create-next-app@latest train-body-analyzer --typescript

# Navegar al directorio del proyecto
cd train-body-analyzer
```

### 2. Instalar Dependencias
```bash
# Instalar shadcn/ui
npx shadcn-ui@latest init

# Instalar dependencias adicionales
npm install chart.js react-chartjs-2 uuid date-fns zod axios
```

### 3. Configurar Estructura de Directorios
```bash
# Crear estructura básica
mkdir -p app/components/ui
mkdir -p app/components/dashboard
mkdir -p app/components/charts
mkdir -p app/components/forms
mkdir -p app/lib/utils
mkdir -p app/lib/hooks
mkdir -p app/lib/types
mkdir -p app/lib/api
mkdir -p app/lib/ai
mkdir -p app/pages/dashboard
mkdir -p app/pages/profile
mkdir -p app/pages/analysis
mkdir -p app/pages/history
mkdir -p app/pages/settings
mkdir -p public/assets
```

## Implementación por Fases

### Fase 1: Configuración Básica y UI

#### 1. Configurar Tema y Estilos
Crear archivo `app/styles/globals.css` con estilos base y configuración de temas.

#### 2. Implementar Componentes UI Básicos
Utilizar shadcn/ui para crear componentes reutilizables:
- Botones
- Tarjetas
- Inputs
- Selectores
- Modales

#### 3. Crear Layout Principal
Implementar el layout principal con navegación y estructura base.

### Fase 2: Implementación de Gráficos y Visualizaciones

#### 1. Rueda de Estadísticas
Implementar el componente de gráfico radar para visualizar los 9 parámetros principales:

```jsx
// app/components/charts/StatWheel.tsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface StatWheelProps {
  data: number[];
  labels?: string[];
}

export const StatWheel: React.FC<StatWheelProps> = ({ 
  data, 
  labels = ['Volume', 'Potential', 'Endurance', 'Strength', 'Adaptability', 
            'Progress', 'Coordination', 'Agility', 'Consistency'] 
}) => {
  const chartData = {
    labels,
    datasets: [{
      label: 'Current Stats',
      data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
    }]
  };
  
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };
  
  return <Radar data={chartData} options={options} />;
};
```

#### 2. Visualización de Fit Score
Implementar el componente de medidor para el Fit Score.

#### 3. Visualización de DNA Grade
Implementar el componente de medalla para el DNA Grade.

#### 4. Gráficos de Progreso
Implementar gráficos de líneas para visualizar el progreso a lo largo del tiempo.

### Fase 3: Implementación de Lógica de Negocio

#### 1. Definir Tipos y Interfaces
Crear definiciones de tipos para todas las entidades del sistema:

```typescript
// app/lib/types/index.ts
export interface User {
  id: string;
  birthDate: Date;
  initialHeight: number;
  bloodType?: string;
  dnaHaplogroup?: string;
  knownMutations?: string[];
  registeredAt: Date;
}

export interface Metrics {
  id: string;
  userId: string;
  timestamp: Date;
  weight?: number;
  height?: number;
  bodyFatPercentage?: number;
  fitScore: number;
  dnaGrade: 'E' | 'C' | 'B' | 'A' | 'S' | 'SS';
  potential: number;
  volume: number;
  endurance: number;
  strength: number;
  adaptability: number;
  progress: number;
  coordination: number;
  agility: number;
  consistency: number;
}

// Más interfaces para TrainingLog, BiochemicalLog, Recommendation, etc.
```

#### 2. Implementar Funciones de Cálculo
Crear funciones para calcular Fit Score, DNA Grade y potencial:

```typescript
// app/lib/utils/calculations.ts
import { Metrics, TrainingLog, User } from '../types';

export function calculateFitScore(metrics: Partial<Metrics>): number {
  // Implementar fórmula de cálculo de Fit Score
  const {
    volume = 0,
    potential = 0,
    endurance = 0,
    strength = 0,
    adaptability = 0,
    progress = 0,
    coordination = 0,
    agility = 0,
    consistency = 0
  } = metrics;
  
  return Math.round(
    (volume * 0.10 +
     potential * 0.15 +
     endurance * 0.15 +
     strength * 0.15 +
     adaptability * 0.10 +
     progress * 0.10 +
     coordination * 0.10 +
     agility * 0.05 +
     consistency * 0.10) * 10
  );
}

export function calculatePotential(
  user: User,
  currentMetrics: Metrics,
  trainingLogs: TrainingLog[]
): number {
  // Implementar fórmula de potencial decreciente
  // (Ver detalles en Sistema de Historial)
}

// Más funciones de cálculo
```

#### 3. Implementar Servicios de API
Crear servicios para comunicación con el backend:

```typescript
// app/lib/api/metricsService.ts
import axios from 'axios';
import { Metrics } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getUserMetrics(userId: string): Promise<Metrics[]> {
  const response = await axios.get(`${API_URL}/users/${userId}/metrics`);
  return response.data;
}

export async function saveMetrics(metrics: Partial<Metrics>): Promise<Metrics> {
  const response = await axios.post(`${API_URL}/metrics`, metrics);
  return response.data;
}

// Más funciones de API
```

### Fase 4: Integración con IA

#### 1. Configurar Servicio de IA
Implementar servicio para comunicación con el modelo de IA:

```typescript
// app/lib/ai/aiService.ts
import axios from 'axios';
import { buildPrompt, processResponse } from './promptUtils';
import { User, Metrics, TrainingLog } from '../types';

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL;
const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY;

export async function analyzeUserData(
  user: User,
  metrics: Metrics[],
  trainingLogs: TrainingLog[]
) {
  try {
    const prompt = buildPrompt(user, metrics, trainingLogs);
    
    const response = await axios.post(
      AI_API_URL as string,
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`
        }
      }
    );
    
    return processResponse(response.data);
  } catch (error) {
    console.error('Error analyzing user data:', error);
    return fallbackAnalysis(user, metrics, trainingLogs);
  }
}

function fallbackAnalysis(
  user: User,
  metrics: Metrics[],
  trainingLogs: TrainingLog[]
) {
  // Implementar análisis de respaldo basado en reglas
}
```

#### 2. Implementar Utilidades de Prompt
Crear funciones para construir prompts y procesar respuestas:

```typescript
// app/lib/ai/promptUtils.ts
import { User, Metrics, TrainingLog } from '../types';

export function buildPrompt(
  user: User,
  metrics: Metrics[],
  trainingLogs: TrainingLog[]
) {
  // Construir prompt estructurado en formato JSON
  return {
    user_id: user.id,
    timestamp: new Date().toISOString(),
    task: "analyze_fitness",
    data: {
      // Formatear datos del usuario, métricas y logs
    },
    output_format: {
      fit_score: "number",
      dna_grade: "letter",
      potential: "decimal",
      recommendations: "array",
      insights: "object"
    }
  };
}

export function processResponse(response: any) {
  // Procesar y validar respuesta de la IA
  // Convertir a formato utilizable por la aplicación
}
```

### Fase 5: Implementación de Páginas

#### 1. Dashboard Principal
Implementar la página principal que muestra el resumen del estado del usuario.

#### 2. Perfil de Usuario
Implementar la página de perfil con formularios para editar información.

#### 3. Análisis Detallado
Implementar la página de análisis con desglose de parámetros.

#### 4. Historial
Implementar la página de historial con visualizaciones temporales.

#### 5. Configuración
Implementar la página de configuración con opciones personalizables.

### Fase 6: Pruebas y Optimización

#### 1. Pruebas Unitarias
Implementar pruebas para componentes y funciones clave:

```typescript
// app/lib/utils/__tests__/calculations.test.ts
import { calculateFitScore, calculatePotential } from '../calculations';

describe('calculateFitScore', () => {
  test('calculates correct score with all parameters', () => {
    const metrics = {
      volume: 80,
      potential: 90,
      endurance: 70,
      strength: 85,
      adaptability: 75,
      progress: 80,
      coordination: 65,
      agility: 60,
      consistency: 85
    };
    
    expect(calculateFitScore(metrics)).toBe(780);
  });
  
  // Más pruebas
});
```

#### 2. Pruebas de Integración
Implementar pruebas que verifiquen la interacción entre componentes.

#### 3. Optimización de Rendimiento
Optimizar componentes para mejorar el rendimiento:
- Memoización de componentes
- Carga diferida de datos
- Optimización de renderizado

## Despliegue

### 1. Preparación para Producción
```bash
# Construir la aplicación para producción
npm run build
```

### 2. Opciones de Despliegue
- **Vercel**: Plataforma recomendada para aplicaciones Next.js
- **Netlify**: Alternativa popular con CI/CD integrado
- **AWS/GCP/Azure**: Para despliegues más personalizados

### 3. Configuración de Variables de Entorno
Configurar variables de entorno necesarias en la plataforma de despliegue:
- API_URL
- AI_API_URL
- AI_API_KEY
- DATABASE_URL

## Mantenimiento y Actualizaciones

### 1. Monitoreo
Implementar herramientas de monitoreo:
- Errores de cliente (Sentry)
- Rendimiento (Lighthouse, Web Vitals)
- Uso de API (logs de servidor)

### 2. Actualizaciones
Plan para actualizaciones regulares:
- Nuevas características
- Mejoras en el modelo de IA
- Correcciones de errores
- Actualizaciones de dependencias

## Recursos Adicionales

### Documentación de Referencia
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Chart.js Documentation](https://www.chartjs.org/docs)

### Comunidad y Soporte
- GitHub Issues
- Discord/Slack (si está disponible)
- Correo de soporte

## Conexión con Otros Componentes
- Para entender los conceptos básicos, consulta [Conceptos Básicos](01-conceptos-basicos.md)
- Para comprender la arquitectura, consulta [Arquitectura del Sistema](02-arquitectura.md)
- Para detalles sobre la interfaz, consulta [Interfaz de Usuario](05-interfaz-usuario.md) 