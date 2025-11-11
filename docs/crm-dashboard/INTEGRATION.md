# 🌸 Flower Account Service - AmoCRM Integration Plan

## 📋 Project Analysis Summary

### Current State
- **Framework**: Next.js 15 with App Router
- **Database**: Sanity CMS (existing userAccount schema)
- **Authentication**: Not implemented (needs to be built)
- **User Management**: Basic userAccount schema exists for donations/events
- **Payment**: Basic payment gateway integration exists
- **AmoCRM**: No integration currently exists

### Requirements Gap Analysis
- ✅ Next.js 15 App Router structure
- ✅ Sanity CMS with userAccount schema
- ✅ Basic payment processing
- ❌ Authentication system (login/register/password recovery)
- ❌ AmoCRM integration
- ❌ User dashboard/account management
- ❌ Email service integration
- ❌ Session management

---

## 🎯 Integration Implementation Plan

### Phase 1: Foundation & Authentication System
**Estimated Time: 3-4 days**

#### 1.1 Environment Setup & Dependencies
- [ ] **Install required packages**
  - [ ] `bcryptjs` for password hashing
  - [ ] `jsonwebtoken` for JWT tokens
  - [ ] `uuid` for referral link generation
  - [ ] `nodemailer` or `resend` for email service
  - [ ] `zod` for request validation (already installed)
  - [ ] `jose` for secure JWT handling

- [ ] **Environment variables setup**
  - [ ] Add JWT_SECRET to .env.local
  - [ ] Add email service configuration
  - [ ] Add AmoCRM OAuth credentials (AMO_CLIENT_ID, AMO_CLIENT_SECRET, AMO_DOMAIN)
  - [ ] Add site URL configuration

#### 1.2 Enhanced User Schema (Sanity)
- [ ] **Extend userAccount schema**
  - [ ] Add email field (unique, required)
  - [ ] Add password field (hashed)
  - [ ] Add referralId field (unique UUID)
  - [ ] Add referralLink field (generated URL)
  - [ ] Add amoLeadId field (AmoCRM lead ID)
  - [ ] Add amoContactId field (AmoCRM contact ID)
  - [ ] Add bouquet preferences fields:
    - [ ] bouquetCategory (string)
    - [ ] deliveryAddress (string)
    - [ ] deliveryDate (datetime)
    - [ ] deliveryInterval (string)
    - [ ] bouquetWishes (text)
  - [ ] Add accountSum field (number, default 5000)
  - [ ] Add isActive field (boolean, default true)
  - [ ] Add lastLoginAt field (datetime)
  - [ ] Add resetToken and resetTokenExpires fields

- [ ] **Create reset token schema**
  - [ ] New document type: `passwordResetToken`
  - [ ] Fields: userId, token, expiresAt

#### 1.3 Authentication API Routes
- [ ] **Create `/app/api/auth/register/route.ts`**
  - [ ] Validate request body with Zod schema
  - [ ] Check if email already exists
  - [ ] Hash password with bcrypt
  - [ ] Generate referral ID and link
  - [ ] Create user in Sanity
  - [ ] Create AmoCRM lead (via internal API call)
  - [ ] Generate JWT token
  - [ ] Return success response with token

- [ ] **Create `/app/api/auth/login/route.ts`**
  - [ ] Validate email/password
  - [ ] Find user by email in Sanity
  - [ ] Verify password with bcrypt
  - [ ] Update lastLoginAt
  - [ ] Generate JWT token
  - [ ] Return success response with token

- [ ] **Create `/app/api/auth/forgot/route.ts`**
  - [ ] Validate email
  - [ ] Find user by email
  - [ ] Generate reset token
  - [ ] Save token to Sanity with expiration
  - [ ] Send reset email
  - [ ] Return success response

- [ ] **Create `/app/api/auth/reset/route.ts`**
  - [ ] Validate token and new password
  - [ ] Find valid reset token
  - [ ] Hash new password
  - [ ] Update user password
  - [ ] Delete reset token
  - [ ] Return success response

#### 1.4 Authentication Pages
- [ ] **Create `/app/(auth)/signup/page.tsx`**
  - [ ] Registration form with validation
  - [ ] Fields: email, password, confirmPassword, bouquet preferences
  - [ ] Client component with react-hook-form
  - [ ] Handle form submission and redirect

- [ ] **Create `/app/(auth)/login/page.tsx`**
  - [ ] Login form
  - [ ] Fields: email, password
  - [ ] Client component with form validation
  - [ ] Handle login and redirect to dashboard

- [ ] **Create `/app/(auth)/forgot-password/page.tsx`**
  - [ ] Email input form
  - [ ] Client component
  - [ ] Handle email submission

- [ ] **Create `/app/(auth)/reset-password/page.tsx`**
  - [ ] New password form
  - [ ] Validate token from URL params
  - [ ] Handle password reset

- [ ] **Create `/app/(auth)/layout.tsx`**
  - [ ] Auth layout without main navigation
  - [ ] Simple header/footer for auth pages

#### 1.5 Session Management
- [ ] **Create `/lib/auth.ts`**
  - [ ] JWT token generation/verification utilities
  - [ ] Session validation functions
  - [ ] User context helpers

- [ ] **Create middleware for protected routes**
  - [ ] `/middleware.ts` for route protection
  - [ ] JWT verification for protected pages
  - [ ] Redirect logic for auth states

---

### Phase 2: AmoCRM Integration
**Estimated Time: 4-5 days**

#### 2.1 AmoCRM OAuth Setup
- [ ] **Create `/app/api/amo/oauth-callback/route.ts`**
  - [ ] Handle OAuth callback from AmoCRM
  - [ ] Exchange authorization code for tokens
  - [ ] Store tokens securely (encrypted in environment or database)
  - [ ] Return success/error response

- [ ] **Create `/app/api/amo/refresh-token/route.ts`**
  - [ ] Refresh expired access tokens
  - [ ] Handle token refresh logic
  - [ ] Update stored tokens
  - [ ] Return new token status

#### 2.2 AmoCRM API Utilities
- [ ] **Create `/lib/amo-client.ts`**
  - [ ] AmoCRM API client class
  - [ ] Token management
  - [ ] Request/response handling
  - [ ] Error handling and retry logic
  - [ ] Rate limiting considerations

- [ ] **Create `/lib/amo-mappers.ts`**
  - [ ] Map user data to AmoCRM lead format
  - [ ] Map AmoCRM responses to internal format
  - [ ] Handle field mapping and transformations

#### 2.3 AmoCRM API Routes
- [ ] **Create `/app/api/amo/create-lead/route.ts`**
  - [ ] Accept user registration data
  - [ ] Validate input with Zod schema
  - [ ] Create lead in AmoCRM
  - [ ] Return lead ID for storage

- [ ] **Create `/app/api/amo/get-lead/route.ts`**
  - [ ] Fetch lead data by email or ID
  - [ ] Transform AmoCRM response
  - [ ] Return formatted lead data

- [ ] **Create `/app/api/amo/update-lead/route.ts`**
  - [ ] Update existing lead with new data
  - [ ] Handle partial updates
  - [ ] Return updated lead info

- [ ] **Create `/app/api/amo/create-contact/route.ts`**
  - [ ] Create contact in AmoCRM
  - [ ] Link contact to lead
  - [ ] Return contact ID

#### 2.4 AmoCRM Field Configuration
- [ ] **Configure custom fields in AmoCRM**
  - [ ] Account Sum (numeric)
  - [ ] Bouquet Category (select)
  - [ ] Delivery Address (text)
  - [ ] Delivery Date (date)
  - [ ] Delivery Interval (select)
  - [ ] Bouquet Wishes (textarea)
  - [ ] Email (email)
  - [ ] Referral Link (text)
  - [ ] Account Status (select)

- [ ] **Create field mapping configuration**
  - [ ] Map internal field names to AmoCRM field IDs
  - [ ] Handle field type conversions
  - [ ] Create fallback values for missing fields

---

### Phase 3: User Dashboard & Account Management
**Estimated Time: 3-4 days**

#### 3.1 Protected Route Setup
- [ ] **Create `/app/(dashboard)/layout.tsx`**
  - [ ] Protected layout with authentication check
  - [ ] Dashboard navigation
  - [ ] User context provider

- [ ] **Create `/app/(dashboard)/account/page.tsx`**
  - [ ] User dashboard main page
  - [ ] Display account information
  - [ ] Show AmoCRM lead status
  - [ ] Display referral link and statistics

#### 3.2 Account Management Components
- [ ] **Create `/components/dashboard/AccountOverview.tsx`**
  - [ ] Display account sum
  - [ ] Show upcoming deliveries
  - [ ] Display referral statistics

- [ ] **Create `/components/dashboard/BouquetPreferences.tsx`**
  - [ ] Editable bouquet preferences form
  - [ ] Update delivery settings
  - [ ] Sync changes to AmoCRM

- [ ] **Create `/components/dashboard/ReferralLink.tsx`**
  - [ ] Display referral link
  - [ ] Copy to clipboard functionality
  - [ ] Referral statistics

- [ ] **Create `/components/dashboard/AccountSettings.tsx`**
  - [ ] Update personal information
  - [ ] Change password
  - [ ] Account preferences

#### 3.3 Dashboard API Routes
- [ ] **Create `/app/api/dashboard/account/route.ts`**
  - [ ] GET: Fetch user account data
  - [ ] PUT: Update account information
  - [ ] Include AmoCRM data sync

- [ ] **Create `/app/api/dashboard/preferences/route.ts`**
  - [ ] GET: Fetch bouquet preferences
  - [ ] PUT: Update preferences
  - [ ] Sync to AmoCRM lead

---

### Phase 4: Email Service Integration
**Estimated Time: 2-3 days**

#### 4.1 Email Service Setup
- [ ] **Choose email provider** (Resend is already installed)
  - [ ] Configure Resend API key
  - [ ] Set up domain verification
  - [ ] Create email templates

- [ ] **Create `/lib/email.ts`**
  - [ ] Email service client
  - [ ] Template rendering
  - [ ] Send email utilities

#### 4.2 Email Templates
- [ ] **Create welcome email template**
  - [ ] User registration confirmation
  - [ ] Account details and referral link
  - [ ] Next steps information

- [ ] **Create password reset email template**
  - [ ] Reset link with token
  - [ ] Security instructions
  - [ ] Expiration notice

- [ ] **Create account update notifications**
  - [ ] Bouquet preference changes
  - [ ] Delivery schedule updates
  - [ ] Account balance changes

#### 4.3 Email API Routes
- [ ] **Create `/app/api/email/send/route.ts`**
  - [ ] Generic email sending endpoint
  - [ ] Template selection
  - [ ] Recipient validation

- [ ] **Create `/app/api/email/templates/route.ts`**
  - [ ] Manage email templates
  - [ ] Template preview functionality

---

### Phase 5: Testing & Validation
**Estimated Time: 2-3 days**

#### 5.1 Unit Tests
- [ ] **Create test files for API routes**
  - [ ] Authentication routes tests
  - [ ] AmoCRM integration tests
  - [ ] Email service tests

- [ ] **Create test utilities**
  - [ ] Mock AmoCRM responses
  - [ ] Test user data fixtures
  - [ ] Email service mocks

#### 5.2 Integration Tests
- [ ] **Test complete user flows**
  - [ ] Registration → AmoCRM lead creation
  - [ ] Login → dashboard access
  - [ ] Password reset → email delivery
  - [ ] Preference updates → AmoCRM sync

#### 5.3 Error Handling & Validation
- [ ] **Implement comprehensive error handling**
  - [ ] AmoCRM API failures
  - [ ] Email service failures
  - [ ] Database connection issues
  - [ ] Invalid token scenarios

- [ ] **Add request validation**
  - [ ] Zod schemas for all API endpoints
  - [ ] Input sanitization
  - [ ] Rate limiting

---

### Phase 6: Security & Production Readiness
**Estimated Time: 2-3 days**

#### 6.1 Security Enhancements
- [ ] **Implement security headers**
  - [ ] CSRF protection
  - [ ] XSS prevention
  - [ ] Content Security Policy

- [ ] **Add rate limiting**
  - [ ] API endpoint rate limits
  - [ ] Login attempt limiting
  - [ ] Email sending limits

#### 6.2 Monitoring & Logging
- [ ] **Add logging system**
  - [ ] API request/response logging
  - [ ] Error tracking
  - [ ] AmoCRM integration logs

- [ ] **Set up monitoring**
  - [ ] Health check endpoints
  - [ ] Performance monitoring
  - [ ] Error alerting

#### 6.3 Production Deployment
- [ ] **Environment configuration**
  - [ ] Production environment variables
  - [ ] Database migrations

- [ ] **Deployment checklist**
  - [ ] AmoCRM OAuth app configuration
  - [ ] Email domain verification
  - [ ] Security audit
  - [ ] Performance optimization

---

## 🔧 Technical Implementation Details

### Database Schema Updates
```typescript
// Extended userAccount schema fields
interface UserAccountExtended {
  // Existing fields
  userId: string;
  name: string;
  phone: string;
  region: string;
  totalAmount: number;
  donations: Donation[];
  
  // New authentication fields
  email: string;           // Unique email for login
  password: string;        // Hashed password
  referralId: string;      // Unique UUID for referral link
  referralLink: string;    // Generated referral URL
  isActive: boolean;       // Account status
  lastLoginAt?: string;    // Last login timestamp
  
  // AmoCRM integration fields
  amoLeadId?: string;      // AmoCRM lead ID
  amoContactId?: string;   // AmoCRM contact ID
  
  // Bouquet subscription fields
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryInterval?: string;
  bouquetWishes?: string;
  accountSum?: number;     // Subscription amount (default 5000)
}
```

### AmoCRM Field Mapping
```typescript
interface AmoCRMLeadMapping {
  name: string;                    // "Flower Account - {email}"
  custom_fields_values: [
    { field_name: "Account Sum", values: [{ value: string }] },
    { field_name: "Bouquet Category", values: [{ value: string }] },
    { field_name: "Delivery Address", values: [{ value: string }] },
    { field_name: "Delivery Date", values: [{ value: string }] },
    { field_name: "Interval", values: [{ value: string }] },
    { field_name: "Preferences", values: [{ value: string }] },
    { field_name: "Email", values: [{ value: string }] },
    { field_name: "Referral Link", values: [{ value: string }] }
  ];
}
```

### API Route Structure
```
app/api/
├── auth/
│   ├── register/route.ts
│   ├── login/route.ts
│   ├── forgot/route.ts
│   └── reset/route.ts
├── amo/
│   ├── oauth-callback/route.ts
│   ├── refresh-token/route.ts
│   ├── create-lead/route.ts
│   ├── get-lead/route.ts
│   ├── update-lead/route.ts
│   └── create-contact/route.ts
├── dashboard/
│   ├── account/route.ts
│   └── preferences/route.ts
├── email/
│   ├── send/route.ts
│   └── templates/route.ts
└── webhooks/
    └── amo/route.ts
```

---

## 📊 Success Metrics

### Functional Requirements
- [ ] User can register with email/password
- [ ] User can login and access dashboard
- [ ] User can reset password via email
- [ ] AmoCRM lead is created on registration
- [ ] User preferences sync to AmoCRM
- [ ] Referral links are generated and functional
- [ ] Email notifications are sent correctly

### Performance Requirements
- [ ] API response times < 2 seconds
- [ ] AmoCRM integration < 5 seconds
- [ ] Email delivery < 30 seconds
- [ ] Dashboard load time < 3 seconds

### Security Requirements
- [ ] Passwords are properly hashed
- [ ] JWT tokens are secure and validated
- [ ] AmoCRM credentials are server-side only
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] AmoCRM OAuth app created and configured
- [ ] Email service domain verified
- [ ] SSL certificates installed

### Post-deployment
- [ ] AmoCRM integration tested
- [ ] Email delivery tested
- [ ] User registration flow tested
- [ ] Dashboard functionality verified
- [ ] Monitoring and logging active

---

## 📝 Notes & Considerations

### Architecture Decisions
1. **Authentication**: JWT-based authentication with secure token handling
2. **Database**: Continue using Sanity CMS with extended schema
3. **AmoCRM**: Server-side only integration with OAuth 2.0
4. **Email**: Resend service for reliable email delivery
5. **Security**: Comprehensive validation and rate limiting

### Potential Challenges
1. **AmoCRM Field Mapping**: Custom field IDs need to be configured in AmoCRM
2. **OAuth Flow**: Complex OAuth implementation for AmoCRM
3. **Email Deliverability**: Ensuring emails reach inbox (not spam)
4. **Rate Limiting**: AmoCRM API rate limits and handling
5. **Data Sync**: Keeping Sanity and AmoCRM data synchronized

### Future Enhancements
1. **Webhooks**: AmoCRM webhooks for real-time sync
2. **Analytics**: User behavior tracking and reporting
3. **Mobile App**: React Native app for mobile access
4. **Advanced CRM**: Lead scoring and automation
5. **Multi-language**: Internationalization support

---

*This integration plan provides a comprehensive roadmap for implementing the Flower Account Service with AmoCRM integration. Each phase builds upon the previous one, ensuring a solid foundation while maintaining security and scalability.*
