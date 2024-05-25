import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); 

import ThemeProvider from "theme/theme-provider"; 
import CartProvider from "contexts/CartContext"; 
//import AuthProvider from "contexts/AuthContext"; 

import RTL from "components/rtl";
import ProgressBar from "components/progress"; 

//import { authOptions } from "../../pages/api/auth/[...nextauth]";

import "i18n";
export default async function RootLayout({
  children
}) {
  //const session = await getServerSession(authOptions)
  return <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
          <CartProvider>
              <ThemeProvider>
                <ProgressBar />
                <RTL>{children}</RTL>
              </ThemeProvider>
          </CartProvider>
      </body>
    </html>;
}