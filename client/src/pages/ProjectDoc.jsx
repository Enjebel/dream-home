import React from 'react';

const ProjectDoc = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8 text-gray-800">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-black text-blue-600 tracking-tight mb-2">
          Project Documentation: DreamHome
        </h1>
        <p className="text-gray-500 text-lg">A Full-Stack Real Estate Solution using the MERN Stack.</p>
      </header>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Vision</h2>
          <p className="leading-relaxed">
            DreamHome was built to provide a high-performance interface for discovering luxury 
            properties. It eliminates the friction of traditional real estate searches through 
            a minimalist, speed-optimized UI.
          </p>
        </section>

        

        <section>
          <h2 className="text-2xl font-bold mb-4">Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold text-blue-700 mb-2">Frontend</h3>
              <p className="text-sm">React 18 with Vite for optimized build times and SPA performance.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold text-blue-700 mb-2">Backend</h3>
              <p className="text-sm">Node.js and Express managing secure RESTful API endpoints.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold text-blue-700 mb-2">Database</h3>
              <p className="text-sm">MongoDB Atlas serving as a scalable, cloud-resident data store.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold text-blue-700 mb-2">Authentication</h3>
              <p className="text-sm">JWT-based stateless sessions for secure user property management.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-100">
          <h2 className="text-2xl font-bold mb-4">Infrastructure & DevOps</h2>
          <p className="mb-4">
            A key technical milestone was the synchronization of our decoupled environments. 
            By implementing dynamic <strong>VITE_API_URL</strong> variables, we resolved critical 
            production routing issues that occurred between the Vercel and Railway connection.
          </p>
        </section>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm italic">
        Documentation last updated: February 2026.
      </footer>
    </div>
  );
};

export default ProjectDoc;