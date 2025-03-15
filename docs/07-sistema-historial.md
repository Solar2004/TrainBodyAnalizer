# Sistema de Historial

## Visión General
El sistema de historial de Train Body Analyzer permite realizar un seguimiento detallado de la evolución del usuario a lo largo del tiempo. Este componente es crucial para analizar tendencias, medir el progreso y ajustar el potencial genético en función de la edad y otros factores.

## Estructura de Datos

### 1. Esquema de Base de Datos
El sistema utiliza un esquema de base de datos relacional para almacenar el historial:

```sql
-- Perfil Base (Datos estáticos o de cambio lento)
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    birth_date DATE,
    initial_height FLOAT,
    blood_type VARCHAR(3),
    dna_haplogroup TEXT,
    known_mutations TEXT[],
    registered_at TIMESTAMP
);

-- Historial de Métricas (Datos dinámicos)
CREATE TABLE metrics_history (
    metric_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    timestamp TIMESTAMP,
    weight FLOAT,
    height FLOAT,
    body_fat_percentage FLOAT,
    fit_score INT,
    dna_grade VARCHAR(2),
    potential DECIMAL(3,2),
    volume INT,
    endurance INT,
    strength INT,
    adaptability INT,
    progress INT,
    coordination INT,
    agility INT,
    consistency INT
);

-- Historial de Entrenamiento
CREATE TABLE training_logs (
    log_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    activity_type VARCHAR(50),
    duration INT,
    intensity DECIMAL(3,2),
    recovery_quality DECIMAL(3,2),
    notes TEXT,
    logged_at TIMESTAMP
);

-- Historial de Datos Bioquímicos
CREATE TABLE biochemical_logs (
    log_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    testosterone FLOAT,
    cortisol FLOAT,
    growth_hormone FLOAT,
    insulin FLOAT,
    other_markers JSONB,
    measured_at TIMESTAMP
);

-- Historial de Recomendaciones
CREATE TABLE recommendations_history (
    recommendation_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    title VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    priority VARCHAR(20),
    expected_impact DECIMAL(3,2),
    is_implemented BOOLEAN,
    implementation_date TIMESTAMP,
    created_at TIMESTAMP
);
```

### 2. Tipos de Datos Históricos
El sistema almacena diferentes tipos de datos históricos:

- **Métricas Principales**: Fit Score, parámetros individuales, peso, composición corporal
- **Datos de Entrenamiento**: Sesiones, intensidad, recuperación
- **Datos Bioquímicos**: Niveles hormonales y otros marcadores
- **Recomendaciones**: Historial de recomendaciones y su implementación

## Funcionalidad del Sistema de Historial

### 1. Registro de Datos
El sistema registra automáticamente:
- Cambios en las métricas principales
- Nuevas sesiones de entrenamiento
- Actualizaciones de datos bioquímicos
- Recomendaciones generadas

### 2. Análisis de Tendencias
El sistema analiza los datos históricos para identificar:
- Tasas de progreso en diferentes métricas
- Patrones de entrenamiento efectivos
- Correlaciones entre variables
- Estancamientos o retrocesos

### 3. Visualización Temporal
Los datos históricos se visualizan mediante:
- Gráficos de líneas para métricas a lo largo del tiempo
- Gráficos de barras para comparar períodos
- Mapas de calor para identificar patrones
- Líneas de tendencia y proyecciones

## Potencial Decreciente

### 1. Concepto
El potencial genético (reflejado en el DNA Grade) no es estático, sino que disminuye con el tiempo debido a:
- El envejecimiento natural
- La aproximación al límite genético
- El sobreentrenamiento crónico
- Lesiones o condiciones médicas

### 2. Fórmula de Cálculo
```
Potential = BaseGenetic × AgeFactor × ProgressionFactor × RecoveryQuality
```

Donde:
- **BaseGenetic**: Valor base según DNA Grade (SS=1.0, S=0.9, A=0.8, etc.)
- **AgeFactor**: `1.0 - (max(age - 30, 0) * 0.005)`
- **ProgressionFactor**: `1.0 - (current_fit_score / max_genetic_score)²`
- **RecoveryQuality**: Factor entre 0.5-1.5 basado en calidad de recuperación

### 3. Implementación
```javascript
// Ejemplo conceptual
function calculatePotential(user) {
  // Obtener datos necesarios
  const age = calculateAge(user.birth_date);
  const currentFitScore = user.latest_metrics.fit_score;
  const dnaGrade = user.latest_metrics.dna_grade;
  const recoveryQuality = calculateRecoveryQuality(user.training_logs);
  
  // Determinar máximo teórico según DNA Grade
  const maxScores = {
    'SS': 1000,
    'S': 950,
    'A': 900,
    'B': 850,
    'C': 800,
    'E': 750
  };
  const maxGeneticScore = maxScores[dnaGrade];
  
  // Calcular factores
  const baseGenetic = {'SS': 1.0, 'S': 0.9, 'A': 0.8, 'B': 0.7, 'C': 0.6, 'E': 0.5}[dnaGrade];
  const ageFactor = 1.0 - (Math.max(age - 30, 0) * 0.005);
  const progressionFactor = 1.0 - Math.pow(currentFitScore / maxGeneticScore, 2);
  
  // Calcular potencial final
  const potential = baseGenetic * ageFactor * progressionFactor * recoveryQuality;
  
  // Limitar a rango 0-1
  return Math.max(Math.min(potential, 1.0), 0.0);
}
```

### 4. Ajuste del DNA Grade
El DNA Grade puede ajustarse a la baja si:
- El potencial cae por debajo de ciertos umbrales
- El usuario alcanza más del 95% del máximo teórico para su grado actual
- Hay evidencia de sobreentrenamiento crónico

```javascript
// Ejemplo conceptual
function adjustDNAGrade(user, potential) {
  const currentGrade = user.latest_metrics.dna_grade;
  const currentFitScore = user.latest_metrics.fit_score;
  const maxScores = {'SS': 1000, 'S': 950, 'A': 900, 'B': 850, 'C': 800, 'E': 750};
  
  // Verificar si está cerca del límite
  const isNearLimit = currentFitScore >= (maxScores[currentGrade] * 0.95);
  
  // Verificar umbral de potencial
  const potentialThresholds = {'SS': 0.85, 'S': 0.75, 'A': 0.65, 'B': 0.55, 'C': 0.45};
  const isBelowThreshold = potential < potentialThresholds[currentGrade];
  
  // Determinar si debe bajar de grado
  if ((isNearLimit || isBelowThreshold) && currentGrade !== 'E') {
    const grades = ['E', 'C', 'B', 'A', 'S', 'SS'];
    const currentIndex = grades.indexOf(currentGrade);
    return grades[currentIndex - 1];
  }
  
  return currentGrade;
}
```

## Ejemplos de Evolución del Potencial

### Ejemplo 1: Atleta Joven (22 años)
| Año | Fit Score | DNA Grade | Potencial | Notas |
|-----|-----------|-----------|-----------|-------|
| 1   | 650       | SS        | 0.98      | Potencial casi intacto |
| 2   | 720       | SS        | 0.95      | Ligera disminución por progreso |
| 3   | 780       | SS        | 0.91      | Continúa disminuyendo gradualmente |

### Ejemplo 2: Atleta de Mediana Edad (35 años)
| Año | Fit Score | DNA Grade | Potencial | Notas |
|-----|-----------|-----------|-----------|-------|
| 1   | 800       | A         | 0.70      | Potencial moderado por edad |
| 2   | 830       | A         | 0.65      | Disminución por edad y progreso |
| 3   | 850       | A         | 0.58      | Acercándose al límite de su grado |
| 4   | 870       | B         | 0.62      | Bajó de grado, potencial reajustado |

### Ejemplo 3: Atleta con Sobreentrenamiento
| Año | Fit Score | DNA Grade | Potencial | Notas |
|-----|-----------|-----------|-----------|-------|
| 1   | 750       | S         | 0.85      | Buen potencial inicial |
| 2   | 780       | S         | 0.80      | Ligera disminución normal |
| 3   | 790       | S         | 0.65      | Caída por sobreentrenamiento (RecoveryQuality = 0.7) |
| 4   | 770       | A         | 0.70      | Bajó de grado, pero mejoró recuperación |

## Visualización del Historial

### 1. Gráfico de Evolución Dual
Un gráfico que muestra simultáneamente:
- Línea ascendente: Fit Score a lo largo del tiempo
- Línea descendente: Potencial a lo largo del tiempo

```jsx
// Ejemplo conceptual con Chart.js
import { Line } from 'react-chartjs-2';

const DualEvolutionChart = ({ historyData }) => {
  const labels = historyData.map(entry => entry.date);
  const fitScores = historyData.map(entry => entry.fit_score);
  const potentials = historyData.map(entry => entry.potential * 1000); // Escalar para visualización
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Fit Score',
        data: fitScores,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Potencial',
        data: potentials,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y',
      }
    ]
  };
  
  return <Line data={data} />;
};
```

### 2. Línea de Tiempo de DNA Grade
Una visualización que muestra los cambios en el DNA Grade a lo largo del tiempo:

```jsx
// Ejemplo conceptual
const DNAGradeTimeline = ({ gradeHistory }) => {
  const gradeColors = {
    'SS': '#FFD700',
    'S': '#C0C0C0',
    'A': '#CD7F32',
    'B': '#4CAF50',
    'C': '#2196F3',
    'E': '#F44336'
  };
  
  return (
    <div className="dna-timeline">
      {gradeHistory.map((entry, index) => (
        <div key={index} className="timeline-entry">
          <div className="date">{entry.date}</div>
          <div className="grade-badge" style={{ backgroundColor: gradeColors[entry.grade] }}>
            {entry.grade}
          </div>
          <div className="event">{entry.event}</div>
        </div>
      ))}
    </div>
  );
};
```

## Exportación e Importación de Datos

### 1. Exportación
El sistema permite exportar el historial completo en formatos estándar:
- JSON para uso técnico
- CSV para análisis en hojas de cálculo
- PDF para informes impresos

### 2. Importación
El sistema puede importar datos de:
- Versiones anteriores de la aplicación
- Dispositivos wearables (Fitbit, Garmin, etc.)
- Aplicaciones de fitness de terceros
- Análisis médicos (formato estructurado)

## Conexión con Otros Componentes
- Para entender las métricas que se registran, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para comprender el cálculo de puntuaciones, consulta [Sistema de Puntuación](04-sistema-puntuacion.md)
- Para entender cómo la IA utiliza los datos históricos, consulta [Integración con IA](06-integracion-ia.md) 