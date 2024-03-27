"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backendUrl } from "../../config/backendUrl";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState(""); // user input 한글 이름
  const [email, setEmail] = useState(""); // user input 이메일

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Creating a new user...");
    if (!email.endsWith("umich.edu")) {
      console.log("Invalid Email");
      // add error notification
      return;
    }

    const userData = {
      name: name,
      email: email,
    };

    // send /auth/signup api call to create a new user

    const url = `http://127.0.0.1:8000/api/v1/auth/signup/`; // not working with backendUrl.js...
    try {
      const res = await axios.post(url, userData);
      if (res.status === 201) {
        console.log("Successfully created a new user!");
        // redirect to home
        console.log(name);
        return router.push(`/signup/${name}`);
      }
      // add error notification
      return;
    } catch (err) {
      console.log(err);
      // add error notification
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl mb-4">키사에 처음 오신걸 환영합니다!</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-[300px]"
      >
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="rounded-lg border border-black p-2 mr-4 w-full"
          placeholder="한글 이름"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="rounded-lg border border-black p-2 mr-4 w-full"
          placeholder="umich 이메일"
        />
        <button type="submit" className="blue_button">
          제출
        </button>
      </form>
    </div>
  );
}
