import React from 'react';
import { CSSTransition } from 'react-transition-group';

/**
 * 对单个组件进行进行动画
 * @param {*} prefix 类名前缀
 * @param {*} timeout 过度时间
 *
 * 使用后需要的类名为
 *  prefix-appear/prefix-enter/prefix-enter-active/
 *  prefix-leave/prefix-leave-active
 */

export function withSingleTransition(prefix = 'page', timeout = 500) {
  return function(WrappedComponent) {
    return class Comp extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          in: true
        };
        this.goBack = this.goBack.bind(this);
      }
      goBack() {
        const that = this;
        return new Promise(resolve => {
          that.setState({ in: false });
          setTimeout(() => {
            resolve();
          }, timeout);
        });
      }
      render() {
        return (
          <CSSTransition
            timeout={timeout}
            in={this.state.in}
            classNames={prefix}
            appear={true}
            unmountOnExit={true}
          >
            <WrappedComponent {...this.props} goBack={this.goBack} />
          </CSSTransition>
        );
      }
    };
  };
}
