import React, { useEffect, useState } from 'react';
import { ProjectRow } from './ProjectRow';
import './ProjectTable.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Project {
  id: string;
  type: string;
  description: string;
  tags: string[];
  members: string[];
  stars: number;
  forks: number;
  updated: string;
  likes: number;
  favorites: number;
}

export const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const data: Project[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];

    // Ordenar por fecha descendente (más reciente primero)
    const sorted = data.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

    setProjects(sorted);
  };

  fetchProjects();
}, []);


  return (
    <div className="project-table">
      <div className="header">
        <input type="text" placeholder="Search public projects" className="search-input" />
        <div className="filters">
          <button className="text-blue-600 font-medium">All</button>
          <button>Featured</button>
          <button>Trending</button>
          <button>Popular</button>
          <button>Recently updated</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Members</th>
            <th>Forks</th>
            <th>Likes</th>
            <th>Favorites</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <ProjectRow
              key={idx}
              {...project}
              members={project.members.length} // pasamos cantidad
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
