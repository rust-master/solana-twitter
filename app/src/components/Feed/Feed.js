import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./feed.css";
import FlipMove from "react-flip-move";
import {
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";


function Feed() {
    return (
        <div className="feed">
            <div className="feed__header">
                {/* <h2>Home</h2> */}
                <div className="appwallet" >

                    <WalletMultiButton />

                </div>
            </div>

            <TweetBox />

            <FlipMove>
                {/* {posts.map((post) => ( */}
                <Post
                    key={1}
                    displayName={"Zaryab"}
                    text={"What ever you can visualize in mind, you can achieve it"}
                    personal={true}
                />
                <Post
                    key={1}
                    displayName={"Haris"}
                    text={"Do good have good"}
                    personal={false}
                />
                <Post
                    key={1}
                    displayName={"Umar"}
                    text={"Focus on Work"}
                    personal={false}
                />
                {/* ))} */}
            </FlipMove>
        </div>
    );
}

export default Feed;