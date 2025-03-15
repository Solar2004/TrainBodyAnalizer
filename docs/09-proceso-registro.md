# Proceso de Registro y Recopilación de Datos

## Visión General
El proceso de registro y recopilación de datos en Train Body Analyzer está diseñado para ser intuitivo pero completo, permitiendo al sistema obtener toda la información necesaria para realizar un análisis preciso del estado físico y potencial del usuario.

## Flujo de Registro

### 1. Creación de Cuenta
- **Información básica**: Nombre, correo electrónico, contraseña
- **Verificación**: Confirmación por correo electrónico
- **Términos y condiciones**: Aceptación de política de privacidad y uso de datos

### 2. Formulario Inicial de Datos

#### Datos Personales
- **Información demográfica**:
  - Edad
  - Sexo
  - Altura
  - Peso actual
  - País de residencia
- **Historial médico básico**:
  - Condiciones médicas relevantes
  - Lesiones previas
  - Medicamentos actuales
  - Alergias

#### Biotipo y Composición Corporal
- **Evaluación de somatotipo**:
  - Cuestionario sobre características físicas
  - Subida de fotografías (opcional, para análisis más preciso)
  - Medidas corporales (circunferencias de extremidades, cintura, cadera)
- **Estimación de composición corporal**:
  - Porcentaje de grasa corporal (si se conoce)
  - Distribución de grasa (donde tiende a acumularse)
- **Características físicas personales**:
  - Color de ojos
  - Color de pelo
  - Tono de piel
  - Estructura ósea
  - Altura relativa en la familia
  - Otras características distintivas

#### Árbol Genealógico y Herencia
- **Estructura del árbol**:
  - Hasta 4 generaciones (bisabuelos, abuelos, padres, usuario)
  - Ramas materna y paterna claramente diferenciadas
  - Posibilidad de añadir hermanos y otros familiares relevantes
- **Información por familiar**:
  - Relación con el usuario (padre, madre, abuelo materno, etc.)
  - País o región de origen (seleccionable de lista o escribiendo)
  - Origen étnico específico (ej: vasco, celta, yoruba, han, etc.)
  - Biotipo (mesomorfo, ectomorfo, endomorfo o mixto)
  - Características físicas principales:
    - Color de ojos
    - Color de pelo
    - Altura aproximada
    - Complexión
    - Longevidad
    - Enfermedades hereditarias
  - Descripción libre de características distintivas
  - Nivel de actividad física y deportes practicados
- **Visualización interactiva**:
  - Árbol genealógico visual con iconos representativos
  - Codificación por colores según origen geográfico
  - Indicadores de características heredadas dominantes

#### Historial de Actividad Física
- **Experiencia previa**:
  - Nivel de actividad física (sedentario, moderado, activo, muy activo)
  - Años de entrenamiento
  - Deportes practicados
- **Entrenamiento actual**:
  - Tipo de entrenamiento (fuerza, resistencia, flexibilidad, etc.)
  - Frecuencia semanal
  - Duración de sesiones
  - Intensidad habitual

#### Información Genética y Bioquímica
- **Datos genéticos** (opcional):
  - Resultados de tests genéticos previos
  - Haplogrupo conocido
  - Polimorfismos relevantes (ACTN3, ACE, etc.)
- **Datos bioquímicos** (opcional):
  - Niveles hormonales recientes
  - Resultados de análisis sanguíneos

#### Nutrición y Dieta
- **Hábitos alimenticios**:
  - Patrón de alimentación (número de comidas, horarios)
  - Preferencias alimentarias
  - Restricciones dietéticas (vegetariano, vegano, etc.)
- **Registro dietético**:
  - Ejemplo de dieta diaria típica
  - Alimentos consumidos frecuentemente
  - Suplementos utilizados

#### Objetivos y Preferencias
- **Metas de fitness**:
  - Objetivos principales (pérdida de grasa, ganancia muscular, rendimiento, salud)
  - Plazo deseado
  - Prioridades específicas
- **Preferencias de entrenamiento**:
  - Tipos de ejercicio preferidos
  - Disponibilidad de tiempo
  - Acceso a equipamiento

## Procesamiento de Datos

### 1. Validación y Normalización
- **Verificación de datos**: Comprobación de valores dentro de rangos normales
- **Normalización**: Conversión a unidades estándar
- **Detección de anomalías**: Identificación de valores atípicos para verificación

### 2. Análisis por IA
- **Procesamiento de texto**: Conversión de respuestas textuales a datos estructurados
- **Clasificación**: Asignación de categorías (ej: biotipo, nivel de experiencia)
- **Estimación de parámetros**: Cálculo de métricas iniciales basadas en datos proporcionados
- **Análisis genealógico**: Identificación de patrones hereditarios y predisposiciones genéticas

### 3. Generación de Perfil Inicial
- **Cálculo de Fit Score inicial**: Basado en datos proporcionados
- **Estimación de DNA Grade**: Utilizando información genética, genealógica e indicadores indirectos
- **Creación de línea base**: Establecimiento de valores iniciales para todas las métricas
- **Mapa de herencia**: Visualización de características heredadas y su influencia

## Interfaz de Recopilación de Datos

### 1. Formularios Inteligentes
- **Diseño adaptativo**: Preguntas que se ajustan según respuestas previas
- **Progreso visual**: Barra de progreso y secciones claramente definidas
- **Ayuda contextual**: Explicaciones y ejemplos para cada campo

### 2. Opciones de Entrada de Datos
- **Texto libre**: Para descripciones detalladas
- **Selectores**: Para opciones predefinidas
- **Escalas**: Para evaluaciones subjetivas (1-10)
- **Subida de archivos**: Para informes médicos, resultados de tests, etc.
- **Integración con dispositivos**: Importación de datos desde wearables y apps

### 3. Constructor de Árbol Genealógico
- **Interfaz drag-and-drop**: Para añadir y organizar familiares
- **Plantillas predefinidas**: Estructuras familiares comunes para agilizar el proceso
- **Búsqueda de países y etnias**: Autocompletado con más de 200 países y 1000 grupos étnicos
- **Selector de características**: Interfaz visual para seleccionar rasgos físicos
- **Herencia automática**: Sugerencias de características basadas en patrones familiares
- **Visualización en tiempo real**: Actualización del árbol mientras se añade información

### 4. Ejemplo de Formulario de Familiar
```
INFORMACIÓN DE FAMILIAR

1. Relación con el usuario:
   [Selector: Padre, Madre, Abuelo paterno, Abuela paterna, etc.]

2. País o región de origen:
   [Selector con búsqueda: España, Italia, Nigeria, etc.]

3. Origen étnico específico (opcional):
   [Selector con búsqueda: Vasco, Catalán, Yoruba, Han, etc.]

4. Biotipo:
   [Selector con imágenes: Ectomorfo, Mesomorfo, Endomorfo, Mixto]

5. Características físicas:
   - Color de ojos: [Selector: Azul, Verde, Marrón, Negro, etc.]
   - Color de pelo: [Selector: Rubio, Castaño, Negro, Pelirrojo, etc.]
   - Altura aproximada: [Selector: Muy baja, Baja, Media, Alta, Muy alta]
   - Complexión: [Selector: Delgada, Media, Robusta]

6. Longevidad (si aplica):
   [Selector: <60 años, 60-70 años, 70-80 años, 80-90 años, >90 años]

7. Enfermedades hereditarias conocidas:
   [Selector múltiple: Diabetes, Hipertensión, Cardiopatías, etc.]

8. Nivel de actividad física:
   [Selector: Sedentario, Poco activo, Moderadamente activo, Muy activo, Atlético]

9. Deportes o actividades físicas practicadas:
   [Texto libre con sugerencias]

10. Características distintivas adicionales:
    [Texto libre]
```

### 5. Ejemplo de Formulario de Dieta

```
REGISTRO DIETÉTICO

1. ¿Cuántas comidas realizas habitualmente al día?
   [Selector: 1-8+]

2. Describe tu desayuno típico:
   [Texto libre]

3. Describe tu almuerzo típico:
   [Texto libre]

4. Describe tu cena típica:
   [Texto libre]

5. Otras comidas o snacks habituales:
   [Texto libre]

6. ¿Sigues alguna dieta específica?
   [Opciones múltiples: Omnívora, Vegetariana, Vegana, Keto, Paleo, etc.]

7. ¿Tienes alguna restricción alimentaria?
   [Opciones múltiples: Sin gluten, Sin lactosa, etc.]

8. Suplementos que consumes regularmente:
   [Texto libre con sugerencias]

9. Consumo aproximado de agua diario:
   [Selector: <1L, 1-2L, 2-3L, >3L]

10. Alimentos que consumes frecuentemente (3+ veces por semana):
    [Lista con checkboxes]
```

## Actualización Continua de Datos

### 1. Recordatorios y Notificaciones
- **Actualizaciones periódicas**: Recordatorios para actualizar medidas y progreso
- **Seguimiento de cambios**: Notificaciones sobre cambios significativos en métricas

### 2. Registro de Entrenamiento
- **Diario de ejercicios**: Interfaz para registrar sesiones de entrenamiento
- **Plantillas personalizadas**: Rutinas guardadas para facilitar el registro
- **Integración con apps**: Sincronización con aplicaciones populares de fitness

### 3. Registro Nutricional
- **Diario alimentario**: Interfaz para registrar comidas y alimentos
- **Base de datos de alimentos**: Información nutricional detallada
- **Análisis de patrones**: Identificación de hábitos alimentarios

### 4. Ampliación del Árbol Genealógico
- **Adición progresiva**: Posibilidad de añadir más familiares con el tiempo
- **Mejora de detalles**: Refinamiento de información existente
- **Importación de datos**: Integración con servicios de genealogía (opcional)

## Visualización Post-Registro

### 1. Dashboard Inicial
Tras completar el registro, el usuario es dirigido a su dashboard personalizado que muestra:
- **Rueda de Estadísticas**: Visualización de los 9 parámetros principales
- **Fit Score**: Puntuación inicial basada en los datos proporcionados
- **DNA Grade**: Clasificación de potencial genético estimado
- **Árbol Genealógico**: Visualización simplificada con características clave
- **Recomendaciones iniciales**: Sugerencias personalizadas basadas en el perfil

### 2. Análisis Detallado
- **Desglose de parámetros**: Explicación de cada componente y su valor
- **Comparativas**: Posicionamiento respecto a promedios poblacionales
- **Áreas de mejora**: Identificación de puntos débiles y oportunidades
- **Análisis de herencia**: Visualización de características heredadas y su influencia

### 3. Plan Personalizado
- **Recomendaciones de entrenamiento**: Sugerencias específicas según perfil
- **Guía nutricional**: Ajustes dietéticos recomendados
- **Objetivos a corto plazo**: Metas alcanzables para las próximas semanas

## Privacidad y Seguridad de Datos

### 1. Protección de Datos Sensibles
- **Cifrado**: Datos personales y médicos cifrados en reposo y en tránsito
- **Anonimización**: Datos utilizados para análisis agregados sin identificadores personales
- **Acceso controlado**: Permisos estrictos para acceso a información sensible

### 2. Control del Usuario
- **Configuración de privacidad**: Opciones para controlar qué datos se comparten
- **Exportación de datos**: Posibilidad de descargar todos los datos personales
- **Eliminación de cuenta**: Proceso claro para eliminar todos los datos del sistema

## Conexión con Otros Componentes
- Para entender cómo se utilizan estos datos en el análisis, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para ver cómo se visualizan los resultados, consulta [Interfaz de Usuario](05-interfaz-usuario.md)
- Para comprender cómo la IA procesa estos datos, consulta [Integración con IA](06-integracion-ia.md) 