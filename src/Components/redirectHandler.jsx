import React from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const navigate = useNavigate();
    const { ocAuth } = useOCAuth();
    const loginSuccess = async () => {
        console.log('Login successful!');
        try {
            const { edu_username: openIdUsername, eth_address: ethAddress } = ocAuth.authInfoManager._idInfo;

            if (!openIdUsername || !ethAddress) {
                throw new Error('Open ID username or Ethereum address is missing.');
            }

            console.log('Open campus ID username:', openIdUsername);
            console.log('Ethereum address:', ethAddress);

            // const response = await authenticateUser(openIdUsername, ethAddress);

            // if (response.status === 'exists') {
            //     localStorage.setItem('studentAuthToken', response.token);
            //     setIsStudentLoggedIn(true); // Set global state to true

            //     navigate('/', { state: { studentData: response.data } });
            // } else {
            //     navigate('/student-form');
            // }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('An error occurred during login.');
        }
    };

    const loginError = (error) => {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);
        navigate('/login');
    };

    return (
        <LoginCallBack
            successCallback={loginSuccess}
            errorCallback={loginError}
            customLoadingComponent={() => <div>Loading...</div>}
            customErrorComponent={() => <div>Error during login</div>}
        />
    );
};

export default RedirectHandler;
