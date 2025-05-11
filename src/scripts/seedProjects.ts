import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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

  const collectionRef = collection(db, 'projects');

  for (const project of projects) {
    await addDoc(collectionRef, project);
    console.log('Added project:', project.type);
  }

  console.log('✅ Seed completed!');
};

seedProjects().catch(console.error);
