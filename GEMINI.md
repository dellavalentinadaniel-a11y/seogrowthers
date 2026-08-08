# SEOGrowthers - Instrucciones y Directrices para Gemini CLI

Este archivo contiene las directrices de desarrollo, convenciones arquitectónicas y políticas específicas de la plataforma **SEOGrowthers**. Deben seguirse de manera estricta en cada intervención.

---

## 🛠️ Stack Tecnológico y Configuración
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion.
- **Backend / Base de Datos**: Supabase (PostgreSQL + Supabase Auth + RLS).
- **Iconografía**: Lucide React.
- **Enrutamiento**: React Router con Lazy Loading (`React.lazy`) para optimizar Core Web Vitals (LCP < 1.0s).

---

## 📐 Convenciones Arquitectónicas y Flujo de Datos

### 1. Separación Hermética de Foro y Blog (SEO)
Para evitar la dilución del posicionamiento orgánico, existe una separación estricta entre el contenido del Blog y el del Foro:
- **Regla de Oro**: Al consultar artículos para secciones de Blog o Carruseles de la página principal, **SIEMPRE** se debe filtrar la columna `section` excluyendo el valor `'Foro'`.
  ```javascript
  // Ejemplo de consulta correcta para el Blog
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .neq('section', 'Foro') // <- OBLIGATORIO para secciones públicas de Blog
    .eq('status', 'published');
  ```

### 2. Prevención de "White Screen of Death" (WSD)
- Al recuperar un artículo o debate por slug/ruta, la consulta debe ser flexible y segura.
- Utilizar `.maybeSingle()` en lugar de `.single()` para evitar excepciones no controladas de Supabase cuando un recurso no se encuentra.
- Implementar controles de estado (`loading`, `error`, comprobaciones de nulidad antes de renderizar) para manejar fallos de carga con elegancia.
  ```javascript
  // Consulta segura de detalle
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`) // Búsqueda flexible
    .maybeSingle(); // Evita lanzar errores fatales si no existe
  ```

### 3. Sincronización de Métricas del Foro
- No utilizar contadores estáticos o harcodeados para "likes" o comentarios.
- Consultar de manera dinámica las tablas relacionales correspondientes (`article_likes`, `article_comments`) para computar las interacciones en tiempo real.

---

## 🔐 Control de Acceso (RBAC) y Seguridad
El sistema utiliza Control de Acceso Basado en Roles. Al agregar o modificar vistas administrativas o del foro, se deben validar las siguientes políticas:
- **User (Usuario)**: Puede leer contenido, participar en debates del Foro, comentar y gestionar su propia cuenta/comentarios.
- **Moderator (Moderador)**: Tiene capacidades del usuario, además de permisos de moderación de contenido en el Foro (eliminar publicaciones que violen normas).
- **Admin (Administrador)**: Control total. Permiso exclusivo para publicar/editar en el Blog de Expertos, administrar usuarios y cambiar roles.

---

## ⚡ Estilo, Rendimiento y Validación
1. **Rendimiento**: Todo componente de página de gran tamaño o nueva sección debe cargarse mediante importación diferida (`React.lazy`) en `src/App.jsx`.
2. **Estilo**: Priorizar el uso de Tailwind CSS respetando el diseño de estética futurista (Dark Mode premium, efectos Glassmorphism, bordes sutiles y gradientes).
3. **Validación**: Tras realizar cambios en el código o las consultas de base de datos, comprobar que la compilación de Vite sea correcta y no introduzca errores de TypeScript o de enrutamiento.
