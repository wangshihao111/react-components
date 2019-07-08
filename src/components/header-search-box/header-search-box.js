import React from 'react';
import SearchBox from '../search-box/search-box';
import './header-search-box.scss';
import Icon from '@ant-design/icons-react';
import {
  FolderFill,
  HomeOutline,
  LeftOutline,
  ShoppingCartOutline,
  UserOutline
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import Modal from '../modal/modal';

@withRouter
class HeaderSearchBox extends React.Component {
  state = {
    showMenu: false
  };
  openMenu = () => {
    this.setState({ showMenu: true });
  };
  onModalClick = () => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };
  render() {
    const props = this.props;
    return (
      <div className='category-header'>
        <div
          className='icon-wrapper'
          onClick={() => props.history.goBack('/home')}
        >
          <Icon type={LeftOutline} />
        </div>
        <div
          className='search-box-wrapper'
          onClickCapture={() => props.history.push('/search-page')}
        >
          <SearchBox placeholder={props.placeholder} />
        </div>
        <div className='menu-wrapper' onClick={this.openMenu}>
          ···
        </div>
        {this.state.showMenu && (
          <Modal>
            <div
              className='category-header-menu-wrapper'
              onClick={this.onModalClick}
            >
              <div className='header-menu'>
                <p className='menu-item'>
                  <Icon type={HomeOutline} className='icon' />
                  <span>首页</span>
                </p>
                <p className='menu-item' onClick={e => console.log(e)}>
                  <Icon type={ShoppingCartOutline} className='icon' />
                  <span>购物车</span>
                </p>
                <p className='menu-item'>
                  <Icon type={UserOutline} className='icon' />
                  <span>个人中心</span>
                </p>
                <p className='menu-item'>
                  <Icon type={FolderFill} className='icon' />
                  <span>浏览历史</span>
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default HeaderSearchBox;
