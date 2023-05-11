import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar/Navigation";
import { UserProvider } from "@/context/UserState";
import { GlobalProvider } from "@/context/GlobalState";
import { EventsProvider } from "@/context/EventState";

import { BitacoraProvider } from "@/context/BitacoraState";
import "../styles/WYSIWYG.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <GlobalProvider>
          <BitacoraProvider>
            <EventsProvider>
              <>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <title>Person Bitacora</title>
                </Head>
                <Navbar />
                <main className="py-1">
                  <Component {...pageProps} />
                </main>
              </>
            </EventsProvider>
          </BitacoraProvider>
        </GlobalProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
