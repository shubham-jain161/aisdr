import { LeadGeneratorAgent } from '../agents/leadGeneratorAgent';

async function testLeadGenerator() {
  try {
    const agent = new LeadGeneratorAgent();
    const results = await agent.generateLeads({
      position: "CEO",
      company: "11x ai",
      industry: "AI",
      website: "https://www.11x.ai/"
    });
    
    console.log('Generated Leads:', results);
  } catch (error) {
    console.error('Error testing lead generator:', error);
  }
}

// Run the test
testLeadGenerator();