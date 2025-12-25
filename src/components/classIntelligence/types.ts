// GitHub repo compatible types
export interface SessionData {
  // PascalCase properties (from raw data)
  SessionID: string;
  Class: string;
  Trainer: string;
  Day: string;
  Time: string;
  Date: string;
  Location: string;
  CheckedIn: number;
  Capacity: number;
  Revenue: number;
  Booked: number;
  LateCancelled: number;
  NoShow: number;
  Waitlisted: number;
  
  // camelCase aliases (for component compatibility)
  id?: string;
  className?: string;
  trainerName?: string;
  day?: string;
  time?: string;
  location?: string;
  startTime?: string;
  checkedInCount?: number;
  capacity?: number;
  totalPaid?: number;
}

export type CalculatedMetrics = {
  totalCheckIns: number;
  totalCapacity: number;
  totalRevenue: number;
  sessionCount: number;
  avgCheckIns: number;
  fillRate: number;
  consistency: number;
};

export type RankingMetric = 'avgCheckIns' | 'fillRate' | 'totalRevenue' | 'consistency' | 'sessionCount';
