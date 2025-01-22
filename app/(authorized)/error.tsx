"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { getUserAction } from "@/actions/auth";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [getUserAction.name],
    });

    console.error(error);
  }, [error, queryClient]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
