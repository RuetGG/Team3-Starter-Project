export interface Review {
  application_id: string;
  applicant_name: string;
  status: string; // raw API string, you can map to enum later
  submission_date: string; // ISO date string
  profile_picture_url?: string;
}
