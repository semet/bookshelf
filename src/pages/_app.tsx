import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import client from "@/libs/query-client";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/main-layout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
   return (
      <QueryClientProvider client={client}>
         <main className={`${inter.className}`}>
            <MainLayout>
               <Component {...pageProps} />
            </MainLayout>
         </main>
      </QueryClientProvider>
   );
}
