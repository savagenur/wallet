"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema, parseStringify } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with appwrite & create plaid token
      switch (type) {
        case "sign-up":
          const userData = {
            email: data.email,
            password: data.password,
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
          };
          const newUser = await signUp(userData);
          setUser(newUser);
          break;
        case "sign-in":
          const response = await signIn({
            email: data.email,
            password: data.password,
          });

          if (response) {
            const user = parseStringify(response);

            router.push("/");
          }
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer flex items-center  gap-1">
          <Image alt="logo" src={"/icons/logo.svg"} width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            My Wallet
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="First name"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      label="Last name"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="Exp: TX"
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal code"
                      name="postalCode"
                      placeholder="Enter your zip code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="Date of birth"
                      name="dateOfBirth"
                      placeholder="Example: YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="Enter your last 4 digits"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
