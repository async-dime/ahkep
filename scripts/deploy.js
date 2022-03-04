const hre = require('hardhat');

async function main() {
  // We get the contract to deploy
  const Comments = await hre.ethers.getContractFactory('Comments');
  const comments = await Comments.deploy();

  await comments.deployed();

  const tx1 = await comments.addComment('my-blog-post', 'My first comment');
  await tx1.wait();

  const tx2 = await comments.addComment('my-blog-post', 'My second comment');
  await tx2.wait();

  console.log('Comments contract deployed to:', comments.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error deploying a Comments contract address', error);
    process.exit(1);
  });
