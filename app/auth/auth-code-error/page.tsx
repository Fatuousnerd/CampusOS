import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-xl">Auth Code Error</h1>
        <Button>
          <Link href={`/auth`}>Try Again</Link>
        </Button>
      </div>
    </>
  );
};

export default Page;
