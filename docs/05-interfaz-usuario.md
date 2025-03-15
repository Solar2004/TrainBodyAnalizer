# Interfaz de Usuario

## Visión General
La interfaz de usuario de Train Body Analyzer está diseñada para ser intuitiva, visualmente atractiva y altamente funcional. Utiliza componentes modernos de React con Next.js y shadcn/ui para proporcionar una experiencia fluida en todos los dispositivos.

## Estructura Principal

### 1. Navegación
- **Barra de navegación superior**: Acceso a las secciones principales
- **Menú lateral** (en dispositivos grandes): Navegación detallada y accesos rápidos
- **Menú de hamburguesa** (en dispositivos móviles): Navegación compacta

### 2. Dashboard Principal
El dashboard es la pantalla principal que muestra un resumen del estado actual del usuario:

![Dashboard Mockup](../assets/dashboard-mockup.png) *(Nota: Esta imagen es referencial)*

#### Componentes del Dashboard
1. **Rueda de Estadísticas**: Gráfico radar con los 9 parámetros principales
2. **Fit Score**: Visualización prominente del puntaje actual
3. **DNA Grade**: Visualización del grado genético con diseño tipo "medalla"
4. **Progreso Reciente**: Gráfico de líneas mostrando la evolución del Fit Score
5. **Recomendaciones**: Panel con sugerencias personalizadas de la IA
6. **Métricas Destacadas**: Tarjetas con métricas clave y su estado
7. **Botón de Análisis**: Botón prominente para solicitar un nuevo análisis de todos los logs

## Páginas Principales

### 1. Dashboard
Como se describió anteriormente, muestra un resumen general del estado del usuario.

### 2. Perfil
Muestra y permite editar la información básica del usuario:
- Datos personales (edad, altura, peso)
- Información genética
- Objetivos de fitness
- Preferencias de entrenamiento
- Biotipo (somatotipo)

### 3. Análisis Detallado
Proporciona un análisis en profundidad de cada parámetro:
- Desglose de cada componente del Fit Score
- Comparación con promedios poblacionales
- Análisis de fortalezas y debilidades
- Recomendaciones específicas para cada parámetro

### 4. Historial
Muestra la evolución de las métricas a lo largo del tiempo:
- Gráficos de tendencias para Fit Score y parámetros individuales
- Visualización del potencial decreciente
- Hitos y logros alcanzados
- Comparación de períodos

### 5. Registro de Datos
Permite al usuario ingresar nuevos datos:
- Registros de entrenamiento
- Mediciones corporales
- Resultados de pruebas físicas
- Datos bioquímicos (si están disponibles)

### 6. Nutrición y Dieta
Sección dedicada a la gestión de la información nutricional:
- Registro de alimentos consumidos
- Ejemplos de comidas habituales
- Análisis de patrones alimentarios
- Recomendaciones dietéticas personalizadas
- Botón de análisis para generar nuevas recomendaciones basadas en los logs actuales

### 7. Configuración
Permite personalizar la aplicación:
- Preferencias de visualización
- Notificaciones
- Privacidad y compartición de datos
- Integración con dispositivos externos

## Componentes Clave de UI

### 1. Rueda de Estadísticas
La rueda de estadísticas es un componente central que visualiza los 9 parámetros principales en un gráfico radar:

```jsx
// Ejemplo de implementación con Chart.js
import { Radar } from 'react-chartjs-2';

const StatWheel = ({ data }) => {
  const chartData = {
    labels: ['Volume', 'Potential', 'Endurance', 'Strength', 'Adaptability', 
             'Progress', 'Coordination', 'Agility', 'Consistency'],
    datasets: [{
      label: 'Current Stats',
      data: data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
    }]
  };
  
  return <Radar data={chartData} />;
};
```

### 2. Visualización del Fit Score
El Fit Score se muestra como un medidor circular con código de colores:

```jsx
// Ejemplo conceptual
const FitScoreGauge = ({ score }) => {
  // Determinar color basado en el puntaje
  const getColor = (score) => {
    if (score >= 800) return '#4CAF50'; // Verde
    if (score >= 600) return '#2196F3'; // Azul
    if (score >= 400) return '#FF9800'; // Naranja
    return '#F44336'; // Rojo
  };
  
  return (
    <div className="fit-score-container">
      <div className="gauge" style={{ 
        background: `conic-gradient(${getColor(score)} ${score/10}%, #e0e0e0 0)` 
      }}>
        <div className="score">{score}</div>
      </div>
      <div className="label">Fit Score</div>
    </div>
  );
};
```

### 3. Visualización del DNA Grade
El DNA Grade se muestra con un diseño tipo "medalla" que refleja su nivel:

```jsx
// Ejemplo conceptual
const DNAGradeBadge = ({ grade }) => {
  // Mapeo de grados a colores y estilos
  const gradeStyles = {
    'SS': { color: '#FFD700', background: '#2C3E50', border: '2px solid #FFD700' },
    'S': { color: '#C0C0C0', background: '#2C3E50', border: '2px solid #C0C0C0' },
    'A': { color: '#CD7F32', background: '#2C3E50', border: '2px solid #CD7F32' },
    'B': { color: '#4CAF50', background: '#2C3E50', border: '2px solid #4CAF50' },
    'C': { color: '#2196F3', background: '#2C3E50', border: '2px solid #2196F3' },
    'E': { color: '#F44336', background: '#2C3E50', border: '2px solid #F44336' },
  };
  
  return (
    <div className="dna-grade-container">
      <div className="badge" style={gradeStyles[grade]}>
        {grade}
      </div>
      <div className="label">DNA Grade</div>
    </div>
  );
};
```

### 4. Gráficos de Progreso
Los gráficos de progreso muestran la evolución de las métricas a lo largo del tiempo:

```jsx
// Ejemplo con Chart.js
import { Line } from 'react-chartjs-2';

const ProgressChart = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [{
      label: 'Fit Score',
      data,
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };
  
  return <Line data={chartData} />;
};
```

### 5. Tarjetas de Recomendaciones
Las recomendaciones de la IA se muestran en tarjetas interactivas:

```jsx
// Ejemplo conceptual
const RecommendationCard = ({ title, description, priority }) => {
  // Prioridad: high, medium, low
  const priorityColors = {
    high: '#F44336',
    medium: '#FF9800',
    low: '#4CAF50'
  };
  
  return (
    <div className="recommendation-card">
      <div className="priority-indicator" style={{ background: priorityColors[priority] }}></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="action-button">Implementar</button>
    </div>
  );
};
```

### 6. Botón de Análisis
El botón de análisis permite al usuario solicitar un nuevo análisis completo de todos sus datos:

```jsx
// Ejemplo conceptual
const AnalysisButton = ({ onAnalyze, isLoading }) => {
  return (
    <button 
      className={`analysis-button ${isLoading ? 'loading' : ''}`}
      onClick={onAnalyze}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          Analizando datos...
        </>
      ) : (
        <>
          <span className="icon">🔍</span>
          Analizar todos los logs
        </>
      )}
    </button>
  );
};
```

### 7. Registro Dietético
Interfaz para registrar y visualizar información nutricional:

```jsx
// Ejemplo conceptual
const DietaryLogForm = ({ onSubmit }) => {
  const [meal, setMeal] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ meal, description, time });
    // Limpiar formulario
    setMeal('');
    setDescription('');
    setTime('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="dietary-log-form">
      <h3>Registrar Comida</h3>
      
      <div className="form-group">
        <label>Tipo de Comida</label>
        <select value={meal} onChange={(e) => setMeal(e.target.value)} required>
          <option value="">Seleccionar...</option>
          <option value="breakfast">Desayuno</option>
          <option value="lunch">Almuerzo</option>
          <option value="dinner">Cena</option>
          <option value="snack">Snack</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Descripción</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe los alimentos consumidos"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Hora</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="submit-button">Guardar</button>
    </form>
  );
};
```

## Diseño Responsivo
La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla:

### Desktop (>1024px)
- Diseño de múltiples columnas
- Menú lateral visible
- Visualizaciones grandes y detalladas

### Tablet (768px-1024px)
- Diseño de dos columnas
- Menú lateral colapsable
- Visualizaciones adaptadas al espacio disponible

### Mobile (<768px)
- Diseño de una columna
- Menú de hamburguesa
- Visualizaciones simplificadas y apiladas
- Interacciones optimizadas para pantalla táctil

## Temas y Personalización
La aplicación ofrece temas claro y oscuro, así como opciones de personalización:

```jsx
// Ejemplo de implementación de tema
const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button 
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};
```

## Flujo de Análisis de Logs

### 1. Recopilación de Datos
- El usuario ingresa datos en diferentes secciones (entrenamiento, dieta, medidas)
- Los datos se almacenan en la base de datos como logs individuales

### 2. Solicitud de Análisis
- El usuario hace clic en el botón "Analizar todos los logs"
- Se muestra un indicador de carga mientras se procesa la solicitud

### 3. Procesamiento por IA
- La aplicación recopila todos los logs relevantes
- Se envían al servicio de IA para su análisis
- La IA procesa los datos y genera resultados

### 4. Visualización de Resultados
- Se actualiza la rueda de estadísticas con los nuevos valores
- Se actualiza el Fit Score y DNA Grade
- Se muestran nuevas recomendaciones personalizadas
- Se destacan cambios significativos respecto al análisis anterior

## Accesibilidad
La interfaz cumple con las pautas WCAG 2.1:
- Contraste adecuado
- Etiquetas para lectores de pantalla
- Navegación por teclado
- Textos alternativos para imágenes

## Conexión con Otros Componentes
- Para entender las métricas visualizadas, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para comprender el cálculo de puntuaciones mostradas, consulta [Sistema de Puntuación](04-sistema-puntuacion.md)
- Para entender cómo la IA genera las recomendaciones, consulta [Integración con IA](06-integracion-ia.md)
- Para conocer el proceso de registro y recopilación inicial de datos, consulta [Proceso de Registro](09-proceso-registro.md) 