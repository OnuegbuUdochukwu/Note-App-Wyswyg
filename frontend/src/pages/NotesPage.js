import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66, 184, 224, 0.10);
`;
const Title = styled.h1`
  text-align: center;
  color: #2b5561;
`;
const NoteList = styled.ul`
  list-style: none;
  padding: 0;
`;
const NoteItem = styled.li`
  background: #f7fafc;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NoteContent = styled.div`
  flex: 1;
  cursor: pointer;
  
  .note-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: #2b5561;
  }
  
  .note-body {
    max-height: 150px;
    overflow: hidden;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(transparent, #f7fafc);
    }
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
const Button = styled.button`
  background: #42b8e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: #2b5561; }
`;

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/notes');
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete note');
      fetchNotes();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Title>Notes</Title>
      <Button onClick={() => navigate('/add')}>Add Note</Button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : notes.length === 0 ? (
        <div>No notes yet.</div>
      ) : (
        <NoteList>
          {notes.map(note => (
            <NoteItem key={note.id}>
              <NoteContent onClick={() => navigate(`/edit/${note.id}`)}>
                <div className="note-title">{note.title}</div>
                <div className="note-body" dangerouslySetInnerHTML={{ __html: note.content }} />
              </NoteContent>
              <Actions>
                <Button onClick={() => navigate(`/edit/${note.id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(note.id)}>Delete</Button>
              </Actions>
            </NoteItem>
          ))}
        </NoteList>
      )}
    </Container>
  );
}