import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  .quill {
    border-radius: 8px;
    border: 1.5px solid var(--border-color);
    transition: border-color 0.2s;
    
    &:focus-within {
      border-color: var(--primary);
    }
    
    .ql-toolbar {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 1.5px solid var(--border-color);
      background-color: var(--light-bg);
      padding: 10px;
    }
    
    .ql-container {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      min-height: 200px;
      font-size: 1.1rem;
    }
    
    .ql-editor {
      min-height: 200px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--dark-text);
    }
  }
`;

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link', 'image'
];

const RichTextEditor = ({ value, onChange, placeholder }) => {
  return (
    <EditorContainer>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write something...'}
      />
    </EditorContainer>
  );
};

export default RichTextEditor;