"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import {usePathname} from 'next/navigation'

import metadata from "@/util/metadata";
import { useMemo } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName:{[x:string]:string}= useMemo(()=>({
    '/':'home',
    '/jobs/applied-jobs':'appliedJob',
    '/jobs':'jobs',
    '/posted-jobs':'postedjobs',
    '/forgot-password':'forgotpassword',
    '/reset-password':'resetpassword',
    '/login':'login',
    '/post-job':'postAJob',
    '/signup':'signup' 
  }),[])
  const path:any = usePathname();
  const meta = useMemo(()=>
    metadata?.[pathName[path]]
  ,[pathName,path])
  return (
    <html lang="en">
      <meta content="One stop shop for candidates and recruiters" />
      <meta property="title" content={meta?.title} />
      <meta property="description" content={meta?.description} />
      <meta property="og:title" content={meta?.title} />
      <meta property="og:description" content={meta?.description} />
      <meta name='og:description' content={meta?.description} />
      <meta name='description' content={meta?.description} />
      <meta property="og:image" content="https://webfeb.in/wp-content/uploads/2016/09/job-portal-1.jpg" />
      <meta name="twitter:image" content="https://webfeb.in/wp-content/uploads/2016/09/job-portal-1.jpg" />
      <head>
        <title>MyJobs</title>
        <link rel="favicon" href="@../../public/Images/favicon-32x32.png" />
      </head>
      <body className={inter.className}>
        <div id="modal-root"></div>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <ToastContainer className={"my-8"} autoClose={1000}/>

      </body>
    </html>
  );
}
