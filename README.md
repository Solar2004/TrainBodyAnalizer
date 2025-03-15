# Train Body Analyzer

## Visión General
Train Body Analyzer es una aplicación que permite analizar y hacer seguimiento de parámetros físicos, genéticos y adaptativos del cuerpo humano. La aplicación utiliza un sistema de puntuación avanzado e inteligencia artificial para proporcionar análisis detallados y recomendaciones personalizadas.

## Estructura de la Documentación
Esta documentación está organizada en secciones interconectadas que explican todos los aspectos del proyecto:

1. [Conceptos Básicos](docs/01-conceptos-basicos.md) - Fundamentos y parámetros principales
2. [Arquitectura del Sistema](docs/02-arquitectura.md) - Estructura técnica y componentes
3. [Métricas y Parámetros](docs/03-metricas-parametros.md) - Detalle de todas las métricas utilizadas
4. [Sistema de Puntuación](docs/04-sistema-puntuacion.md) - Cálculo de Fit Score y DNA Grade
5. [Interfaz de Usuario](docs/05-interfaz-usuario.md) - Diseño y componentes de la UI
6. [Integración con IA](docs/06-integracion-ia.md) - Uso de IA para análisis y recomendaciones
7. [Sistema de Historial](docs/07-sistema-historial.md) - Gestión del historial y potencial decreciente
8. [Guía de Implementación](docs/08-guia-implementacion.md) - Pasos para desarrollar la aplicación
9. [Proceso de Registro](docs/09-proceso-registro.md) - Recopilación de datos y onboarding

## Tecnologías Principales
- **Frontend**: 
  - React 18+
  - Next.js 14+ (utilizando Page Router)
  - shadcn/ui para componentes de interfaz
  - Tailwind CSS para estilos
  - D3.js para visualización de datos complejos
- **Backend**: 
  - Supabase para base de datos PostgreSQL
  - Supabase Auth para autenticación
  - Supabase Storage para almacenamiento de archivos
  - Supabase Edge Functions para lógica serverless
- **IA**: 
  - OpenAI API / Gemini API para análisis y recomendaciones
  - Procesamiento de lenguaje natural para análisis de texto

## Características Principales
- Análisis completo de parámetros físicos y genéticos
- Sistema de puntuación dual (Fit Score y DNA Grade)
- Árbol genealógico detallado con características físicas heredadas
- Recomendaciones personalizadas basadas en IA
- Seguimiento de progreso y visualización de tendencias
- Análisis de logs de entrenamiento y nutrición

## Para Desarrolladores
Esta documentación está diseñada para proporcionar toda la información necesaria para implementar el sistema completo. Cada sección contiene detalles técnicos, ejemplos y referencias a otras secciones relevantes.

### Requisitos
- Node.js 18+
- Cuenta en Supabase
- Cuenta en OpenAI o Google AI (para API de IA)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/yourusername/train-body-analyzer.git

# Instalar dependencias
cd train-body-analyzer
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves de API

# Iniciar servidor de desarrollo
npm run dev
```

## Próximos Pasos
1. Revisar la [Arquitectura del Sistema](docs/02-arquitectura.md)
2. Explorar las [Métricas y Parámetros](docs/03-metricas-parametros.md)
3. Entender el [Sistema de Puntuación](docs/04-sistema-puntuacion.md)
4. Conocer el [Proceso de Registro](docs/09-proceso-registro.md) 