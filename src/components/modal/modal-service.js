import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { serviceUse } from './style';

const Success = (props) => {

  const ref = useRef(null);

  useLayoutEffect(() => {
    let container = ref.current;
    container.classList.add('in');
    setTimeout(() => {
      container.classList.remove('in');
      container.classList.add('out');
    }, props.timeout - 200);
  }, []);
  return (
    <div className={['container', props.type].join(' ')} ref={ref} onClick={props.onClick}>
      {props.children}
      <style jsx>{serviceUse}</style>
      <style jsx>{`
        .success {
          color: #468cff;
        }
      `}</style>
    </div>
  )
};

export default {
  msg(text, timeout, type = "default") {
    let el = document.createElement('div');
    document.body.appendChild(el);

    const timer = setTimeout(() => {
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
      el = null;
    }, timeout);
    function doClose() {
      clearTimeout(timer);
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
      el = null;
    }

    const Com = (<Success onClick={doClose} type={type} timeout={timeout}>
      {text}
    </Success>);

    ReactDOM.render(Com, el);
  },
  success({text, timeout = 2000}) {
    this.msg(text, timeout, 'success');
  }
};
