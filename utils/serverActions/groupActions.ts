"use server";

import { FilterQuery, SortOrder } from "mongoose";

import Group from "../models/groupModels";
import Post from "../models/postModels";
import User from "../models/userModels";

import { connectToDatabase } from "@/lib/mongoose";

export async function createGroup(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string // Change the parameter name to reflect it's an id
) {
  try {
    connectToDatabase();

    // Find the user with the provided unique id
    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found"); // Handle the case if the user with the id is not found
    }

    const newGroup = new Group({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id, // Use the mongoose ID of the user
    });

    const createdGroup = await newGroup.save();

    // Update User model
    user.communities.push(createdGroup._id);
    await user.save();

    return createdGroup;
  } catch (error) {
    // Handle any errors
    console.error("Error creating group:", error);
    throw error;
  }
}

export async function fetchGroupDetails(id: string) {
  try {
    connectToDatabase();

    const groupDetails = await Group.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return groupDetails;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching group details:", error);
    throw error;
  }
}

export async function fetchGroupPosts(id: string) {
  try {
    connectToDatabase();

    const groupPosts = await Group.findById(id).populate({
      path: "posts",
      model: Post,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: "children",
          model: Post,
          populate: {
            path: "author",
            model: User,
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return groupPosts;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching group posts:", error);
    throw error;
  }
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDatabase();

    // Calculate the number of communities to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Group> = {};

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    // Create a query to fetch the communities based on the search and sort criteria.
    const communitiesQuery = Group.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    // Count the total number of communities that match the search criteria (without pagination).
    const totalCommunitiesCount = await Group.countDocuments(query);

    const communities = await communitiesQuery.exec();

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

export async function addMemberToGroup(
  groupId: string,
  memberId: string
) {
  try {
    connectToDatabase();

    // Find the group by its unique id
    const group = await Group.findOne({ id: groupId });

    if (!group) {
      throw new Error("Group not found");
    }

    // Find the user by their unique id
    const user = await User.findOne({ id: memberId });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user is already a member of the group
    if (group.members.includes(user._id)) {
      throw new Error("User is already a member of the group");
    }

    // Add the user's _id to the members array in the group
    group.members.push(user._id);
    await group.save();

    // Add the group's _id to the communities array in the user
    user.communities.push(group._id);
    await user.save();

    return group;
  } catch (error) {
    // Handle any errors
    console.error("Error adding member to group:", error);
    throw error;
  }
}

export async function removeUserFromGroup(
  userId: string,
  groupId: string
) {
  try {
    connectToDatabase();

    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const groupIdObject = await Group.findOne(
      { id: groupId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!groupIdObject) {
      throw new Error("Group not found");
    }

    // Remove the user's _id from the members array in the group
    await Group.updateOne(
      { _id: groupIdObject._id },
      { $pull: { members: userIdObject._id } }
    );

    // Remove the group's _id from the communities array in the user
    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { communities: groupIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from group:", error);
    throw error;
  }
}

export async function updateGroupInfo(
  groupId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDatabase();

    // Find the group by its _id and update the information
    const updatedGroup = await Group.findOneAndUpdate(
      { id: groupId },
      { name, username, image }
    );

    if (!updatedGroup) {
      throw new Error("Group not found");
    }

    return updatedGroup;
  } catch (error) {
    // Handle any errors
    console.error("Error updating group information:", error);
    throw error;
  }
}

export async function deleteGroup(groupId: string) {
  try {
    connectToDatabase();

    // Find the group by its ID and delete it
    const deletedGroup = await Group.findOneAndDelete({
      id: groupId,
    });

    if (!deletedGroup) {
      throw new Error("Group not found");
    }

    // Delete all posts associated with the group
    await Post.deleteMany({ group: groupId });

    // Find all users who are part of the group
    const groupUsers = await User.find({ communities: groupId });

    // Remove the group from the 'communities' array for each user
    const updateUserPromises = groupUsers.map((user) => {
      user.communities.pull(groupId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedGroup;
  } catch (error) {
    console.error("Error deleting group: ", error);
    throw error;
  }
}