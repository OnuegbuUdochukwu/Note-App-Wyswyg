import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RichTextEditor from '../components/RichTextEditor';

const Container = styled.div`
  max-width: 500px;
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid #acccc4;
  font-size: 1.1rem;
`;
const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid #acccc4;
  font-size: 1.1rem;
  min-height: 80px;
`;
const Button = styled.button`
  background: #42b8e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #2b5561; }
`;

export default function EditNotePage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchNote(); }, [id]);

  const fetchNote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch note');
      const data = await res.json();
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to update note');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Edit Note</Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <RichTextEditor
            placeholder="Content"
            value={content}
            onChange={value => setContent(value)}
          />
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
      )}
      <Button style={{ marginTop: 16, background: '#acccc4',width:'20%', color: '#2b5561' }} type="button" onClick={() => navigate('/')}>Back</Button>
    </Container>
  );
}