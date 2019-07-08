import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const el = document.createElement('div');
export default function Modal(props) {
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  const modal = (
    <div className='modal'>
      {props.children}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: auto;
        }
      `}</style>
    </div>
  );
  return el && ReactDOM.createPortal(modal, el);
}
