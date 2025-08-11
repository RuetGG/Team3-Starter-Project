export interface Review {
  application_id: string;
  applicant_name: string;
  status: string; // raw API string, you can map to enum later
  submission_date: string; // ISO date string
  profile_picture_url?: string;
  tag?: "New" | "Under Review" | "Review Complete";
  review_details?: {
    id: string;
    application_id: string;
    reviewer_id: string;
    activity_check_notes: string;
    resume_score: number;
    essay_why_a2sv_score: number;
    essay_about_you_score: number;
    technical_interview_score: number;
    behavioral_interview_score: number;
    interview_notes: string;
    created_at: string;
    updated_at: string;
  };
}
