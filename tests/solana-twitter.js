const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-anchor", () => {
  // Use a local provider.
  const provider = anchor.AnchorProvider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  let _myAccount = null;

  it("send tweet", async () => {
    // #region code-simplified
    // The program to execute.
    const idl = JSON.parse(
      require("fs").readFileSync("./target/idl/solana_twitter.json", "utf8")
    );

    //Address of the deployed program
    const programId = new anchor.web3.PublicKey(
      "98d32F5rG4bePA4Wx7iEqMy9iEeTF1T78avNqA4Zydku"
    );

    //Generate the program client from IDL
    const program = new anchor.Program(idl, programId);

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
});
