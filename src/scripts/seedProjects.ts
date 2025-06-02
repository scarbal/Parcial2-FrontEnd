import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const seedProjects = async () => {
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
    {
      type: 'Mobile App',
      description: 'Fitness tracking app with social features',
      tags: ['Mobile', 'Fitness', 'React Native'],
      members: ['Heidi', 'Ivan'],
      stars: 1800,
      forks: 600,
      updated: '2024-04-15',
    },
    {
      type: 'Game',
      description: '2D strategy game with multiplayer support',
      tags: ['Game development', 'Multiplayer', 'Unity'],
      members: ['Judy', 'Karl'],
      stars: 2200,
      forks: 750,
      updated: '2024-04-10',
    },
    {
      type: 'API',
      description: 'RESTful API for cryptocurrency data',
      tags: ['API', 'Blockchain'],
      members: ['Leo'],
      stars: 2700,
      forks: 950,
      updated: '2024-04-03',
    },
    {
      type: 'CLI Tool',
      description: 'Command-line tool for image compression',
      tags: ['CLI', 'Optimization'],
      members: ['Mallory', 'Nina'],
      stars: 900,
      forks: 300,
      updated: '2024-03-28',
    },
  ];

  const fakeUsers = [
    { userId: 'user1', name: 'Alice' },
    { userId: 'user2', name: 'Bob' },
    { userId: 'user3', name: 'Carol' },
    { userId: 'user4', name: 'Dave' },
    { userId: 'user5', name: 'Eve' },
  ];

  const commentTemplates = [
    'Incredible work! 🔥',
    'Very useful, thanks for sharing.',
    'I would love to contribute!',
    'How did you implement the core logic?',
    'Looking forward to the next update!',
  ];

  const collectionRef = collection(db, 'projects');

  for (const project of projects) {
    // Agregar proyecto
    const projectDoc = await addDoc(collectionRef, project);
    const projectId = projectDoc.id;
    console.log(`✅ Added project: ${project.type}`);

    // Agregar comentarios (3 por proyecto)
    for (let i = 0; i < 3; i++) {
      const user = fakeUsers[i % fakeUsers.length];
      const commentRef = collection(db, 'projects', projectId, 'comments');
      await addDoc(commentRef, {
        userId: user.userId,
        userDisplayName: user.name,
        text: commentTemplates[i],
        timestamp: serverTimestamp(),
      });
    }

    // Agregar likes (todos los usuarios dan like a todos los proyectos)
    for (const user of fakeUsers) {
      const likeRef = doc(db, 'projects', projectId, 'likes', user.userId);
      await setDoc(likeRef, { timestamp: Date.now() });
    }

    // Agregar favoritos (solo algunos usuarios)
    for (const user of fakeUsers.slice(0, 3)) {
      const favRef = doc(db, 'projects', projectId, 'favorites', user.userId);
      await setDoc(favRef, { timestamp: Date.now() });
    }
  }

  console.log('🌱 Seed completed with 8 projects, comments, likes, and favorites!');
};

seedProjects().catch(console.error);

};