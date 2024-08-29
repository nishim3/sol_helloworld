const anchor = require("@coral-xyz/anchor");
const fs = require("fs");

// Step 1: Set up the provider and connection to Solana network
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Step 2: Load the IDL file of your deployed program
const idlPath = "idl/helloworld_solana.json";

const idl = JSON.parse(fs.readFileSync(idlPath, "utf8"));

// Step 3: Define the program ID (replace with your program's public key)
const programId = new anchor.web3.PublicKey(
  "AE6cRUZWLn8oiVHQZKMZFDAZcBGbx9F8rz6FcUQKHDFn"
);

// Step 4: Create the Anchor program instance
const program = new anchor.Program(idl, programId, provider);

async function main() {
  
  try {
    // Step 5: Call the 'initialize' function in your smart contract
    let tx = await program.methods.initialize();
    tx = await tx.rpc();
    console.log("Transaction signature:", tx);
  } catch (err) {
    console.error("Error running client:", err);
  }
}

main();
