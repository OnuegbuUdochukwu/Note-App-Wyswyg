import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RichTextEditor from '../components/RichTextEditor';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: var(--light-bg);
`;
const Sidebar = styled.div`
  width: 300px;
  background: var(--card-bg);
  box-shadow: 0 0 10px var(--shadow-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  font-size: 0.9rem;
  background: var(--light-bg);
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const NotesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: var(--primary-dark);
  margin: 0;
`;
const NoteList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const NoteItem = styled.li`
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  
  &:hover {
    background: var(--light-bg);
  }
  
  &.active {
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    border-left-color: var(--primary);
  }
  
  /* Different colors for each note based on index */
  &:nth-child(5n+1) {
    border-left-color: var(--accent1);
    &.active { border-left-color: var(--accent1); background: color-mix(in srgb, var(--accent1) 15%, transparent); }
  }
  &:nth-child(5n+2) {
    border-left-color: var(--accent2);
    &.active { border-left-color: var(--accent2); background: color-mix(in srgb, var(--accent2) 15%, transparent); }
  }
  &:nth-child(5n+3) {
    border-left-color: var(--accent3);
    &.active { border-left-color: var(--accent3); background: color-mix(in srgb, var(--accent3) 15%, transparent); }
  }
  &:nth-child(5n+4) {
    border-left-color: var(--accent4);
    &.active { border-left-color: var(--accent4); background: color-mix(in srgb, var(--accent4) 15%, transparent); }
  }
  &:nth-child(5n+5) {
    border-left-color: var(--accent5);
    &.active { border-left-color: var(--accent5); background: color-mix(in srgb, var(--accent5) 15%, transparent); }
  }
`;
const NoteContent = styled.div`
  .note-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 5px;
    color: var(--dark-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .note-body {
    font-size: 0.85rem;
    color: color-mix(in srgb, var(--dark-text) 70%, transparent);
    max-height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
const Button = styled.button`
  background: var(--primary);
  color: var(--light-text);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  &:hover { background: var(--primary-dark); }
`;

const AddButton = styled(Button)`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const NoteDetailContainer = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 1px 3px var(--shadow-color);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NoteDetailTitle = styled.h2`
  color: var(--dark-text);
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
`;

const NoteDetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  line-height: 1.6;
  color: var(--dark-text);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: color-mix(in srgb, var(--dark-text) 60%, transparent);
  text-align: center;
  padding: 20px;
  
  h3 {
    margin-bottom: 10px;
    color: var(--dark-text);
  }
  
  p {
    margin-bottom: 20px;
    max-width: 300px;
  }
`;

// Function to get color variable based on index
const getColorVariable = (index) => {
  const colorIndex = (index % 5) + 1;
  return `var(--accent${colorIndex})`;
};

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    fetchNotes(); 
  }, []);

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

  // Filter notes based on search term
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <Title>Notes</Title>
          <SearchBar>
            <SearchInput 
              type="text" 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <AddButton onClick={() => navigate('/add')}>+ New Note</AddButton>
        </SidebarHeader>
        
        <NotesList>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: '20px', color: 'red' }}>{error}</div>
          ) : filteredNotes.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--dark-text)', opacity: '0.6' }}>
              {searchTerm ? 'No matching notes found.' : 'No notes yet.'}
            </div>
          ) : (
            <NoteList>
              {filteredNotes.map(note => (
                <NoteItem 
                  key={note.id} 
                  className={selectedNote && selectedNote.id === note.id ? 'active' : ''}
                  onClick={() => setSelectedNote(note)}
                >
                  <NoteContent>
                    <div className="note-title">{note.title}</div>
                    <div className="note-body" dangerouslySetInnerHTML={{ __html: note.content }} />
                  </NoteContent>
                </NoteItem>
              ))}
            </NoteList>
          )}
        </NotesList>
      </Sidebar>
      
      <MainContent>
        {selectedNote ? (
          <>
            <ContentHeader>
              <NoteDetailTitle>{selectedNote.title}</NoteDetailTitle>
              <Actions>
                <Button onClick={() => navigate(`/edit/${selectedNote.id}`)}>Edit</Button>
                <Button 
                  onClick={() => {
                    if (handleDelete(selectedNote.id)) {
                      setSelectedNote(null);
                    }
                  }}
                  style={{ background: 'var(--secondary)' }}
                >
                  Delete
                </Button>
              </Actions>
            </ContentHeader>
            
            <NoteDetailContainer>
              <NoteDetailContent dangerouslySetInnerHTML={{ __html: selectedNote.content }} />
            </NoteDetailContainer>
          </>
        ) : (
          <EmptyState>
            <h3>No Note Selected</h3>
            <p>Select a note from the sidebar or create a new one to get started.</p>
            <Button onClick={() => navigate('/add')}>Create New Note</Button>
          </EmptyState>
        )}
      </MainContent>
    </Container>
  );
}