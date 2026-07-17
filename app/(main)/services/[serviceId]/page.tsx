"use client";

import { Button } from "@/components/ui/button";
import { ItemDescription, ItemTitle } from "@/components/ui/item";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="flex p-5 gap-15 w-full h-screen">
        <Image
          src={"/globe.svg"}
          alt="Product"
          width={50}
          height={50}
          className="flex-1"
        />
        <div className="flex-1 flex flex-col items-start gap-4 p-2">
          <ItemTitle className="font-bold text-3xl">ProductName</ItemTitle>
          <ItemDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ad
            illo dicta ullam natus accusantium sequi, obcaecati itaque velit.
            Molestias pariatur sint quam minima in excepturi, voluptates
            suscipit tenetur libero. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Labore ad illo dicta ullam natus accusantium
            sequi, obcaecati itaque velit. Molestias pariatur sint quam minima
            in excepturi, voluptates suscipit tenetur libero.
          </ItemDescription>
          <Button>
            Add to cart for{" "}
            {Number(300).toLocaleString("en-US", {
              style: "currency",
              currency: "kes",
            })}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
