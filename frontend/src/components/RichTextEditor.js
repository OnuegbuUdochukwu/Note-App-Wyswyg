import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  .quill {
    border-radius: 8px;
    border: 1.5px solid #acccc4;
    
    .ql-toolbar {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 1.5px solid #acccc4;
      background-color: #f7fafc;
    }
    
    .ql-container {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      min-height: 120px;
      font-size: 1.1rem;
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