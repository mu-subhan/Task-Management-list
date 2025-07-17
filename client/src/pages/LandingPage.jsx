import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
          <div className="flex space-x-4">
            <Link
              to="/login" 
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-block bg-blue-100 rounded-full p-4 mb-6">
              <svg 
                className="w-12 h-12 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Manage Your Tasks <span className="text-blue-600">Efficiently</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              A simple yet powerful task management application built with MERN stack. 
              Create, organize, and track your tasks to boost your productivity.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              to="/login"
              className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            {/* <Link
              to="/features"
              className="px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition transform hover:scale-105 md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </Link> */}
          </div>
          
          <div className="mt-16">
            <div className="inline-block max-w-md bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Why Choose Us?</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intuitive task management
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time collaboration
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cross-platform access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;