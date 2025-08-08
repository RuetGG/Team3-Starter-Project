export interface Profile {
  success: boolean;
  data: {
    id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
  } 
  message: string
}