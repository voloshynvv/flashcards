import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="md:hidden"
        src="/logo-small.svg"
        alt=""
        width={40}
        height={40}
      />

      <Image
        className="hidden md:block"
        src="/logo-large.svg"
        alt=""
        width={156}
        height={40}
      />
    </Link>
  );
};
