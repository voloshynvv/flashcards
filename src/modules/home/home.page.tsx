import { getCurrentUser } from "@/lib/session";

import { UserHome } from "./components/user-home/user-home";
import { GuestHome } from "./components/guest-home/guest-home";

export const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <main className="p-4 pb-10 md:p-8 md:pb-16">
      <div className="mx-auto flex max-w-310 flex-col gap-10 md:gap-12">
        {user ? <UserHome /> : <GuestHome />}
      </div>
    </main>
  );
};
