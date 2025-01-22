"use client";

import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

const ActionButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {children}
    </Button>
  );
};

export default ActionButton;
