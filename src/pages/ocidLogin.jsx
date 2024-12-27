import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { Router } from 'react-router-dom';

const CustomErrorComponent = () => {
  const { authState } = useOCAuth();

  return (
    <div>Error Logging in: {authState.error.message}</div>
  );
};

const CustomLoadingComponent = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em]
      text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
  );
};

export default function Page() {
//   const router = useRouter();
    // const router = Router;

  const loginSuccess = async () => {
    // const { ocAuth } = useOCAuth();
    console.log('Login successful!');
    try{
        const {edu_username: openIdUsername, eth_address: ethAddress} = ocAuth.authInfoManager._idInfo;

        if(!openIdUsername || !ethAddress) {
            throw new Error('Open ID username or Ethereum address is missing.');
        }

        console.log('Open campus ID username:', openIdUsername);
        console.log('Ethereum address:', ethAddress);

        const response = await authenticateUser(openIdUsername, ethAddress);

        if(response.status === 'exists') {
            localStorage.setItem('studentAuthToken', response.token);
            // setIsStudentLoggedIn(true); // Set global state to true

            navigate('/home', {state : {studentData : response.data}});
        }
        else {
            navigate('/');
        }
    }
    catch(err) {
        console.error('Error during authentication:', err);
        alert('An error occurred during login.');
    }
    // try{
    //     console.log(ocAuth.authInfoManager._idInfo);
    // }
    // catch(err) {
    //     console.log(err);
    // }
    // router.push('/');
    // router.push('/home');
    // console.log(authState.authManager._idInfo);
    Navigate('/home', {state : {studentData : authState.authManager._idInfo}});
  };

  return (
    <LoginCallBack
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  );
}
