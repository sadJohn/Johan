"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AUTH_MODE } from "@/lib/constants";
import useAppStore from "@/store";
import { User } from "@/types";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      toast.promise(
        login({
          mode: AUTH_MODE.EMAIL,
          email: values.email,
          password: values.password,
        } as User & { mode: AUTH_MODE }),
        {
          loading: "Where you ought to be...",
          success: (user) => {
            setUserInfo(user);
            router.push("/home");
            return `Gryffindor!`;
          },
          error: "Maybe next year...",
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
