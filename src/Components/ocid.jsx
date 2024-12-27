import { OCConnect } from '@opencampus/ocid-connect-js';
import react from "react";



const OCAuthProvider = ({ children }) => {
    const opts = {
        redirectUri: 'http://localhost:5173/redirect',
        referralCode: '3TAEGC'
    };
    return (
        <OCConnect opts={opts} sandboxMode={true} >
            {/* <RouterProvider router={router}/> */}
            {children}
        </OCConnect>
    );
}

export default OCAuthProvider;