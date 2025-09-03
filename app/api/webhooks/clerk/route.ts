import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function GET() {
  return NextResponse.json({ status: "Clerk webhook endpoint is working", method: "GET" });
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("Clerk webhook received payload:", JSON.stringify(payload, null, 2));

    if (payload.type === "user.created") {
      const user = payload.data;
      console.log("Processing user creation for:", user.id);

      // Check if user already exists in Sanity
      const existingUser = await writeClient.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: user.id }
      );

      if (existingUser) {
        console.log("User already exists in Sanity:", existingUser._id);
        return NextResponse.json({ 
          received: true, 
          success: true,
          userId: existingUser._id,
          message: "User already exists in Sanity"
        });
      }

      // Create the user document in Sanity only if it doesn't exist
      const sanityUser = {
        _type: "user",
        _id: `clerk-${user.id}`,
        clerkId: user.id,
        id: user.id,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        username: user.username || "",
        fullName: `${user.first_name || ""} ${user.last_name || ""}`.trim() || "",
        emailAddress: user.email_addresses?.[0]?.email_address || "",
        emailAddresses: user.email_addresses?.map((email: any, index: number) => ({
          _key: `email-${index}`,
          id: email.id,
          emailAddress: email.email_address,
          verification: email.verification
        })) || [],
        primaryEmailAddressId: user.primary_email_address_id || "",
        phoneNumbers: user.phone_numbers?.map((phone: any, index: number) => ({
          _key: `phone-${index}`,
          id: phone.id
        })) || [],
        primaryPhoneNumberId: user.primary_phone_number_id || "",
        imageUrl: user.image_url || "",
        hasImage: !!user.image_url,
        passwordEnabled: user.password_enabled || false,
        totpEnabled: user.totp_enabled || false,
        twoFactorEnabled: user.two_factor_enabled || false,
        backupCodeEnabled: user.backup_code_enabled || false,
        primaryWeb3WalletId: user.primary_web3_wallet_id || "",
        externalId: user.external_id || "",
        publicMetadata: user.public_metadata || {},
        privateMetadata: user.private_metadata || {},
        unsafeMetadata: user.unsafe_metadata || {},
        web3Wallets: user.web3_wallets?.map((wallet: any, index: number) => ({
          _key: `wallet-${index}`,
          id: wallet.id
        })) || [],
        externalAccounts: user.external_accounts?.map((account: any, index: number) => ({
          _key: `account-${index}`,
          id: account.id
        })) || [],
        createOrganizationEnabled: user.create_organization_enabled || false,
        createdAt: user.created_at ? new Date(user.created_at).toISOString() : new Date().toISOString(),
        updatedAt: user.updated_at ? new Date(user.updated_at).toISOString() : new Date().toISOString(),
        lastSignInAt: user.last_sign_in_at ? new Date(user.last_sign_in_at).toISOString() : undefined,
        banned: user.banned || false,
      };

      console.log("Creating new Sanity user document:", JSON.stringify(sanityUser, null, 2));
      
      const result = await writeClient.create(sanityUser);
      console.log("Successfully created new user in Sanity:", result._id);
      
      return NextResponse.json({ 
        received: true, 
        success: true,
        userId: result._id,
        message: "New user created successfully in Sanity"
      });
    }

    if (payload.type === "user.updated") {
      const user = payload.data;
      console.log("Processing user update for:", user.id);

      // Update existing user in Sanity
      const existingUser = await writeClient.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: user.id }
      );

      if (existingUser) {
        const updatedUser = {
          ...existingUser,
          firstName: user.first_name || existingUser.firstName,
          lastName: user.last_name || existingUser.lastName,
          username: user.username || existingUser.username,
          fullName: `${user.first_name || ""} ${user.last_name || ""}`.trim() || existingUser.fullName,
          emailAddress: user.email_addresses?.[0]?.email_address || existingUser.emailAddress,
          imageUrl: user.image_url || existingUser.imageUrl,
          hasImage: !!user.image_url,
          updatedAt: user.updated_at ? new Date(user.updated_at).toISOString() : new Date().toISOString(),
          lastSignInAt: user.last_sign_in_at ? new Date(user.last_sign_in_at).toISOString() : existingUser.lastSignInAt,
        };

        const result = await writeClient.createOrReplace(updatedUser);
        console.log("Successfully updated user in Sanity:", result._id);
        
        return NextResponse.json({ 
          received: true, 
          success: true,
          userId: result._id,
          message: "User updated successfully in Sanity"
        });
      } else {
        console.log("User not found for update:", user.id);
        return NextResponse.json({ 
          received: true, 
          success: false,
          message: "User not found for update"
        });
      }
    }

    console.log("Webhook event type not handled:", payload.type);
    return NextResponse.json({ received: true, message: "Event type not handled" });
    
  } catch (error) {
    console.error("Error processing Clerk webhook:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json(
      { 
        received: true, 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
