import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="pt-6 pb-12">
      <SignIn />
    </div>
  );
} 