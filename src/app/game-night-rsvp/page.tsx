"use client";

import React, { useState } from "react";
import { CustomFormItem } from "@/components/ui/form";
import { CustomButton } from "@/components/ui/button";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function GameNightRSVPPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    participants: "",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual submission logic (e.g., API call)
    console.log("Form submitted:", formData);
    alert("RSVP submitted! Thank you.");
  };

  return (
    <section className="flex flex-col items-center justify-center py-10">
      <h1 className={`${sejongHospitalBold.className} text-4xl mb-8 text-michigan-blue`}>
        Game Night RSVP
      </h1>
      
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <CustomFormItem
          htmlFor="name"
          labelText="Name (성함)"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required={true}
        />

        <CustomFormItem
          htmlFor="email"
          labelText="Email (이메일)"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="yourname@umich.edu"
          required={true}
        />

        <CustomFormItem
          htmlFor="participants"
          labelText="Number of Participants (참여 인원)"
          type="number"
          value={formData.participants}
          onChange={handleChange}
          placeholder="1"
          required={true}
        />

        <CustomFormItem
          htmlFor="comments"
          labelText="Comments / Notes (기타 사항)"
          type="text"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Any dietary restrictions or notes?"
        />

        <div className="mt-4">
          <CustomButton
            type="submit"
            text="Submit RSVP"
            className="w-full py-3 text-lg"
          />
        </div>
      </form>
    </section>
  );
}
