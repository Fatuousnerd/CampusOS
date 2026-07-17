import { Button } from "@/components/ui/button";
import { ItemDescription, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Spinner className="size-7" />
        <ItemTitle className="font-bold text-3xl">
          Wait a minute... We&apos;re cooking.
        </ItemTitle>
        <ItemDescription>
          You should be logged in in a few. If not...{" "}
          <Button variant={"link"}>
            <Link href={"/auth"}>Click Here</Link>
          </Button>
        </ItemDescription>
      </div>
    </>
  );
};

export default Page;
