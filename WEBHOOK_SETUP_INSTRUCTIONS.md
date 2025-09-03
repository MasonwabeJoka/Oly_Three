# Clerk Webhook Setup Instructions

## ✅ Good News
Your webhook code is **working perfectly**! The direct test shows that all field mappings and data transformations are correct.

## 🔧 Issue
The Next.js development server is not recognizing the API route. Here are solutions to try:

### Option 1: Restart Development Server (Recommended)
```bash
# Stop the current server (Ctrl+C) and restart:
npm run dev
# or if you want to avoid turbo mode:
npx next dev
```

### Option 2: Clear Next.js Cache
```bash
# Delete the .next directory and restart
Remove-Item -Recurse -Force .next
npm run dev
```

### Option 3: Check File Structure
Ensure your file is exactly at:
```
app/
  api/
    webhooks/
      clerk/
        route.ts  ← This file should exist with our updated code
```

### Option 4: Test in Production Mode
```bash
npm run build
npm start
```

## 🔧 Environment Variables Setup
Make sure you have these environment variables set up in `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_SECRET_TOKEN=your_secret_token_here

# Clerk Configuration (if not already set)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 🔗 Clerk Dashboard Setup
1. Go to your Clerk Dashboard
2. Navigate to "Webhooks" section
3. Add a new webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
4. Select the "user.created" event
5. Set the signing secret if required

## 📝 Testing After Fix
Once the server recognizes the route, test with:

```powershell
# Test GET endpoint
Invoke-WebRequest -Uri "http://localhost:3000/api/webhooks/clerk" -Method Get

# Test POST endpoint with webhook data
$testPayload = @{
  data = @{
    # ... (test payload from our script)
  }
  type = "user.created"
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:3000/api/webhooks/clerk" -Method Post -Body $testPayload -ContentType "application/json"
```

## 📋 What the Webhook Does Now
- ✅ Correctly maps all Clerk user fields to Sanity schema
- ✅ Handles complex data structures (emails, phones, metadata)
- ✅ Includes comprehensive error handling and logging
- ✅ Returns proper success/error responses
- ✅ Creates users with the correct document ID format (`clerk-${userId}`)

## 🎯 Expected Behavior
When a user signs up via Clerk, the webhook will:
1. Receive the `user.created` event
2. Extract and transform user data
3. Create a corresponding user document in Sanity
4. Return a success response to Clerk

The webhook is ready to go once the server route issue is resolved!
