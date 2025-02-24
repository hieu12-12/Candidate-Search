import { useState, useEffect } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const getSavedCandidates = (): Candidate[] => {
  return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setSavedCandidates(getSavedCandidates());
  }, []);

  const handleReject = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-100">
        Potential Candidates
      </h1>

      <div className="overflow-hidden rounded-lg shadow-lg border border-gray-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              {["Image", "Name", "Location", "Email", "Company", "Bio", "Action"].map((heading) => (
                <th key={heading} className="px-6 py-4 text-left text-sm font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {savedCandidates.length > 0 ? (
              savedCandidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  className={`border-b border-gray-700 transition hover:bg-gray-800 hover:shadow-md ${
                    index % 2 === 0 ? 'bg-gray-850' : 'bg-gray-900'
                  }`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={candidate.avatar_url}
                      alt={candidate.login}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-100 font-medium">{candidate.name || candidate.login}</span>
                    <br />
                    <span className="text-gray-400 text-sm">({candidate.login})</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{candidate.location || '—'}</td>
                  <td className="px-6 py-4">
                    {candidate.email ? (
                      <a href={`mailto:${candidate.email}`} className="text-blue-400 hover:underline">
                        {candidate.email}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{candidate.company || '—'}</td>
                  <td className="px-6 py-4 text-gray-400">{candidate.bio || '—'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleReject(candidate.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition-transform transform hover:scale-105"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-gray-400 text-lg">
                  No saved candidates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
