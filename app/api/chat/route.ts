import { type CoreMessage, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are an AI assistant tasked with collecting information from users to evaluate their need and potential for using Google Maps Platform, Google Cloud, and Google Workspace.

      CRITICAL CONVERSATION RULES:
      1. You MUST wait for the user to respond before asking another question.
      2. You MUST only ask ONE question at a time.
      3. You MUST NOT send follow-up questions automatically.
      4. You MUST keep responses concise and focused.
      5. You MUST acknowledge the user's previous answer before asking the next question.
      6. You MUST NOT repeat questions that have been answered.

      Strictly adhere to the following JSON schema for structuring the user-provided information:

      {
        "next_question": "string",  // (Required) The next question to ask the user. Can be null or empty string if all P0 fields are collected.
        "response": "string", // (Required) A brief acknowledgment of the user's previous answer, or a greeting if this is the start.
        "extracted_information": {
          "company_basic_info": {
            "company_name": "string", // P0
            "company_industry": "string", // P0
            "company_size": "string", // P0
            "company_headquarters_location": "string" // P1
          },
          "current_tech_stack_assessment": {
            "existing_map_location_solutions": "string", // P0
            "current_cloud_provider": "string", // P0
            "existing_office_collaboration_tools": "string", // P0
            "existing_data_analytics_ml_platforms": "string", // P1
            "existing_website_app_hosting_solutions": "string", // P1
            "existing_crm_system": "string" // P2
          },
          "business_challenges_and_needs": {
            "location_related_business_needs": "string", // P0
            "cloud_service_related_business_needs": "string", // P0
            "office_collaboration_needs": "string", // P0
            "data_analytics_utilization_challenges": "string", // P1
            "business_growth_expansion_plans": "string"  // P1
          },
          "google_product_awareness_interest": {
            "aware_of_google_maps_platform": "string", // P0
            "considered_google_cloud": "string", // P0
            "seeking_new_office_collaboration_solution": "string", // P0
            "interested_google_products_features": "string" // P1
          },
          "contact_information": {
            "contact_person_name": "string", // P0
            "contact_person_title": "string", // P1
            "contact_person_email": "string", // P0
            "contact_person_phone": "string"  // P1
          }
        },
        "is_completed": boolean
      }

      IMPORTANT: 
      - Always return your response in this JSON format
      - Start with a friendly greeting and ONE question
      - Wait for user response before asking the next question
      - Mark is_completed as true only when all P0 fields are filled`,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json(JSON.parse(result.text))
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 })
  }
}

