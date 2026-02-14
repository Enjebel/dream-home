import React from 'react';

const ProjectDoc = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8 text-gray-800">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-black text-blue-600 tracking-tight mb-2">
          Project Documentation: DreamHome
        </h1>
        <p className="text-gray-500 text-lg">A Technical Overview of the MERN Stack Integration.</p>
      </header>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Vision & Problem Solving</h2>
          <p className="leading-relaxed">
            DreamHome was built to solve the fragmentation in the luxury real estate market. 
            By leveraging a decoupled MERN architecture, the platform provides a seamless 
            interface for discovering and managing premium property listings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">The Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-blue-700 mb-2">Frontend</h3>
              <p className="text-sm text-gray-600">React 18 & Vite for optimized delivery and rapid UI transitions.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-blue-700 mb-2">Backend</h3>
              <p className="text-sm text-gray-600">Node.js & Express managing secure RESTful API communication.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-blue-700 mb-2">Database</h3>
              <p className="text-sm text-gray-600">MongoDB Atlas providing cloud-native, scalable data storage.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-blue-700 mb-2">Auth</h3>
              <p className="text-sm text-gray-600">JWT stateless sessions for secure, authenticated property management.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-100">
          <h2 className="text-2xl font-bold mb-4 italic">The Production Handshake</h2>
          <p className="leading-relaxed">
            A major technical milestone involved bridging the connection between <strong>Vercel</strong> 
            and <strong>Railway</strong>. By implementing a dynamic BaseURL utility in our Axios 
            configuration, we successfully resolved cross-origin routing issues, ensuring that the 
            frontend correctly targets the <code>/api</code> prefix in a production environment.
          </p>
        </section>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        Documentation last updated: February 2026.
      </footer>
    </div>
  );
};

export default ProjectDoc;