import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './style.scss';

/**
 * tab 路由动画，基于CSSTransition
 * @param {String classNames, Number timeout, Array routes, Component notFound} props
 * 1. 如果自定义了classNames，则需要提供几个css样式
 *    分别为 -enter, -enter-active, -exit, -exit-active, 另外需要一套
 *    classNames-reverse为前缀的css样式，组件会根据路由的索引决定用什么样的动画
 * 2. 规则： 只要是一该路径开头的豆浆显示，例如 /home/123 home路由也将显示。
 *           这是为了解决多层路由显示问题。
 */
let prevIndex = 0;
let newIndex = 0;

export default function TransitionedRoutes(props) {
  const routes = props.routes;
  const timeout = props.timeout;
  const classNames = props.classNames;
  const NotFound = props.notFound;
  return (
    <Route>
      {({ location }) => {
        let hasMatched = routes.some(
          r => r.path.split('/')[1] === location.pathname.split('/')[1]
        );
        //如果是 / 开头的，直接按匹配到处理
        // location.pathname === '/' && (hasMatched = true);
        // if (!hasMatched) {
        //   return <NotFound />;
        // }
        return (
          <div className='router-container'>
            <Route
              exact
              path='/'
              render={() => <Redirect to={routes[props.initIndex].path} />}
            />
            {routes.map(({ path, Component }, index) => (
              <Route key={path} exact path={path}>
                {p => {
                  let cssName;
                  const location = p.location.pathname; // 当前的路由地址
                  newIndex = routes.findIndex(
                    v => v.path === p.history.location.pathname
                  );
                  index === 0 && (hasMatched = false);
                  // 判断是否匹配到当前路由
                  if (location.match(path)) {
                    cssName =
                      index > prevIndex ? classNames : `${classNames}-reverse`;
                    prevIndex = index;
                  } else {
                    cssName =
                      newIndex > index ? classNames : `${classNames}-reverse`;
                  }
                  return (
                    <CSSTransition
                      // 匹配 /path开头的路由
                      in={
                        p.location.pathname.split('/')[1] === path.split('/')[1]
                      }
                      timeout={timeout}
                      classNames={cssName}
                      unmountOnExit
                    >
                      <Component {...p} />
                    </CSSTransition>
                  );
                }}
              </Route>
            ))}
          </div>
        );
      }}
    </Route>
  );
}

TransitionedRoutes.defaultProps = {
  routes: [],
  timeout: 200,
  classNames: 'slide-tab',
  initIndex: 0,
  onNotFound: () => {},
  notFound: () => <div>Not Found</div>
};
