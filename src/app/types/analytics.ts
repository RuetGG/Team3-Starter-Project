export interface AnalyticsResponse {
  success: boolean;
  data: {
    total_applicants: number;
    acceptance_rate: number;
    average_review_time_days: number;
    application_funnel: Record<string, number>;
    school_distribution: Record<string, number>;
    country_distribution: Record<string, number>;
  };
  message: string;
}
