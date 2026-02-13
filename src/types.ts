
export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  deviceId?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: number;
  sessionId: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT';
  location?: {
    lat: number;
    lng: number;
  };
  isSynced: boolean;
}

export interface Session {
  id: string;
  courseName: string;
  startTime: number;
  facultyId: string;
  location: {
    lat: number;
    lng: number;
    radius: number; // meters
  };
  wifiBssid?: string;
}

export interface OfflineQueueItem {
  id: string;
  data: Partial<AttendanceRecord>;
  attempts: number;
  lastAttempt: number;
}

export interface ScheduleItem {
  id: string;
  courseName: string;
  time: string;
  professor: string;
  room: string;
  status: 'UPCOMING' | 'COMPLETED' | 'LIVE';
}

export interface AIAnalysisResult {
  riskScore: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  recommendation: string;
  lastUpdated: number;
}
