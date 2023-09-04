import ToastProvider from "../components/ToastProviders";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpIntents",
  description: "Powerful AI wallet for BNB ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@600,500,400,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
