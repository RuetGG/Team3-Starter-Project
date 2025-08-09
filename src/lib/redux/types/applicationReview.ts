export interface ApplicantReview {
  success: true;
  data: {
    id: string;
    applicant_details: {
      id: string;
      applicant_name: string;
      status: string;
      school: string;
      student_id: string;
      leetcode_handle: string;
      codeforces_handle: string;
      essay_why_a2sv: string;
      essay_about_you: string;
      resume_url: string;
      submitted_at: string;
      updated_at: string;
    };
    review_details: {
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
  };
  message: string;
}
