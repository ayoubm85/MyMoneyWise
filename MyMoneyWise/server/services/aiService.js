const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

const analyzeBudget = async (budget, expenses, financialProfile) => {
  try {
    const budgetSummary = {
      totalBudget: budget.totalBudget,
      timePeriod: budget.timePeriod || "monthly",
      categories: Array.isArray(budget.categories)
        ? budget.categories.map(c => ({
            name: c.category || "Unknown Category", 
            allocatedAmount: c.allocatedAmount || 0,
            spentAmount: expenses
              .filter(e => e.category === c.category) 
              .reduce((sum, e) => sum + e.amount, 0),
          }))
        : [],
    };
    

    const profileSummary = financialProfile
      ? {
          age: financialProfile.age,
          employmentStatus: financialProfile.employmentStatus,
          monthlyIncome:  financialProfile.monthlyIncome,
          financialGoal:  financialProfile.financialGoal,
          additionalNotes:  financialProfile.additionalNotes || "None",
        }
      : { message: "No financial profile found for user." };

    console.log("🔍 Budget Data Sent to AI:", JSON.stringify(budgetSummary));
    console.log("🔍 Financial Profile Data Sent to AI:", JSON.stringify(profileSummary));

    const aiPrompt = `
      A user is requesting a financial analysis including their **monthly budget, expenses, and financial profile**.
      
      **Financial Profile**:
      - Age: ${profileSummary.age || "Unknown"}
      - Employment Status: ${profileSummary.employmentStatus || "Unknown"}
      - Monthly Income: $${profileSummary.monthlyIncome || "Unknown"}
      - Financial Goal: ${profileSummary.financialGoal || "Unknown"}
      - Additional Notes: ${profileSummary.additionalNotes}

      **Budget & Expenses**:
      - Total Budget: $${budgetSummary.totalBudget}
      - Time Period: ${budgetSummary.timePeriod}
      - Expense Categories:
      ${budgetSummary.categories.map(c => `- ${c.name}: Budgeted $${c.allocatedAmount}, Spent $${c.spentAmount}`).join("\n")}

      Based on this data, provide:
      1. A summary of the user's financial standing.
      2. Insights on overspending, underutilized categories, and budgeting improvements.
      3. Recommendations aligned with their financial goal (e.g., saving strategies, investment options, debt reduction).
       ** IF the data is unknown do not mention it! **
       ** You are speaking to the person concerned. Use second person pronouns and not user.**
      **Return the response strictly in JSON format:**
      {
        "summary": "Brief financial overview",
        "insights": ["Overspending on X", "Underutilized budget in Y"],
        "recommendations": ["Strategy 1", "Strategy 2"],
        "financial_advice": ["Advice specific to the user's financial goal"]
      }
    `;

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 800,
      system: "You are a financial advisor providing personalized budgeting and financial recommendations.",
      messages: [{ role: "user", content: aiPrompt }],
    });

    console.log("🤖 AI Budget & Profile Analysis Response:", response);

    const extractJSON = (text) => {
      const match = text.match(/\{[\s\S]*\}/);
      return match ? JSON.parse(match[0]) : null;
    };

    const aiData = extractJSON(response.content[0].text);
    if (!aiData) {
      throw new Error("AI did not return valid JSON.");
    }

    return aiData;
  } catch (error) {
    console.error("❌ AI Budget & Profile Analysis Error:", error);
    return {
      summary: "AI is unavailable.",
      insights: ["Please try again later."],
      recommendations: [],
      financial_advice: [],
    };
  }
};

module.exports = { analyzeBudget };
