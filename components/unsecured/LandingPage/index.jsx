import Image from 'next/image';
import React from 'react';
import Header from '../../modules/Header';
import styles from '../../../styles/auth.module.css';
import { useTheme } from '../../contexts/Themecontext';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const route = useRouter();
  return (
    <>
      <div
        className={`${
          currentTheme.status ? 'bg-white' : 'bg-[#000c17]'
        } h-screen w-full flex flex-col justify-center ${
          styles.landingBg
        }`}
      >
        <div className="absolute top-0 left-0 right-0">
          <Header />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p
              className={`text-${
                currentTheme.status ? 'black' : 'white'
              } text-6xl px-10`}
            >
              Upload your song <br />
              and be paid as much as <br />
              you are <b className="text-blue-500">streamed</b> <br />
              <button
                type="primary"
                className="text-black bg-blue-500 text-xl font-thin py-3 px-10 my-10"
                onClick={() => route.push('/signup')}
              >
                <b>Create an account now</b>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
