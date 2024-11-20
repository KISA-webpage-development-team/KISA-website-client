'use client';

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { Cart } from "@/types/pocha";


export default function PayPage() {
    const { data: session, status } = useSession() as {
        data: UserSession | null;
        status: string;
    };


    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calculateAge = (birthday: string | null | undefined): number => {
        if (!birthday) return 0;
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };
    

    const handleBackButton = () => {
        window.location.href = '/pocha/cart';
    };

    const handlePayButton = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            const userBirthday = session?.user?.birthday;
            if (!userBirthday) {
                throw new Error("User birthday information is missing.");
            }

            const age = calculateAge(userBirthday);
            if (age < 21) {
                window.location.href = '/pocha/pay-fail';
                return;
            }
            else if (age >= 21) {
                window.location.href = '/pocha/pay-success';
            }

        }
        catch (error) {

        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <button onClick={handleBackButton}>Back to Cart</button>
        </div>
    );
}