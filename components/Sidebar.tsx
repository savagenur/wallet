"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SidebarProps) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href={"/"} className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            alt="logo"
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            className="size-[24] max-xl:size-14"
          />
          <h1 className="sidebar-logo">My Wallet</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient": isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  alt={item.label}
                  src={item.imgURL}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p
                className={cn("sidebar-link", {
                  "!text-white": isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
        {/* Todo */}
        User
      </nav>
      {/* Todo */}
      Footer
    </section>
  );
};

export default Sidebar;
