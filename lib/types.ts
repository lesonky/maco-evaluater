export interface ChatResponse {
  next_question: string
  response: string
  extracted_information: {
    company_basic_info: {
      company_name: string
      company_industry: string
      company_size: string
      company_headquarters_location: string
    }
    current_tech_stack_assessment: {
      existing_map_location_solutions: string
      current_cloud_provider: string
      existing_office_collaboration_tools: string
      existing_data_analytics_ml_platforms: string
      existing_website_app_hosting_solutions: string
      existing_crm_system: string
    }
    business_challenges_and_needs: {
      location_related_business_needs: string
      cloud_service_related_business_needs: string
      office_collaboration_needs: string
      data_analytics_utilization_challenges: string
      business_growth_expansion_plans: string
    }
    google_product_awareness_interest: {
      aware_of_google_maps_platform: string
      considered_google_cloud: string
      seeking_new_office_collaboration_solution: string
      interested_google_products_features: string
    }
    contact_information: {
      contact_person_name: string
      contact_person_title: string
      contact_person_email: string
      contact_person_phone: string
    }
  }
  is_completed: boolean
} 