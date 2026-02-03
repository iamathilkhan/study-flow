import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Subject {
  id: string;
  name: string;
  difficulty: number;
  priority: 'high' | 'medium' | 'low';
  color: string;
  hoursPerWeek: number;
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName: string;
  day: string;
  startTime: string;
  durationMinutes: number;
  sessionType: 'Deep Focus' | 'Review' | 'Quick Recap';
  status: 'planned' | 'completed' | 'skipped';
  score?: number;
  reason?: string;
}

interface StudyContextType {
  subjects: Subject[];
  sessions: StudySession[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  completeSession: (id: string, score: number) => void;
  generateSchedule: (days: string[], hoursPerDay: number) => void;
  stats: {
    totalHours: number;
    streak: number;
    subjectsCount: number;
    avgScore: number;
  };
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

const mockSubjects: Subject[] = [
  { id: '1', name: 'Calculus', difficulty: 8, priority: 'high', color: '#10B981', hoursPerWeek: 5 },
  { id: '2', name: 'Physics', difficulty: 7, priority: 'medium', color: '#8B5CF6', hoursPerWeek: 4 },
  { id: '3', name: 'English', difficulty: 4, priority: 'low', color: '#F59E0B', hoursPerWeek: 2 },
  { id: '4', name: 'Chemistry', difficulty: 6, priority: 'medium', color: '#F43F5E', hoursPerWeek: 3 },
];

const mockSessions: StudySession[] = [
  { id: '1', subjectId: '1', subjectName: 'Calculus', day: 'Mon', startTime: '09:00', durationMinutes: 75, sessionType: 'Deep Focus', status: 'completed', score: 78, reason: 'Low recent performance + high difficulty' },
  { id: '2', subjectId: '2', subjectName: 'Physics', day: 'Mon', startTime: '11:00', durationMinutes: 60, sessionType: 'Deep Focus', status: 'completed', score: 85 },
  { id: '3', subjectId: '3', subjectName: 'English', day: 'Mon', startTime: '14:00', durationMinutes: 45, sessionType: 'Review', status: 'planned' },
  { id: '4', subjectId: '1', subjectName: 'Calculus', day: 'Tue', startTime: '09:00', durationMinutes: 90, sessionType: 'Deep Focus', status: 'planned' },
  { id: '5', subjectId: '4', subjectName: 'Chemistry', day: 'Tue', startTime: '11:30', durationMinutes: 60, sessionType: 'Deep Focus', status: 'planned' },
  { id: '6', subjectId: '2', subjectName: 'Physics', day: 'Wed', startTime: '10:00', durationMinutes: 75, sessionType: 'Deep Focus', status: 'planned' },
  { id: '7', subjectId: '3', subjectName: 'English', day: 'Wed', startTime: '14:00', durationMinutes: 30, sessionType: 'Quick Recap', status: 'planned' },
  { id: '8', subjectId: '1', subjectName: 'Calculus', day: 'Thu', startTime: '09:00', durationMinutes: 60, sessionType: 'Deep Focus', status: 'planned' },
  { id: '9', subjectId: '4', subjectName: 'Chemistry', day: 'Thu', startTime: '11:00', durationMinutes: 45, sessionType: 'Review', status: 'planned' },
  { id: '10', subjectId: '2', subjectName: 'Physics', day: 'Fri', startTime: '10:00', durationMinutes: 60, sessionType: 'Deep Focus', status: 'planned' },
];

export const StudyProvider = ({ children }: { children: ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [sessions, setSessions] = useState<StudySession[]>(mockSessions);

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: Date.now().toString() };
    setSubjects([...subjects, newSubject]);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setSessions(sessions.filter(s => s.subjectId !== id));
  };

  const completeSession = (id: string, score: number) => {
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, status: 'completed' as const, score } : s
    ));
  };

  const generateSchedule = (days: string[], hoursPerDay: number) => {
    // Mock schedule generation - in production this would call the recommendation engine
    const newSessions: StudySession[] = [];
    const sessionTypes: ('Deep Focus' | 'Review' | 'Quick Recap')[] = ['Deep Focus', 'Review', 'Quick Recap'];
    
    days.forEach((day, dayIndex) => {
      let currentHour = 9;
      subjects.forEach((subject, index) => {
        const duration = Math.floor(Math.random() * 45) + 30;
        newSessions.push({
          id: `${Date.now()}-${dayIndex}-${index}`,
          subjectId: subject.id,
          subjectName: subject.name,
          day,
          startTime: `${currentHour.toString().padStart(2, '0')}:00`,
          durationMinutes: duration,
          sessionType: duration >= 60 ? 'Deep Focus' : duration >= 30 ? 'Review' : 'Quick Recap',
          status: 'planned',
          reason: subject.priority === 'high' ? 'High priority subject' : undefined,
        });
        currentHour += 2;
      });
    });
    
    setSessions(newSessions);
  };

  const stats = {
    totalHours: sessions.filter(s => s.status === 'completed').reduce((acc, s) => acc + s.durationMinutes / 60, 0),
    streak: 5, // Mock streak
    subjectsCount: subjects.length,
    avgScore: Math.round(
      sessions.filter(s => s.score).reduce((acc, s) => acc + (s.score || 0), 0) / 
      Math.max(sessions.filter(s => s.score).length, 1)
    ),
  };

  return (
    <StudyContext.Provider value={{ 
      subjects, 
      sessions, 
      addSubject, 
      updateSubject, 
      deleteSubject, 
      completeSession,
      generateSchedule,
      stats 
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
