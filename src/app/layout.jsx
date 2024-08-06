import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); 

import ThemeProvider from "theme/theme-provider"; 
import {SessionProvider} from "contexts/SessionContext"; 
//import { getServerSession } from "next-auth/next"
//import { SessionProvider } from "next-auth/react"

import RTL from "components/rtl";
import ProgressBar from "components/progress"; 

//import { authOptions } from "../../draft/api/auth/[...nextauth]";

import "i18n";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <SessionProvider>
          <ThemeProvider>
            <ProgressBar />
            <RTL>{children}</RTL>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}