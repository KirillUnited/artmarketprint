import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { guestFavorites } from '../guest-store';

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('user-id')?.value ?? null;
}

async function getGuestId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('guest-id')?.value ?? null;
}

// DELETE /api/favorites/[id] — remove a product from favorites (guest in-memory store)
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await context.params;
    const userId = await getUserId();
    const guestId = await getGuestId();

    if (userId) {
      // Delete from database for logged-in user (placeholder)
      console.log('Deleting favorite from database for user:', userId, productId);
    } else if (guestId && guestFavorites[guestId]) {
      guestFavorites[guestId] = guestFavorites[guestId].filter(
        (fav) => fav.productId !== productId
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
