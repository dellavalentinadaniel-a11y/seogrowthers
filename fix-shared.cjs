const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const sharedComponents = [
  'CustomCursor',
  'ImageOptimized',
  'LogoComponent',
  'PageLoader',
  'SEOHead',
  'SkeletonLoader',
  'TouchButton'
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const comp of sharedComponents) {
        // match import SEOHead from '@/components/SEOHead' or '../components/SEOHead'
        const regex = new RegExp(`(['"])((?:\\.\\.\\/)*|\\.\\/|@\\/)components\\/${comp}(['"])`, 'g');
        content = content.replace(regex, (match, q1, prefix, q2) => {
          changed = true;
          return `${q1}${prefix}components/shared/${comp}${q2}`;
        });
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
