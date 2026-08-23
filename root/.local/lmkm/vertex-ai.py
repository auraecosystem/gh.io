import vertexai
from vertexai.preview import reasoning_engines

vertexai.init(project="YOUR_PROJECT_ID", location="us-central1")

# Load the engine by resource ID or full resource name
agent = reasoning_engines.ReasoningEngine("YOUR_RESOURCE_ID")

# Invoke the engine
response = agent.query(input="What is the capital of France?")
print(response)
