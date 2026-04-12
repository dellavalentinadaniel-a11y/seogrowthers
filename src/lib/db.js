import { v4 as uuidv4 } from 'uuid';

// Simulated database using LocalStorage since Supabase is not connected
const STORAGE_KEYS = {
  ARTICLES: 'agency_articles',
  AUTH: 'agency_auth_token',
};

// Helper to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
  auth: {
    login: async (email, password) => {
      await delay(800);
      if (email === 'admin@agency.com' && password === 'admin123') {
        const token = uuidv4();
        localStorage.setItem(STORAGE_KEYS.AUTH, token);
        return { user: { email, role: 'admin' }, error: null };
      }
      return { user: null, error: 'Credenciales inválidas' };
    },
    logout: async () => {
      await delay(300);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    },
    getSession: () => {
      return localStorage.getItem(STORAGE_KEYS.AUTH);
    }
  },
  articles: {
    list: async () => {
      await delay(600);
      const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return data ? JSON.parse(data) : [];
    },
    get: async (id) => {
      await delay(400);
      const articles = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES) || '[]');
      return articles.find(a => a.id === id);
    },
    create: async (articleData) => {
      await delay(800);
      const articles = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES) || '[]');
      const newArticle = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        views: 0,
        ...articleData
      };
      articles.unshift(newArticle);
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      return { data: newArticle, error: null };
    },
    update: async (id, articleData) => {
      await delay(600);
      const articles = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES) || '[]');
      const index = articles.findIndex(a => a.id === id);
      if (index === -1) return { error: 'Artículo no encontrado' };
      
      const updatedArticle = {
        ...articles[index],
        ...articleData,
        updated_at: new Date().toISOString()
      };
      articles[index] = updatedArticle;
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      return { data: updatedArticle, error: null };
    },
    delete: async (id) => {
      await delay(500);
      let articles = JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES) || '[]');
      articles = articles.filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      return { error: null };
    }
  },
  storage: {
    upload: async (file) => {
      // Simulate upload by converting to base64
      await delay(1000);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ data: { publicUrl: reader.result }, error: null });
        reader.onerror = (error) => reject({ data: null, error });
      });
    }
  }
};