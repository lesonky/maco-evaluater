import { NextResponse } from 'next/server'
import { ChatResponse } from '@/lib/types'

const GOOGLE_CHAT_WEBHOOK = process.env.GOOGLE_CHAT_WEB_HOOK!

function createGoogleChatCard(extractedInfo: ChatResponse['extracted_information']) {
  const sections = [
    {
      title: "公司基本信息",
      fields: [
        { key: "company_name", label: "公司名称", value: extractedInfo.company_basic_info.company_name },
        { key: "company_industry", label: "行业", value: extractedInfo.company_basic_info.company_industry },
        { key: "company_size", label: "公司规模", value: extractedInfo.company_basic_info.company_size },
        { key: "company_headquarters_location", label: "总部位置", value: extractedInfo.company_basic_info.company_headquarters_location },
      ],
    },
    {
      title: "技术栈评估",
      fields: [
        { key: "existing_map_location_solutions", label: "地图定位方案", value: extractedInfo.current_tech_stack_assessment.existing_map_location_solutions },
        { key: "current_cloud_provider", label: "云服务提供商", value: extractedInfo.current_tech_stack_assessment.current_cloud_provider },
        { key: "existing_office_collaboration_tools", label: "协作工具", value: extractedInfo.current_tech_stack_assessment.existing_office_collaboration_tools },
        { key: "existing_data_analytics_ml_platforms", label: "数据分析平台", value: extractedInfo.current_tech_stack_assessment.existing_data_analytics_ml_platforms },
        { key: "existing_website_app_hosting_solutions", label: "网站/应用托管", value: extractedInfo.current_tech_stack_assessment.existing_website_app_hosting_solutions },
      ],
    },
    {
      title: "业务需求",
      fields: [
        { key: "location_related_business_needs", label: "地图服务需求", value: extractedInfo.business_challenges_and_needs.location_related_business_needs },
        { key: "cloud_service_related_business_needs", label: "云服务需求", value: extractedInfo.business_challenges_and_needs.cloud_service_related_business_needs },
        { key: "office_collaboration_needs", label: "协作需求", value: extractedInfo.business_challenges_and_needs.office_collaboration_needs },
        { key: "data_analytics_utilization_challenges", label: "数据分析挑战", value: extractedInfo.business_challenges_and_needs.data_analytics_utilization_challenges },
        { key: "business_growth_expansion_plans", label: "业务增长计划", value: extractedInfo.business_challenges_and_needs.business_growth_expansion_plans },
      ],
    },
    {
      title: "Google 产品认知",
      fields: [
        { key: "aware_of_google_maps_platform", label: "Maps Platform", value: extractedInfo.google_product_awareness_interest.aware_of_google_maps_platform },
        { key: "considered_google_cloud", label: "Cloud Platform", value: extractedInfo.google_product_awareness_interest.considered_google_cloud },
        { key: "seeking_new_office_collaboration_solution", label: "Workspace", value: extractedInfo.google_product_awareness_interest.seeking_new_office_collaboration_solution },
        { key: "interested_google_products_features", label: "感兴趣的功能", value: extractedInfo.google_product_awareness_interest.interested_google_products_features },
      ],
    },
    {
      title: "联系信息",
      fields: [
        { key: "contact_person_name", label: "姓名", value: extractedInfo.contact_information.contact_person_name },
        { key: "contact_person_title", label: "职位", value: extractedInfo.contact_information.contact_person_title },
        { key: "contact_person_email", label: "邮箱", value: extractedInfo.contact_information.contact_person_email },
        { key: "contact_person_phone", label: "电话", value: extractedInfo.contact_information.contact_person_phone },
      ],
    },
  ]

  return {
    cards: [
      {
        header: {
          title: "新的业务评估结果",
          subtitle: `${extractedInfo.company_basic_info.company_name || '未知公司'} - ${extractedInfo.company_basic_info.company_industry || '未知行业'}`,
          imageUrl: "https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png",
        },
        sections: sections.map(section => ({
          header: section.title,
          widgets: [
            {
              textParagraph: {
                text: section.fields
                  .map(field => `<b>${field.label}</b>: ${field.value || "未提供"}`)
                  .join("<br>")
              }
            }
          ]
        }))
      }
    ]
  }
}

export async function POST(request: Request) {
  try {
    const extractedInfo = await request.json()
    const card = createGoogleChatCard(extractedInfo)
    
    const response = await fetch(GOOGLE_CHAT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })

    if (!response.ok) {
      throw new Error('Failed to send message to Google Chat')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending message to Google Chat:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 