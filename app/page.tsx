import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Be&nbsp;</span>
        <span className={title({ color: "violet" })}>ready&nbsp;</span>
        <br />
        <span className={title()}>when disaster strikes.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Join today to use our ultimate disaster preparation tool!
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/register"
        >
          Register
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/login"
        >
          Login
        </Link>
      </div>
    </section>
  );
}
