# AmoCRM Integration Setup Guide

## Environment Variables Required

Add the following environment variables to your `.env.local` file:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# AmoCRM Configuration
AMO_DOMAIN=your-domain.amocrm.ru
AMO_CLIENT_ID=your-amocrm-client-id
AMO_CLIENT_SECRET=your-amocrm-client-secret
AMO_ACCESS_TOKEN=your-amocrm-access-token
AMO_REFRESH_TOKEN=your-amocrm-refresh-token

# Email Service Configuration (using Resend)
RESEND_API_KEY=your-resend-api-key
```

## AmoCRM OAuth App Setup

1. **Create OAuth App in AmoCRM:**
   - Go to your AmoCRM account settings
   - Navigate to "Integrations" > "OAuth"
   - Create a new OAuth application
   - Set redirect URI to: `{your-domain}/api/amo/oauth-callback`
   - Copy the Client ID and Client Secret

2. **Get Access Token:**
   - Use the OAuth flow to get initial access and refresh tokens
   - Store these in your environment variables

## AmoCRM Custom Fields Setup

Create the following custom fields in your AmoCRM account for Leads:

### Required Fields:
- **Account Sum** (numeric field)
- **Email** (email field)
- **Account Status** (select field with options: Active, Inactive, Suspended, Cancelled)

### Optional Fields:
- **Bouquet Category** (select field with options: Romantic, Seasonal, Luxe, Classic, Modern)
- **Delivery Address** (text field)
- **Delivery Date** (date field)
- **Delivery Interval** (select field with options: Weekly, Bi-weekly, Monthly, One-time)
- **Bouquet Wishes** (textarea field)
- **Referral Link** (text field)

### Field Configuration Steps:
1. Go to AmoCRM Settings > Custom Fields
2. Create each field for the "Leads" entity
3. Copy the field IDs from AmoCRM
4. Update the field IDs in `/lib/amo-field-config.ts`

## Testing the Integration

1. **Test OAuth Flow:**
   ```bash
   curl -X GET "http://localhost:3000/api/amo/oauth-callback?code=test_code&state=test_state"
   ```

2. **Test Lead Creation:**
   ```bash
   curl -X POST "http://localhost:3000/api/amo/create-lead" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "name": "Test User",
       "accountSum": 5000,
       "bouquetCategory": "Romantic"
     }'
   ```

3. **Test User Registration with AmoCRM:**
   - Register a new user through the signup form
   - Check that a lead is created in AmoCRM
   - Verify the lead ID is stored in the user record

## Webhook Configuration (Optional)

To enable real-time sync from AmoCRM to your application:

1. **Set up webhook in AmoCRM:**
   - Go to AmoCRM Settings > Webhooks
   - Create webhook with URL: `{your-domain}/api/webhooks/amo`
   - Select events: Lead updates, Contact updates

2. **Verify webhook endpoint:**
   ```bash
   curl -X POST "http://localhost:3000/api/webhooks/amo" \
     -H "Content-Type: application/json" \
     -d '{"leads": {"update": [{"id": 123, "name": "Updated Lead"}]}}'
   ```

## Troubleshooting

### Common Issues:

1. **"Missing required AmoCRM configuration"**
   - Check that all environment variables are set
   - Verify AMO_DOMAIN format (should be `domain.amocrm.ru`)

2. **"Failed to create lead in AmoCRM"**
   - Verify access token is valid and not expired
   - Check that custom fields exist in AmoCRM
   - Update field IDs in the configuration

3. **"Field ID not configured"**
   - Create missing custom fields in AmoCRM
   - Update field IDs in `/lib/amo-field-config.ts`

4. **OAuth callback errors**
   - Verify redirect URI matches exactly
   - Check that OAuth app is properly configured

### Debug Mode:
Enable debug logging by setting `NODE_ENV=development` to see detailed error messages.

## Security Notes

- Never commit `.env.local` file to version control
- Rotate access tokens regularly
- Use HTTPS in production
- Validate all webhook signatures (implement if needed)
- Store tokens securely in production (consider database encryption)
