import Image from "next/image";
import React from "react";

export default function Setting() {
  function handleProfilePictureChange(){
    console.log("Hello");
  }
  return (
    <section className="flex h-full w-full flex-col px-4 text-[#A9ACB8] md:px-6">
      <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">Setting</h1>
      <p className="space-x-3 text-lg text-[#858892]">Manage your account settings</p>
      <div className="mt-4 flex w-full items-center justify-center rounded-md border-2 border-gray-500">
      {/* Change profile picture */}
       <div className="w-full p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/profile.png" alt="admin profile picture" width={50} height={50} className="rounded-full w-16"/>
         <div className="flex flex-col gap-1 ">
            <span  className="text-lg">Harsh Gupta</span>
            <span  className="text-sm">harshgupta88911@gmail.com</span>
         </div>
        </div>
        <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="hidden" />
        <button onClick={handleProfilePictureChange} className="p-2 flex gap-2 items-center hover:bg-gray-300/20 transition active:bg-gray-300/10 font-semibold  rounded-md text-sm border border-gray-300 cursor-pointer">
          <Image src="/admin_icons/upload.svg" alt="change profile picture" width={24} height={24} className="w-4 h-4" />
          Change Photo</button> 
       </div>
       {/* Change name and email */}
      </div>
      <div>
        <h1></h1>
      </div>
    </section>
  );
}
