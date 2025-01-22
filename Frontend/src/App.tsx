import React, { useState, useEffect } from 'react';
import { ArrowDown, Users, UserCheck, UserX, Shield, Instagram, Loader2, Menu, Settings, Download, FileArchive } from 'lucide-react';
import axios from 'axios';
// Smooth scroll utility
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Hero Section Component
const HeroSection = () => (
  <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-cyan-50">
    {/* Decorative background circles */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <Instagram size={64} className="text-cyan-600" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 tracking-tight">
          Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Instagram</span> Network
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
          Discover who's genuinely engaged with your content and manage your Instagram connections more effectively.
        </p>
        <button
          onClick={() => scrollToElement('checker')}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg shadow-cyan-500/20"
        >
          Get Started
          <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  </section>
);

// New HowToUse Component
const HowToUseStep = ({ number, icon, title, description }: { number: number; icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg shadow-cyan-100/20 transition-all duration-200 hover:shadow-xl">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold">
      {number}
    </div>
    <div className="flex-grow">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}


const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <div className={`fade-in-section opacity-0 translate-y-10 transition-all duration-700 ${delay} bg-white p-8 rounded-2xl shadow-lg shadow-cyan-100`}>
    <div className="flex justify-center mb-6">
      <div className="p-3 bg-cyan-50 rounded-xl">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Results Table Component
interface TableProps {
  users: string[];
  title: string;
  icon: React.ReactNode;
  statusColor: string;
  statusText: string;
  isLoading:boolean;
}

type Result = {
  not_following_back: string[];
  not_followed_by: string[];
};
const ResultTable: React.FC<TableProps> = ({ 
  users, 
  title, 
  icon, 
  statusColor, 
  statusText,
  isLoading = false 
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
          <span className="text-sm">No users found</span>
        </div>
      );
    }

    return (
      <table className="min-w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
              Username
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users.map((user, index) => (
            <tr 
              key={index} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="py-4 px-6 text-sm text-gray-900">{user}</td>
              <td className={`py-4 px-6 text-sm ${statusColor} flex items-center`}>
                <span className="flex items-center justify-center w-5 h-5">
                  {icon}
                </span>
                <span className="ml-2 font-medium">{statusText}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  
  return (
    <div className="bg-white rounded-xl shadow-lg shadow-cyan-100/20 p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {users.length > 0 && (
          <span className="text-sm text-gray-500">
            {users.length} {users.length === 1 ? 'user' : 'users'}
          </span>
        )}
      </div>
      <div className="h-64 overflow-y-auto rounded-lg border border-gray-100 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {renderContent()}
      </div>
    </div>
  );
};


const App = () => {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    not_following_back: string[];
    not_followed_by: string[];
  } | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  function generateCSV(result: Result | null): void {
    if (!result) return;
  
    // Prepare the data for CSV
    const csvData = [
      ['Not Following Back', 'Not Followed By'], // Header row
      ...result.not_following_back.map((user, index) => [
        user,
        result.not_followed_by[index] || '', // If no corresponding user, add empty string
      ]),
    ];
  
    // Convert the array to CSV string
    const csvString = csvData
      .map((row) => row.join(','))
      .join('\n');
  
    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
    // Create a download link and trigger it
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'result.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!followersFile || !followingFile) {
      setError('Please upload both files.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('followers_file', followersFile);
    formData.append('following_file', followingFile);

    try {
      const response = await axios.post<Result>(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      if (err) {
        setError(`Error: ${err}`);
      } else {
        setError('An error occurred while processing the files.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSourceClick = () => {
    window.location.href = "https://github.com/varadarajjborkar/whobacks";
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="absolute right-0 top-0 z-10 flex items-center justify-end w-full p-8">
    <button onClick={handleSourceClick} className='group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg shadow-cyan-500/20'>
      View Source
    </button>
  </header>
  <HeroSection />
      {/* How to Use Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">How to Use This Tool?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <HowToUseStep
              number={1}
              icon={<Menu className="w-5 h-5 text-cyan-500" />}
              title="Access Instagram Settings"
              description="Open Instagram → Go to Profile → Tap ☰ Menu (top-right)"
            />
            <HowToUseStep
              number={2}
              icon={<Settings className="w-5 h-5 text-cyan-500" />}
              title="Navigate to Account Center"
              description="Account Center → Select Your information and permissions"
            />
            <HowToUseStep
              number={3}
              icon={<Download className="w-5 h-5 text-cyan-500" />}
              title="Request Your Data"
              description="Download your information → Select Followers and Following → Set Format to JSON → Tap Create Files"
            />
            <HowToUseStep
              number={4}
              icon={<Loader2 className="w-5 h-5 text-cyan-500" />}
              title="Wait for Processing"
              description="Check your email for the notification when your data is ready to download"
            />
            <HowToUseStep
              number={5}
              icon={<Download className="w-5 h-5 text-cyan-500" />}
              title="Download Your Data"
              description="Return to Download your information → Download → Enter Password → Download ZIP file"
            />
            <HowToUseStep
              number={6}
              icon={<FileArchive className="w-5 h-5 text-cyan-500" />}
              title="Extract Files"
              description="Open the ZIP file → Find followers_1.json & following.json files"
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Use Our Tool?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users size={48} className="text-cyan-500" />}
              title="Track Your Network"
              description="Get instant insights into your Instagram network dynamics and relationships."
              delay=""
            />
            <FeatureCard
              icon={<UserCheck size={48} className="text-cyan-500" />}
              title="Identify True Followers"
              description="See who's genuinely engaging with your content and following you back."
              delay="delay-100"
            />
            <FeatureCard
              icon={<Shield size={48} className="text-cyan-500" />}
              title="Privacy First"
              description="Your data stays on your device. We never ask for your log in credentials."
              delay="delay-200"
            />
          </div>
        </div>
      </section>
      {/* Main Checker Section */}
      <section id="checker" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Check Your Instagram Network</h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg shadow-cyan-100/20 mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Upload Followers JSON:</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileChange(e, setFollowersFile)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white hover:file:from-cyan-600 hover:file:to-blue-600"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Upload Following JSON:</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileChange(e, setFollowingFile)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white hover:file:from-cyan-600 hover:file:to-blue-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-bold rounded-lg ${
                  loading
                    ? 'bg-gray-400'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                } transition-all duration-200 shadow-lg shadow-cyan-500/20`}
              >
                {loading ? 'Processing...' : 'Analyze My Network'}
              </button>
            </form>

            {error && (
              <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {/* Results Section */}
            {result && (
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
                {/* Result Table for Not Following Back */}
                <div className="transition-transform transform hover:scale-105">
                  <ResultTable
                    users={result.not_following_back}
                    title="Not Following Back"
                    icon={<UserX size={16} className="text-red-600" />}
                    statusColor="text-red-600"
                    statusText="Not Following Back"
                    isLoading={loading}
                  />
                </div>

                {/* Result Table for Not Followed By */}
                <div className="transition-transform transform hover:scale-105">
                  <ResultTable
                    users={result.not_followed_by}
                    title="Not Followed By"
                    icon={<Users size={16} className="text-orange-600" />}
                    statusColor="text-orange-600"
                    statusText="Not Followed By"
                    isLoading={loading}
                  />
                </div>
              </div>
            )}

            {/* Button to Download PDF */}
            {result && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => generateCSV(result)}
                  className="px-8 py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
                >
                  Download CSV Report
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* WhoBacks Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">WhoBacks</h3>
            <p className="text-gray-400">A platform to keep track of Instagram's network. Stay connected and informed.</p>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Tech Stack</h3>
            <ul className="text-gray-400">
              <li>Frontend: React, Tailwind CSS, Next.js</li>
              <li>Backend: Python(flask)</li>
              <li>Hosting: Vercel</li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Connect</h3>
            <div className="flex space-x-6">
              {/* GitHub Icon */}
              <a href="https://github.com/varadarajjborkar" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.818-.261.818-.577v-2.09c-3.338.726-4.03-1.612-4.03-1.612-.546-1.388-1.332-1.762-1.332-1.762-1.087-.744.084-.73.084-.73 1.202.085 1.834 1.231 1.834 1.231 1.065 1.818 2.798 1.292 3.486.991.108-.77.418-1.293.762-1.592-2.664-.303-5.465-1.332-5.465-5.93 0-1.309.467-2.381 1.23-3.218-.123-.302-.533-.954-.159-2.146 0 0 .965-.309 3.163 1.18a10.86 10.86 0 013.215-.433c1.084 0 2.16.151 3.163.433 2.198-1.489 3.163-1.18 3.163-1.18-.373 1.192.036 1.844-.159 2.146.763.837 1.23 1.909 1.23 3.218 0 4.607-2.802 5.625-5.466 5.928.429.378.82 1.127.82 2.268v3.354c0 .316.218.688.822.577C20.563 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a href="https://www.linkedin.com/in/varadarajborkar" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46c0 .98.79 1.77 1.77 1.77h20.46c.98 0 1.77-.79 1.77-1.77V1.77c0-.98-.79-1.77-1.77-1.77zM7.35 20.3H3.56V9.04h3.79v11.26zm-1.89-12.7c-1.2 0-2.18-.98-2.18-2.18s.98-2.18 2.18-2.18 2.18.98 2.18 2.18-.98 2.18-2.18 2.18zm15.28 12.7h-3.78v-5.57c0-1.32-.02-3.02-1.83-3.02-1.84 0-2.12 1.43-2.12 2.91v5.68h-3.79V9.04h3.64v1.53h.05c.51-.97 1.75-1.99 3.59-1.99 3.83 0 4.53 2.53 4.53 5.81v6.91z" />
                </svg>
              </a>

              {/* Twitter (X) Icon */}
              <a href="https://x.com/skinnywithbeard" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-8 border-gray-600" />

        {/* All Rights Reserved Section */}
        <div className="text-center text-gray-400 mt-10">
          <p>&copy; 2025 WhoBacks. All rights reserved.</p>
        </div>
      </div>
    </footer>

    </div>
  );
};




export default App;