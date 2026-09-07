import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Betsite V2 — Football Value Scanner',description:'Global football odds scanner and accumulator analysis dashboard'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
