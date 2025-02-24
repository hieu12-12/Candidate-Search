import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchNextCandidate = async () => {
    if (retryCount >= MAX_RETRIES) {
      setError('Unable to load candidate. Please try again later.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const users = await searchGithub();
      if (!users?.[0]) throw new Error('No users available');

      const detailedUser = await searchGithubUser(users[0].login);
      setCurrentCandidate(detailedUser);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, [retryCount]);

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const candidateToSave = {
        id: currentCandidate.id,
        login: currentCandidate.login,
        name: currentCandidate.name || null,
        avatar_url: currentCandidate.avatar_url,
        location: currentCandidate.location || null,
        email: currentCandidate.email || null,
        company: currentCandidate.company || null,
        bio: currentCandidate.bio || null,
        html_url: currentCandidate.html_url
      };

      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidateToSave]));
    }
    fetchNextCandidate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8">
      <h1 className="text-4xl font-bold mb-12 text-white">Candidate Search</h1>

      {error ? (
        <div className="bg-red-600/20 text-red-300 p-4 rounded-lg">
          {error}
          <button 
            onClick={() => setRetryCount(0)}
            className="block mt-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : isLoading ? (
        <div className="text-white">Loading...</div>
      ) : currentCandidate ? (
        <div className="w-[400px] bg-black rounded-lg overflow-hidden shadow-lg">
          <img 
            src={currentCandidate.avatar_url} 
            alt={currentCandidate.login}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4 space-y-2 text-white">
            <h2 className="text-xl font-semibold">
              {currentCandidate.name || currentCandidate.login}
              <span className="text-gray-400 ml-1">(@{currentCandidate.login})</span>
            </h2>

            {currentCandidate.location && (
              <p className="text-gray-300">📍 {currentCandidate.location}</p>
            )}
            {currentCandidate.email && (
              <p>
                📧 <a href={`mailto:${currentCandidate.email}`} className="text-blue-400 hover:underline">
                  {currentCandidate.email}
                </a>
              </p>
            )}
            {currentCandidate.company && (
              <p className="text-gray-300">🏢 {currentCandidate.company}</p>
            )}
            {currentCandidate.bio && (
              <p className="text-gray-400">📝 {currentCandidate.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-16 p-4">
            <button 
              onClick={fetchNextCandidate}
              className="w-16 h-16 rounded-full bg-gray-700 text-white text-3xl flex items-center justify-center hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              −
            </button>
            <button 
              onClick={handleAccept}
              className="w-16 h-16 rounded-full bg-gray-700 text-white text-3xl flex items-center justify-center hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CandidateSearch;
