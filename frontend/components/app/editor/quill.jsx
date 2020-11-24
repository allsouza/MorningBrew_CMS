import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

export default ({body, setBody,setWordCount}) => {
    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(body)
            quill.on('text-change', () => {
                setBody(quill.container.children[0].innerHTML)
                setWordCount(quill.container.children[0].innerText.split(' ').filter(word => word !== "").length)
            });
            setWordCount(quill.container.children[0].innerText.split(' ').filter(word => word !== "").length)
        }
    }, [quill]);
 
  return (
    <div className='editor'>
        <div ref={quillRef} />
    </div>
  );
};