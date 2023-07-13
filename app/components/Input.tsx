"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {};

function Input({}: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchTerm && router.push(`/user/${searchTerm}/a`);
        }}
        className="w-full max-w-2xl py-16 flex-col p-12  flex gap-8 border rounded-lg "
      >
        <h3 className="text-xl text-center">Enter Your Username</h3>
        <input
          type="text"
          placeholder="Username"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />

        <button type="submit" className="w-full">
          Get Profile
        </button>
      </form>
    </div>
  );
}

export default Input;
