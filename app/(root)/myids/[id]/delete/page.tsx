import DeleteMyid from "@/components/shared/DeleteMyid";
import { Button } from "@/components/ui/button";
import { getMyidById } from "@/lib/actions/myid.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

type DeleteEventProps = {
  params: {
    id: string;
  };
};

const DeletedMyid = async ({ params: { id } }: DeleteEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const myid = await getMyidById(id);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">Delete Digital ID</h3>
      </section>

      <div className="wrapper my-8 max-w-5xl flex-center gap-2 md:gap-5 flex-col">
        <p className="justify-center text-center p-semibold-18 md:p-bold-24">
          Your <span className="text-red-600">{myid.idTitle}</span> will
          permanently delete in Digital ID.
        </p>
        <div className="flex-center flex-col md:flex-row gap-2 md:gap-4  w-full md:max-w-xl">
          <Button size="lg" className="button w-full">
            <Link href="/">Cancel</Link>
          </Button>
          <DeleteMyid myid={myid} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default DeletedMyid;
