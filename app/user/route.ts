// app/create-sanity-user/route.ts

import sanityClient from "@/sanity/sanityClient";
import { currentUser } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  // return NextResponse.json(user);

  const {
    id,
    passwordEnabled,
    totpEnabled,
    backupCodeEnabled,
    twoFactorEnabled,
    banned,
    updatedAt,
    imageUrl,
    hasImage,
    primaryEmailAddressId,
    primaryPhoneNumberId,
    primaryWeb3WalletId,
    lastSignInAt,
    externalId,
    username, 
    firstName,
    lastName,
    publicMetadata,
    privateMetadata,
    unsafeMetadata,
    emailAddresses,
    externalAccounts,
    phoneNumbers,
    web3Wallets,
  } = user;

  await sanityClient.createIfNotExists({
    _type: "user",
    _id: id,
    passwordEnabled,
    totpEnabled,
    backupCodeEnabled,
    twoFactorEnabled,
    banned,
    updatedAt,
    imageUrl,
    hasImage,
    primaryEmailAddressId,
    primaryPhoneNumberId,
    primaryWeb3WalletId,
    lastSignInAt,
    externalId,
    username,
    firstName,
    lastName,
    publicMetadata,
    privateMetadata,
    unsafeMetadata,
    emailAddress: emailAddresses[0].emailAddress,
    emailAddresses,
    phoneNumbers,
    web3Wallets,
    externalAccounts,
    })

  const url = req.url?.split("/user")[0]  || "/"
   return NextResponse.redirect(url);
};

