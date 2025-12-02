"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getUserAction, loginAction } from "@/actions/auth";
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
import { EmailLogin, EmailLoginSchema } from "@/types";

const LoginForm = () => {
  const form = useForm<EmailLogin>({
    resolver: zodResolver(EmailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: EmailLogin) {
    startTransition(() => {
      toast.promise(
        loginAction(
          EmailLoginSchema.parse({ ...values, mode: AUTH_MODE.EMAIL })
        ),
        {
          loading: "Where you ought to be...",
          success: (user) => {
            setUserInfo(user);
            // 这两行先后顺序不能换
            router.push("/home");
            queryClient.invalidateQueries({ queryKey: [getUserAction.name] });
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
