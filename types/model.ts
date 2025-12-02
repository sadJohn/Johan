import { z } from "zod";

import { AUTH_MODE } from "@/lib/constants";

const UserModalSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(1).max(20),
  email: z.email("Invalid email address").max(255).nullable(),
  password: z.string().max(255).nullable(),
  age: z.number().int().positive("Age must be positive").nullable(),
  pictureId: z.string().max(255).nullable(),
  picture: z.url("Invalid picture URL").max(255).nullable(),
  githubId: z.number().int().nullable(),
  googleId: z.number().int().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserSchema = UserModalSchema.omit({ password: true });

export const CreateUserFormSchema = z
  .object({
    username: UserModalSchema.shape.username,
    email: UserModalSchema.shape.email.unwrap(),
    password: UserModalSchema.shape.password
      .unwrap()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const CreateUserSchema = CreateUserFormSchema.omit({
  confirmPassword: true,
});
export const LoginUserSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal(AUTH_MODE.EMAIL),
    email: UserModalSchema.shape.email.unwrap(),
    password: UserModalSchema.shape.password
      .unwrap()
      .min(8, "Password must be at least 8 characters long"),
  }),
  z.object({
    mode: z.literal(AUTH_MODE.GITHUB),
    email: UserModalSchema.shape.email,
    username: UserModalSchema.shape.username,
    picture: UserModalSchema.shape.picture,
    githubId: UserModalSchema.shape.githubId.unwrap(),
  }),
  z.object({
    mode: z.literal(AUTH_MODE.GOOGLE),
    email: UserModalSchema.shape.email,
    username: UserModalSchema.shape.username,
    picture: UserModalSchema.shape.picture,
    googleId: UserModalSchema.shape.googleId.unwrap(),
  }),
]);
export const EmailLoginSchema = LoginUserSchema.options[0];
export const GithubLoginSchema = LoginUserSchema.options[1];
export const GoogleLoginSchema = LoginUserSchema.options[2];

export type User = z.infer<typeof UserSchema>;
export type CreateUserForm = z.infer<typeof CreateUserFormSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type EmailLogin = z.infer<typeof EmailLoginSchema>;
export type GithubLogin = z.infer<typeof GithubLoginSchema>;
export type GoogleLogin = z.infer<typeof GoogleLoginSchema>;

export const SessionSchema = z.object({
  id: z.string().min(1, "Session ID cannot be empty"),
  userId: z.number().int().positive(),
  expiresAt: z.date(),
});

export type Session = z.infer<typeof SessionSchema>;
