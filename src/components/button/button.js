import React, { useRef, useCallback } from 'react';

const Button = props => {
  const btn = useRef(null);
  const type = props.type || 'default';
  const onMouseDown = useCallback(() => {
    const b = btn.current;
    b.style.opacity = 0.8;
    props.onMouseDown();
  }, []);
  const onMouseUp = useCallback(e => {
    const b = btn.current;
    b.style.opacity = 1;
    props.onMouseUp(e);
  }, []);
  return (
    <button
      className={'m-btn ' + type}
      ref={btn}
      onMouseDown={e => onMouseDown(e)}
      onMouseUp={e => onMouseUp(e)}
      onTouchStart={e => onMouseDown(e)}
      onTouchEnd={e => onMouseUp(e)}
      onClick={e => props.onClick(e)}
    >
      {props.children}
      <style jsx>{`
        .m-btn {
          width: fit-content;
          min-width: 60px;
          height: 26px;
          padding: 0 6px;
          font-size: 12px;
          outline: none;
          border: none;
          border-radius: 3px;
          transition: all 0.2s;
          margin: 0 5px;
          cursor: pointer;
          &.primary {
            color: #fff;
            background: #409eff;
            border: 1px solid #409eff;
          }
          &.default {
            background: #eee;
            color: #666;
            border: 1px solid #ccc;
          }
          &.warning {
            background: #f0ad4e;
            color: #fff;
            border: 1px solid #f2ae40;
          }
          &.success {
            background: #28a745;
            color: #fff;
            border: #28a745;
          }
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {
  },
  onMouseDown: () => {
  },
  onMouseUp: () => {
  }
};

export default Button;
