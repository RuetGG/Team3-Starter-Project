// List of applications response
export type AllApplication = {
  success: boolean;
  data: {
    applications: {
      id: number;
      applicant_name: string;
      assigned_reviewer_name?: string;
      status: string;
      submitted_at: string;
    }[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
};

// Single application response
export type Application = {
  success: boolean;
  data: {
    application: {
      id: string; // UUID from backend
      status: string;
      school: string;
      student_id: string;
      country: string;
      degree: string;
      leetcode_handle: string;
      codeforces_handle: string;
      essay_why_a2sv: string;
      essay_about_you: string;
      resume_url: string;
      submitted_at: string; // ISO date string
      updated_at: string; // ISO date string
      applicant_name: string;
    };
    review: {
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
};


export type AvailableReviewer = {
  success: boolean
  data: {
    reviewers: [{
      id: string,
      full_name: string,
      email: string
    }],
    total_count: number,
  }
  message: string,
}

