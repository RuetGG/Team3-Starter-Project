export interface Cycle {
  success: boolean;
  data: {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
  };
  message: string | null;
}

export interface AllCycle {
  success: boolean;
  data: {
    cycles: [
      {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        is_active: boolean;
        created_at: string;
      }
    ];
    total_count: number;
    page: number;
    limit: number;
  };
   message: string
}
