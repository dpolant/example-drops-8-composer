import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {}
    }
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        console.log('hi');
        this.setState({ posts });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {  
    return (
      <p>yo</p>
      // <div>
      //   <h1>{`/r/${this.props.subreddit}`}</h1>
      //   <ul>
      //     {this.state.posts.map(post =>
      //       <li key={post.id}>{post.title}</li>
      //     )}
      //   </ul>
      // </div>
    );
  }
}

export default App;