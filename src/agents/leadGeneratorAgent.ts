import { DuckDuckGoSearchAPI } from "@langchain/community/tools";
import { ChatOpenAI } from "@langchain/openai";
import { AZURE_OPENAI_CONFIG } from "../config/azure";
import type { Lead, SearchFilters } from "../types";

export class LeadGeneratorAgent {
  private model: ChatOpenAI;
  private searchTool: DuckDuckGoSearchAPI;

  constructor() {
    this.model = new ChatOpenAI({
      azureOpenAIApiKey: AZURE_OPENAI_CONFIG.apiKey,
      azureOpenAIApiVersion: "2024-08-01",
      azureOpenAIApiDeploymentName: AZURE_OPENAI_CONFIG.deploymentName,
      azureOpenAIBasePath: "https://ai-gamaai623587016894.openai.azure.com/openai/deployments",  // Add this line
    });
    
    this.searchTool = new DuckDuckGoSearchAPI();
  }

  async generateLeads(filters: SearchFilters): Promise<Lead[]> {
    const searchQuery = this.buildSearchQuery(filters);
    const searchResults = await this.searchTool.invoke(searchQuery);  // Change .call to .invoke
    
    // Process search results and extract lead information
    const leads = await this.processSearchResults(searchResults);
    
    return leads;
  }

  private buildSearchQuery(filters: SearchFilters): string {
    return `${filters.position} at ${filters.company} ${filters.industry} ${filters.website || ''}`;  // Add null check for website
  }

  private async processSearchResults(results: string): Promise<Lead[]> {
    try {
      const prompt = `
        Extract lead information from the following search results:
        ${results}
        
        Return structured information about potential leads including:
        - name (if found)
        - title
        - company
        - website (if found)
        Format the response as a JSON array.
      `;

      const response = await this.model.invoke(prompt);
      
      try {
        const parsedLeads = JSON.parse(response.content);
        return Array.isArray(parsedLeads) ? parsedLeads : [];
      } catch (parseError) {
        console.error('Error parsing leads:', parseError);
        return [];
      }
    } catch (error) {
      console.error('Error processing search results:', error);
      return [];
    }
  }
}