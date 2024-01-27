"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

import {
  CreateMyidParams,
  UpdateMyidParams,
  DeleteMyidParams,
  GetAllMyidsParams,
  GetMyidByUserParams,
} from "@/types";
import Myid from "../database/models/myid.model";

const populateMyid = (query: any) => {
  return query.populate({
    path: "organizer",
    model: User,
    select: "_id firstName lastName",
  });
};

// CREATE
export async function createMyid({ userId, myid, path }: CreateMyidParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newMyid = await Myid.create({ ...myid, organizer: userId });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newMyid));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE MYID BY ID
export async function getMyidById(myidId: string) {
  try {
    await connectToDatabase();

    const myid = await populateMyid(Myid.findById(myidId));

    if (!myid) throw new Error("Myid not found");

    return JSON.parse(JSON.stringify(myid));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateMyid({ userId, myid, path }: UpdateMyidParams) {
  try {
    await connectToDatabase();

    const myidToUpdate = await Myid.findById(myid._id);
    if (!myidToUpdate || myidToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or myid not found");
    }

    const updatedMyid = await Myid.findByIdAndUpdate(
      myid._id,
      { ...myid },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedMyid));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteMyid({ myidId, path }: DeleteMyidParams) {
  try {
    await connectToDatabase();

    const deletedMyid = await Myid.findByIdAndDelete(myidId);
    if (deletedMyid) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL MYIDS
export async function getAllMyids({
  userId,
  query,
  limit = 6,
  page,
}: GetAllMyidsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { idTitle: { $regex: query, $options: "i" } }
      : {};
    const conditions = {
      $and: [titleCondition, { organizer: userId }],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const myidsQuery = Myid.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const myids = await populateMyid(myidsQuery);
    const myidsCount = await Myid.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(myids)),
      totalPages: Math.ceil(myidsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET MYIDS BY USER
export async function getMyidsByUser({
  userId,
  limit = 6,
  page,
}: GetMyidByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const myidsQuery = Myid.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const myids = await populateMyid(myidsQuery);
    const myidsCount = await Myid.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(myids)),
      totalPages: Math.ceil(myidsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
