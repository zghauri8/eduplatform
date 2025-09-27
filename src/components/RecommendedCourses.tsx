import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: Array<{
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }>;
}

interface RecommendedCoursesProps {
  score: number;
  weakAreas?: string[];
}

export const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ score, weakAreas = [] }) => {
  // Determine which courses to recommend based on score and weak areas
  const getRecommendedCourses = (): Course[] => {
    const baseCourses: Course[] = [
      {
        id: 'comms-101',
        title: 'Effective Communication Skills',
        description: 'Master the art of clear and effective communication in professional settings.',
        progress: 0,
        modules: [
          { id: 'm1', title: 'Introduction to Communication', duration: '15 min', completed: false },
          { id: 'm2', title: 'Active Listening', duration: '20 min', completed: false },
          { id: 'm3', title: 'Non-Verbal Communication', duration: '25 min', completed: false },
        ],
      },
      {
        id: 'tech-skills',
        title: 'Technical Skills Development',
        description: 'Enhance your technical skills with hands-on exercises and real-world examples.',
        progress: 0,
        modules: [
          { id: 'm1', title: 'Technical Documentation', duration: '30 min', completed: false },
          { id: 'm2', title: 'Problem-Solving Techniques', duration: '25 min', completed: false },
          { id: 'm3', title: 'Tools and Software', duration: '20 min', completed: false },
        ],
      },
    ];

    // Add specific courses based on weak areas
    const weakAreaCourses: Record<string, Course> = {
      'Communication': {
        id: 'comm-advanced',
        title: 'Advanced Communication Strategies',
        description: 'Take your communication skills to the next level with advanced techniques.',
        progress: 0,
        modules: [
          { id: 'm1', title: 'Persuasive Speaking', duration: '20 min', completed: false },
          { id: 'm2', title: 'Conflict Resolution', duration: '25 min', completed: false },
          { id: 'm3', title: 'Cross-Cultural Communication', duration: '30 min', completed: false },
        ],
      },
      'Technical': {
        id: 'tech-advanced',
        title: 'Advanced Technical Training',
        description: 'Deep dive into advanced technical concepts and applications.',
        progress: 0,
        modules: [
          { id: 'm1', title: 'Advanced Concepts', duration: '30 min', completed: false },
          { id: 'm2', title: 'Hands-on Practice', duration: '45 min', completed: false },
          { id: 'm3', title: 'Real-world Applications', duration: '35 min', completed: false },
        ],
      },
    };

    // Add weak area courses if any weak areas are detected
    const additionalCourses = weakAreas
      .map(area => weakAreaCourses[area])
      .filter(Boolean);

    return [...baseCourses, ...additionalCourses].slice(0, 3); // Return max 3 courses
  };

  const recommendedCourses = getRecommendedCourses();

  if (recommendedCourses.length === 0) return null;

  return (
    <Card className="mt-8 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary" />
          Recommended Courses
        </CardTitle>
        <p className="text-muted-foreground">Based on your assessment results, we recommend these courses to improve your skills</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Modules</h4>
                    <div className="space-y-2">
                      {course.modules.map((module) => (
                        <div key={module.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            {module.completed ? (
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            ) : (
                              <PlayCircle className="w-4 h-4 mr-2 text-primary" />
                            )}
                            <span className={module.completed ? 'line-through text-muted-foreground' : ''}>
                              {module.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {module.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  Start Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
