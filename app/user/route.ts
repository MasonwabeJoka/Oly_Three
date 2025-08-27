// app/user/route.ts

import { client } from "@/sanity/lib/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  console.log('user: ', user)

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

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

  await client.createIfNotExists({
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
    emailAddress: emailAddresses?.[0]?.emailAddress ?? null,
    emailAddresses,
    phoneNumbers,
    web3Wallets,
    externalAccounts,
  });

  const url = new URL("/", req.url);
  return NextResponse.redirect(url);
}
