# Arquitectura de Software: Test de Dones Espirituales

Este documento detalla el diseño de software, la especificación del puente móvil y el esquema de datos para garantizar la portabilidad futura.

## 1. Diseño Arquitectónico (Frontend Desacoplado)

La aplicación está diseñada como una Single Page Application (SPA) en JavaScript puro sin dependencias de frameworks (React/Vue/etc.) para asegurar tiempos de carga menores a 1 segundo y portabilidad a cualquier webview móvil.

```
+---------------------------------------------------------+
|                       index.html                        |
|   (Contenedores de UI: Bienvenida -> Wizard -> Result)  |
+---------------------------------------------------------+
                             |
                             v
+---------------------------------------------------------+
|                        src/js/app.js                    |
|       (Orquestador de UI, Eventos y LocalStorage)       |
+---------------------------------------------------------+
         |                       |                |
         v                       v                v
+------------------+   +------------------+   +-----------+
| src/js/questions |   | src/js/gifts-data|   |  styles.css
| (128 Preguntas)  |   |  (16 Dones/SVGs) |   |  (Diseño) |
+------------------+   +------------------+   +-----------+
         |                       |
         +-----------+-----------+
                     v
+---------------------------------------------------------+
|                    src/js/test-engine.js                |
|           (Cálculo matemático modular puro)             |
+---------------------------------------------------------+
```

---

## 2. Especificación del Puente Móvil (Webview Bridge)

Cuando esta página esté incrustada en un WebView (React Native, Flutter o Capacitor/Cordova), el controlador `app.js` notificará a la aplicación nativa contenedora cuando el usuario complete el test.

### Emisión del Evento
```javascript
const payload = {
  version: "1.0",
  completedAt: new Date().toISOString(),
  answers: answersMap,
  scores: calculatedScores,
  topGifts: topThreeGifts
};

// 1. Mensaje para WebViews estándar (React Native WebView)
if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: "IGC_GIFTS_TEST_COMPLETED",
    payload: payload
  }));
}

// 2. Mensaje para Iframes web tradicionales
window.parent.postMessage({
  type: "IGC_GIFTS_TEST_COMPLETED",
  payload: payload
}, "*");
```

---

## 3. Esquema de Datos Futuro (Supabase DB Contract)

Para soportar la migración a Supabase en el futuro, el JSON estructurado de respuestas y puntuaciones mapea directamente a la siguiente estructura de tabla relacional en Postgres:

```sql
CREATE TABLE public.spiritual_gifts_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    answers JSONB NOT NULL, -- Mapa exacto de { "1": 5, "2": 2, ... }
    scores JSONB NOT NULL,  -- Listado de puntuaciones por categoría
    top_gifts TEXT[] NOT NULL, -- Array de las llaves del Top 3 (ej: ['evangelizacion', 'fe'])
    completed_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS (Row Level Security) inicial sugerido
ALTER TABLE public.spiritual_gifts_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura individual de resultados" 
ON public.spiritual_gifts_results FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Permitir inserción de resultados individuales" 
ON public.spiritual_gifts_results FOR INSERT 
WITH CHECK (auth.uid() = user_id);
```
