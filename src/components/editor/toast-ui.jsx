import React, { useRef, useCallback } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const ToastEditor = ({ content, setContent }) => {
  const editorRef = useRef();

  const handleChange = useCallback(() => {
    const editorInstance = editorRef.current.getInstance();
    const markdown = editorInstance.getHTML(); 
    setContent(markdown);
  }, [setContent]);

  return (
    <Editor
      ref={editorRef}
      initialValue={content || ''}
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      onChange={handleChange}
    />
  );
};

export default ToastEditor;