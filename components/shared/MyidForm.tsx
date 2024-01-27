"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { myidFormSchema } from "@/lib/validator";
import { myidDefaultValues } from "@/constant";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createMyid, updateMyid } from "@/lib/actions/myid.actions";
import { IMyid } from "@/lib/database/models/myid.model";

type MyidFormProps = {
  userId: string;
  type: "Create" | "Update";
  myid?: IMyid;
  myidId?: string;
};

const MyidForm = ({ userId, type, myid, myidId }: MyidFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    myid && type === "Update"
      ? {
          ...myid,
        }
      : myidDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof myidFormSchema>>({
    resolver: zodResolver(myidFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof myidFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newMyid = await createMyid({
          myid: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/",
        });

        if (newMyid) {
          form.reset();
          router.push(`/myids/${newMyid._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!myidId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateMyid({
          userId,
          myid: { ...values, imageUrl: uploadedImageUrl, _id: myidId },
          path: `/myids/${myidId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/myids/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 px-2 md:px-60"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="idTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="ID Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="ID Number/Code"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Digital ID`}
        </Button>
      </form>
    </Form>
  );
};

export default MyidForm;
