import { AppProps } from "next/app";
import { ConfigProvider } from "antd";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import {
  createPagesBrowserClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import React from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
const poppins = Poppins({
  weight: ["500"],
  style: ["normal"],
  subsets: ["latin"],
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>): JSX.Element {
  const [supabaseClient] = React.useState(() => createPagesBrowserClient());

  return (
    <>
      <style jsx global>
        {`
          html,
          body {
            font-family: ${poppins.style.fontFamily} !important;
          }
        `}
      </style>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ConfigProvider
          theme={{
            token: {
              fontFamily: `${poppins.style.fontFamily} !important;`,
            }
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </SessionContextProvider>
    </>
  );
}

export default api.withTRPC(MyApp);
