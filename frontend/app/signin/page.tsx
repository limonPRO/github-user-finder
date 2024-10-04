import SignInPage from "@/pages/signIn-page";
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'sign in',
  description: '...',
}


export default function Home() {
  return (
    <SignInPage/>
  );
}
