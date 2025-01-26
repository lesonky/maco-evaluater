import { ChatResponse } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExtractedInfoCardProps {
  extractedInfo: ChatResponse['extracted_information']
  className?: string
}

export function ExtractedInfoCard({ extractedInfo, className }: ExtractedInfoCardProps) {
  console.log("ExtractedInfoCard received extractedInfo:", extractedInfo);
  const sections = [
    {
      title: "公司基本信息",
      fields: [
        { key: "company_name", label: "公司名称", priority: "P0" },
        { key: "company_industry", label: "行业", priority: "P0" },
        { key: "company_size", label: "公司规模", priority: "P0" },
        { key: "company_headquarters_location", label: "总部位置", priority: "P1" },
      ],
      data: extractedInfo.company_basic_info,
    },
    {
      title: "技术栈评估",
      fields: [
        { key: "existing_map_location_solutions", label: "地图定位方案", priority: "P1" },
        { key: "current_cloud_provider", label: "云服务提供商", priority: "P1" },
        { key: "existing_office_collaboration_tools", label: "协作工具", priority: "P1" },
        { key: "existing_data_analytics_ml_platforms", label: "数据分析平台", priority: "P1" },
        { key: "existing_website_app_hosting_solutions", label: "网站/应用托管", priority: "P1" },
        { key: "existing_crm_system", label: "CRM 系统", priority: "P2" },
      ],
      data: extractedInfo.current_tech_stack_assessment,
    },
    {
      title: "业务需求",
      fields: [
        { key: "location_related_business_needs", label: "地图服务需求", priority: "P1" },
        { key: "cloud_service_related_business_needs", label: "云服务需求", priority: "P1" },
        { key: "office_collaboration_needs", label: "协作需求", priority: "P1" },
        { key: "data_analytics_utilization_challenges", label: "数据分析挑战", priority: "P1" },
        { key: "business_growth_expansion_plans", label: "业务增长计划", priority: "P1" },
      ],
      data: extractedInfo.business_challenges_and_needs,
    },
    {
      title: "Google 产品认知",
      fields: [
        { key: "aware_of_google_maps_platform", label: "Maps Platform", priority: "P1" },
        { key: "considered_google_cloud", label: "Cloud Platform", priority: "P1" },
        { key: "seeking_new_office_collaboration_solution", label: "Workspace", priority: "P1" },
        { key: "interested_google_products_features", label: "感兴趣的功能", priority: "P1" },
      ],
      data: extractedInfo.google_product_awareness_interest,
    },
    {
      title: "联系信息",
      fields: [
        { key: "contact_person_name", label: "姓名", priority: "P0" },
        { key: "contact_person_title", label: "职位", priority: "P1" },
        { key: "contact_person_email", label: "邮箱", priority: "P0" },
        { key: "contact_person_phone", label: "电话", priority: "P1" },
      ],
      data: extractedInfo.contact_information,
    },
  ] as const

  return (
    <Card className={cn("w-80 bg-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">信息收集进度</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">{section.title}</h3>
            <div className="space-y-1">
              {section.fields.map((field) => {
                const value = section.data[field.key as keyof typeof section.data] as string
                const isCompleted = value && value.trim() !== ""
                return (
                  <div
                    key={field.key}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{field.label}</span>
                    </div>
                    <Badge
                      variant={field.priority === "P0" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {field.priority}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 