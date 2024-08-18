import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user } = useUser();
  
  useEffect(() => {
    if (user) {
      console.log("User is Signed up:", user.id);
    }
  }, [user]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
    </div>
  );
}
