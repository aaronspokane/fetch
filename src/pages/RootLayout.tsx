import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { ToastContainer, ToastOptions, toast } from 'react-toastify';

const RootLayout = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"                                       
            />
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;

export const notify = (sucess: boolean, msg: string) => {
    const toastProps = {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",            
    } as ToastOptions

    if(sucess)
        toast.success(msg, toastProps);
    else
        toast.error(msg, toastProps);
}; 