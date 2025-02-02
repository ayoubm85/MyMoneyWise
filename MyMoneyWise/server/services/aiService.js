const Anthropic = require("@anthropic-ai/sdk");
const FinancialProfile = require("../models/FinancialProfile"); 
require("dotenv").config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

const analyzeBudget = async (budget, expenses, userProfile) => {
  try {
    console.log("📊 Analyzing Budget & Financial Profile...");

    const budgetSummary = {
      totalBudget: budget.totalBudget,
      timePeriod: "monthly",
      categories: budget.categories.map(c => ({
        name: c.name,
        allocatedAmount: c.allocatedAmount,
        spentAmount: expenses
          .filter(e => e.description.includes(c.name))
          .reduce((sum, e) => sum + e.amount, 0)
      }))
    };

    const profileSummary = userProfile
      ? {
          age: userProfile.age,
          employmentStatus: userProfile.employmentStatus,
          monthlyIncome: userProfile.monthlyIncome,
          financialGoal: userProfile.financialGoal,
          additionalNotes: userProfile.additionalNotes || "None",
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