import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); 

import ThemeProvider from "theme/theme-provider"; 
import {SessionProvider} from "contexts/SessionContext"; 

import RTL from "components/rtl";
import ProgressBar from "components/progress"; 

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