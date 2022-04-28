const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-anchor", () => {
  // Use a local provider.
  const provider = anchor.AnchorProvider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  let _myAccount = null;

  const idl = JSON.parse(
    require("fs").readFileSync("./target/idl/solana_twitter.json", "utf8")
  );

  //Address of the deployed program
  const programId = new anchor.web3.PublicKey(
    "98d32F5rG4bePA4Wx7iEqMy9iEeTF1T78avNqA4Zydku"
  );

  //Generate the program client from IDL
  const program = new anchor.Program(idl, programId);


  it("send tweet", async () => {
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet("pakistan", "I love paksitan", {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    assert.equal(tweetAccount.topic, "pakistan");
    assert.equal(tweetAccount.content, "I love paksitan");
    assert.ok(tweetAccount.timestamp);

    _myAccount = tweet;
  });

  it('can send a new tweet without a topic', async () => {
    // Call the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('', 'gm', {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    // assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, '');
    assert.equal(tweetAccount.content, 'gm');
    assert.ok(tweetAccount.timestamp);
  });

});
