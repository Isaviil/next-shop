'use client';
import Navbar from "@/app/reusablecomponents/navbar/nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ThemeProv from "../theme/themeProvider";
import FooterPage from "@/app/reusablecomponents/footer/foot";
import ModalProvider from "../modal/modalProvider";
import Showthemodal from "@/app/reusablecomponents/modal/modal";
import IsAnimatingProv from "../is-animating/animatingProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartOrderProvider } from "../cart-order/cartOrderprovider";



const queryClient = new QueryClient();

interface childrenType{
    children: ReactNode;
}

//*Provider wrapper

export default function ClientProviders({children} : childrenType){

    return (
        <SessionProvider> 
            <QueryClientProvider client= {queryClient}>
                <ThemeProv>
                    <CartOrderProvider>
                        <IsAnimatingProv>
                        <ModalProvider>
                        <Navbar/>
                        <Showthemodal/>
                        {children}
                        <FooterPage/>
                        </ModalProvider>
                        </IsAnimatingProv>
                    </CartOrderProvider>
                </ThemeProv>
                
            </QueryClientProvider>  
        </SessionProvider>       
    );

}