import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';


class Hearts extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      endpoint: "localhost:54801/hearts"
    };

  }

  componentDidMount() {
    let socket = SocketIOClient(this.state.endpoint);

    socket.on('update_game', data => this.UpdateGame());

    socket.emit('play_card', {
      card: null
    });
  }

  componentWillUnmount() {
    
  }

  UpdateGame = () => {
    this.setState(

    );
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Hearts;