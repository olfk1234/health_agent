from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from chatbot import builtGraph
from fastapi import FastAPI

app = FastAPI()

# Initialize the CopilotKit SDK
sdk = CopilotKitRemoteEndpoint(agents=[
        LangGraphAgent(
            name="chatbot",
            description="Health agent",
            graph=builtGraph,
        )
    ], actions=[])

# Add the CopilotKit endpoint to your FastAPI app
add_fastapi_endpoint(app, sdk, "/copilotkit_remote", max_workers=10)

def main():
    """Run the uvicorn server."""
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()