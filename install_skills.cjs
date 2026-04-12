const { execSync } = require('child_process');
const skills = [
    "browser-use/browser-use browser-use",
    "browser-use/browser-use remote-browser",
    "leonardomso/33-js-concepts concept-workflow",
    "leonardomso/33-js-concepts seo-review",
    "leonardomso/33-js-concepts write-concept",
    "leonardomso/33-js-concepts fact-check",
    "f/awesome-chatgpt-prompts skill-lookup",
    "tryghost/ghost create-database-migration",
    "anthropics/claude-code command-development",
    "anthropics/claude-code mcp-integration",
    "anthropics/claude-code plugin-structure",
    "anthropics/claude-code plugin-settings",
    "anthropics/claude-code writing-rules",
    "anthropics/claude-code agent-development",
    "anthropics/claude-code frontend-design",
    "anthropics/claude-code hook-development",
    "metabase/metabase mutation-testing",
    "metabase/metabase docs-write",
    "clickhouse/clickhouse build",
    "metabase/metabase analytics-events",
    "metabase/metabase typescript-review",
    "metabase/metabase add-malli-schemas",
    "metabase/metabase typescript-write",
    "tldraw/tldraw write-release-notes",
    "tldraw/tldraw write-tbp",
    "tldraw/tldraw write-example",
    "tldraw/tldraw write-docs",
    "tldraw/tldraw skill-creator",
    "tldraw/tldraw write-pr",
    "karpathy/nanochat read-arxiv-paper",
    "streamlit/streamlit debugging-streamlit",
    "streamlit/streamlit discovering-make-commands",
    "streamlit/streamlit implementing-new-features",
    "affaan-m/everything-claude-code python-patterns",
    "affaan-m/everything-claude-code continuous-learning",
    "affaan-m/everything-claude-code java-coding-standards",
    "affaan-m/everything-claude-code coding-standards",
    "affaan-m/everything-claude-code golang-patterns",
    "affaan-m/everything-claude-code frontend-patterns",
    "affaan-m/everything-claude-code security-review",
    "affaan-m/everything-claude-code springboot-security",
    "affaan-m/everything-claude-code strategic-compact",
    "affaan-m/everything-claude-code clickhouse-io"
];

for (const skill of skills) {
    console.log(`\n\n=== Installing ${skill} ===`);
    try {
        const parts = skill.split(' ');
        execSync(`npx -y skillfish add ${parts[0]} ${parts[1]} --global --yes`, {
            input: 'y\n',
            stdio: ['pipe', 'inherit', 'inherit']
        });
    } catch(e) {
        console.error(`Failed to install ${skill}`);
    }
}
