"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SiApple,
  SiGithub,
  SiGoogle,
  SiMeta,
} from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="w-full h-screen flex gap-3 p-5">
        <div className="flex flex-1"></div>
        <Card className="flex-1 w-200">
          <CardHeader>
            <CardTitle className="font-bold text-xl">CampusOS</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eum
              magni quidem autem architecto neque facilis quia ipsum quas, qui
              aspernatur itaque ad consectetur pariatur sed perferendis deleniti
              hic numquam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <Label>Email</Label>
                <Input
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Button disabled={!email.trim()}>
                  <Mail /> Send Magic Link
                </Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <div className="grid grid-cols-2 gap-4">
                <Button>
                  <SiGoogle /> Google
                </Button>
                <Button>
                  <SiGithub /> GitHub
                </Button>
                <Button>
                  <SiMeta /> Meta
                </Button>
                <Button>
                  <SiApple /> Apple
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
