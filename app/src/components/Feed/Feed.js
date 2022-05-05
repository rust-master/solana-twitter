import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./feed.css";
import FlipMove from "react-flip-move";
import {
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import idl from "../../idl.json";


class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {
        const baseAccount = web3.Keypair.generate();

        const network = "https://api.devnet.solana.com";
        const connection = new Connection(network, "processed");

        const provider = new Provider(connection, baseAccount, {
            preflightCommitment: "processed",
        });

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, idl.metadata.address, provider);
        try {

            const tweetAccount = await program.account.tweet.all();
            let tweets = [];

            for (let i = 0; i < tweetAccount.length; i++) {
                let tweet = {
                    'id': i,
                    'tweetText': tweetAccount[i].account.content.toString(),
                    'username': tweetAccount[i].account.topic.toString(),
                    'personal': false
                };
                tweets.push(tweet);
            }
            this.setState({
                posts: tweets
            });
            console.log('posts: ', this.state.posts);
            console.log('tweetAccount: ', tweetAccount);
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

    render() {
        return (
            <div className="feed">
                <div className="feed__header">
                    <div className="appwallet" >
                        <WalletMultiButton />
                    </div>
                </div>

                <TweetBox />

                <FlipMove>
                    {this.state.posts.map((post) => (
                        <Post
                            key={post.id}
                            displayName={post.username}
                            text={post.tweetText}
                            personal={post.personal}
                        />

                    ))}
                </FlipMove>
            </div>
        );
    }
}
export default Feed;