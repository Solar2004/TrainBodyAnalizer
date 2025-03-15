# Métricas y Parámetros

## Parámetros Principales
El sistema Train Body Analyzer utiliza nueve parámetros principales que se visualizan en la rueda de estadísticas. A continuación, se detalla cada uno, incluyendo su definición, método de cálculo y rango de valores.

### 1. Volume (Volumen)
- **Definición**: Mide el volumen total de entrenamiento, considerando frecuencia, duración e intensidad.
- **Cálculo**: `Volume = (Frequency × Duration × Intensity) / MaxPossibleVolume × 100`
- **Rango**: 0-100
- **Fuentes de datos**: 
  - Registros de entrenamiento
  - Datos de wearables (pasos, calorías quemadas)
  - Auto-reportes de actividad física

### 2. Potential (Potencial)
- **Definición**: Representa el potencial genético y capacidad de mejora futura.
- **Cálculo**: Combinación de factores genéticos, edad y tasa de progreso histórica.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Información genética (si está disponible)
  - Edad
  - Historial de progreso
  - Factores limitantes (lesiones, condiciones médicas)

### 3. Endurance (Resistencia)
- **Definición**: Evalúa la resistencia cardiovascular y muscular.
- **Cálculo**: Combinación de métricas cardiovasculares y resistencia muscular.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Frecuencia cardíaca en reposo
  - Tiempo de recuperación tras esfuerzo
  - Capacidad para mantener actividad prolongada
  - Tests específicos (ej: tiempo en correr 5km)

### 4. Strength (Fuerza)
- **Definición**: Cuantifica la fuerza muscular en diferentes grupos musculares.
- **Cálculo**: Promedio ponderado de fuerza relativa en grupos musculares principales.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Peso máximo levantado en ejercicios compuestos
  - Fuerza relativa (fuerza/peso corporal)
  - Tests específicos (ej: número de repeticiones con peso corporal)

### 5. Adaptability (Adaptabilidad)
- **Definición**: Mide la capacidad del cuerpo para adaptarse a diferentes estímulos y condiciones.
- **Cálculo**: Tasa de mejora en respuesta a cambios en el entrenamiento y condiciones ambientales.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Velocidad de adaptación a nuevos estímulos
  - Tolerancia a cambios ambientales (temperatura, altitud)
  - Recuperación entre sesiones
  - Respuesta a diferentes tipos de entrenamiento

### 6. Progress (Progreso)
- **Definición**: Analiza la tasa de mejora a lo largo del tiempo.
- **Cálculo**: `Progress = (CurrentMetrics - InitialMetrics) / TimeElapsed × AgeAdjustmentFactor`
- **Rango**: 0-100
- **Fuentes de datos**:
  - Historial de métricas
  - Comparación con línea base
  - Velocidad de mejora relativa a la edad

### 7. Coordination (Coordinación)
- **Definición**: Evalúa la coordinación motriz y neuromuscular.
- **Cálculo**: Basado en tests de coordinación y precisión de movimientos.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Tests de equilibrio
  - Precisión en movimientos complejos
  - Coordinación mano-ojo
  - Capacidad para realizar tareas simultáneas

### 8. Agility (Agilidad)
- **Definición**: Mide la capacidad de cambiar de dirección y posición rápidamente.
- **Cálculo**: Basado en tiempo de reacción y velocidad de cambio de dirección.
- **Rango**: 0-100
- **Fuentes de datos**:
  - Tests de cambio de dirección
  - Tiempo de reacción
  - Velocidad en movimientos laterales
  - Flexibilidad dinámica

### 9. Consistency (Consistencia)
- **Definición**: Evalúa la regularidad y constancia en el entrenamiento.
- **Cálculo**: `Consistency = (ActualSessions / PlannedSessions) × RegularityFactor`
- **Rango**: 0-100
- **Fuentes de datos**:
  - Adherencia al plan de entrenamiento
  - Regularidad en los horarios
  - Cumplimiento de objetivos a corto plazo
  - Constancia en la intensidad

## Métricas Adicionales
Además de los parámetros principales, el sistema analiza y registra métricas adicionales que proporcionan un contexto más completo.

### Biotipo (Somatotipo)
- **Definición**: Clasificación de la estructura corporal según la teoría de los somatotipos.
- **Tipos**:
  - **Ectomorfo**: Estructura delgada, metabolismo rápido, dificultad para ganar masa muscular.
  - **Mesomorfo**: Estructura atlética, facilidad para ganar músculo y perder grasa.
  - **Endomorfo**: Estructura más ancha, tendencia a acumular grasa, facilidad para ganar fuerza.
- **Evaluación**: Combinación de medidas antropométricas, historia familiar y respuesta al entrenamiento.
- **Impacto**: Influye en las recomendaciones de entrenamiento, nutrición y expectativas de progreso.

### Salud Metabólica y Nutrición
- **Metabolismo basal**: 
  - Calorías quemadas en reposo
  - Medición: Fórmulas como Harris-Benedict con ajuste por actividad física
  - Rango: Varía según edad, peso, altura y sexo
- **Hidratación**: 
  - Nivel de hidratación celular
  - Medición: Frecuencia de micción, color de orina, auto-reporte o apps como HydroCoach
  - Rango: Escala 1-10 o porcentaje
- **Sensibilidad insulínica**: 
  - Capacidad para procesar carbohidratos
  - Medición: Registro de glucosa en sangre o síntomas de resistencia
  - Impacto: Afecta recomendaciones dietéticas y timing nutricional
- **Niveles de hierro**: 
  - Deficiencia/exceso que afecta energía y resistencia
  - Medición: Síntomas (fatiga, mareos) + historial médico
  - Relevancia: Crucial para rendimiento aeróbico
- **Inflamación crónica**: 
  - Marcadores como proteína C-reactiva (PCR)
  - Medición: Síntomas (dolor articular, hinchazón) o análisis médicos
  - Impacto: Afecta recuperación y adaptabilidad

### Neurofisiológicos y Cognitivos
- **Tiempo de reacción**: 
  - Velocidad de respuesta a estímulos
  - Medición: Tests online (ej: clic en pantalla al ver luz)
  - Relevancia: Componente clave de la agilidad
- **Resistencia al estrés**: 
  - Capacidad para mantener el rendimiento bajo presión
  - Medición: Escala de estrés percibido (1-10) + variabilidad de ritmo cardíaco
  - Impacto: Afecta consistencia y recuperación
- **Calidad del sueño**: 
  - Efectividad del sueño reparador
  - Medición: Wearables (Fitbit, Apple Watch) o apps como Sleep Cycle
  - Rango: 0-100% o escala 1-10
  - Relevancia: Fundamental para recuperación y adaptación
- **Coordinación ojo-mano**: 
  - Habilidad para sincronizar movimientos visuales y motores
  - Medición: Tests de lanzamiento/precisión
  - Contribución: Componente de la métrica de coordinación general

### Biomecánica y Movimiento
- **Rango de movimiento (ROM)**: 
  - Flexibilidad articular (ej: cadera, hombros)
  - Medición: Tests como "sit and reach" o apps de grabación de movimientos
  - Impacto: Afecta técnica y prevención de lesiones
- **Simetría corporal**: 
  - Balance entre lados del cuerpo
  - Medición: Análisis de video en ejercicios unilaterales
  - Relevancia: Prevención de lesiones y optimización de rendimiento
- **Técnica de ejercicio**: 
  - Eficiencia en la ejecución de movimientos
  - Medición: Grabación en video + IA para comparar con estándares
  - Contribución: Afecta eficiencia y seguridad del entrenamiento
- **Presión plantar**: 
  - Distribución del peso al caminar/correr
  - Medición: Plantillas inteligentes o auto-reporte de postura
  - Relevancia: Optimización de biomecánica de carrera

### Genética Avanzada
- **VO2 Max genético**: 
  - Potencial de capacidad aeróbica (gen PPARGC1A)
  - Medición: Datos de test genético (23andMe, MyHeritage)
  - Impacto: Predictor de rendimiento en deportes de resistencia
- **Tipo de fibra muscular**: 
  - Predominancia de fibras lentas o rápidas
  - Medición: Gen ACTN3 + test de rendimiento (sprint vs. maratón)
  - Relevancia: Determina aptitud para fuerza vs. resistencia
- **Sensibilidad al dolor**: 
  - Tolerancia al dolor (gen COMT)
  - Medición: Auto-reporte + datos genéticos
  - Impacto: Afecta intensidad de entrenamiento y recuperación
- **Detoxificación hepática**: 
  - Eficiencia para metabolizar toxinas (gen GST)
  - Medición: Historial de resaca/efectos de medicamentos
  - Relevancia: Recuperación y respuesta a suplementos

### Entorno y Estilo de Vida
- **Exposición a contaminantes**: 
  - Aire, agua o alimentos con toxinas
  - Medición: Ubicación geográfica + síntomas
  - Impacto: Afecta recuperación y rendimiento general
- **Carga alostática**: 
  - Estrés acumulado en el cuerpo
  - Medición: Encuesta de factores estresantes
  - Relevancia: Predictor de recuperación y adaptación
- **Red de apoyo social**: 
  - Influencia de relaciones en el bienestar
  - Medición: Escala de satisfacción social (1-10)
  - Impacto: Afecta adherencia y motivación
- **Hábitos digitales**: 
  - Tiempo en pantallas
  - Medición: Apps de bienestar digital
  - Relevancia: Afecta sueño y postura

### Análisis Genealógico y Herencia
- **Árbol genealógico**:
  - Estructura familiar hasta 4 generaciones
  - Ramas materna y paterna diferenciadas
  - Visualización de patrones hereditarios
- **Origen geográfico**:
  - Países y regiones de origen de antepasados
  - Grupos étnicos específicos
  - Influencia en predisposiciones genéticas
- **Características físicas heredadas**:
  - Rasgos dominantes en la familia
  - Patrones de herencia de color de ojos, pelo, etc.
  - Correlación con rendimiento físico
- **Biotipos familiares**:
  - Distribución de somatotipos en la familia
  - Tendencias hacia mesomorfia, ectomorfia o endomorfia
  - Predicción de respuesta al entrenamiento
- **Longevidad y salud**:
  - Patrones de longevidad en la familia
  - Enfermedades hereditarias
  - Factores de riesgo genéticos
- **Rendimiento atlético familiar**:
  - Deportes practicados por familiares
  - Nivel de actividad física intergeneracional
  - Talentos específicos heredados

### Datos Bioquímicos
- **Testosterona**: Niveles en ng/dL (hombres: 300-1000, mujeres: 15-70)
- **Cortisol**: Niveles en μg/dL (mañana: 5-23, tarde: 3-16)
- **Hormona de crecimiento**: Niveles en ng/mL (0.4-10)
- **Insulina**: Niveles en μIU/mL (en ayunas: 2-20)

### Datos Genéticos
- **Haplogrupo**: Clasificación de linaje genético
- **Mutaciones relevantes**: Variantes genéticas que afectan el rendimiento
- **Polimorfismos**: Variaciones genéticas específicas (ej: ACTN3, ACE)

### Composición Corporal
- **Porcentaje de grasa corporal**: Estimado mediante fórmulas o mediciones
- **Masa muscular**: En kg o como porcentaje del peso total
- **Densidad ósea**: Estimada mediante indicadores indirectos
- **Distribución de grasa**: Relación cintura-cadera, patrón de distribución

### Biomecánica
- **Estructura muscular**: Tipo de fibras predominantes (estimado)
- **Inserciones musculares**: Características anatómicas observables
- **Postura**: Alineación corporal y desbalances
- **Rango de movimiento**: Flexibilidad articular

### Datos Nutricionales
- **Ingesta calórica**: Calorías totales consumidas diariamente
- **Distribución de macronutrientes**: Porcentaje de proteínas, carbohidratos y grasas
- **Timing nutricional**: Distribución de comidas a lo largo del día
- **Alimentos habituales**: Registro de alimentos consumidos frecuentemente
- **Suplementación**: Suplementos utilizados y su frecuencia
- **Hidratación**: Consumo diario de agua y otros líquidos
- **Intolerancias/alergias**: Reacciones adversas a ciertos alimentos

## Indicadores de Densidad Ósea
La densidad ósea se estima mediante una combinación de indicadores indirectos:

1. **Actividad física**:
   - Tipo: Ejercicios de alto impacto vs. bajo impacto
   - Frecuencia: Días por semana
   - Duración: Minutos por sesión
   - Historial: Años de actividad consistente

2. **Historial de fracturas**:
   - Número de fracturas
   - Gravedad
   - Circunstancias (traumáticas vs. por estrés)
   - Tiempo de recuperación

3. **Dieta**:
   - Ingesta de calcio (mg/día)
   - Consumo de vitamina D (UI/día)
   - Proteína (g/kg de peso corporal)
   - Otros nutrientes relevantes (magnesio, vitamina K)

4. **Factores de riesgo**:
   - Edad
   - Sexo
   - Historial familiar
   - Medicamentos que afectan la densidad ósea

## Conexión con Otros Componentes
- Para entender cómo se calculan las puntuaciones basadas en estas métricas, consulta [Sistema de Puntuación](04-sistema-puntuacion.md)
- Para ver cómo se visualizan estas métricas, consulta [Interfaz de Usuario](05-interfaz-usuario.md)
- Para entender cómo se almacenan y analizan históricamente, consulta [Sistema de Historial](07-sistema-historial.md)
- Para conocer el proceso de registro y recopilación de datos, consulta [Proceso de Registro](09-proceso-registro.md) 