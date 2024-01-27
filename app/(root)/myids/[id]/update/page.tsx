import MyidForm from "@/components/shared/MyidForm";
import { getMyidById } from "@/lib/actions/myid.actions";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateMyid = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const myid = await getMyidById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">Update Digital ID</h3>
      </section>

      <div className="wrapper my-8">
        <MyidForm type="Update" myid={myid} myidId={myid._id} userId={userId} />
      </div>
    </>
  );
};

export default UpdateMyid;
