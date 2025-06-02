// src/pages/CreateProject.tsx
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateProject.css'; // Estilos separados

const CreateProject: React.FC = () => {
  const [type, setType] = useState('Research paper');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<'Public' | 'Private'>('Public');
  const [tags, setTags] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddMember = () => {
    if (memberInput.trim()) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput('');
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!type || !description) {
    setError('Please fill in all required fields.');
    return;
  }

  try {
    await addDoc(collection(db, 'projects'), {
      type,
      description,
      tags,
      members,
      stars: 0,
      forks: 0,
      updated: new Date().toISOString().split('T')[0], 
      privacy,
      createdBy: user?.uid || '',
      ownerId: user?.uid || '', 
      createdAt: serverTimestamp(), 
    });

    console.log('Proyecto creado');
    navigate('/');
  } catch (err: any) {
    console.error('Error al crear el proyecto:', err);
    setError('Failed to create project. Try again.');
  }
};
  return (
    <div className="create-project-container">
      <h1 className="title">Create a project</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label>Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Privacy</label>
        <div className="privacy-options">
          {['Public', 'Private'].map((option) => (
            <button
              type="button"
              key={option}
              className={`privacy-btn ${privacy === option ? 'active' : ''}`}
              onClick={() => setPrivacy(option as 'Public' | 'Private')}
            >
              {option}
            </button>
          ))}
        </div>

        <label>Tags</label>
        <div className="input-row">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button type="button" onClick={handleAddTag}>Add</button>
        </div>
        <ul className="tag-list">
          {tags.map((tag, i) => <li key={i}>{tag}</li>)}
        </ul>

        <label>Members</label>
        <div className="input-row">
          <input
            type="text"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
          />
          <button type="button" onClick={handleAddMember}>Add</button>
        </div>
        <ul className="tag-list">
          {members.map((m, i) => <li key={i}>{m}</li>)}
        </ul>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit" className="submit-btn">Create project</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
