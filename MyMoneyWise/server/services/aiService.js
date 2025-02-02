import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Set in your .env file
});

export const analyzeExpense = async (expense, userExpenses) => {
    try {
        // Constructing the expense context for AI analysis
        const expenseContext = `
            Current Expense:
            - Amount: $${expense.amount}
            - Category: ${expense.category}
            - Description: ${expense.description}
            
            Recent expenses in the last month:
            ${userExpenses.map(exp => `- $${exp.amount} on ${exp.category} (${exp.description})`).join('\n')}
        `;

        // Sending the prompt to Anthropic API
        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            system: "You are a financial advisor. Analyze expenses and provide insights in JSON format.",
            messages: [
                {
                    role: 'user',
                    content: `Analyze this expense and provide insights and recommendations. 
                    Consider the expense amount, category, and pattern of recent expenses.
                    **Strictly return your response as valid JSON only.**
                    
                    Example format:
                    {
                        "category": "spending_category",
                        "insights": ["insight1", "insight2"],
                        "recommendations": ["recommendation1", "recommendation2"]
                    }

                    Expense details:
                    ${expenseContext}`
                }
            ]
        });

        // Ensure AI returns structured JSON, validate response
        const messageContent = response.content?.[0]?.type === 'text' 
            ? response.content[0].text
            : '';

        const analysis = JSON.parse(messageContent);

        return {
            category: analysis.category || expense.category,
            insights: analysis.insights || ['No insights available.'],
            recommendations: analysis.recommendations || ['No recommendations available.']
        };

    } catch (error) {
        console.error('❌ AI Analysis Error:', error);
        return {
            category: expense.category,
            insights: ['Unable to generate AI insights at this time.'],
            recommendations: ['Please try again later.']
        };
    }
};