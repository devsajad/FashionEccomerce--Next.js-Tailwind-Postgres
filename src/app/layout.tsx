import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const EstedadSans = localFont({
  src: "./fonts/Estedad-FD.woff2",
  variable: "--font-estedad-fd",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${EstedadSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            closeButton
            richColors
            toastOptions={{
              classNames: {
                toast: "font-sans",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
