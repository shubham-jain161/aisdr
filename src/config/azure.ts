// Load environment variables
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY || '3b8d3c7524f34fbd9ec6dfc81935a9cd';
const AZURE_OPENAI_INSTANCE = process.env.AZURE_OPENAI_INSTANCE || 'ai-gamaai623587016894';
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || 'gama';

export const AZURE_OPENAI_CONFIG = {
  apiKey: AZURE_OPENAI_API_KEY,
  deploymentName: AZURE_OPENAI_DEPLOYMENT,
  azureOpenAIBasePath: `https://${AZURE_OPENAI_INSTANCE}.openai.azure.com/openai/deployments`,
};

export const AZURE_COMMUNICATION_CONFIG = {
  endpoint: process.env.AZURE_COMMUNICATION_ENDPOINT || "https://outreachagent.unitedstates.communication.azure.com/",
  connectionString: process.env.AZURE_COMMUNICATION_CONNECTION_STRING || "endpoint=https://outreachagent.unitedstates.communication.azure.com/;accesskey=8xv9O4eu7hoq2eziRu8rhXTRr9PemJW7F6osh8nSWwkpeLztgO47JQQJ99BAACULyCpYLQgbAAAAAZCSGZ5I"
};