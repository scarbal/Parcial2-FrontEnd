import React, { useEffect, useState, useMemo } from 'react';
import { ProjectRow } from './ProjectRow';
import './ProjectTable.css';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext'; // Asegúrate de tener un contexto de autenticación

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
  ownerId: string;
}

export const ProjectTable: React.FC = () => {
  const { user } = useAuth(); 
  const [projects, setProjects] = useState<Project[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'name' | 'tag'>('name');
  const [sortOption, setSortOption] = useState<'recent' | 'likes'>('recent');
  const [viewMode, setViewMode] = useState<'all' | 'following'>('all');

  // Cargar proyectos
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

  // Cargar IDs de usuarios que sigue el usuario actual
useEffect(() => {
  const fetchFollowing = async () => {
    if (!user?.uid) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setFollowingIds(data.following || []);
    }
  };

  fetchFollowing();
}, [user]);


  const filteredAndSortedProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();

    let filtered = projects;

    // Filtro por ALL o FOLLOWING
    if (viewMode === 'following') {
      filtered = filtered.filter(project => followingIds.includes(project.ownerId));
    }

    // Filtro por nombre o tag
    if (searchFilter === 'name') {
      filtered = filtered.filter(project =>
        project.type.toLowerCase().includes(query)
      );
    } else if (searchFilter === 'tag') {
      filtered = filtered.filter(project =>
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
  }, [searchQuery, searchFilter, sortOption, viewMode, projects, followingIds]);

  return (
    <div className="project-table">
      <div className="header">
        <div className="flex gap-4 mb-3">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-full border ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setViewMode('following')}
            className={`px-4 py-2 rounded-full border ${viewMode === 'following' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Following
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder={`Search by ${searchFilter}`}
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

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

      <table className="table mt-4">
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
