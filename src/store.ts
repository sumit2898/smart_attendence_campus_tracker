
import { create } from 'zustand';
import { User, AttendanceRecord, OfflineQueueItem, UserRole, ScheduleItem, AIAnalysisResult } from './types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  offlineQueue: OfflineQueueItem[];
  attendanceHistory: AttendanceRecord[];
  schedule: ScheduleItem[];
  aiInsights: AIAnalysisResult | null;

  setUser: (user: User | null) => void;
  addAttendance: (record: AttendanceRecord) => void;
  syncOfflineQueue: () => void;
  addToOfflineQueue: (data: Partial<AttendanceRecord>) => void;
  setAttendanceHistory: (history: AttendanceRecord[]) => void;
  setAiInsights: (insights: AIAnalysisResult) => void;
}

// Initial dummy data for the prototype
const initialHistory: AttendanceRecord[] = [
  {
    id: 'rec-1',
    studentId: 'stud-123',
    studentName: 'Alex Johnson',
    timestamp: Date.now() - 86400000 * 1, // Yesterday
    sessionId: 'sess-ai-101',
    status: 'PRESENT',
    isSynced: true,
    location: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 'rec-2',
    studentId: 'stud-123',
    studentName: 'Alex Johnson',
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    sessionId: 'sess-ds-202',
    status: 'PRESENT',
    isSynced: true
  },
  {
    id: 'rec-3',
    studentId: 'stud-123',
    studentName: 'Alex Johnson',
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    sessionId: 'sess-net-303',
    status: 'LATE',
    isSynced: true
  },
  {
    id: 'rec-4',
    studentId: 'stud-123',
    studentName: 'Alex Johnson',
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
    sessionId: 'sess-ai-101',
    status: 'PRESENT',
    isSynced: true
  }
];

const initialQueue: OfflineQueueItem[] = [
  {
    id: 'q-1',
    data: {
      studentId: 'stud-123',
      sessionId: 'sess-lab-01',
      timestamp: Date.now() - 3600000,
      status: 'PRESENT'
    },
    attempts: 2,
    lastAttempt: Date.now() - 600000
  }
];

export const useStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  offlineQueue: initialQueue,
  attendanceHistory: initialHistory,
  schedule: [
    { id: '1', courseName: 'Advanced AI Lab', time: '09:00 AM', professor: 'Dr. Peterson', room: '402', status: 'COMPLETED' },
    { id: '2', courseName: 'Discrete Math', time: '11:00 AM', professor: 'Dr. Aris', room: 'Hall B', status: 'UPCOMING' },
    { id: '3', courseName: 'System Design', time: '02:00 PM', professor: 'Prof. Sarah', room: '305', status: 'UPCOMING' }
  ],
  aiInsights: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  addAttendance: (record) => set((state) => ({
    attendanceHistory: [record, ...state.attendanceHistory]
  })),

  setAttendanceHistory: (history) => set({ attendanceHistory: history }),
  setAiInsights: (insights) => set({ aiInsights: insights }),

  addToOfflineQueue: (data) => set((state) => ({
    offlineQueue: [...state.offlineQueue, {
      id: Math.random().toString(36).substr(2, 9),
      data,
      attempts: 0,
      lastAttempt: Date.now()
    }]
  })),

  syncOfflineQueue: async () => {
    const { offlineQueue } = get();
    if (offlineQueue.length === 0) return;

    // Simulate API call delay
    await new Promise(r => setTimeout(r, 2000));

    const newHistory = offlineQueue.map(item => ({
      id: item.id,
      studentId: item.data.studentId || 'unknown',
      studentName: 'Current User', // Simplified for prototype
      timestamp: item.data.timestamp || Date.now(),
      sessionId: item.data.sessionId || 'unknown',
      status: item.data.status as any || 'PRESENT',
      isSynced: true
    }));

    set((state) => ({
      offlineQueue: [],
      attendanceHistory: [...newHistory, ...state.attendanceHistory]
    }));

    alert(`Successfully synced ${offlineQueue.length} records to the cloud!`);
  }
}));
