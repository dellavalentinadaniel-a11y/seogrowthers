# Guía de Despliegue: seogrowthers.com en Vercel

Esta guía detalla cómo desplegar la aplicación en Vercel, conectar la base de datos de Supabase y redirigir el dominio personalizado comprado en Hostinger (`seogrowthers.com`) hacia Vercel.

---

## 1. Despliegue en Vercel

Vercel compila y despliega tu aplicación de React de forma automática cada vez que subes cambios a tu repositorio de GitHub.

### Configuración Inicial en Vercel
1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New** > **Project**.
3. Importa tu repositorio `seogrowthers`.
4. En la configuración del proyecto:
   * **Framework Preset**: Vite (se autodetecta).
   * **Root Directory**: `./` (directorio raíz).
   * **Build Command**: `npm run build` o `tsc && vite build`.
   * **Output Directory**: `dist`.

---

## 2. Solución: Configurar la Base de Datos de Supabase

Dado que el archivo `.env` local está excluido en el `.gitignore` por seguridad, debes configurar manualmente las credenciales en Vercel para que la aplicación en producción pueda ver e interactuar con la base de datos.

### Pasos en Vercel:
1. En el panel de tu proyecto en Vercel, dirígete a la pestaña **Settings** (Configuración) > **Environment Variables** (Variables de Entorno).
2. Agrega las siguientes dos variables:

   * **Variable 1:**
     * **Key:** `VITE_SUPABASE_URL`
     * **Value:** `https://cgmmbtedcwzytcwezecn.supabase.co`

   * **Variable 2:**
     * **Key:** `VITE_SUPABASE_ANON_KEY`
     * **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1idGVkY3d6eXRjd2V6ZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTc1MTEsImV4cCI6MjA5Mzk5MzUxMX0.3Uh5ZacJCo_AVBEU_cckJ620eBJSOWoZ6kjKN8R7kUk`

3. Haz clic en **Save** (Guardar).
4. **IMPORTANTE**: Para aplicar estos cambios, ve a la pestaña **Deployments** en Vercel, selecciona tu último despliegue, haz clic en los tres puntos (`...`) y selecciona **Redeploy** (Re-desplegar) asegurando que no se use caché si es posible. Esto reconstruirá la aplicación inyectando las credenciales correctas.

---

## 3. Configuración del Dominio en Hostinger y Vercel

Para usar tu dominio `seogrowthers.com` (comprado y activo en Hostinger) apuntando a tu nueva web en Vercel:

### Paso A: Agregar el dominio en Vercel
1. En Vercel, ve a **Settings** > **Domains**.
2. Escribe `seogrowthers.com` y haz clic en **Add**.
3. Vercel te recomendará agregar tanto `seogrowthers.com` (redirección) como `www.seogrowthers.com`. Acepta la recomendación.
4. Vercel te mostrará los registros DNS que debes configurar en tu proveedor (Hostinger) para validar el dominio.

### Paso B: Configurar los DNS en Hostinger (hPanel)
1. Inicia sesión en tu **hPanel de Hostinger**.
2. Ve a **Dominios** > **seogrowthers.com** > **DNS / Nameservers**.
3. Añade o edita los siguientes registros:

   * **Registro A (para el dominio raíz `@`):**
     * **Tipo:** `A`
     * **Nombre/Host:** `@` o déjalo vacío.
     * **Apunta a (IP):** `76.76.21.21`
     * **TTL:** Por defecto (ej. 14400 o 3600).

   * **Registro CNAME (para el subdominio `www`):**
     * **Tipo:** `CNAME`
     * **Nombre/Host:** `www`
     * **Apunta a:** `cname.vercel-dns.com.` (con un punto al final si lo solicita Hostinger).
     * **TTL:** Por defecto.

4. Guarda los cambios.

> [!NOTE]
> La propagación de cambios en los registros DNS puede tardar de unas pocas horas hasta 24 horas a nivel mundial. Una vez propagado, Vercel validará el dominio y emitirá automáticamente un certificado SSL seguro (`https://`).

---

## 4. Desarrollo Continuo y Despliegues

Para desplegar actualizaciones en el futuro, ya no necesitas usar scripts FTP. El proceso es:
1. Realiza tus cambios en local.
2. Sube tus cambios a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```
3. Vercel detectará el nuevo commit e iniciará el despliegue automático.