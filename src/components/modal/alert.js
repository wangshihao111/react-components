import React, {useCallback, useRef, useLayoutEffect} from 'react';
import Modal from './modal';
import Button from '../button/button';
import style from './style'

function Alert(props) {
  const maskRef = useRef(null);
  const confirmRef = useRef(null);

  const removeAnim = () => {
    const mask = maskRef.current;
    const confirm = confirmRef.current;
    mask.classList.remove('mask-in');
    confirm.classList.remove('confirm-in');

    mask.classList.add('mask-out');
    confirm.classList.add('confirm-out');
  };

  const onConfirmClick = useCallback(() => {
    removeAnim();
    setTimeout(() => {
      props.onConfirm();
      props.onClose();
    }, 200);
  }, []);

  useLayoutEffect(() => {
    const mask = maskRef.current;
    const confirm = confirmRef.current;
    mask.classList.add('mask-in');
    confirm.classList.add('confirm-in');
  }, []);

  return (
    <Modal>
      <div className='confirm-container'>
        <div className='mask' onClick={onConfirmClick} ref={maskRef}/>

        <div className='confirm' ref={confirmRef}>
          <h3 className='title'>{props.title}</h3>
          {
            !props.onlyHeader && (<div className='content'>
              <p className='text'>{props.text}</p>
            </div>)
          }
          <div className='footer'>
            <Button
              className='btn conf'
              type='primary'
              onClick={onConfirmClick}
            >
              {props.confirmText}
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </Modal>
  )
}

Alert.defaultProps = {
  confirmText: '确定',
  title: '警告',
  text: '操作不可撤回',
  onlyHeader: false,
  onConfirm: () => {},
  onClose: () => {}
};

export default Alert


