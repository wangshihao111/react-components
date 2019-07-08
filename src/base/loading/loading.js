import React, { useState, useRef, useLayoutEffect } from 'react';

function Loading(props) {
  const spinner = useRef(null);
  useLayoutEffect(() => {
    let spin = spinner.current;
    const spinnerWidth = props.size || 40;
    spin.style.height = spinnerWidth + 'px';
    spin.style.width = spinnerWidth + 'px';
    const bubble = spin.clientHeight * 0.2; // 泡泡宽度
    setBubbleStyle({
      width: bubble + 'px',
      height: bubble + 'px',
      top: -bubble * 0.5 + 'px',
      background: props.color || '#666'
    });
    return () => {
      spin = null;
    };
  }, []);
  let [bubbleStyle, setBubbleStyle] = useState({});

  const type = props.type || 'bubbles';
  const size = props.size || 40;
  const color = props.color || '#666';

  return (
    <div className='container'>
      <div className='spinner' ref={spinner}>
        {type === 'bubbles' && (
          <div className='bubbles'>
            {Array.from({ length: 8 }).map((v, i) => (
              <div className='bubble-container' key={i}>
                <span className='bubble' style={bubbleStyle} />
              </div>
            ))}
          </div>
        )}
        {type === 'circle' && (
          <div className='circle'>
            <svg
              viewBox='0 0 1024 1024'
              className='anticon-spin'
              data-icon='loading'
              width={size}
              height={size}
              fill={color}
              aria-hidden='true'
            >
              <path
                d='M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 
            440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 
            83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 
            136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 
            162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z'
              />
            </svg>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          line-height: 0;
          text-align: center;
          .spinner {
            position: relative;
            height: 100%;
            display: inline-block;
            .bubbles {
              position: relative;
              width: 100%;
              height: 100%;
              .bubble-container {
                width: 100%;
                height: auto;
                position: absolute;
                top: 50%;
                opacity: 0;
                transform: rotateZ(-90deg);
                @keyframes rotate {
                  0% {
                    opacity: 1;
                  }
                  100% {
                    opacity: 0;
                  }
                }
                @mixin getAnim($t, $n) {
                  animation: rotate ($t + s) ease ($t/8 * 1000 * $n + ms)
                    infinite;
                }
                .bubble {
                  position: absolute;
                  right: 0;
                  border-radius: 50%;
                  background-color: yellow;
                }
                &:nth-of-type(1) {
                  transform: rotateZ(-90deg);
                  @include getAnim(1, 0);
                }
                &:nth-of-type(2) {
                  transform: rotateZ(-45deg);
                  @include getAnim(1, 1);
                }
                &:nth-of-type(3) {
                  transform: rotateZ(0deg);
                  @include getAnim(1, 2);
                }
                &:nth-of-type(4) {
                  transform: rotateZ(45deg);
                  @include getAnim(1, 3);
                }
                &:nth-of-type(5) {
                  transform: rotateZ(90deg);
                  @include getAnim(1, 4);
                }
                &:nth-of-type(6) {
                  transform: rotateZ(135deg);
                  @include getAnim(1, 5);
                }
                &:nth-of-type(7) {
                  transform: rotateZ(180deg);
                  @include getAnim(1, 6);
                }
                &:nth-of-type(8) {
                  transform: rotateZ(225deg);
                  @include getAnim(1, 7);
                }
              }
            }
            .dotted {
              width: 200%;
              height: auto;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -50%;
              line-height: 100%;
              text-align: center;
              .dot {
                display: inline-block;
                margin: 2px;
                border-radius: 50%;
                @keyframes anim {
                  0% {
                    transform: scale(1.8);
                  }
                  100% {
                    transform: scale(1);
                  }
                }
                @mixin getAnimDot($t, $n) {
                  animation: anim ($t + s) ease ($t/6 * $n + s) infinite;
                }
                &:nth-of-type(6) {
                  @include getAnimDot(1, 5);
                }
                &:nth-of-type(1) {
                  @include getAnimDot(1, 0);
                }
                &:nth-of-type(2) {
                  @include getAnimDot(1, 1);
                }
                &:nth-of-type(3) {
                  @include getAnimDot(1, 2);
                }
                &:nth-of-type(4) {
                  @include getAnimDot(1, 3);
                }
                &:nth-of-type(5) {
                  @include getAnimDot(1, 4);
                }
              }
            }
            .circle {
              position: relative;
              width: 100%;
              height: 100%;
              animation: rotates 1s linear infinite;
              @keyframes rotates {
                0% {
                  transform: rotateZ(0);
                }
                100% {
                  transform: rotateZ(360deg);
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;
