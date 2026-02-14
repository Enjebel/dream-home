import React from 'react';

const ProjectDoc = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-md rounded-2xl my-10 border border-gray-100">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">The Blueprint: DreamHome</h1>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-blue-50 pb-2">Concept & Problem Solving</h2>
          <p>
            DreamHome was engineered to solve the fragmentation in the luxury real estate market. 
            By providing a high-performance, minimalist interface, it allows users to discover 
            premium stays without the clutter of traditional marketplaces.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-blue-50 pb-2">Technical Architecture</h2>
          <p className="mb-4">
            The application is built on a decoupled <strong>MERN</strong> architecture, ensuring 
            scalability and a smooth user experience:
          </p>

          

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <li className="p-4 bg-blue-50 rounded-xl"><strong>Frontend:</strong> React 18 with Vite for near-instant load times.</li>
            <li className="p-4 bg-blue-50 rounded-xl"><strong>Backend:</strong> Node.js & Express managing secure RESTful API routes.</li>
            <li className="p-4 bg-blue-50 rounded-xl"><strong>Database:</strong> MongoDB Atlas for globally distributed data persistence.</li>
            <li className="p-4 bg-blue-50 rounded-xl"><strong>Auth:</strong> JWT (JSON Web Tokens) for secure, stateless session management.</li>
          </ul>
        </section>

        <section className="bg-gray-900 p-8 rounded-2xl text-white shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-blue-400">Deployment & DevOps</h2>
          <p className="text-gray-300 leading-relaxed">
            A significant milestone in this project was successfully bridging the communication gap 
            between <strong>Vercel</strong> (Frontend) and <strong>Railway</strong> (Backend). 
            We implemented dynamic environment variables and custom Axios interceptors to 
            resolve cross-origin routing issues and ensure a stable production handshake.
          </p>
        </section>
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        Developed by the DreamHome Engineering Team.
      </footer>
    </div>
  );
};

export default ProjectDoc;