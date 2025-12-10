import { AuthButton } from "./auth-button";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4 md:px-8 md:py-5 lg:py-6">
      <Logo />

      <div className="flex flex-wrap items-center justify-end gap-4">
        <AuthButton />
        <Navigation />
      </div>
    </header>
  );
};
