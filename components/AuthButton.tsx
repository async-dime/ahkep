import * as React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useAccount, useConnect } from 'wagmi';
import toast from 'react-hot-toast';

interface AuthButtonProps extends ButtonProps {}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
  const [connectQuery, connect] = useConnect();
  const [accountQuery] = useAccount();

  React.useEffect(() => {
    if (connectQuery.error?.name === 'ConnectorNotFoundError') {
      toast.error('Please install MetaMask');
    }
  }, [connectQuery.error]);

  // if isn't authenticated, sign in required
  if (!accountQuery.data?.address) {
    return (
      <Button
        {...props}
        onClick={() => {
          connect(connectQuery.data.connectors[0]);
        }}
      >
        Sign In
      </Button>
    );
  }

  // if authenticated, show button as usual
  return <Button {...props}>{props.children}</Button>;
};

export default AuthButton;
