import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function MyRichTextEditor({setText,name,data}) {
  const [editorHtml, setEditorHtml] = useState('');
    useEffect(()=>{
        if(name=="edit"){
            setEditorHtml(data);
        }
    },[])
  const handleChange = (html) => {
    setEditorHtml(html);
    setText(html);
  };

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={editorHtml}
        onChange={handleChange}
        modules={MyRichTextEditor.modules}
        formats={MyRichTextEditor.formats}
        placeholder="Enter Here..."
      />
    </div>
  );
}

MyRichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

MyRichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
];

export default MyRichTextEditor;
