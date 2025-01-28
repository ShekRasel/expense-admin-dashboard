'use client';

import { jwtDecode } from "jwt-decode"; // Corrected import
import React, { useEffect, useState } from "react"; // Use useState to manage state
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // To handle redirects
import UsersInfo from "./_components/UsersInfo";
import AdminInfo from "./_components/AdminInfo";
import Allexpense from "./_components/Allexpense";
import UserFeedback from "./_components/UserFeedback";
import AddMaintance from "./_components/AddMaintance";

function Dashboard() {
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side
  const router = useRouter(); // Hook to handle redirects

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts on the client
  }, []);

  useEffect(() => {
    if (isClient) { // Only execute logic once the component is mounted on the client
      const authTokenAdmin = localStorage.getItem("authTokenAdmin");

      if (authTokenAdmin) {
        // Decode the JWT token to get the expiry time
        const decodedToken = jwtDecode(authTokenAdmin); // Decode the token using jwtDecode
        // You can see all claims here

        const expireAt = decodedToken.exp; // Expiry time in seconds
       

        // Convert the expireAt to a human-readable format
        const expireDate = new Date(expireAt * 1000); // Convert seconds to milliseconds
         // Log the expiry date

        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        if (expireAt < currentTime) {
          // Token expired
          localStorage.removeItem("authTokenAdmin");
          router.push("/"); // Redirect to home if token expired
        }
      } else {
        // No token found, redirect
        router.push("/"); // Redirect to the login page if no token exists
      }
    }
  }, [isClient, router]);

  return (
    <div>
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 sm:px-6 lg:px-16">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={50} height={100} />
            <h1 className="text-blue-500 font-semibold italic ml-2 text-1xl ">
              Expense
            </h1>
          </div>

          {/* Right Side: Logout Button */}
          <Link href="/" passHref>
            <button
              className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => {
                // Remove the token from local storage
                localStorage.removeItem("authTokenAdmin");
              }}
            >
              Logout
            </button>
          </Link>
        </div>
      </header>

      <div className="lg:px-20 2xl:px-64 md:p-4">
        <div className="border rounded-md md:p-4">

          <div className=" gap-4">
            <div>
              <UsersInfo />
            </div>
            <div>
              {/* <AdminInfo /> */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div>
              <UserFeedback />
            </div>
            <div>
              <AddMaintance />
            </div>
          </div>

          <div className="">
            <Allexpense />
          </div>


        </div>
      </div>
    </div>
  );
}

export default Dashboard;
