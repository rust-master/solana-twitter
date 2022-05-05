import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./feed.css";
import FlipMove from "react-flip-move";


function Feed() {
    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox />

            <FlipMove>
                {/* {posts.map((post) => ( */}
                <Post
                    key={1}
                    displayName={"John Doe"}
                    text={"Hello, I am a post"}
                    personal={true}
                />
                {/* ))} */}
            </FlipMove>
        </div>
    );
}

export default Feed;