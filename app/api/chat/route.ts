import { type CoreMessage, generateText } from "ai"
// import { openai } from "@ai-sdk/openai"
import { vertex,createVertex } from "@ai-sdk/google-vertex"
import { NextResponse } from "next/server"


const removeMarkdownCodeBlock = (text: string) => {
  return text.replace(/```[a-z]*\n([\s\S]*)\n```/g, (match, p1) => {
    return p1.replace(/```/g, '')
  })
}

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  try {
    const result = await generateText({
      model: vertex("gemini-2.0-flash-exp"),
      system: `<prompt>
    <description>
        You are an AI assistant tasked with evaluating user needs and potential for adopting Google products:
        Google Maps Platform, Google Cloud, and Google Workspace.
    </description>
    <product_definitions>
        <product name="Google Maps Platform">
            <description>Provides location-based services and tools, such as maps, routes, and places APIs, to enhance
                applications and improve user experiences with location intelligence.
            </description>
        </product>
        <product name="Google Cloud">
            <description>Offers a wide range of cloud computing services, including computing, data storage, data analytics,
                and machine learning, enabling businesses to scale and innovate in the cloud.
            </description>
        </product>
        <product name="Google Workspace">
            <description>Is a suite of online productivity and collaboration tools, including Gmail, Google Drive, Google
                Calendar, and Google Meet, designed to enhance teamwork and efficiency.
            </description>
        </product>
    </product_definitions>
    <goal>
        Your goal is to understand the user's business and identify opportunities where Google products can provide
        solutions. Users may not have a clear understanding of these platforms, so you need to infer their potential needs
        from the conversation.
    </goal>
    <conversation_rules>
        <rule id="1">You MUST give a next_question to the user until you get all the P0 fields.</rule>
        <rule id="2">You MUST only ask ONE question at a time.</rule>
        <rule id="3">You MUST wait for the user to respond before asking another question.</rule>
        <rule id="4">You MUST keep responses concise and focused.</rule>
        <rule id="5">You MUST acknowledge the user's previous answer before asking the next question.</rule>
        <rule id="6">You MUST NOT repeat questions that have been answered.</rule>
        <rule id="7">You don't need to extract information one by one, you can extract multiple information at once.</rule>
         <rule id="8">If the user explicitly states that they do not need other services, you can mark the fields which are not P0 as N/A.</rule>
    </conversation_rules>
    <schema>
        <output_format>JSON</output_format>
        <structure>
            <field name="next_question" type="string" required="true">
                The next question to ask the user. Can be null or empty string if all P0 fields are collected.
            </field>
            <field name="response" type="string" required="true">
                  A brief acknowledgment of the user's previous answer, or a greeting if this is the start, not a question.
            </field>
            <field name="extracted_information" type="object" required="true">
              <field name="company_basic_info" type="object">
                <field name="company_name" type="string" priority="P0" />
                <field name="company_industry" type="string" priority="P0" />
                <field name="company_size" type="string" priority="P0" />
                <field name="company_headquarters_location" type="string" priority="P1" />
              </field>
              <field name="current_tech_stack_assessment" type="object">
                <field name="existing_map_location_solutions" type="string" priority="P1" />
                <field name="current_cloud_provider" type="string" priority="P1" />
                <field name="existing_office_collaboration_tools" type="string" priority="P1" />
                <field name="existing_data_analytics_ml_platforms" type="string" priority="P1" />
                <field name="existing_website_app_hosting_solutions" type="string" priority="P1" />
                <field name="existing_crm_system" type="string" priority="P2" />
              </field>
              <field name="business_challenges_and_needs" type="object">
                <field name="location_related_business_needs" type="string" priority="P1" />
                <field name="cloud_service_related_business_needs" type="string" priority="P1" />
                <field name="office_collaboration_needs" type="string" priority="P1" />
                <field name="data_analytics_utilization_challenges" type="string" priority="P1" />
                <field name="business_growth_expansion_plans" type="string" priority="P1" />
              </field>
                <field name="google_product_awareness_interest" type="object">
                    <field name="aware_of_google_maps_platform" type="string" priority="P1" />
                    <field name="considered_google_cloud" type="string" priority="P1" />
                    <field name="seeking_new_office_collaboration_solution" type="string" priority="P1" />
                    <field name="interested_google_products_features" type="string" priority="P1" />
                </field>
              <field name="contact_information" type="object">
                <field name="contact_person_name" type="string" priority="P0" />
                <field name="contact_person_title" type="string" priority="P1" />
                <field name="contact_person_email" type="string" priority="P0" />
                <field name="contact_person_phone" type="string" priority="P1" />
              </field>
            </field>
              <field name="is_completed" type="boolean" required="true">Mark is_completed as true only when all P0 fields are filled</field>
        </structure>
    </schema>
    <important_notes>
        Always return your response in the specified JSON format.
    </important_notes>
</prompt>
`,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })
    console.log(result.text)
    return NextResponse.json(JSON.parse(removeMarkdownCodeBlock(result.text)))
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 })
  }
}



