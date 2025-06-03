import React, { useEffect, useState, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'name' | 'tag'>('name');
  const [sortOption, setSortOption] = useState<'recent' | 'likes'>('recent');

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const data: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      setProjects(data);
    };

    fetchProjects();
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();

    let filtered = projects;

    if (searchFilter === 'name') {
      filtered = projects.filter(project =>
        project.type.toLowerCase().includes(query)
      );
    } else if (searchFilter === 'tag') {
      filtered = projects.filter(project =>
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Ordenamiento dinámico
    if (sortOption === 'recent') {
      return filtered.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
    } else if (sortOption === 'likes') {
      return filtered.sort((a, b) => b.likes - a.likes);
    }

    return filtered;
  }, [searchQuery, searchFilter, sortOption, projects]);

  return (
    <div className="project-table">
      <div className="header">
        <input
          type="text"
          placeholder={`Search by ${searchFilter}`}
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className="filters">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value as 'name' | 'tag')}
          >
            <option value="name">Name</option>
            <option value="tag">Tag</option>
          </select>

          <button
            className={`ml-2 ${sortOption === 'recent' ? 'text-blue-600 font-medium' : ''}`}
            onClick={() => setSortOption('recent')}
          >
            Recently updated
          </button>

          <button
            className={`ml-2 ${sortOption === 'likes' ? 'text-blue-600 font-medium' : ''}`}
            onClick={() => setSortOption('likes')}
          >
            Most liked
          </button>
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
          {filteredAndSortedProjects.map((project, idx) => (
            <ProjectRow
              key={idx}
              {...project}
              members={project.members.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
