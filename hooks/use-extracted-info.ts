import { useState } from 'react';
import type { ChatResponse } from '@/lib/types';

type ExtractedInformation = ChatResponse['extracted_information'];

// 新增函数：获取初始的空 extractedInfo 对象
export const getInitialExtractedInfo = (): ExtractedInformation => ({
  company_basic_info: {
    company_name: '',
    company_industry: '',
    company_size: '',
    company_headquarters_location: '',
  },
  current_tech_stack_assessment: {
    existing_map_location_solutions: '',
    current_cloud_provider: '',
    existing_office_collaboration_tools: '',
    existing_data_analytics_ml_platforms: '',
    existing_website_app_hosting_solutions: '',
    existing_crm_system: '',
  },
  business_challenges_and_needs: {
    location_related_business_needs: '',
    cloud_service_related_business_needs: '',
    office_collaboration_needs: '',
    data_analytics_utilization_challenges: '',
    business_growth_expansion_plans: '',
  },
  google_product_awareness_interest: {
    aware_of_google_maps_platform: '',
    considered_google_cloud: '',
    seeking_new_office_collaboration_solution: '',
    interested_google_products_features: '',
  },
  contact_information: {
    contact_person_name: '',
    contact_person_title: '',
    contact_person_email: '',
    contact_person_phone: '',
  },
});

export function useExtractedInfo() {
  // 使用 getInitialExtractedInfo() 设置初始状态
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInformation>(getInitialExtractedInfo());

  // 修改 updateExtractedInfo 函数类型
  const updateExtractedInfo = (newInfo: Partial<ExtractedInformation> | ExtractedInformation) => {
    setExtractedInfo((prev) => {
      if (typeof newInfo === 'object' && newInfo !== null) {
        return {
          ...prev,
          ...newInfo,
        };
      } else {
        return prev; // 或者处理无效的 newInfo，例如抛出错误
      }
    });
  };

  return {
    extractedInfo,
    updateExtractedInfo,
  };
} 