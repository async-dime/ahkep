import * as wagmi from 'wagmi';
import { useProvider, useSigner } from 'wagmi';
import type { BigNumber } from 'ethers';
import CommentsContract from '../utils/Comments.json';

export interface Comment {
  id: string;
  topic: string;
  message: string;
  creator_address: string;
  created_at: BigNumber;
}

export enum EventType {
  CommentAdded = 'CommentAdded',
}

const useCommentsContract = () => {
  // An ethers.Signer instance associated with the signed-in wallet
  // https://docs.ethers.io/v5/api/signer/
  const [signer] = useSigner();
  // An ethers.Provider instance. This will be the same provider that is
  // passed as a prop to the WagmiProvider
  const provider = useProvider();

  // This returns a new ethers.Contract ready to interact with our comments API
  // We need to pass in the address of our deployed contract and its abi
  // We also pass in the signer if there is a signed in wallet,
  // or if there's no signed in wallet we pass in the connected provider
  const contract = wagmi.useContract({
    addressOrName: '0xe0236b64239F0f8c7dFDe4Cc63E2f516Eb43b5CA',
    contractInterface: CommentsContract.abi,
    signerOrProvider: signer.data || provider,
  });

  // Wrapper to add types to our getComments function.
  const getComments = async (topic: string): Promise<Comment[]> => {
    return contract.getComments(topic).then((comments) => {
      // Each comments is represented as array by default so we can convert to object
      return comments.map((c) => ({ ...c }));
    });
  };

  // Wrapper to add typed to our addComment function
  const addComment = async (topic: string, message: string): Promise<void> => {
    // Create a new transaction
    const tx = await contract.addComment(topic, message);
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getComments,
    addComment,
  };
};

export default useCommentsContract;
