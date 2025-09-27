import { Link } from 'react-router-dom';
import { GraduationCap, Clock, Users, BookOpen, Code, BarChart2, Database, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Master full-stack web development with modern technologies like React, Node.js, and MongoDB.',
    duration: '12 weeks',
    students: 1250,
    icon: <Code className="h-8 w-8 text-blue-500" />,
    category: 'Development'
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and machine learning with Python and popular data science libraries.',
    duration: '10 weeks',
    students: 980,
    icon: <BarChart2 className="h-8 w-8 text-green-500" />,
    category: 'Data Science'
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native and modern development practices.',
    duration: '8 weeks',
    students: 750,
    icon: <Smartphone className="h-8 w-8 text-purple-500" />,
    category: 'Mobile'
  },
  {
    id: 4,
    title: 'Database Design & Management',
    description: 'Learn to design, implement, and optimize databases for modern applications.',
    duration: '6 weeks',
    students: 620,
    icon: <Database className="h-8 w-8 text-orange-500" />,
    category: 'Database'
  }
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of courses designed to help you achieve your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4">
                    {course.icon}
                  </div>
                  <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toLocaleString()}+ students</span>
                  </div>
                </div>
                <Button className="w-full">
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-6">
              We're constantly adding new courses. Let us know what you'd like to learn, and we'll notify you when it's available!
            </p>
            <Button variant="outline" className="px-8">
              Request a Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
