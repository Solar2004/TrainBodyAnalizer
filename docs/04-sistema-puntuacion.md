# Sistema de Puntuación

## Visión General
Train Body Analyzer utiliza un sistema de puntuación dual para evaluar el estado físico actual y el potencial genético de los usuarios:

1. **Fit Score**: Una puntuación numérica (0-1000) que representa el nivel de fitness general actual.
2. **DNA Grade**: Una clasificación alfabética (E, C, B, A, S, SS) que representa el potencial genético.

Este sistema permite a los usuarios entender tanto su estado actual como su potencial máximo teórico.

## Fit Score (0-1000)

### Componentes del Fit Score
El Fit Score es una puntuación ponderada que combina los nueve parámetros principales y la calidad dietética:

| Parámetro    | Peso (%) | Justificación                                      |
|--------------|----------|---------------------------------------------------|
| Volume       | 10       | Indica cantidad de entrenamiento                   |
| Potential    | 15       | Refleja capacidad genética                         |
| Endurance    | 15       | Mide capacidad cardiovascular y muscular           |
| Strength     | 15       | Evalúa fuerza muscular                             |
| Adaptability | 10       | Indica capacidad de respuesta a estímulos          |
| Progress     | 5        | Mide mejora a lo largo del tiempo                  |
| Coordination | 5        | Evalúa control neuromuscular                       |
| Agility      | 5        | Mide velocidad y cambio de dirección               |
| Consistency  | 10       | Refleja disciplina y adherencia                    |
| Diet Quality | 10       | Evalúa calidad nutricional                         |

### Fórmula de Cálculo
```
Fit Score = (
    (Volume × 0.10) +
    (Potential × 0.15) +
    (Endurance × 0.15) +
    (Strength × 0.15) +
    (Adaptability × 0.10) +
    (Progress × 0.05) +
    (Coordination × 0.05) +
    (Agility × 0.05) +
    (Consistency × 0.10) +
    (Diet_Quality × 0.10)
) × 10
```

Donde cada parámetro tiene un valor de 0-100, resultando en un Fit Score final de 0-1000.

### Cálculo de Diet Quality (0-100)
La calidad dietética se calcula considerando varios factores:

| Factor                  | Peso  | Ejemplo de Cálculo                                                                 |
|-------------------------|-------|-----------------------------------------------------------------------------------|
| Macronutrientes         | 30%   | 70/100 si la proporción es 30% proteína, 40% carbos, 30% grasas (ideal personalizado). |
| Densidad Nutricional    | 25%   | 80/100 si se cubre el 80% de las vitaminas diarias recomendadas.                  |
| Hidratación             | 20%   | 90/100 si se consumen 2L de agua al día (meta personalizada).                    |
| Adherencia              | 15%   | 100/100 si se siguen >90% de las comidas planeadas.                               |
| Alergias/Intolerancias  | 10%   | 50/100 si hay 2 episodios semanales de hinchazón.                                 |

### Reglas Dietéticas Específicas
Algunas reglas específicas que afectan la puntuación:

1. **Macronutrientes**:
   - Proteína <20%: -10 puntos en *Strength*.
   - Grasas >35%: +5% en *Recovery Time*.
2. **Hidratación**:
   - <1.5L/día: -15 puntos en *Fit Score*.
   - >3L/día: +10 puntos.
3. **Alergias**:
   - Si hay síntomas activos: *Inflamación crónica* aumenta un 20%.
4. **Adherencia**:
   - Dieta mediterránea con gen APOE4 (Alzheimer): +1 nivel en *DNA Grade*.

### Interpretación del Fit Score

| Rango       | Clasificación | Descripción                                           |
|-------------|---------------|-------------------------------------------------------|
| 900-1000    | Elite         | Nivel profesional/élite, rendimiento excepcional      |
| 800-899     | Avanzado      | Muy por encima del promedio, alto rendimiento         |
| 700-799     | Intermedio+   | Por encima del promedio, buen nivel de fitness        |
| 600-699     | Intermedio    | Nivel promedio, fitness adecuado                      |
| 500-599     | Principiante+ | Ligeramente por debajo del promedio                   |
| 400-499     | Principiante  | Nivel básico de fitness                               |
| 300-399     | Novato        | Nivel bajo, requiere mejoras significativas           |
| 0-299       | Sedentario    | Nivel muy bajo, posibles problemas de salud           |

## DNA Grade (E, C, B, A, S, SS)

### Definición
El DNA Grade representa el potencial genético máximo teórico de un individuo, considerando factores genéticos, anatómicos y fisiológicos.

### Factores que Determinan el DNA Grade

1. **Factores Genéticos**:
   - Polimorfismos relacionados con rendimiento (ACTN3, ACE, etc.)
   - Tipo de fibras musculares predominantes
   - Respuesta a la hipertrofia
   - Capacidad de recuperación

2. **Factores Anatómicos**:
   - Proporciones corporales
   - Inserciones musculares
   - Estructura ósea
   - Flexibilidad natural

3. **Factores Fisiológicos**:
   - Niveles hormonales basales
   - Eficiencia metabólica
   - Capacidad cardiovascular
   - Respuesta inmunológica

### Escala de DNA Grade

| Grado | Percentil | Descripción                                           |
|-------|-----------|-------------------------------------------------------|
| SS    | 99-100    | Potencial genético excepcional, élite mundial         |
| S     | 95-98     | Potencial genético superior, nivel profesional        |
| A     | 85-94     | Potencial genético muy bueno, nivel competitivo       |
| B     | 70-84     | Potencial genético bueno, por encima del promedio     |
| C     | 40-69     | Potencial genético promedio                           |
| E     | 0-39      | Potencial genético por debajo del promedio            |

### Cálculo del DNA Grade
El DNA Grade se determina mediante un algoritmo que combina:

1. **Análisis Genético** (si está disponible):
   - Presencia de variantes genéticas favorables
   - Ausencia de variantes limitantes

2. **Indicadores Indirectos**:
   - Respuesta al entrenamiento (tasa de mejora)
   - Características anatómicas observables
   - Historial familiar de rendimiento atlético

3. **Factores Limitantes**:
   - Condiciones médicas crónicas
   - Lesiones estructurales permanentes
   - Edad (factor de ajuste)

## Potencial Decreciente

Una característica importante del sistema es que el potencial (reflejado en el DNA Grade) puede disminuir con el tiempo debido a:

1. **Edad**: El potencial máximo disminuye naturalmente con la edad.
2. **Aproximación al límite genético**: Cuanto más cerca esté el Fit Score del máximo teórico para su DNA Grade, menor será el potencial restante.
3. **Sobreentrenamiento**: Períodos prolongados de sobreentrenamiento pueden reducir el potencial.

### Fórmula de Potencial Decreciente
```
Potential = BaseGenetic × AgeFactor × (1 - (CurrentFitScore / MaxTheoretical)²) × RecoveryQuality
```

Donde:
- `BaseGenetic`: Valor base según DNA Grade (SS=1.0, S=0.9, A=0.8, etc.)
- `AgeFactor`: Disminuye ~0.5% anual después de los 30 años
- `CurrentFitScore / MaxTheoretical`: Proporción del potencial ya alcanzado
- `RecoveryQuality`: Factor de 0.5-1.5 basado en calidad de recuperación

## Ejemplos Prácticos

### Ejemplo 1: Atleta Joven con Alto Potencial
- **Perfil**: 22 años, DNA Grade SS, Fit Score actual 750
- **Potencial**: 0.95 (muy alto, mucho margen de mejora)
- **Interpretación**: Atleta joven con genética excepcional que aún no ha alcanzado su máximo potencial.

### Ejemplo 2: Atleta Experimentado Cerca de su Límite
- **Perfil**: 35 años, DNA Grade A, Fit Score actual 820
- **Potencial**: 0.65 (moderado, margen de mejora limitado)
- **Interpretación**: Atleta experimentado que ha alcanzado gran parte de su potencial genético.

### Ejemplo 3: Individuo Mayor con Buen Mantenimiento
- **Perfil**: 50 años, DNA Grade B, Fit Score actual 650
- **Potencial**: 0.45 (bajo, enfoque en mantenimiento)
- **Interpretación**: Persona mayor que mantiene un buen nivel de fitness considerando su edad y genética.

## Conexión con Otros Componentes
- Para entender las métricas que alimentan este sistema, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para ver cómo se visualizan estas puntuaciones, consulta [Interfaz de Usuario](05-interfaz-usuario.md)
- Para entender cómo la IA procesa estos cálculos, consulta [Integración con IA](06-integracion-ia.md) 