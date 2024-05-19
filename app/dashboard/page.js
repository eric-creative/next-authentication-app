'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {signOutAction} from "@/actions/authActions";

export default function dashboardPage() {

    const handleSignOut = async () => {
        try {
            await signOutAction();
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <h1>welcome user to the dashboard</h1>
            <Button
                onClick={handleSignOut}
            >LogOut</Button>
        </div>
    );
}