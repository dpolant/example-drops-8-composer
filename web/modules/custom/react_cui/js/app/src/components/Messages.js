import React from 'react';

class Messages extends React.Component {
  render () {
    return (
      <ul class="messages">
      {Object.keys(this.props.messages).map(index => 
        <li class="message">
          {this.props.messages[index].message}
        </li>
      )}
      </ul>
    )
  }
}

export default Messages;