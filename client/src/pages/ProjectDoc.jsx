import React from 'react';

const ProjectDoc = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-sm rounded-xl">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Project Documentation</h1>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 underline decoration-blue-500">Overview</h2>
          <p>
            DreamHome is a premium real estate platform built to simplify the search for luxury accommodations. 
            By leveraging the MERN stack, I've created a responsive, secure, and high-performance application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 underline decoration-blue-500">The Stack</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <li className="p-4 bg-gray-50 rounded-lg"><strong>Frontend:</strong> React, Vite, Tailwind CSS.</li>
            <li className="p-4 bg-gray-50 rounded-lg"><strong>Backend:</strong> Node.js, Express.js.</li>
            <li className="p-4 bg-gray-50 rounded-lg"><strong>Database:</strong> MongoDB Atlas (Cloud).</li>
            <li className="p-4 bg-gray-50 rounded-lg"><strong>Auth:</strong> JSON Web Tokens (JWT).</li>
          </ul>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Technical Achievement</h2>
          <p className="text-blue-800">
            Successfully resolved complex production routing issues by implementing dynamic BaseURL logic 
            to bridge the connection between Vercel and Railway servers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectDoc;