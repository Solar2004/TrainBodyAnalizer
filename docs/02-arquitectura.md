# Arquitectura del Sistema

## Visión General
Train Body Analyzer está construido con una arquitectura moderna que permite el análisis, visualización y seguimiento de parámetros físicos y genéticos. El sistema está diseñado para ser escalable, mantenible y ofrecer una experiencia de usuario fluida.

## Stack Tecnológico

### 1. Frontend
- **Framework**: Next.js (utilizando Page Router)
- **UI**: React con shadcn/ui para componentes
- **Visualización de datos**: D3.js para gráficos complejos
- **Gestión de estado**: React Context API y SWR para fetching de datos
- **Estilos**: Tailwind CSS para diseño responsive

### 2. Backend
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Almacenamiento**: Supabase Storage para archivos y medios
- **Funciones serverless**: Supabase Edge Functions
- **API**: RESTful endpoints a través de Supabase

### 3. Integración con IA
- **Modelo de análisis**: OpenAI API / Gemini API
- **Procesamiento de datos**: Node.js para preprocesamiento
- **Análisis de texto**: NLP para procesamiento de descripciones

## Componentes Principales

### 1. Frontend
- **Tecnologías**: React, Next.js (Page Router), shadcn/ui
- **Estructura de Directorios**:
  ```
  /app/
  ├── components/       # Componentes reutilizables
  │   ├── ui/           # Componentes de interfaz básicos
  │   ├── dashboard/    # Componentes específicos del dashboard
  │   ├── charts/       # Componentes de visualización de datos
  │   ├── forms/        # Formularios para ingreso de datos
  │   └── genealogy/    # Componentes para el árbol genealógico
  ├── pages/            # Páginas de la aplicación (Page Router)
  │   ├── index.js      # Página principal
  │   ├── dashboard/    # Dashboard principal
  │   ├── profile/      # Perfil de usuario
  │   ├── analysis/     # Análisis detallado
  │   ├── history/      # Historial de mediciones
  │   ├── genealogy/    # Árbol genealógico y herencia
  │   └── settings/     # Configuración
  ├── lib/              # Utilidades y funciones auxiliares
  │   ├── utils/        # Funciones de utilidad general
  │   ├── hooks/        # Custom hooks de React
  │   ├── supabase/     # Cliente y funciones de Supabase
  │   └── types/        # Definiciones de tipos TypeScript
  ├── public/           # Archivos estáticos
  └── styles/           # Estilos globales
  ```

### 2. Backend (Supabase)
- **Tablas Principales**:
  ```
  - users                # Información básica de usuarios
  - metrics              # Métricas y puntuaciones (historial)
  - training_logs        # Registros de entrenamiento
  - genetic_data         # Información genética
  - hormone_levels       # Niveles hormonales
  - recommendations      # Recomendaciones generadas
  - family_members       # Miembros de la familia y características
  - countries            # Catálogo de países y regiones
  - biotypes             # Catálogo de biotipos
  - physical_traits      # Catálogo de rasgos físicos
  ```

- **Relaciones**:
  ```
  users 1:N family_members
  users 1:N metrics
  users 1:N training_logs
  users 1:1 genetic_data
  family_members N:M physical_traits
  family_members N:1 countries
  family_members N:1 biotypes
  ```

### 3. Integración con Supabase
- **Autenticación**:
  ```javascript
  // Ejemplo de autenticación con Supabase
  import { supabase } from '@/lib/supabase';

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  }
  ```

- **Consultas a la Base de Datos**:
  ```javascript
  // Ejemplo de consulta a Supabase
  async function getUserMetrics(userId) {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
  ```

- **Almacenamiento de Archivos**:
  ```javascript
  // Ejemplo de subida de archivos a Supabase Storage
  async function uploadProfileImage(userId, file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);
    
    return { data, error };
  }
  ```

## Flujo de Datos

1. **Ingreso de Datos**:
   - El usuario ingresa datos a través de formularios en la interfaz
   - Los datos pueden provenir de dispositivos externos (wearables, apps)
   - El árbol genealógico se construye mediante formularios interactivos

2. **Procesamiento**:
   - Los datos son validados y normalizados
   - Se calculan métricas derivadas
   - Se envían al modelo de IA para análisis

3. **Análisis**:
   - El modelo de IA procesa los datos
   - Genera puntuaciones (Fit Score, DNA Grade)
   - Produce recomendaciones personalizadas

4. **Visualización**:
   - Los resultados se presentan en la interfaz de usuario
   - Se utilizan gráficos interactivos (rueda de estadísticas)
   - Se muestran tendencias históricas
   - Se visualiza el árbol genealógico con características heredadas

5. **Almacenamiento**:
   - Los datos y resultados se guardan en Supabase
   - Se mantiene un historial completo para análisis de tendencias

## Seguridad y Privacidad

- **Autenticación**: Sistema seguro de login y gestión de sesiones con Supabase Auth
- **Cifrado**: Datos sensibles (genéticos, médicos) cifrados en reposo y en tránsito
- **Políticas RLS**: Row Level Security en Supabase para proteger datos de usuarios
- **Cumplimiento GDPR**: Opciones para exportar y eliminar datos de usuario
- **Consentimiento**: Sistema claro de permisos para uso de datos

## Escalabilidad

- **Arquitectura Modular**: Componentes independientes que pueden escalarse por separado
- **Supabase**: Escalabilidad automática de la base de datos PostgreSQL
- **Optimización de Rendimiento**: Caching y procesamiento asíncrono para operaciones intensivas
- **Estrategias de Fetching**: SWR para datos que cambian frecuentemente

## Conexión con Otros Componentes
- Para detalles sobre las métricas específicas, consulta [Métricas y Parámetros](03-metricas-parametros.md)
- Para entender la interfaz de usuario, consulta [Interfaz de Usuario](05-interfaz-usuario.md)
- Para más información sobre la integración con IA, consulta [Integración con IA](06-integracion-ia.md)
- Para conocer el proceso de registro y recopilación de datos genealógicos, consulta [Proceso de Registro](09-proceso-registro.md) 