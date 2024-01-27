import Image from "next/image";
import Link from "next/link";
import Translate from "./Translate";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper md:flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Translate />

        <p>2024 MyiD. All Rights reserved.</p>

        <Link href="/">
          <Image
            src="/assets/images/MyiD.png"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
