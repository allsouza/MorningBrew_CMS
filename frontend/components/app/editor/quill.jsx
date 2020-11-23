import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

export default ({html, sethtml}) => {
    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(html)
            quill.on('text-change', () => {
                sethtml(quill.container.children[0].innerHTML)
            });
        }
    }, [quill]);
 
  return (
    <div className='editor'>
        <div ref={quillRef} />
    </div>
  );
};