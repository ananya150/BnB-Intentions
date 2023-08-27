"use client";
import React from "react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

const Dropdown = ({ image }: { image: string }) => {
  const logout = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Image
          src={image!}
          alt="Profile"
          height={60}
          width={60}
          className="rounded-full w-[50px] h-[50px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={logout}
        className="w-26 flex justify-center cursor-pointer"
      >
        <DropdownMenuLabel className="font-satoshi font-normal tracking-wide text-[16px]">
          Sign out
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
