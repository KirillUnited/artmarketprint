import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Favorite } from '@/types/favorites';

// In-memory storage for guest users (in a real app, this would be a database)
let guestFavorites: Record<string, Favorite[]> = {};

// Helper function to get user ID (this is simplified - in a real app you'd use proper auth)
async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user-id')?.value;
  return userId || null;
}

// Helper function to get guest ID from cookies
async function getGuestId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('guest-id')?.value || null;
}

// GET /api/favorites - Get all favorites for the current user
export async function GET() {
  try {
    const userId = await getUserId();
    const guestId = await getGuestId();

    let favorites: Favorite[] = [];

    if (userId) {
      // Get favorites from database for logged-in user
      // This is a placeholder - in a real app you'd query your database
      favorites = []; // Replace with actual database query
    } else if (guestId) {
      // Get favorites from localStorage for guest user
      favorites = guestFavorites[guestId] || [];
    }

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

// POST /api/favorites - Add a product to favorites
export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const userId = await getUserId();
    let guestId = await getGuestId();
    let shouldSetGuestCookie = false;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const favorite: Favorite = {
      id: Math.random().toString(36).substring(7),
      userId: userId || null,
      productId,
      createdAt: new Date(),
    };

    if (userId) {
      // Save to database for logged-in user
      // This is a placeholder - in a real app you'd save to your database
      console.log('Saving favorite to database for user:', userId);
    } else {
      // Create a guest ID for first-time visitors
      if (!guestId) {
        guestId = crypto.randomUUID();
        shouldSetGuestCookie = true;
      }

      // Save to localStorage for guest user
      if (!guestFavorites[guestId]) {
        guestFavorites[guestId] = [];
      }
      guestFavorites[guestId].push(favorite);
    }

    const response = NextResponse.json({ favorite });

    if (shouldSetGuestCookie && guestId) {
      response.cookies.set('guest-id', guestId, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

// DELETE /api/favorites/:id - Remove a product from favorites
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId();
    const guestId = await getGuestId();

    if (userId) {
      // Delete from database for logged-in user
      // This is a placeholder - in a real app you'd delete from your database
      console.log('Deleting favorite from database for user:', userId);
    } else if (guestId && guestFavorites[guestId]) {
      // Delete from localStorage for guest user
      guestFavorites[guestId] = guestFavorites[guestId].filter(
        (fav) => fav.productId !== params.id
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}