import css from 'styled-jsx/css';

export default css`
  
        @mixin border-1px($color, $direction) {
          &::after {
            content: '';
            position: absolute;
            background: $color;

            @if $direction==left {
              left: 0;
              top: 0;
              width: 1px;
              height: 100%;
              transform: scaleX(0.5);
              transform-origin: left 0;
            }

            @if $direction==right {
              right: 0;
              top: 0;
              height: 100%;
              width: 1px;
              transform: scaleX(0.5);
              transform-origin: right 0;
            }

            @if $direction==bottom {
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              transform: scaleY(0.5);
              transform-origin: 0 bottom;
            }

            @if $direction==top {
              top: 0;
              left: 0;
              width: 100%;
              height: 1px;
              transform: scaleY(0.5);
              transform-origin: 0 top;
            }
          }
        }
        .confirm-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
            @keyframes m-in {
              0% {opacity: 0;}
              100% {opacity: 1;}
            }
            @keyframes m-out {
              0% {opacity: 1;}
              100% {opacity: 0;}
            }
            &.mask-in {
              animation: m-in .2s linear;
            }
            &.mask-out {
              animation: m-out .2s linear;
            }
          }
          .confirm {
            width: 90%;
            max-width: 500px;
            height: auto;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            z-index: 1;
            @keyframes c-in {
              0% {transform: scale(0);}
              100% {transform: scale(1);}
            }
            @keyframes c-out {
              0% {transform: scale(1);}
              100% {transform: scale(0);}
            }
            &.confirm-in {
              animation: c-in .2s linear;
            }
            &.confirm-out {
              animation: c-out .2s linear;
            }
            .title {
              margin: 0;
              height: 40px;
              line-height: 40px;
              padding-left: 20px;
              font-size: 14px;
              color: #666;
            }
            .content {
              width: 100%;
              min-height: 60px;
              position: relative;
              @include border-1px(#ddd, top);
              .text {
                margin: 0;
                padding-top: 10px;
                padding-left: 20px;
                font-size: 13px;
                color: #555;
              }
            }
            .footer {
              position: relative;
              width: 100%;
              height: 40px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
              @include border-1px(#ddd, top);
              .btn {
                margin-right: 16px;
              }
            }
          }
        }
`

export const serviceUse = css`
  .container {
    box-sizing: border-box;
    width: 90%;
    margin: 0 5%;
    padding-left:20px;
    position: fixed;
    top: 40px;
    min-height: 40px;
    line-height: 40px;
    border-radius: 6px;
    box-shadow: 1px 2px 1px 3px #eee;
    background: #fff;
    z-index: 100;
    @keyframes slide-in {
      0% {transform: translateY(-80px); opacity: 0;}
      100% {transform: translateY(0); opacity: 1;}
    }
    @keyframes slide-out {
      0% {transform: translateY(0); opacity: 1;}
      100% {transform: translateY(-80px); opacity: 0;}
    }
    &.in {
      animation: slide-in .2s ease-out;
    }
    &.out {
      animation: slide-out .2s ease-out;
    }
  }
`;
