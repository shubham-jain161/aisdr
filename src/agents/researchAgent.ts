import { DuckDuckGoSearchResults } from "@langchain/community/tools/duckduckgo";
import { ChatOpenAI } from "@langchain/openai";
import { AZURE_OPENAI_CONFIG } from "../config/azure";
import type { Lead } from "../types";

export class ResearchAgent {
  private model: ChatOpenAI;
  private searchTool: DuckDuckGoSearchResults;

  constructor() {
    this.model = new ChatOpenAI({
      azureOpenAIApiKey: AZURE_OPENAI_CONFIG.apiKey,
      azureOpenAIApiVersion: "2024-08-01",
      azureOpenAIApiDeploymentName: AZURE_OPENAI_CONFIG.deploymentName,
      azureOpenAIBasePath: AZURE_OPENAI_CONFIG.azureOpenAIBasePath,
    });
    
    this.searchTool = new DuckDuckGoSearchResults();
  }

  async researchLead(lead: Lead): Promise<string> {
    const searchQuery = `${lead.name} ${lead.company} ${lead.website} background experience`;
    const searchResults = await this.searchTool.invoke(searchQuery);
    
    // Use the LLM to summarize and structure the research results
    const summary = await this.summarizeResearch(searchResults);
    
    return summary;
  }

  private async summarizeResearch(results: string): Promise<string> {
    const prompt = `
      Summarize the following research results about a potential lead:
      ${results}
      
      Focus on:
      - Professional background
      - Current role and responsibilities
      - Notable achievements
      - Company information
      
      Provide a concise, well-structured summary.
    `;

    const response = await this.model.invoke(prompt);
    return response.content;
  }
}