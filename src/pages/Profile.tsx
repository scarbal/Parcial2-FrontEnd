import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  type: string;
  description: string;
  tags: string[];
  members: string[];
  forks: number;
  likes: number;
  favorites: number;
  updated: string;
}

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), where('ownerId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(data);
    };

    const fetchUserData = async () => {
      const docSnap = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));
      if (!docSnap.empty) {
        setUserData(docSnap.docs[0].data());
      }
    };

    fetchProjects();
    fetchUserData();
  }, [user]);

  if (!user || !userData) return <div>Loading...</div>;

  return (
    <div className="flex p-6 gap-6">
      {/* Tabla de proyectos */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">My Projects</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Type</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Forks</th>
              <th>Likes</th>
              <th>Favorites</th>
              <th>Updated</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const truncatedDescription = project.description.length > 100
                ? project.description.slice(0, 100) + '...'
                : project.description;

              return (
                <tr key={project.id} className="border-t">
                  <td className="p-2 font-medium">{project.type}</td>
                  <td>
                    <span title={project.description}>{truncatedDescription}</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{project.forks}</td>
                  <td>{project.likes}</td>
                  <td>{project.favorites}</td>
                  <td>{project.updated}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/edit-project/${project.id}`)}
                      className="text-blue-600 underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Aside de usuario */}
      <aside className="w-80 bg-white shadow p-4 rounded-lg">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className="text-lg font-semibold">{userData.firstName} {userData.lastName}</h3>
          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
          <p className="text-sm text-gray-600 mb-4">@{userData.username}</p>
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Edit Profile
          </button>
        </div>
      </aside>
    </div>
  );
};
