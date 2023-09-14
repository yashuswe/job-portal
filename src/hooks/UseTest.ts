export const useAuth = () => {
  const userRole =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("userRole")
      : "";
  const userToken =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("userToken")
      : "";
  const userName =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("userName")
      : "";
  return {
    userRole,
    userToken,
    userName,
  };
};
