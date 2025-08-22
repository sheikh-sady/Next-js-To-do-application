"use client";
import Button from "./Button";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
const LoginForm = ({ email, password, setEmail, setPassword, onClick }) => {
  const router = useRouter()
  return (
    <div className=" m-4 w-60 h-80 border-2 rounded-2xl border-neutral-950 flex flex-col gap-5 justify-center items-center">
      <p className="text-2xl text-neutral-950 font-bold">Login</p>
      <InputField
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="w-50 h-7 text-white text-center bg-neutral-950 rounded-xl hover:cursor-pointer hover:bg-neutral-800"
        onClick={onClick}
        label="Login"
      />
      <p className = "text-xs">Dont have an account ? <button className="underline hover:cursor-pointer hover:text-neutral-500" onClick = {e=> router.push("/signup")}>Sign up</button></p>
    </div>
  );
};
export default LoginForm;
