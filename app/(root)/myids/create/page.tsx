import MyidForm from "@/components/shared/MyidForm";
import { auth } from "@clerk/nextjs";

const CreateMyid = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">Create Digital ID</h3>
      </section>

      <div className="wrapper my-8">
        <MyidForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateMyid;
