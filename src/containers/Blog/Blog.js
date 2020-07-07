import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";
import post from "../../components/Post/Post";

class Blog extends Component {
  state = {
    posts: [],
    postSelectedId: null,
  };
  componentDidMount() {
    axios("https://jsonplaceholder.typicode.com/posts").then((response) => {
      const posts = response.data.slice(0, 4).map((post) => {
        return {
          ...post,
          author: "Raihan",
        };
      });
      this.setState({ posts: posts });
    });
  }

  postSelectedHandler(id) {
    this.setState({ postSelectedId: id });
  }
  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost postid={this.state.postSelectedId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
