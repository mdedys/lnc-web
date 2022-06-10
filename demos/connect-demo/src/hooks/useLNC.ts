import { useCallback } from 'react';
import LNC from '@lightninglabs/lnc-web';

// create a singleton instance of LNC that will live for the lifetime of the app
const lnc = new LNC({
  // use the LNC wasm file stored in the public dir
  wasmClientCode: '/lnc-v0.1.10-alpha.wasm',
});

/**
 * A hook that exposes a single LNC instance of LNC to all component that need it.
 * It also returns a couple helper functions to simplify the usage of LNC
 */
const useLNC = () => {
  /** Connects to LNC using the provided pairing phrase and password */
  const connect = useCallback(async (pairingPhrase: string, password: string) => {
    lnc.setPassword(password);
    lnc.setPairingPhrase(pairingPhrase);
    await lnc.connect();
  }, []);

  /** Connects to LNC using the password to decrypt the stored keys */
  const login = useCallback(async (password: string) => {
    lnc.setPassword(password);
    await lnc.connect();
  }, []);

  return { lnc, connect, login };
};

export default useLNC;
