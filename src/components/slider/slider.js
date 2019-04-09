import React, { Component } from 'react';
import './slider.scss';
import BScroll from 'better-scroll';
import { hasClass } from '../../assets/js/dom';

function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className += ' ' + cls;
}

class Slider extends Component {
  static defaultProps = {
    loop: true,
    threshold: 0.3,
    speed: 400,
    bounce: false,
    click: true,
    autoPlay: true,
    interval: 2000,
    showDots: true
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      dots: []
    };
    this.onResize = this.onResize.bind(this);
  }

  onResize() {
    if (!this.slide) {
      return;
    }
    // 当浏览器窗口大小发生变化时需要重新计算宽度
    this._setSlideWidth(true);
    this.slide.refresh();
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', this.onResize);
    setTimeout(() => this.slide.refresh());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
  }

  init() {
    this._setSlideWidth();
    if (this.props.showDots) {
      this._initDots();
    }
    this._initSlide();
    if (this.props.autoPlay) {
      this._play();
    }
  }

  _setSlideWidth(isResize) {
    this.children = this.slideGroup.children; // 获取容器下边所有的子元素
    let width = 0; // 总的宽度
    let slideWidth = this.el.clientWidth; // 每个子元素的宽度
    //  为每个子元素加上类名，设置正确的宽度，并且计算出所有子元素的总宽度
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      addClass(child, 'slide-item');
      child.style.width = slideWidth + 'px';
      width += slideWidth;
    }
    // 不是循环播放和窗口改变大小的时候，就不需要再多加两个宽度
    if (this.props.loop && !isResize) {
      width += 2 * slideWidth;
    }
    this.slideGroup.style.width = width + 'px';
  }

  _initDots() {
    let dots = [];
    for (let i = 0; i < this.children.length; i++) {
      dots.push(1);
    }
    this.setState({ dots }, () => console.log(this.state));
  }

  _initSlide() {
    const { threshold, loop, click, speed } = this.props;
    this.slide = new BScroll(this.el, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop,
        threshold,
        speed
      },
      bounce: false,
      stopPropagation: true,
      click
    });
    this.slide.on('scrollEnd', () => {
      this._onScrollEnd();
    });
    this.slide.on('touchEnd', () => {
      if (this.props.autoPlay) {
        this._play();
      }
    });
    this.slide.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer);
      }
    });
  }

  _onScrollEnd() {
    let pageIndex = this.slide.getCurrentPage().pageX;
    this.setState({ currentIndex: pageIndex }, () => {
      this.props.autoPlay && this._play();
    });
  }

  _play() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.slide.next();
    }, this.props.interval);
  }

  render() {
    const currentIndex = this.state.currentIndex;
    return (
      <div className='__slider__' ref={el => (this.el = el)}>
        <div className='slide-group' ref={el => (this.slideGroup = el)}>
          {this.props.children}
        </div>
        {this.props.showDots && (
          <div className='dots'>
            {this.state.dots.map((v, i) => (
              <span
                key={i}
                className={`dot ${i === currentIndex ? 'active' : ''}`}
              >
                {' '}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Slider;
