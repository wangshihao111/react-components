import React, { Component } from 'react';
import Loading from './base/loading/loading';
import Button from './components/button/button';
import Confirm from './components/modal/confirm';
import Alert from "./components/modal/alert";
import ModalService from './components/modal/modal-service';
import './assets/style/index.scss';

class App extends Component {
  state = {
    showConfirm: false,
    alert: false,
    in: false
  };

  toggleConfirm() {
    console.log(this.state);
    this.setState((state) => ({
      in: !state.in
    }))
  }

  showMsg = () => {
    const text = <h1>666</h1>;
    ModalService.success({
      text,
    });
  };

  render() {
    return (
      <div className='App'>
        <Loading type='circle'/>
        <Button type='primary' onClick={() => this.toggleConfirm()}>按钮</Button>
        <Button type='primary' onClick={() => this.setState({alert: true})}>按钮</Button>

        {this.state.in && <Confirm onlyHeader={true} onClose={() => this.toggleConfirm()}/>}
        {this.state.alert && <Alert onConfirm={() => this.setState({alert: false})}/>}

        <Button onClick={this.showMsg}>点击显示tips</Button>
      </div>
    );
  }
}

export default App;
