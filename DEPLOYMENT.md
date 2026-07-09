
# Deployment Guide: seogrowthers.com on Hostinger

## 1. Initial Hostinger Setup
1. **Access hPanel**: Log in to your Hostinger account.
2. **Website Settings**:
   - Go to **Website** > **Manage**.
   - **SSL**: Ensure SSL is installed and active (Let's Encrypt).
   - **PHP Configuration**: While this is a static React app, set PHP to 8.1+ for any backend utilities if needed later.
3. **Advanced Settings**:
   - **LiteSpeed Cache**: Enable it in the dashboard.
   - **Git Integration** (Optional): If you prefer automatic deployments from GitHub.

## 2. Build Process
This project uses Vite. The build command compiles the React application into static files in the `/dist` directory.

### Prerequisites
- Node.js v18+ installed locally.
- npm installed.
- `.env` file present in the root directory with Supabase credentials:
  ```env
  VITE_SUPABASE_URL=https://kejitvcoalooiwbcwelt.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc
  ```