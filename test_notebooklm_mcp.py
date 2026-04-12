import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def list_notebooks():
    server_params = StdioServerParameters(
        command="C:\\Users\\dani\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python313\\Scripts\\notebooklm-mcp.exe",
        args=[],
        env=None
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            prompts = await session.list_prompts()
            print("Prompts available:", prompts)

            resources = await session.list_resources()
            print("\nResources available:")
            for res in resources.resources:
                print(f"- {res.name} (URI: {res.uri})")

            tools = await session.list_tools()
            print("\nTools available:")
            for tool in tools.tools:
                print(f"- {tool.name}: {tool.description}")

if __name__ == "__main__":
    asyncio.run(list_notebooks())
