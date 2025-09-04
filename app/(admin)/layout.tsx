import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = await auth();

  console.log("userId", userId);

  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <div className="flex flex-col flex-1 lg:flex-row">
        <Sidebar />

        <div className="flex-1 flex justify-center lg:justify-start mx-auto p-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
