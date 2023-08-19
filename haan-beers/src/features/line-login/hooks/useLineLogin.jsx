import { getProviders } from "next-auth/react";
import { useState } from "react";

export default function useLineLogin() {
  const [provider, setProvider] = useState(null);

  const getLineProvider = () =>
    getProviders().then((providers) => {
      if (providers) setProvider(providers["line"]);
    });

  return { provider, getLineProvider };
}
