import { SignIn} from "@clerk/nextjs";

export default function SignInPage() {

  return (
    <div className="bg-white pt-32 flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}
