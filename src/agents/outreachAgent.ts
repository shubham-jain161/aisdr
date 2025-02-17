import { EmailClient } from "@azure/communication-email";
import { ChatOpenAI } from "@langchain/openai";
import { AZURE_COMMUNICATION_CONFIG, AZURE_OPENAI_CONFIG } from "../config/azure";
import type { Lead } from "../types";

export class OutreachAgent {
  private model: ChatOpenAI;
  private emailClient: EmailClient;

  constructor() {
    this.model = new ChatOpenAI({
      azureOpenAIApiKey: AZURE_OPENAI_CONFIG.apiKey,
      azureOpenAIApiVersion: "2024-08-01",
      azureOpenAIApiDeploymentName: AZURE_OPENAI_CONFIG.deploymentName,
      azureOpenAIApiInstanceName: "ai-gamaai623587016894",
    });
    
    this.emailClient = new EmailClient(AZURE_COMMUNICATION_CONFIG.connectionString);
  }

  async sendPersonalizedEmail(lead: Lead): Promise<void> {
    const emailContent = await this.generateEmailContent(lead);
    
    await this.emailClient.send({
      senderAddress: "outreach@yourdomain.com",
      content: {
        subject: emailContent.subject,
        plainText: emailContent.body,
      },
      recipients: {
        to: [{ address: lead.email }],
      },
    });
  }

  private async generateEmailContent(lead: Lead): Promise<{ subject: string; body: string }> {
    // Use the LLM to generate personalized email content based on lead research
    // This is a placeholder implementation
    return {
      subject: `Connecting with ${lead.name}`,
      body: `Hello ${lead.name},\n\nI hope this email finds you well...`,
    };
  }
}