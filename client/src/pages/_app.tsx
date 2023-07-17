import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Axios from 'axios'
import { AuthProvider } from '@/context/auth';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import {SWRConfig} from 'swr'
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;

  const {pathname} = useRouter(); //회원가입과 로그인 페이지에서는 NavBar가 보이지 않도록 설정중
  const authRoutes = ["/register", "/login"]; 
  const authRoute = authRoutes.includes(pathname); //regiter와 login을 include하고 있으면 authRoute = true가됨


  const fetcher = async (url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error:any) {
        throw error.response.data
    }
  }

  return <SWRConfig
    value = {{
      fetcher
    }}
    >
    <AuthProvider>
        {/* register나 login 페이지가 아니면: */}
          {!authRoute && <NavBar />} 
          <div className={authRoute? "" : "pt-12"}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
  </SWRConfig>

}
