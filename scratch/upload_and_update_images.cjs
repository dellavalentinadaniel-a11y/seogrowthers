const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient('https://kejitvcoalooiwbcwelt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc');

const files = [
  { id: 20, localPath: 'public/images/blog/marketing-ai-2026.png', remoteName: 'marketing-ai-2026.png' },
  { id: 11, localPath: 'public/images/blog/ps5-pro-future.png', remoteName: 'ps5-pro-future.png' },
  { id: 23, localPath: 'public/images/blog/privacy-no-cookies.png', remoteName: 'privacy-no-cookies.png' },
  { id: 7, localPath: 'public/images/blog/gta-vi-release.png', remoteName: 'gta-vi-release.png' },
  { id: 8, localPath: 'public/images/blog/ffvii-rebirth-analysis.png', remoteName: 'ffvii-rebirth-analysis.png' },
  { id: 9, localPath: 'public/images/blog/ssd-ps5-guide.png', remoteName: 'ssd-ps5-guide.png' },
  { id: 10, localPath: 'public/images/blog/elden-ring-guide.png', remoteName: 'elden-ring-guide.png' },
  { id: 13, localPath: 'public/images/blog/fake-docs-ai.png', remoteName: 'fake-docs-ai.png' },
  { id: 19, localPath: 'public/images/blog/total-search-aeo.png', remoteName: 'total-search-aeo.png' },
  { id: 21, localPath: 'public/images/blog/digital-trends-2026.png', remoteName: 'digital-trends-2026.png' },
  { id: 22, localPath: 'public/images/blog/data-protection-latam.png', remoteName: 'data-protection-latam.png' },
  { id: 25, localPath: 'public/images/blog/web-exploration-future.png', remoteName: 'web-exploration-future.png' }
];

async function run() {
  for (const item of files) {
    if (!fs.existsSync(item.localPath)) {
      console.warn(`Local file not found: ${item.localPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(item.localPath);
    
    // Upload image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(item.remoteName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`Error uploading ${item.remoteName}:`, uploadError);
      continue;
    }

    console.log(`Uploaded ${item.remoteName}`);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('article-images')
      .getPublicUrl(item.remoteName);

    // Update database
    const { error: dbError } = await supabase
      .from('articles')
      .update({ featured_image: publicUrl })
      .eq('id', item.id);

    if (dbError) {
      console.error(`Error updating DB for ${item.remoteName}:`, dbError);
    } else {
      console.log(`Updated DB for ${item.remoteName} with ${publicUrl}`);
    }
  }
}

run();
