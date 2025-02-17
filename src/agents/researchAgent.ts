import { Tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { AZURE_OPENAI_CONFIG } from "../config/azure";
import type { Lead } from "../types";

class DuckDuckGoSearch extends Tool {
  name = "duckduckgo-search";
  description = "A tool for searching DuckDuckGo";

  async _call(query: string): Promise<string> {
    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
      const data = await response.json();
      return JSON.stringify(data.RelatedTopics);
    } catch (error) {
      console.error('DuckDuckGo search error:', error);
      return '[]';
    }
  }
}

export class ResearchAgent {
  private model: ChatOpenAI;
  private searchTool: DuckDuckGoSearch;

  constructor() {
    this.model = new ChatOpenAI({
      azureOpenAIApiKey: AZURE_OPENAI_CONFIG.apiKey,
      azureOpenAIApiVersion: "2024-08-01",
      azureOpenAIApiDeploymentName: AZURE_OPENAI_CONFIG.deploymentName,
      azureOpenAIBasePath: AZURE_OPENAI_CONFIG.azureOpenAIBasePath,
    });
    
    this.searchTool = new DuckDuckGoSearch();
  }

  async researchLead(lead: Lead): Promise<string> {
    const searchQuery = `${lead.name} ${lead.company} ${lead.website} background experience`;
    const searchResults = await this.searchTool.call(searchQuery);
    
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