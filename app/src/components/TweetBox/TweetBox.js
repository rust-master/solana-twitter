import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../../utils/avatar';
import { Button } from "@material-ui/core";
import {
    useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import idl from "../../idl.json";

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetTopic, setTweetTopic] = useState("");
    const [avatarOptions, setAvatarOptions] = useState("");


    const wallet = useAnchorWallet();
    const baseAccount = web3.Keypair.generate();

    function getProvider() {
        if (!wallet) {
            return null;
        }

        const network = "https://api.devnet.solana.com";
        const connection = new Connection(network, "processed");

        const provider = new Provider(connection, wallet, {
            preflightCommitment: "processed",
        });

        return provider;
    }

    const addTweet = async () => {
        const provider = getProvider();
        console.log("Provider: ", provider)

        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, idl.metadata.address, provider);
        try {
            await program.rpc.sendTweet(tweetTopic, tweetMessage, {
                accounts: {
                    tweet: baseAccount.publicKey,
                    author: program.provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [baseAccount],
            });

            const tweetAccount = await program.account.tweet.fetch(baseAccount.publicKey);
            console.log('account: ', tweetAccount);
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }

    }

    const sendTweet = (e) => {
        e.preventDefault();

        addTweet();

        setTweetMessage("");
        setTweetTopic("");
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        let avatar = generateRandomAvatarOptions();
        setAvatarOptions(avatar);
    }, []);

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar
                        style={{ width: '100px', height: '100px' }}
                        avatarStyle='Circle'
                        {...avatarOptions}
                    />
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>
                <input
                    value={tweetTopic}
                    onChange={(e) => setTweetTopic(e.target.value)}
                    className="tweetBox__imageInput"
                    placeholder="#topic"
                    type="text"
                />

                <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox__tweetButton"
                >
                    Tweet
                </Button>
            </form>
        </div>
    );
}

export default TweetBox;