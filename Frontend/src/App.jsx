import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";  
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
//import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import FriendsPage from "./pages/FriendsPage";

const App = () => {
//tanstack query
const {isLoading,authUser} = useAuthUser();
const {theme}=useThemeStore();
const isAuthenticated=Boolean(authUser); // Convert authUser to a boolean value
const isOnboarded=authUser?.isOnboarded || false; // Check if the user is onboarded


  /*  useEffect(()=>{
  const getData=async()=>{
    setisLoading(true);
    try{
   const data=await fetch("https://jsonplaceholder.typicode.com/todos");
   const json=await data.json();
    setData(json);
    }catch(error){
      setError(error.message);
    }finally{
      setisLoading(false);
    }
  };
  getData();
},[]);   */

//tanstack query client
//const authUser=authData?.user || null;
if(isLoading) return <PageLoader />;


return (
<div className="h-screen" data-theme={theme}>
  <Routes>
    <Route path="/" element={isAuthenticated && isOnboarded?(<Layout showSidebar={true}><HomePage /></Layout>):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
    <Route path="/login" element={!isAuthenticated?<LoginPage />:<Navigate to={isOnboarded?"/":"/onboarding"} />} />
    <Route path="/signup" element={!isAuthenticated?<SignUpPage />:<Navigate to={isOnboarded?"/":"/onboarding"} />} />
    <Route path="/notifications" element={isAuthenticated && isOnboarded?(<Layout showSidebar={true}><NotificationsPage /></Layout>):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
    <Route path="/call/:id" element={isAuthenticated && isOnboarded?(<CallPage />):(<Navigate to={!isAuthenticated?"/login":"/onboarding"} />)} />
    <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={false}><ChatPage /></Layout>):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
    <Route path="/onboarding" element={isAuthenticated?(!isOnboarded?(<OnboardingPage />):(<Navigate to="/" />)):(<Navigate to="/login" />)} />
    <Route path="/friends" element={isAuthenticated && isOnboarded?(<Layout showSidebar={true}><FriendsPage /></Layout>):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
  </Routes>
  <Toaster />
</div>
  );
};
export default App;