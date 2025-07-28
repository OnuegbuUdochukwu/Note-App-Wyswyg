import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichTextEditor from '../components/RichTextEditor';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--shadow-color);
`;
const Title = styled.h1`
  text-align: center;
  color: var(--primary-dark);
  margin-bottom: 24px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--border-color);
  font-size: 1.1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;
const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid var(--border-color);
  font-size: 1.1rem;
  min-height: 80px;
`;
const Button = styled.button`
  background: var(--primary);
  color: var(--light-text);
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: var(--primary-dark); }
`;

export default function AddNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to add note');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add Note</Title>
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
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Note'}</Button>
        {error && <div style={{ color: 'var(--secondary)' }}>{error}</div>}
      </Form>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button 
          style={{ 
            width: '200px', 
            background: 'var(--light-bg)', 
            color: 'var(--dark-text)' 
          }} 
          type="button" 
          onClick={() => navigate('/')}
        >
          Back to Notes
        </Button>
      </div>
    </Container>
  );
}