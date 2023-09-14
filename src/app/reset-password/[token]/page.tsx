"use client"
import ResetPassword from "@/features/reset-password";
const Page = ({ params }: { params: { token: string } }) => {
  return <ResetPassword token={params.token} />;
};

export default Page;
