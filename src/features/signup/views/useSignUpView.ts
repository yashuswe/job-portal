// "use client";
// import { ChangeEvent, useEffect } from "react";
// import { useState } from "react";
// import { signupMutation } from "@/api/signup";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";

// export const useSignUpView = () => {
//   const router = useRouter();
//   const [name, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setCPassword] = useState("");
//   const [skills, setSkills] = useState("");
//   const [userRole, setRole] = useState(0);
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   const handleRoleChange = (role: number) => {
//     setRole(role);
//   };

//   const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFullName(e.target.value);
//   };

//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCPassword(e.target.value);
//   };

//   const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSkills(e.target.value);
//   };

//   const signUpMutationFn = useMutation({
//     mutationFn: signupMutation,
//     onSuccess: (data) => {
//       toast.success("Signed Up Successfully");
//       router.push("login");
//     },
//     onError: (error: any) => {
//       const errorResponse = error.response as {
//         data: {
//           errors: { [key: string]: string }[];
//         };
//       };

//       if (errorResponse && errorResponse.data && errorResponse.data.errors) {
//         const errorMessages = errorResponse.data.errors.map(
//           (error) => Object.values(error)[0]
//         );
//         toast.error(errorMessages.join("\n"));
//       } else {
//         toast.error("An error occurred.");
//       }
//     },
//   });

//   const handleSubmit = () => {
//     signUpMutationFn.mutate({
//       userRole,
//       password,
//       name,
//       email,
//       skills,
//       confirmPassword,
//     });
//   };

//   return {
//     userRole,
//     password,
//     confirmPassword,
//     name,
//     email,
//     skills,
//     isPageLoading,
//     handleSubmit,
//     handleCPasswordChange,
//     handleEmailChange,
//     handlePasswordChange,
//     handleFullNameChange,
//     handleSkillsChange,
//     handleRoleChange,
//   };
// };
// "use client";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { signupMutation } from "@/api/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export const useSignUpView = () => {
  const router = useRouter();
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [userRole, setRole] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRoleChange = (role: number) => {
    setRole(role);
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCPassword(e.target.value);
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };

  const isValidEmail = (email: string) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const signUpMutationFn = useMutation({
    mutationFn: signupMutation,
    onSuccess: (data) => {
      toast.success("Signed Up Successfully");
      router.push("login");
    },
    onError: (error: any) => {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(
            (error: any) => Object.values(error)[0]
          );
          toast.error(errorMessages.join("\n"));
        } else {
          toast.error("An error occurred.");
        }
      } else {
        toast.error("An error occurred.");
      }
    },
  });

  const handleSubmit = () => {
    if (isFormValid()) {
      signUpMutationFn.mutate({
        userRole,
        password,
        name,
        email,
        skills,
        confirmPassword,
      });
    }
  };

  return {
    userRole,
    password,
    confirmPassword,
    name,
    email,
    skills,
    isPageLoading,
    handleSubmit,
    handleCPasswordChange,
    handleEmailChange,
    handlePasswordChange,
    handleFullNameChange,
    handleSkillsChange,
    handleRoleChange,
    emailError,
    passwordError,
    confirmPasswordError,
    isFormValid,
  };
};
