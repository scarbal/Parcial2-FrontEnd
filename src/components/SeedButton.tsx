import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Asegúrate de importar correctamente tu configuración de Firebase

const SeedButton: React.FC = () => {
  // Función que se ejecutará al hacer clic en el botón
  const seedProjects = async () => {
    const projects = [
      {
        type: 'Research paper',
        description: 'A novel approach to unsupervised learning',
        tags: ['Machine learning', 'unsupervised learning'],
        members: ['Alice'],
        stars: 1200,
        forks: 500,
        updated: '2024-05-09',
      },
      {
        type: 'Open-source project',
        description: 'An interactive data visualization tool',
        tags: ['Data visualization', 'open-source'],
        members: ['Bob', 'Carol', 'Dave'],
        stars: 3000,
        forks: 800,
        updated: '2024-05-02',
      },
      {
        type: 'Library',
        description: 'High performance numerical computing library',
        tags: ['Math', 'Performance'],
        members: ['Eve', 'Frank'],
        stars: 2500,
        forks: 900,
        updated: '2024-04-30',
      },
      {
        type: 'Tool',
        description: 'Automated testing framework for JavaScript',
        tags: ['Testing', 'JavaScript'],
        members: ['Grace'],
        stars: 1100,
        forks: 400,
        updated: '2024-04-25',
      },
    ];

    const collectionRef = collection(db, 'projects');  // Referencia a la colección "projects" en Firestore

    try {
      for (const project of projects) {
        // Añadir cada proyecto a la colección
        await addDoc(collectionRef, project);
        console.log('Added project:', project.type);
      }

      // Al finalizar, podemos mostrar un mensaje
      alert('All projects have been added!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding projects.');
    }
  };

  return (
    <div>
      <button onClick={seedProjects} className="seed-button">
        Seed Projects
      </button>
    </div>
  );
};

export default SeedButton;
