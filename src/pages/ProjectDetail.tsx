import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, updateDoc, arrayUnion, increment,
  arrayRemove, collection, addDoc, getDocs,
  query, orderBy, Timestamp, deleteDoc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

interface Project {
  id: string;
  type: string;
  description: string;
  gitLink?: string;
  tags: string[];
  members: string[];
  stars: number;
  forks: number;
  updated: string;
  likes: number;
  favorites: number;
  comments?: string[];
  likedBy?: string[];
  favoritedBy?: string[];
  ownerId: string;
}

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProject({
          id: docSnap.id,
          likedBy: data.likedBy || [],
          favoritedBy: data.favoritedBy || [],
          ...data
        } as Project);
      }
    };

    fetchProject();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const q = query(collection(db, 'projects', id!, 'comments'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setComments(data);
  };

  const handleComment = async () => {
    if (!comment || !user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    let userName = 'Anonymous';
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      userName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    } else if (user.displayName) {
      userName = user.displayName;
    } else if (user.email) {
      userName = user.email;
    }

    const commentRef = collection(db, 'projects', id!, 'comments');
    await addDoc(commentRef, {
      text: comment,
      userId: user.uid,
      userName,
      userPhoto: user.photoURL || '',
      createdAt: Timestamp.now(),
    });

    setComment('');
    fetchComments();
  };

  const handleLike = async () => {
    if (!user || !project) return;

    const docRef = doc(db, 'projects', id!);
    const alreadyLiked = project.likedBy?.includes(user.uid);

    if (alreadyLiked) {
      await updateDoc(docRef, {
        likes: increment(-1),
        likedBy: arrayRemove(user.uid),
      });
      setProject(prev =>
        prev ? {
          ...prev,
          likes: prev.likes - 1,
          likedBy: prev.likedBy?.filter(uid => uid !== user.uid) || [],
        } : prev
      );
    } else {
      await updateDoc(docRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.uid),
      });
      setProject(prev =>
        prev ? {
          ...prev,
          likes: prev.likes + 1,
          likedBy: [...(prev.likedBy || []), user.uid],
        } : prev
      );
    }
  };

  const handleFavorite = async () => {
    if (!user || !project) return;

    const docRef = doc(db, 'projects', id!);
    const alreadyFavorited = project.favoritedBy?.includes(user.uid);

    if (alreadyFavorited) {
      await updateDoc(docRef, {
        favorites: increment(-1),
        favoritedBy: arrayRemove(user.uid),
      });
      setProject(prev =>
        prev ? {
          ...prev,
          favorites: prev.favorites - 1,
          favoritedBy: prev.favoritedBy?.filter(uid => uid !== user.uid) || [],
        } : prev
      );
    } else {
      await updateDoc(docRef, {
        favorites: increment(1),
        favoritedBy: arrayUnion(user.uid),
      });
      setProject(prev =>
        prev ? {
          ...prev,
          favorites: prev.favorites + 1,
          favoritedBy: [...(prev.favoritedBy || []), user.uid],
        } : prev
      );
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    await deleteDoc(doc(db, 'projects', id));
    navigate('/profile'); // redirige a la página de perfil
  };

  const isOwner = user && project?.ownerId === user.uid;
  const fromProfile = state?.fromProfile;

  if (!project) return <div>Loading...</div>;

return (
  <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.type}</h1>
    
    <p className="text-gray-700 mb-4">{project.description}</p>

    <div className="mb-3">
      <strong className="text-gray-800">Tags:</strong>{' '}
      <span className="text-gray-600">{project.tags.join(', ')}</span>
    </div>

    <div className="mb-6">
      <strong className="block mb-1 text-gray-700">Link del repositorio:</strong>
      <a
        href={project.gitLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline break-all"
      >
        {project.gitLink}
      </a>
    </div>

    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={handleLike}
        className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded"
      >
        {project.likedBy?.includes(user?.uid || '') ? '👎 Unlike' : '👍 Like'} ({project.likes})
      </button>
      <button
        onClick={handleFavorite}
        className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1.5 rounded"
      >
        {project.favoritedBy?.includes(user?.uid || '') ? '❤️ Unfavorite' : '🤍 Favorite'} ({project.favorites})
      </button>
    </div>

    {isOwner && fromProfile && (
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate(`/edit-project/${project.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ✏️ Edit Project
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          🗑️ Eliminate Project
        </button>
      </div>
    )}

    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

      <div className="space-y-4">
        {comments.map((c, idx) => (
          <div key={idx} className="flex gap-3 items-start bg-gray-50 p-3 rounded shadow-sm">
            <img
              src={c.userPhoto || 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png'}
              alt={c.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">{c.userName}</div>
              <div className="text-xs text-gray-500 mb-1">
                {c.createdAt?.toDate().toLocaleString()}
              </div>
              <div className="text-sm text-gray-700">{c.text}</div>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            onClick={handleComment}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  </div>
);

};
