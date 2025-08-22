"use client";
import Link from "next/link";
import ButtonComponent from "../components/ButtonComponent";
import { useRouter } from "next/navigation";

export default function LandingPage({ user }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 h-screen w-screen justify-center items-center">
      {user && (
        <p className="text-2xl font-medium text-gray-800">
          Welcome,{user.user_metadata.name}
        </p>
      )}
      <p className="text-xl font-medium text-gray-600">
        This page will contain a chat interface. Work is in progress...
      </p>
      <ButtonComponent
        label="Go to Dashboard"
        properties="bg-gradient-to-r from-violet-600 to-cyan-600"
        onClick={() => router.push("/dashboard")}
      />
      {/* return <HomePage user={user} /> */}
    </div>
  );
}
