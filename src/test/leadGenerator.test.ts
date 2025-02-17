import { LeadGeneratorAgent } from '../agents/leadGeneratorAgent.js';

async function testLeadGenerator() {
  console.log('Starting Lead Generator Test...');
  
  try {
    const agent = new LeadGeneratorAgent();
    
    // Test case with sample data
    const testFilters = {
      position: "CTO",
      company: "Startup",
      industry: "AI Technology",
      website: "YCombinator.com"
    };
    
    console.log('Searching with filters:', testFilters);
    
    const results = await agent.generateLeads(testFilters);
    
    console.log('Search completed successfully!');
    console.log('Number of leads found:', results.length);
    console.log('Leads:', JSON.stringify(results, null, 2));
    
  } catch (error) {
    console.error('Error during test:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
}

// Run the test
console.log('=== Lead Generator Agent Test ===');
testLeadGenerator().then(() => {
  console.log('Test execution completed');
}).catch((error) => {
  console.error('Test execution failed:', error);
});