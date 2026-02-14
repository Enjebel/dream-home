import React from 'react';

const ProjectDoc = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">The Blueprint: DreamHome</h1>
      <p className="text-lg italic mb-8">A Technical Overview of a Modern MERN Stack Real Estate Platform</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-100 pb-2">The Concept</h2>
        <p>
          DreamHome was developed to bridge the gap between cluttered real estate marketplaces and high-end users. 
          The goal was to create a specialized platform for luxury stays that offers a clean, distraction-free 
          experience for both property seekers and owners.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-100 pb-2">Technical Architecture</h2>
        <p className="mb-4">
          The platform utilizes the <strong>MERN Stack</strong> to ensure high performance and a unified 
          JavaScript development environment:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Frontend:</strong> React + Vite for a fast, responsive Single Page Application (SPA).</li>
          <li><strong>Backend:</strong> Node.js & Express handling RESTful API logic and JWT authentication.</li>
          <li><strong>Database:</strong> MongoDB Atlas for cloud-based, non-relational data persistence.</li>
          <li><strong>DevOps:</strong> Dual-cloud deployment via Vercel (Frontend) and Railway (Backend).</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-100 pb-2">Key Challenges Solved</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-1">Production Handshake Fix</h3>
          <p className="text-sm">
            One of the primary challenges was ensuring stable cross-origin communication. We implemented custom 
            Axios interceptors and dynamic BaseURL logic to resolve a critical 404 routing error during the 
            transition from local development to production servers.
          </p>
        </div>
      </section>

      <footer className="mt-12 text-sm text-gray-500 border-t pt-4">
        &copy; 2026 DreamHome Project | Developed by [Your Name]
      </footer>
    </div>
  );
};

export default ProjectDoc;