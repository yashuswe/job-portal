"use client";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { PostJob } from "@/api/post-a-job";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/UseTest";

export const usePostAJobView = () => {
  const routing = useRouter();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const { userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (userRole === "1") {
      routing.push("/");
    } else {
      setIsLoading(false);
    }
  }, [userRole, routing]);

  const postJobMutationFn = useMutation({
    mutationFn: PostJob,
    onSuccess: () => {
      toast.success("Posted the job successfully");
      routing.push("/posted-jobs");
    },
    onError: (error: any) => {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred! Try again.");
        }
      } else {
        toast.error("An error occurred! Try again.");
      }
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    settitle(e.target.value);
  };
  const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setdescription(e.target.value);
  };
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlocation(e.target.value);
  };

  const handlePostAJOb = () => {
    postJobMutationFn.mutate({ title, description, location });
  };
  return {
    title,
    description,
    location,
    isLoading,
    isPageLoading,
    handleTitleChange,
    handleDescChange,
    handleLocationChange,
    handlePostAJOb,
  };
};
