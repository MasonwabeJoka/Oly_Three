import { defineType, defineField } from 'sanity';

export const user = defineType({
    name: 'user',
    title: 'Users',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'Id',
            type: 'string',
            description: 'The unique identifier for the user.',
        }),
        defineField({
            name: 'workosId',
            title: 'WorkOS ID',
            type: 'string',
            description: 'The unique identifier for the user.',
        }),
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
            description: 'The user\'s name.',
            validation: (Rule) => Rule.min(0).error('First name cannot be null'),
        }),
          
          defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            description: 'The user\'s surname.',
            validation: (Rule) => Rule.min(0).error('Last name cannot be null'),
          }),

          defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            description: "The user's full name.",
            // initialValue can be a function; `parent` contains the other field values at creation
            initialValue: (params) => {
              const first = params?.parent?.firstName ?? '';
              const last = params?.parent?.lastName ?? '';
              return `${first}${first && last ? ' ' : ''}${last}`.trim();
            },
          },),
          
          defineField({
            name: 'username',
            title: 'Username',
            type: 'string',
            description: 'The user\'s unique username.',
          }),

          defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            description: 'Profile image of the user.',
          }),

          defineField({
            name: 'imageUrl',
            title: 'Image URL',
            type: 'string',
            description: 'The URL of the user\'s profile image.',
          }),
          
          
          defineField({
            name: 'hasImage',
            title: 'Has Image',
            type: 'boolean',
            description: 'Indicates whether the user has a profile image.',
          }),
          
          defineField({
            name: 'emailAddress',
            title: 'Email Address',
            type: 'string',
            description: 'The user\'s email address.',
          }),

          defineField({
            name: 'emailAddresses',
            title: 'Email Addresses',
            type: 'array',
            of: [{ 
              type: 'object', 
              fields: [
                { name: 'id', title: 'ID', type: 'string' },
                { name: 'emailAddress', title: 'Email Address', type: 'string' },
                {
                  name: 'verification',
                  title: 'Verification',
                  type: 'object',
                  fields: [
                    { name: 'status', title: 'Status', type: 'string' },
                    { name: 'strategy', title: 'Strategy', type: 'string' },
                    { name: 'externalVerificationRedirectURL', title: 'External Verification Redirect URL', type: 'string' },
                    { name: 'attempts', title: 'Attempts', type: 'number' },
                    { name: 'expireAt', title: 'Expire At', type: 'number' },
                    { name: 'nonce', title: 'Nonce', type: 'string' },
                  ],
                },
                { name: 'linkedTo', title: 'Linked To', type: 'array', of: [{ type: 'string' }] },
              ] 
            }],
            description: 'The email addresses associated with the user.',
          }),
            defineField({
            name: 'address',
            title: 'Address',
            type: 'reference',
            to: [{ type: 'address' }],
            description: 'The address associated with the user.',
        }),
          
          
          defineField({
            name: 'primaryEmailAddressId',
            title: 'Primary Email Address ID',
            type: 'string',
            description: 'The ID of the primary email address associated with the user.',
          }),
          
          defineField({
            name: 'phoneNumbers',
            title: 'Phone Numbers',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'id', title: 'ID', type: 'string' }] }],
            description: 'The phone numbers associated with the user.',
          }),
          
          defineField({
            name: 'primaryPhoneNumberId',
            title: 'Primary Phone Number ID',
            type: 'string',
            description: 'The ID of the primary phone number associated with the user.',
          }),
        
          defineField({
            name: 'userType',
            title: 'User Type',
            type: 'string',
            options: {
              list: [
                // Classifieds Core
                {
                  title: 'Buyer',
                  value: 'buyer'
                },
                {
                  title: 'Seller',
                  value: 'seller'
                },
                {
                  title: 'Professional Seller/Dealer',
                  value: 'professional_seller'
                },
                {
                  title: 'Store Owner',
                  value: 'store_owner'
                },
                {
                  title: 'Service Provider',
                  value: 'service_provider'
                },
                {
                  title: 'Job Seeker',
                  value: 'job_seeker'
                },
                {
                  title: 'Employer/Recruiter',
                  value: 'employer'
                },

                // Community / Engagement
                {
                  title: 'Casual Browser',
                  value: 'casual_browser'
                },
                {
                  title: 'Community Member',
                  value: 'community_member'
                },

                // Platform Admin
                {
                  title: 'Administrator/Moderator',
                  value: 'administrator'
                },

                // Monetization / Marketing
                {
                  title: 'Advertiser',
                  value: 'advertiser'
                },

                // Article & Content Section
                {
                  title: 'Reader',
                  value: 'reader'
                },
                {
                  title: 'Content Creator',
                  value: 'content_creator'
                },
                {
                  title: 'Editor/Publisher',
                  value: 'editor'
                },

                {
                  title: 'Influencer/Blogger',
                  value: 'influencer'
                },
                {
                  title: 'Media/PR Representative',
                  value: 'media_pr'
                },
              ],
            },
            description: 'The type of user on the platform, such as buyer, seller, advertiser, or contributor.',
          }),

          defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
              {
                type: 'block'
              }
            ],
            description: 'A short bio about the user.',
          }),

          defineField({
            name: 'banned',
            title: 'Banned',
            type: 'boolean',
            description: 'Indicates whether the user is banned from the platform.',
          }),

          defineField({
            name: 'lastSignInAt',
            title: 'Last Sign-In At',
            type: 'datetime',
            description: 'The timestamp of the user\'s last sign-in.',
          }),
          
          
          defineField({
            name: 'postedListings',
            title: 'Posted Listings',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'listing' }] }],
            description: 'Listings posted by the user if they are a seller.',
          }),

          defineField({
            name: 'transactions',
            title: 'Transactions',
            type: 'array',
            description: 'A list of orders associated with the user.',
            of: [{ type: 'reference', to: { type: 'transaction' } }],
          }),

          defineField({
            name: 'participatedAuctions',
            title: 'Participated Auctions',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'auction' }] }],
            description: 'Auctions the user has participated in, either as a buyer or seller.'
          }),
          
          
          defineField({
            name: 'bids',
            title: 'Bids',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'bid' }] }],
            description: 'Bids placed by the user in various auctions.'
          }),
          
          
          defineField({
            name: 'favourites',
            title: 'Favourites',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'listing' }] }],
            description: 'Listings that the user has marked as favourites.'
          }),
          
          
          defineField({
            name: 'transactionHistory',
            title: 'Transaction History',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'transaction' }] }], 
            description: 'A history of transactions made by the user on the platform.'
          }),
          
          defineField({
            name: 'bankAccounts',
            title: 'Bank Accounts',
            type: 'array',
            of: [{ type: 'bankDetails' }], // Use the 'bankDetails' object schema here
            description: 'A list of bank accounts associated with the user.',
          }),
            
          defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'review' }] }], 
            description: 'Reviews written by or about the user.'
          }),
          
          
          defineField({
            name: 'messages',
            title: 'Messages',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'message' }] }], // Assuming 'message' is a defined schema
            description: 'Messages sent and received by the user.'
          }),

          defineField({
            name: 'blocklist',
            title: 'Blocklist',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'Other users that this user has blocked.',
        }),
          
          
          defineField({
            name: 'isChatGroupAdmin',
            title: 'Is Chat Group Admin',
            type: 'boolean',
            description: 'Whether the user has administrative privileges.'
          }),
          
          
          
          defineField({
            name: 'passwordEnabled',
            title: 'Password Enabled',
            type: 'boolean',
            description: 'Indicates whether password-based authentication is enabled for the user.',
          }),
          
          
          defineField({
            name: 'totpEnabled',
            title: 'TOTP Enabled',
            type: 'boolean',
            description: 'Indicates whether Time-based One-Time Password (TOTP) authentication is enabled for the user.',
          }),

          defineField({
            name: 'twoFactorEnabled',
            title: 'Two-Factor Enabled',
            type: 'boolean',
            description: 'Indicates whether two-factor authentication (2FA) is enabled for the user.',
          }),
          
          
          defineField({
            name: 'backupCodeEnabled',
            title: 'Backup Code Enabled',
            type: 'boolean',
            description: 'Indicates whether backup codes for authentication are enabled for the user.',
          }),
          
       
          defineField({
            name: 'updatedAt',
            title: 'Updated At',
            type: 'datetime',
            description: 'The timestamp when the user account was last updated.',
          }),

          defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            description: 'The timestamp when the user account was created.',
          }),
                
          
          defineField({
            name: 'primaryWeb3WalletId',
            title: 'Primary Web3 Wallet ID',
            type: 'string',
            description: 'The ID of the primary Web3 wallet associated with the user.',
          }),
          
          
          defineField({
            name: 'externalId',
            title: 'External ID',
            type: 'string',
            description: 'The external identifier for the user, if applicable.',
          }),
          
          
          defineField({
            name: 'publicMetadata',
            title: 'Public Metadata',
            type: 'object',
            fields: [
              { name: 'firstName', title: 'First Name', type: 'string' },
              { name: 'lastName', title: 'Last Name', type: 'string' },
              { name: 'age', title: 'Age', type: 'number' },
              { name: 'gender', title: 'Gender', type: 'string' },
            ],
            description: 'Public metadata associated with the user.',
          }),
          
          
          defineField({
            name: 'privateMetadata',
            title: 'Private Metadata',
            type: 'object',
            fields: [
              { name: 'phoneNumber', title: 'Phone Number', type: 'string' },
              { name: 'address', title: 'Address', type: 'string' },
              { name: 'creditCardNumber', title: 'Credit Card Number', type: 'string' },
              { name: 'socialSecurityNumber', title: 'Social Security Number', type: 'string' },
            ],
            description: 'Private metadata associated with the user.',
          }),
          
          
          defineField({
            name: 'unsafeMetadata',
            title: 'Unsafe Metadata',
            type: 'object',
            fields: [
              { name: 'password', title: 'Password', type: 'string' },
              { name: 'encryptedData', title: 'Encrypted Data', type: 'string' },
              { name: 'privateKey', title: 'Private Key', type: 'string' },
              { name: 'securityQuestion', title: 'Security Question', type: 'string' },
            ],
            description: 'Unsafe metadata associated with the user.',
          }),
   
          
          defineField({
            name: 'web3Wallets',
            title: 'Web3 Wallets',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'id', title: 'ID', type: 'string' }] }],
            description: 'The Web3 wallets associated with the user.',
          }),
          
          
          defineField({
            name: 'externalAccounts',
            title: 'External Accounts',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'id', title: 'ID', type: 'string' }] }],
            description: 'External accounts linked to the user.',
          }),
          
          
          defineField({
            name: 'createOrganizationEnabled',
            title: 'Create Organization Enabled',
            type: 'boolean',
            description: 'Indicates whether the user is allowed to create organizations.',
          }),

          
          defineField({
            name: 'notificationSettings',
            title: 'Notification Settings',
            type: 'object',
            fields: [
                {
                    name: 'emailNotifications',
                    title: 'Email Notifications',
                    type: 'boolean',
                    description: 'Whether the user receives notifications via email.'
                },
                {
                    name: 'pushNotifications',
                    title: 'Push Notifications',
                    type: 'boolean',
                    description: 'Whether the user receives push notifications on their device.'
                },
                // ... other notification settings
            ],
            description: 'The user\'s preferences for receiving notifications.'
          }),
          
          defineField({
            name: 'privacySettings',
            title: 'Privacy Settings',
            type: 'object',
            fields: [
                {
                    name: 'showEmail',
                    title: 'Show Email',
                    type: 'boolean',
                    description: 'Whether to show the user\'s email address on their public profile.'
                },
                {
                    name: 'showPhoneNumber',
                    title: 'Show Phone Number',
                    type: 'boolean',
                    description: 'Whether to show the user\'s phone number on their public profile.'
                },
                {
                    name: 'allowMessaging',
                    title: 'Allow Messaging',
                    type: 'boolean',
                    description: 'Whether other users can send messages to this user.'
                },
                {
                    name: 'profileVisibility',
                    title: 'Profile Visibility',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Public', value: 'public' },
                            { title: 'Private', value: 'private' },
                        ],
                    },
                    description: 'Controls who can see the user\'s profile (Public or Private).'
                },
                {
                    name: 'currentLocation',
                    title: 'Current Location',
                    type: 'reference',
                    to: [{ type: 'location' }],
                    description: 'The current location of the user.'
                },
                {
                    name: 'locationPreferences',
                    title: 'Location Preferences',
                    type: 'reference',
                    to: [{ type: 'userLocationPreference' }],
                    description: 'The user’s preferences for locations in searches and alerts.'
                },
                {
                    name: 'locationAlerts',
                    title: 'Location Alerts',
                    type: 'reference',
                    to: [{ type: 'locationAlertSettings' }],
                    description: 'The user’s settings for receiving alerts based on locations.'
                },
                {
                    name: 'languagePreference',
                    title: 'Language Preference',
                    type: 'string',
                    description: 'Preferred language for the user interface and communications.'
                },
                {
                    name: 'paymentMethods',
                    title: 'Payment Methods',
                    type: 'array',
                    of: [{ type: 'paymentMethod' }], // Assuming 'paymentMethod' is a defined schema
                    description: 'List of payment methods saved by the user for transactions.'
                },
                {
                    name: 'watchList',
                    title: 'Watch List',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'listing' }] }],
                    description: 'A list of listings the user is monitoring or interested in.'
                },
                {
                    name: 'userRating',
                    title: 'User Rating',
                    type: 'number',
                    description: 'Average rating of the user based on reviews and transactions.'
                },
                {
                    name: 'recentlyViewedListings',
                    title: 'Recently Viewed Listings',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'listing' }] }],
                    description: 'Listings that the user has recently viewed on the platform.'
                },
                {
                    name: 'accountCreationDate',
                    title: 'Account Creation Date',
                    type: 'datetime',
                    description: 'The date and time when the user\'s account was created.'
                },
                {
                    name: 'lastLogin',
                    title: 'Last Login',
                    type: 'datetime',
                    description: 'The most recent date and time when the user logged in.'
                },
                {
                    name: 'newsletterSubscription',
                    title: 'Newsletter Subscription',
                    type: 'boolean',
                    description: 'Indicates whether the user is subscribed to newsletters and updates.'
                },
                {
                    name: 'marketingPreferences',
                    title: 'Marketing Preferences',
                    type: 'object',
                    fields: [
                        {
                            name: 'receivePromotionalOffers',
                            title: 'Receive Promotional Offers',
                            type: 'boolean',
                            description: 'Whether the user opts in to receive promotional offers.'
                        },
                        {
                            name: 'preferredCategories',
                            title: 'Preferred Categories for Promotions',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Categories of products the user is interested in for promotional offers.'
                        }
                    ],
                    description: 'User preferences regarding receiving marketing and promotional material.'
                },
                {
                    name: 'securitySettings',
                    title: 'Security Settings',
                    type: 'object',
                    fields: [
                        {
                            name: 'twoFactorAuthentication',
                            title: 'Two-Factor Authentication',
                            type: 'boolean',
                            description: 'Whether the user has enabled two-factor authentication.'
                        },
                       
                    ],
                    description: 'Settings related to the security of the user\'s account.'
                },
                {
                    name: 'customPreferences',
                    title: 'Custom Preferences',
                    type: 'object',
                    fields: [
                        {
                            name: 'displayMode',
                            title: 'Display Mode',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Light', value: 'light' },
                                    { title: 'Dark', value: 'dark' },
                                ],
                            },
                            description: 'User preference for the visual display mode of the platform.'
                        },
                        {
                            name: 'notificationSound',
                            title: 'Notification Sound',
                            type: 'boolean',
                            description: 'Whether to play a sound for notifications.'
                        },
                        
                    ],
                    description: 'The user\'s custom preferences on the platform.'
                },
          ]}),
          defineField({
            name: 'contactPreferences',
            title: 'Contact Preferences',
            type: 'object',
            fields: [
                {
                    name: 'preferredContactMethod',
                    title: 'Preferred Contact Method',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Email', value: 'email' },
                            { title: 'Phone', value: 'phone' },
                            { title: 'In-App Messaging', value: 'in-app' },
                        ],
                    },
                    description: 'The user\'s preferred method for contact.'
                },
            ],
            description: 'Preferences regarding how the user wishes to be contacted.'
        }),
        defineField({
            name: 'membershipLevel',
            title: 'Membership Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Standard', value: 'standard' },
                    { title: 'Premium', value: 'premium' },
                ],
            },
            description: 'The membership level of the user, which may affect access to features.'
        }),
        defineField({
            name: 'feedback',
            title: 'Feedback',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Feedback provided by the user about their experience on the platform.'
        }),
        defineField({
            name: 'referralCode',
            title: 'Referral Code',
            type: 'string',
            description: 'A code used by the user to refer others to the platform.'
        }),
        defineField({
            name: 'subscribedCategories',
            title: 'Subscribed Categories',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Categories of listings the user is interested in and subscribed to.'
        }),
        defineField({
            name: 'registrationSource',
            title: 'Registration Source',
            type: 'string',
            description: 'The platform or medium through which the user registered.'
        }),
        defineField({
            name: 'listingPostPreferences',
            title: 'Listing Post Preferences',
            type: 'object',
            fields: [
                {
                    name: 'defaultListingDuration',
                    title: 'Default Listing Duration',
                    type: 'number',
                    description: 'Default duration in days for the user\'s listings to remain active.'
                },
                {
                    name: 'autoRenewListings',
                    title: 'Auto Renew Listings',
                    type: 'boolean',
                    description: 'Automatically renew listings after they expire.'
                },
                {
                    name: 'showExpiredListings',
                    title: 'Show Expired Listings',
                    type: 'boolean',
                    description: 'Option to show the user\'s expired listings to others.'
                },
                {
                    name: 'listingVisibility',
                    title: 'Listing Visibility',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Public', value: 'public' },
                            { title: 'Private', value: 'private' },
                        ],
                    },
                    description: 'Control who can see the user’s listings (Public or Private).'
                },
            ],
            description: 'Preferences related to posting listings on the platform.'
        }),
        
        defineField({
            name: 'flags',
            title: 'Flags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'messageFlag' }] }],
            description: 'Flags raised by this user for moderation.',
        }),
        defineField({
            name: 'searchSettings',
            title: 'Search Settings',
            type: 'object',
            fields: [
                {
                    name: 'savedFilters',
                    title: 'Saved Filters',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'User-saved search filters for quick access.'
                },
                {
                    name: 'searchHistory',
                    title: 'Search History',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'Record of the user\'s past search terms.'
                },
                {
                    name: 'searchAlerts',
                    title: 'Search Alerts',
                    type: 'boolean',
                    description: 'Receive alerts or notifications based on saved search criteria.'
                },
                {
                    name: 'excludeRegions',
                    title: 'Exclude Regions',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'Regions or locations to exclude from search results.'
                },
             
            ],
            description: 'User-defined settings and preferences for searching listings.'
        }),
        defineField({
            name: 'privacyControls',
            title: 'Privacy Controls',
            type: 'object',
            fields: [
                {
                    name: 'hideProfileFromSearch',
                    title: 'Hide Profile From Search',
                    type: 'boolean',
                    description: 'Whether the user\'s profile should be hidden from search results.'
                },
              
            ],
            description: 'Settings that allow the user to control their privacy on the platform.'
        }),
        defineField({
            name: 'accountSettings',
            title: 'Account Settings',
            type: 'object',
            fields: [
                {
                    name: 'emailVerified',
                    title: 'Email Verified',
                    type: 'boolean',
                    description: 'Indicates whether the user\'s email address has been verified.'
                },
                {
                    name: 'accountDeletionRequested',
                    title: 'Account Deletion Requested',
                    type: 'boolean',
                    description: 'Whether the user has requested account deletion.'
                },
                {
                    name: 'passwordReset',
                    title: 'Password Reset',
                    type: 'boolean',
                    description: 'Indicates if the user has requested a password reset recently.'
                },
                {
                    name: 'loginAlerts',
                    title: 'Login Alerts',
                    type: 'boolean',
                    description: 'Enable alerts for unusual login activities or new logins from unknown devices.'
                },
                {
                    name: 'accountPrivacy',
                    title: 'Account Privacy',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Public', value: 'public' },
                            { title: 'Private', value: 'private' },
                        ],
                    },
                    description: 'Controls the privacy level of the user’s account (Public or Private).'
                },
                {
                    name: 'dataDownloadRequest',
                    title: 'Data Download Request',
                    type: 'boolean',
                    description: 'Whether the user has requested a download of their data.'
                },
                {
                    name: 'marketingConsent',
                    title: 'Marketing Consent',
                    type: 'boolean',
                    description: 'Indicates if the user has consented to receive marketing communications.'
                },
                
            ],
            description: 'Various settings related to the user\'s account management.'
        }),
        defineField({
            name: 'notificationFilters',
            title: 'Notification Filters',
            type: 'object',
            fields: [
                {
                    name: 'receiveAuctionUpdates',
                    title: 'Receive Auction Updates',
                    type: 'boolean',
                    description: 'Opt-in to receive updates related to auctions.'
                },
              
                {
                    name: 'messageNotifications',
                    title: 'Message Notifications',
                    type: 'boolean',
                    description: 'Receive notifications for new messages.'
                },
                {
                    name: 'listingStatusUpdates',
                    title: 'Listing Status Updates',
                    type: 'boolean',
                    description: 'Get notified when there is a change in the status of posted listings (like sold, expired).'
                },
                {
                    name: 'bidActivityAlerts',
                    title: 'Bid Activity Alerts',
                    type: 'boolean',
                    description: 'Alerts for any activity related to bids the user has placed or received.'
                },
                {
                    name: 'promotionNotifications',
                    title: 'Promotion Notifications',
                    type: 'boolean',
                    description: 'Notifications about promotions, discounts, or special offers.'
                },
                {
                    name: 'recommendationAlerts',
                    title: 'Recommendation Alerts',
                    type: 'boolean',
                    description: 'Receive alerts for recommended listings based on the user\'s activity or preferences.'
                },
                {
                    name: 'newsletterAlerts',
                    title: 'Newsletter Alerts',
                    type: 'boolean',
                    description: 'Opt-in to receive newsletters or updates from the platform.'
                },
            ],
            description: 'Preferences for filtering the types of notifications the user receives.'
        }),
        
    ],

    
    preview: {
        select: {
          firstName: 'firstName',
          lastName: 'lastName'
        },
        prepare: ({ firstName, lastName }) => ({
          title: `${firstName} ${lastName}`
        })
      }    
  });



  