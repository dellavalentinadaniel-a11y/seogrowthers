const fs = require('fs');
const files = [
  'src/pages/ToolsPage.jsx',
  'src/pages/ResourcesPage.jsx',
  'src/pages/ArticlesList.jsx',
  'src/pages/ArticlePage.jsx',
  'src/main.jsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/@\/components\/ScrollToTop/g, '@/components/layout/ScrollToTop');
  fs.writeFileSync(f, content, 'utf8');
});
