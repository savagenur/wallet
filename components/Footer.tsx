"use client";
import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAccount();
      router.push("/sign-in");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600 ">
          {user.email}
        </p>
      </div>
      <div
        onClick={handleLogout}
        className={type === "mobile" ? "footer_image-mobile" : "footer_image"}
      >
        <Image alt="logout" src={"/icons/logout.svg"} fill />
      </div>
    </footer>
  );
};

export default Footer;
