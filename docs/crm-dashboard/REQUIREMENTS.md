# 🌸 Flower Account Service — Technical Documentation

## Overview

The **Flower Account Service** allows users to manage their flower subscription or bouquet account, integrating seamlessly with **AmoCRM** for lead tracking, contact management, and data synchronization.

---

## 1. 🧑‍💻 Authorization Scenarios

### 1.1 Registration (Create Account)

**User Story:**
*As a user, I want to create an account using my email and password to manage my flower account and track my balance.*

**Flow:**

1. User navigates to `/signup`.
2. Fills in:

   * Email
   * Password
   * Bouquet preferences (category, delivery date, interval, address, etc.)
3. On submission:

   * Next.js API route (`POST /api/auth/register`) creates a new user in the local database.
   * A corresponding **Lead** is created in AmoCRM with user’s registration details (see §2.1).
   * A referral link is generated:
     `https://sitename.ru/${UUID}`
   * User is automatically logged in or redirected to the login page.

---

### 1.2 Login (Sign In)

**User Story:**
*As a user, I want to log in using my email and password to access my account.*

**Flow:**

1. User visits `/login`.
2. Enters email and password.
3. Next.js API route (`POST /api/auth/login`) verifies credentials.
4. On success:

   * Session (JWT or NextAuth session) is created.
   * User is redirected to their dashboard `/account`.

---

### 1.3 Password Recovery

**User Story:**
*As a user, I want to reset my password by entering my email and receiving a recovery link.*

**Flow:**

1. User visits `/forgot-password`.
2. Enters their email.
3. API route (`POST /api/auth/forgot`) generates a unique reset token.
4. Sends a recovery email with a link:

   ```
   https://sitename.ru/reset-password?token=<UUID>
   ```
5. On link open, user sets a new password via `/reset-password`.

---

## 2. 🔗 AmoCRM Integration

### 2.1 Lead (Contact) Creation on Account Registration

When a user registers, a **Lead** is automatically created in **AmoCRM** with the following fields:

| Field                         | Source                  | Example                                                    |
| ----------------------------- | ----------------------- | ---------------------------------------------------------- |
| **Сумма счёта**               | Calculated / user input | `5000 ₽`                                                   |
| **Выбор букета (категория)**  | Registration form       | `Романтический / Seasonal / Luxe`                          |
| **Адрес доставки**            | Registration form       | `ул. Ленина, 25, кв. 10`                                   |
| **Дата доставки**             | Registration form       | `2025-10-08`                                               |
| **Интервал поставки букетов** | Registration form       | `1 раз в неделю`                                           |
| **Пожелания к букетам**       | Registration form       | `Больше зелени, без роз`                                   |
| **Email**                     | Registration form       | `user@example.com`                                         |
| **Реферальная ссылка**        | Generated on backend    | `https://sitename.ru/0f2b3a88-1bcd-4e67-b85e-bdd90399d501` |

**AmoCRM Endpoint:**

```
POST https://{subdomain}.amocrm.ru/api/v4/leads
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Sample Payload:**

```json
{
  "name": "New Flower Account – user@example.com",
  "custom_fields_values": [
    { "field_name": "Account Sum", "values": [{ "value": "5000" }] },
    { "field_name": "Bouquet Category", "values": [{ "value": "Seasonal" }] },
    { "field_name": "Delivery Address", "values": [{ "value": "ул. Ленина, 25" }] },
    { "field_name": "Delivery Date", "values": [{ "value": "2025-10-08" }] },
    { "field_name": "Interval", "values": [{ "value": "Weekly" }] },
    { "field_name": "Preferences", "values": [{ "value": "Больше зелени, без роз" }] },
    { "field_name": "Email", "values": [{ "value": "user@example.com" }] },
    { "field_name": "Referral Link", "values": [{ "value": "https://sitename.ru/0f2b3a88-..." }] }
  ]
}
```

---

## 3. 🎯 Project Goals

### 3.1 Seamless Data Synchronization

Ensure near real-time synchronization of critical data (leads, contacts) between **Next.js** and **AmoCRM**.

### 3.2 Automated Lead Generation

Automatically create or update leads when:

* A user registers
* A user updates bouquet preferences
* A user completes an order

### 3.3 Enhanced User Experience

Fast, responsive, and secure front-end built on **Next.js 15 (App Router)**.

### 3.4 Scalability & Maintainability

Modular structure with clear API layers, allowing easy updates or replacement of CRM integrations.

### 3.5 Security

* Tokens and secrets stored in `.env.local`
* OAuth 2.0 for AmoCRM
* HTTPS-only communication

---

## 4. ⚙️ Technical Approach

### 4.1 Next.js 15 (App Router)

**Structure:**

```
app/
├── api/
│   ├── auth/
│   │   ├── register/route.ts
│   │   ├── login/route.ts
│   │   ├── forgot/route.ts
│   └── amo/
│       ├── create-lead/route.ts
│       ├── refresh-token/route.ts
│       └── utils.ts
├── (auth)/
│   ├── signup/page.tsx
│   ├── login/page.tsx
│   └── forgot-password/page.tsx
├── (dashboard)/
│   └── account/page.tsx
.env.local
```

**Core Concepts:**

* **Server Components:** Handle secure data fetching and CRM calls.
* **Client Components:** Interactive UI (forms, dashboards).
* **API Routes (Route Handlers):** All AmoCRM interactions occur here (secure server-side proxy).

---

### 4.2 AmoCRM API

* **RESTful API** for managing leads, contacts, tasks, etc.
* **OAuth 2.0** for secure access (authorization code flow).
* **Webhooks** (optional): for syncing lead status changes back to the Next.js app.

---

## 5. 🔑 Core Integration Points

### 5.1 Contact Form / Registration

1. User submits registration form.
2. Data → `/api/auth/register`.
3. Internal API → `/api/amo/create-lead` → AmoCRM.
4. Response → 200 OK → Lead ID stored in user profile.

---

### 5.2 Displaying CRM Data

1. Server Component fetches `/api/amo/get-lead?email=user@example.com`.
2. The API retrieves and transforms data from AmoCRM.
3. Dashboard displays:

   * Account sum
   * Upcoming deliveries
   * Referral link

---

### 5.3 User Profile Sync

* Updates in the user dashboard trigger PATCH requests to AmoCRM.
* Example: changing bouquet preferences updates the related lead in CRM.

---

## 6. 🔒 Security Considerations

* All API keys and tokens stored server-side only.
* OAuth tokens refreshed automatically (server route `/api/amo/refresh-token`).
* Validation and sanitization on all form inputs.
* HTTPS enforced on production (e.g., Vercel + ActiveCloud domain).

---

## 7. 🧱 Future Enhancements

* Webhook listener for CRM → site synchronization.
* Dashboard for viewing lead progress and communication history.
* Integration with Google Tag Manager to track registration and subscription events.

---

* * *
## 🔑 2. API Example Code
### 2.1 `/api/auth/register/route.ts`

```javascript
import { NextResponse } from "next/server";
import { createLeadInAmoCRM } from "../../amo/utils";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // optional 
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, bouquet, address, deliveryDate, interval, wishes, accountSum } = data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral link
    const referralId = uuidv4();
    const referralLink = `https://sitename.ru/${referralId}`;

    // Save user in DB
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        referralLink,
        accountSum,
        bouquet,
        address,
        deliveryDate,
        interval,
        wishes,
      },
    });

    // Create lead in AmoCRM
    await createLeadInAmoCRM({
      email,
      bouquet,
      address,
      deliveryDate,
      interval,
      wishes,
      accountSum,
      referralLink,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 });
  }
}
```

* * *
### 2.2 `/api/amo/utils.ts`

```javascript
const AMO_DOMAIN = process.env.AMO_DOMAIN;
const AMO_ACCESS_TOKEN = process.env.AMO_ACCESS_TOKEN;

export async function createLeadInAmoCRM(payload: any) {
  const response = await fetch(`https://${AMO_DOMAIN}/api/v4/leads`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AMO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        name: `Flower Account - ${payload.email}`,
        custom_fields_values: [
          { field_name: "Account Sum", values: [{ value: payload.accountSum }] },
          { field_name: "Bouquet Category", values: [{ value: payload.bouquet }] },
          { field_name: "Delivery Address", values: [{ value: payload.address }] },
          { field_name: "Delivery Date", values: [{ value: payload.deliveryDate }] },
          { field_name: "Interval", values: [{ value: payload.interval }] },
          { field_name: "Preferences", values: [{ value: payload.wishes }] },
          { field_name: "Email", values: [{ value: payload.email }] },
          { field_name: "Referral Link", values: [{ value: payload.referralLink }] },
        ],
      },
    ]),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AmoCRM lead creation failed: ${error}`);
  }

  return response.json();
}
```

* * *
### 2.3 `/api/auth/login/route.ts`

```javascript
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  return NextResponse.json({ success: true, token });
}
```

* * *
### 2.4 `/api/auth/forgot/route.ts`

```javascript
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mailer"; // hypothetical mailer
export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

  const token = uuidv4();
  await prisma.resetToken.create({ data: { userId: user.id, token } });

  await sendMail(email, "Password Reset", `
    Click the link to reset your password:
    https://sitename.ru/reset-password?token=${token}
  `);

  return NextResponse.json({ success: true, message: "Password reset link sent" });
}
```