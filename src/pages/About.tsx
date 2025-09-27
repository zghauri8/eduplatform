import { Users, Award, BookOpen, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">About EduPlatform</span>
            <span className="block text-blue-600">Empowering the future of education</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We're on a mission to make quality education accessible to everyone, everywhere.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Transforming Education for the Digital Age
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe that everyone deserves access to high-quality education that prepares them for the challenges of tomorrow.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Story</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Founded in 2023, EduPlatform started as a small team of educators and technologists passionate about making learning more accessible and effective for everyone.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Vision</h3>
                  <p className="mt-2 text-base text-gray-500">
                    To create a world where anyone, anywhere can transform their life through access to the world's best education.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Approach</h3>
                  <p className="mt-2 text-base text-gray-500">
                    We combine expert instruction with cutting-edge technology to create engaging, effective learning experiences.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Impact</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Over 100,000 students have transformed their careers through our platform, with 90% reporting significant professional growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Passionate educators and industry experts dedicated to your success.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                role: 'Founder & CEO',
                bio: 'Education technology expert with 15+ years of experience in online learning.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
              },
              {
                name: 'Sarah Chen',
                role: 'Head of Curriculum',
                bio: 'Former university professor with a passion for innovative teaching methods.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
              },
              {
                name: 'Michael Rodriguez',
                role: 'CTO',
                bio: 'Technology leader with expertise in building scalable learning platforms.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
              },
            ].map((person) => (
              <div key={person.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-500">
                        <img className="h-20 w-20 rounded-full" src={person.image} alt={person.name} />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{person.name}</h3>
                    <p className="mt-1 text-base text-blue-600 text-center">{person.role}</p>
                    <p className="mt-3 text-base text-gray-500 text-center">{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
