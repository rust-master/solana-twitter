import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./feed.css";
import FlipMove from "react-flip-move";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    useAnchorWallet,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import idl from "../../idl.json";

// const wallet = useAnchorWallet();


class Feed extends React.Component {
    // const[posts, setPosts] = useState([]);


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {

        const baseAccount = web3.Keypair.generate();

        // if (!wallet) {
        //     return null;
        // }

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

            // let tweet1 = {
            //     'id': 1,
            //     'tweetText': "Hi dummy",
            //     'username': "zaryab",
            //     'personal': true
            // };

            // let tweet2 = {
            //     'id': 2,
            //     'tweetText': "Hi tweet2",
            //     'username': "Raza",
            //     'personal': false
            // };

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

            // tweets.push(tweet1);
            // tweets.push(tweet2);

            // this.setState({
            //     posts: tweets
            // });
            console.log('posts: ', this.state.posts);
            console.log('tweetAccount: ', tweetAccount);
            // console.log('tweetAccount 0: ', tweetAccount[0].account.content.toString());
            // console.log('tweetAccount 1: ', tweetAccount[1].account.content.toString());
            // console.log('length: ', tweetAccount.length);
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }

    }
    // async getProvider() {

    // }

    // async getAllTweets() {
    //     const provider = getProvider();
    //     console.log("Provider Feed : ", provider)

    //     if (!provider) {
    //         return;
    //     }

    //     const a = JSON.stringify(idl);
    //     const b = JSON.parse(a);
    //     const program = new Program(b, idl.metadata.address, provider);
    //     try {

    //         const tweetAccount = await program.account.tweet.all();
    //         setPosts(tweetAccount)
    //         console.log('tweetAccount: ', tweetAccount);
    //         console.log('tweetAccount 0: ', tweetAccount[0].account.content.toString());
    //         console.log('tweetAccount 1: ', tweetAccount[1].account.content.toString());
    //         console.log('length: ', tweetAccount.length);
    //     }
    //     catch (err) {
    //         console.log("Transcation error: ", err);
    //     }
    // }

    // useEffect(() => {
    //     getAllTweets();
    // }, []);

    render() {

        return (
            <div className="feed">
                <div className="feed__header">
                    {/* <p>{ste}</p> */}
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