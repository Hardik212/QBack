"use client"
import React, { useState, useEffect } from "react";

interface User {
  username: string;
  password: string;
  name: string;
  role: string;
}

export default function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err:any) {
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const renderUsername = () => {
    return <div className="text-xl">{user?.username}</div>;
  };

  const renderDetailsWidget = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/3">
          <div className="text-lg font-semibold">Password</div>
          <div>{user?.password}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Name</div>
          <div>{user?.name}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Role</div>
          <div>{user?.role}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b-2 flex flex-row justify-between">
        <div className="">{renderUsername()}</div>
      </div>

      <div className="py-4 px-6 flex flex-row">
        <div className="w-1/2">{renderDetailsWidget()}</div>
      </div>
    </div>
  );
}
