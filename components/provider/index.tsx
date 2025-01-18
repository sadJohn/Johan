import { QueryProvider } from "./query";
import { ThemeProvider } from "./theme";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};

export default Provider;
