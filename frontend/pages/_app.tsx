import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from 'next/navigation'

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  return <Providers>
    <div className="fixed w-full px-2 z-30">
      {["/", "/my-policies"].includes(pathname) ? <Navbar /> : null}
    </div>
    <div className="px-2">
      <Component {...pageProps} />
    </div>
    <Toaster />
  </Providers>;
}
