"use client";

import { deleteMyid } from "@/lib/actions/myid.actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DeleteMyid = async ({ userId, myid }: any) => {
  const router = useRouter();

  const deleteMyidOnclick = async () => {
    if (!userId) {
      router.back();
      return;
    }

    await deleteMyid({ myidId: myid, path: "/" });

    router.push("/");
  };

  return (
    <div className="w-full">
      <Button size="lg" className="button w-full" onClick={deleteMyidOnclick}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteMyid;
