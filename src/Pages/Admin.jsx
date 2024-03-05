import React, { useEffect, useState } from 'react';
import { loggedInAtom } from "./Login";
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';

function Admin() {
    const navigate = useNavigate();
    const isLoggedIn = useAtomValue(loggedInAtom);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/forbidden');
        }

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="h-full bg-gray-200 p-8">
            {isLoggedIn && userData && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>You have been redirected to the admin page. Welcome!</h1>
                    <div className="bg-white rounded-lg shadow-xl pb-8">
                        <div className="w-full h-[250px]">
                            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" alt="Profile Background" />
                        </div>
                        <div className="flex flex-col items-center -mt-20">
                            <img src="https://i.pinimg.com/originals/c7/48/1d/c7481ddd75253277b7273851b84c0abb.jpg" className="w-40 border-4 border-white rounded-full" alt="Profile" />
                            <div className="flex items-center space-x-2 mt-2">
                                <p className="text-2xl">Johnathan MEUNIER</p>
                                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                            </div>
                            <p className="text-gray-700">Senior Software Engineer at React</p>
                            <p className="text-sm text-gray-500">Lille, FRANCE</p>
                        </div>
                        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                            <div className="w-full flex flex-col 2xl:w-1/3">
                                <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                                    <h4 className="text-xl text-gray-900 font-bold">Personal Informations</h4>
                                    <ul className="mt-2 text-gray-700">
                                        <li className="flex border-y py-2">
                                            <span className="font-bold w-24">Email</span>
                                            <span className="text-gray-700">{userData.email}</span>
                                        </li>
                                        <li className="flex border-y py-2">
                                            <span className="font-bold w-24">Password</span>
                                            <span className="text-gray-700">{userData.password}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;