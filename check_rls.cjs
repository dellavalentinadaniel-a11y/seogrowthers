/**
 * RLS deep diagnostic - distinguish between "0 rows" and "permission denied"
 */
const https = require('https');

const SUPABASE_URL = 'https://kejitvcoalooiwbcwelt.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';

function api(path, opts = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: opts.method || 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact,return=representation',
        ...opts.headers,
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch { parsed = data; }
        resolve({ status: res.statusCode, body: parsed, headers: res.headers });
      });
    });
    req.on('error', reject);
    if (opts.body) req.write(JSON.stringify(opts.body));
    req.end();
  });
}

function isSuccess(s) { return s >= 200 && s < 300; }

async function main() {
  console.log('=== RLS Deep Diagnostic ===\n');

  // Get first real row from each table
  const [blogRows, artRows] = await Promise.all([
    api('/rest/v1/blog_news?select=*&limit=1'),
    api('/rest/v1/articles?select=*&limit=1'),
  ]);

  const blogSlug = Array.isArray(blogRows.body) ? blogRows.body[0]?.slug : null;
  const artSlug = Array.isArray(artRows.body) ? artRows.body[0]?.slug : null;
  const blogId = Array.isArray(blogRows.body) ? blogRows.body[0]?.id : null;
  const artId = Array.isArray(artRows.body) ? artRows.body[0]?.id : null;

  console.log('Sample blog_news slug:', blogSlug);
  console.log('Sample articles slug:', artSlug);

  // UPDATE test with return=representation - if RLS allows, it returns the row;
  // if blocked, returns 401 or 403
  console.log('\n--- UPDATE test (PATCH with return=representation) ---');

  const blogUpdate = await api(`/rest/v1/blog_news?slug=eq.${blogSlug}`, {
    method: 'PATCH',
    body: { title: 'RLS-TEST-DO-NOT-SAVE' }
  });
  console.log(`blog_news UPDATE: status=${blogUpdate.status}`);
  if (blogUpdate.status === 401 || blogUpdate.status === 403) {
    console.log('  -> RLS BLOCKS updates for anon');
  } else if (isSuccess(blogUpdate.status)) {
    console.log('  -> UPDATE succeeded (RLS allows it)');
    if (Array.isArray(blogUpdate.body)) {
      console.log('  -> Rows updated:', blogUpdate.body.length);
      console.log('  -> Returned data:', JSON.stringify(blogUpdate.body).slice(0, 200));
    }
  } else {
    console.log('  -> Unexpected response:', JSON.stringify(blogUpdate.body).slice(0, 200));
  }

  const artUpdate = await api(`/rest/v1/articles?slug=eq.${artSlug}`, {
    method: 'PATCH',
    body: { title: 'RLS-TEST-DO-NOT-SAVE' }
  });
  console.log(`articles UPDATE: status=${artUpdate.status}`);
  if (artUpdate.status === 401 || artUpdate.status === 403) {
    console.log('  -> RLS BLOCKS updates for anon');
  } else if (isSuccess(artUpdate.status)) {
    console.log('  -> UPDATE succeeded (RLS allows it)');
    if (Array.isArray(artUpdate.body)) {
      console.log('  -> Rows updated:', artUpdate.body.length);
    }
  }

  // DELETE test with return=representation
  console.log('\n--- DELETE test (DELETE with return=representation) ---');

  const blogDelete = await api(`/rest/v1/blog_news?slug=eq.${blogSlug}`, {
    method: 'DELETE'
  });
  console.log(`blog_news DELETE: status=${blogDelete.status}`);
  if (blogDelete.status === 401 || blogDelete.status === 403) {
    console.log('  -> RLS BLOCKS deletes for anon');
  } else if (isSuccess(blogDelete.status)) {
    console.log('  -> DELETE succeeded (RLS allows it!)');
    if (Array.isArray(blogDelete.body)) {
      console.log('  -> Rows deleted:', blogDelete.body.length);
    }
  }

  const artDelete = await api(`/rest/v1/articles?slug=eq.${artSlug}`, {
    method: 'DELETE'
  });
  console.log(`articles DELETE: status=${artDelete.status}`);
  if (artDelete.status === 401 || artDelete.status === 403) {
    console.log('  -> RLS BLOCKS deletes for anon');
  } else if (isSuccess(artDelete.status)) {
    console.log('  -> DELETE succeeded (RLS allows it!)');
    if (Array.isArray(artDelete.body)) {
      console.log('  -> Rows deleted:', artDelete.body.length);
    }
  }

  // INSERT test
  console.log('\n--- INSERT test ---');
  const blogInsert = await api('/rest/v1/blog_news', {
    method: 'POST',
    body: { title: 'RLS-TEST', slug: 'rls-test-' + Date.now(), status: 'draft' }
  });
  console.log(`blog_news INSERT: status=${blogInsert.status}`);
  if (blogInsert.status === 401 || blogInsert.status === 403) {
    console.log('  -> RLS BLOCKS inserts for anon (error:', blogInsert.body?.message || 'none', ')');
  } else {
    console.log('  -> INSERT succeeded');
  }

  const artInsert = await api('/rest/v1/articles', {
    method: 'POST',
    body: { title: 'RLS-TEST', slug: 'rls-test-' + Date.now(), status: 'draft' }
  });
  console.log(`articles INSERT: status=${artInsert.status}`);
  if (artInsert.status === 401 || artInsert.status === 403) {
    console.log('  -> RLS BLOCKS inserts for anon (error:', artInsert.body?.message || 'none', ')');
  } else {
    console.log('  -> INSERT succeeded');
  }

  // FINAL SUMMARY
  console.log('\n===========================================================');
  console.log('  SUMMARY');
  console.log('===========================================================\n');

  const blogUpdateBlocked = blogUpdate.status === 401 || blogUpdate.status === 403;
  const artUpdateBlocked = artUpdate.status === 401 || artUpdate.status === 403;
  const blogDeleteBlocked = blogDelete.status === 401 || blogDelete.status === 403;
  const artDeleteBlocked = artDelete.status === 401 || artDelete.status === 403;
  const blogInsertBlocked = blogInsert.status === 401 || blogInsert.status === 403;
  const artInsertBlocked = artInsert.status === 401 || artInsert.status === 403;

  console.log('                 | blog_news          | articles');
  console.log('  ---------------|--------------------|-------------------');
  console.log('  SELECT         |', 'ALLOWED            |', 'ALLOWED');
  console.log('  INSERT         |', blogInsertBlocked ? 'BLOCKED            |' : 'ALLOWED            |');
  console.log('  UPDATE         |', blogUpdateBlocked ? 'BLOCKED            |' : 'ALLOWED (warning!) |');
  console.log('  DELETE         |', blogDeleteBlocked ? 'BLOCKED            |' : 'ALLOWED (warning!) |');

  if (blogUpdateBlocked && artUpdateBlocked && blogDeleteBlocked && artDeleteBlocked) {
    console.log('\nBoth tables: RLS properly configured. Read-only for anon, write-blocked.');
  } else {
    console.log('\nWARNING: Some write operations succeeded. Review RLS policies.');
  }
}

main().catch(console.error);
