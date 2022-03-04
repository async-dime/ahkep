import * as React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { useEnsLookup } from 'wagmi';
import truncateMiddle from 'truncate-middle';

interface UsernameProps extends TextProps {
  address: string;
}

// This code leverages a `wagmi` hook: `useEnsLookup`, 
// and displays the resolved ENS name if it exists. 
// Otherwise the component just displays the address, 
// with truncated format: "0X123...4567".
const Username: React.FunctionComponent<UsernameProps> = ({
  address,
  ...otherProps
}) => {
  const [query] = useEnsLookup({ address });

  // Show ens name if exists, but show truncated address as fallback
  return (
    <Text
      display="inline"
      textTransform={query.data ? 'none' : 'uppercase'}
      {...otherProps}
    >
      {query.data || truncateMiddle(address || '', 5, 4, '...')}
    </Text>
  );
};

export default Username;
