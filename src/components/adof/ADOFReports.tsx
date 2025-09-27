import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestResult } from '@/lib/api';
import { 
  Trophy, 
  BarChart3, 
  ArrowLeft, 
  RotateCcw, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  GraduationCap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar as CalendarIcon,
  Target,
  Award,
  FileText,
  Download,
  PlayCircle,
  BookOpen,
  Video,
  FileQuestion,
  ChevronDown
} from 'lucide-react';

interface SelectedJob {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
}

interface CVData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  education: string;
  file?: File;
}

interface Analysis {
  areas_for_improvement?: string[];
  // Add other analysis properties here if they exist
}

interface ADOFReportsProps {
  selectedJob: SelectedJob;
  cvData: CVData;
  testResults: {
    data: {
      percentage: number;
      total_score: number;
      max_score: number;
      analysis?: Analysis;
    };
  };
  onBackToJobs: () => void;
}

export const ADOFReports: React.FC<ADOFReportsProps> = ({ 
  selectedJob, 
  cvData, 
  testResults, 
  onBackToJobs 
}) => {
  const { data } = testResults;
  const { percentage, total_score, max_score, analysis } = data;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'default';
    if (percentage >= 60) return 'secondary';
    return 'destructive';
  };

  const getRecommendation = (percentage: number) => {
    if (percentage > 60) {
      return null; // No recommendation needed for scores above 60
    }
    
    if (percentage >= 0 && percentage <= 60) {
      return {
        status: 'Needs Improvement',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        description: 'The candidate may need additional training or experience to meet the job requirements.',
        action: (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Feedback:</span> Consider the following areas for improvement:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {analysis?.areas_for_improvement && analysis.areas_for_improvement.length > 0 ? (
                analysis.areas_for_improvement.map((area, i) => (
                  <li key={i}>{area}</li>
                ))
              ) : (
                <>
                  <li>Review and strengthen core competencies for this role</li>
                  <li>Enhance technical skills through hands-on projects and practice</li>
                  <li>Gain more experience with industry-standard tools and technologies</li>
                  <li>Improve problem-solving abilities through coding challenges</li>
                  <li>Consider additional training or certification in key areas</li>
                </>
              )}
            </ul>
          </div>
        )
      };
    }
    
    return null; // Fallback for any unexpected cases
  
  };

  const recommendation = getRecommendation(percentage);
  const RecommendationIcon = recommendation?.icon || CheckCircle; // Default to CheckCircle if no recommendation (100% case)

  // Calculate skill match
  const skillMatch = cvData.skills.filter(skill => 
    selectedJob.skills.some(jobSkill => 
      jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  );

  const skillMatchPercentage = selectedJob.skills.length > 0 
    ? Math.round((skillMatch.length / selectedJob.skills.length) * 100)
    : 0;

  const handleDownloadReport = async () => {
    try {
      // Dynamically import jsPDF and autoTable
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(40, 62, 80);
      doc.text('Candidate Assessment Report', pageWidth / 2, 20, { align: 'center' });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - 20, 20, { align: 'right' });
      
      // Add candidate info section
      doc.setFontSize(14);
      doc.setTextColor(40, 62, 80);
      doc.text('Candidate Information', 14, 40);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${cvData.name}`, 14, 50);
      doc.text(`Email: ${cvData.email}`, 14, 57);
      doc.text(`Phone: ${cvData.phone}`, 14, 64);
      
      // Add job info section
      doc.setFontSize(14);
      doc.setTextColor(40, 62, 80);
      doc.text('Job Details', 14, 84);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Position: ${selectedJob.title}`, 14, 94);
      doc.text(`Company: ${selectedJob.company}`, 14, 101);
      
      // Add skills match section
      doc.setFontSize(14);
      doc.setTextColor(40, 62, 80);
      doc.text('Skills Match', 14, 121);
      
      // Skills match percentage
      doc.setFontSize(11);
      doc.text(`Match: ${skillMatchPercentage}%`, 14, 131);
      
      // Add matched skills
      const matchedSkills = skillMatch.join(', ');
      const splitText = doc.splitTextToSize(`Matched Skills: ${matchedSkills}`, pageWidth - 30);
      doc.text(splitText, 14, 138);
      
      // Add test results
      doc.setFontSize(14);
      doc.setTextColor(40, 62, 80);
      doc.text('Assessment Results', 14, 160);
      
      doc.setFontSize(11);
      // Get the percentage from the test results (it's a number, not a score property)
      const percentage = testResults.data.percentage || 0;
      doc.text(`Score: ${percentage}%`, 14, 170);
      doc.text(`Recommendation: ${getRecommendation(percentage).status}`, 14, 177);
      
      // Add a simple table for test results
      const headers = ['Section', 'Score'];
      const analysis = testResults.data.analysis || {};
      const data = [
        ['Technical Knowledge', `${analysis['technical'] || 0}%`],
        ['Problem Solving', `${analysis['problem_solving'] || 0}%`],
        ['Communication', `${analysis['communication'] || 0}%`]
      ];
      
      autoTable(doc, {
        startY: 190,
        head: [headers],
        body: data,
        theme: 'grid',
        headStyles: {
          fillColor: [40, 62, 80],
          textColor: 255,
          fontStyle: 'bold'
        },
        margin: { left: 14, right: 14 },
        styles: { fontSize: 10 }
      });
      
      // Save the PDF
      doc.save(`ADOF_Report_${cvData.name.replace(/\s+/g, '_')}_${selectedJob.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to JSON download if PDF generation fails
      const reportData = {
        candidate: cvData,
        job: selectedJob,
        testResults: testResults,
        timestamp: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `ADOF_Report_${cvData.name.replace(/\s+/g, '_')}_${selectedJob.title.replace(/\s+/g, '_')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  return (
    <div className="space-y-6 bg-gray-900 min-h-screen p-6">
      {/* Header Section */}
      <Card className="mt-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl text-white">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-white">ADOF Assessment Report</span>
          </CardTitle>
          <CardDescription className="text-base text-gray-300">
            Comprehensive evaluation results for job fit assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-400" />
                <h3 className="font-semibold text-white">Candidate Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{cvData.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span>{cvData.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{cvData.phone}</span>
                </div>
              </div>
            </div>

            {/* Job Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <h3 className="font-semibold text-white">Job Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-medium">{selectedJob.title}</div>
                <div className="text-muted-foreground">{selectedJob.company}</div>
                <div className="text-xs text-muted-foreground">
                  Assessment Date: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Removed Overall Score, Competency Analysis, and Skills Match Analysis sections */}

      {/* Candidate Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Candidate Profile Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Briefcase className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Experience</h4>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {cvData.experience}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Education</h4>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {cvData.education}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-4 h-4 text-primary" />
              <h4 className="font-semibold">Skills Portfolio</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant={skillMatch.includes(skill) ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {skill}
                  {skillMatch.includes(skill) && <CheckCircle className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-6 text-gray-200">
        <Button
          onClick={handleDownloadReport}
          size="lg"
          variant="outline"
          className="px-8 py-6 text-lg font-medium"
        >
          <Download className="mr-3 h-5 w-5" />
          Download Report
        </Button>
        
        <Button
          onClick={onBackToJobs}
          size="lg"
          className="px-8 py-6 text-lg font-medium"
        >
          <CheckCircle className="mr-3 h-5 w-5" />
          Thank you for applying
        </Button>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ 
  title, 
  description, 
  icon: Icon, 
  lectures, 
  progress 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  lectures: Array<{
    id: string;
    title: string; 
    duration: string; 
    type: 'video' | 'quiz' | 'assignment' | 'project';
    content?: string;
    resources?: Array<{name: string; type: 'pdf' | 'doc' | 'link' | 'ppt'; url: string}>;
  }>;
  progress: number;
}) => {
  const [expandedLecture, setExpandedLecture] = React.useState<string | null>(null);
  const [isCourseStarted, setIsCourseStarted] = React.useState(false);
  const [currentLecture, setCurrentLecture] = React.useState(0);

  const getLectureIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4 text-primary mr-2" />;
      case 'quiz': return <FileQuestion className="w-4 h-4 text-yellow-500 mr-2" />;
      case 'assignment': return <FileText className="w-4 h-4 text-blue-500 mr-2" />;
      case 'project': return <Award className="w-4 h-4 text-purple-500 mr-2" />;
      default: return <PlayCircle className="w-4 h-4 text-primary mr-2" />;
    }
  };

  const toggleLecture = (lectureId: string) => {
    setExpandedLecture(expandedLecture === lectureId ? null : lectureId);
  };

  const startCourse = () => {
    setIsCourseStarted(true);
    setCurrentLecture(0);
  };

  const nextLecture = () => {
    if (currentLecture < lectures.length - 1) {
      setCurrentLecture(currentLecture + 1);
      setExpandedLecture(lectures[currentLecture + 1].id);
    }
  };

  const prevLecture = () => {
    if (currentLecture > 0) {
      setCurrentLecture(currentLecture - 1);
      setExpandedLecture(lectures[currentLecture - 1].id);
    }
  };

  const renderLectureContent = (lecture: typeof lectures[0]) => {
    if (!isCourseStarted) return null;
    
    return (
      <div className="mt-4 p-4 bg-muted/20 rounded-md">
        <h4 className="font-medium mb-2">{lecture.title}</h4>
        {lecture.content && (
          <div className="prose prose-sm max-w-none mb-4">
            {lecture.content}
          </div>
        )}
        
        {lecture.resources && lecture.resources.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">Resources:</h5>
            <div className="space-y-2">
              {lecture.resources.map((resource, idx) => (
                <a 
                  key={idx} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {resource.name}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-4 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevLecture}
            disabled={currentLecture === 0}
          >
            Previous
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={nextLecture}
            disabled={currentLecture === lectures.length - 1}
          >
            {currentLecture === lectures.length - 1 ? 'Complete Course' : 'Next'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-muted/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{lectures.length} modules</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </div>
      
      <div className="p-4 border-t flex-1 flex flex-col">
        <h4 className="text-sm font-medium mb-3">Course Content</h4>
        <div className="space-y-2">
          {lectures.map((lecture, index) => (
            <div key={lecture.id} className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/50"
                onClick={() => toggleLecture(lecture.id)}
              >
                <div className="flex items-center">
                  {getLectureIcon(lecture.type)}
                  <span className="text-sm">{lecture.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">{lecture.duration}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedLecture === lecture.id ? 'transform rotate-180' : ''
                  }`} />
                </div>
              </div>
              {expandedLecture === lecture.id && (
                <div className="p-3 border-t text-sm">
                  {lecture.content && (
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      {lecture.content.substring(0, 100)}...
                    </p>
                  )}
                  {lecture.resources && lecture.resources.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {lecture.resources.length} resources available
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {!isCourseStarted ? (
          <Button className="mt-4 w-full" size="sm" onClick={startCourse}>
            Start Course
          </Button>
        ) : (
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">Current Lesson: {lectures[currentLecture].title}</h5>
            {renderLectureContent(lectures[currentLecture])}
          </div>
        )}
      </div>
    </div>
  );
};