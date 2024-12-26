import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
//
import connectToDB from '@/database';

type ShoppingCartDoc = {
  // _id: ObjectId
  userId: string;
  cartIds: string[];
};

type Params = {
  id: string;
};

type CartBody = {
  productId: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const userId = params.id;

  const { db } = await connectToDB();
  const cart = (await db
    .collection('carts')
    .findOne({ userId })) as ShoppingCartDoc | null;

  if (!cart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const cartIds = cart.cartIds;
  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(
  request: NextRequest & {
    json: () => Promise<CartBody>;
  },
  { params }: { params: Params }
) {
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  if (!productId) {
    return new Response('Product ID not found!', {
      status: 404,
    });
  }

  const { db } = await connectToDB();
  const cartIds: Record<string, any> = { cartIds: productId };
  const updatedCart = await db
    .collection('carts')
    .findOneAndUpdate(
      { userId },
      { $push: cartIds },
      { upsert: true, returnDocument: 'after' }
    );

  if (!updatedCart) {
    return new Response('Cart not found!', {
      status: 404,
    });
  }

  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  revalidatePath('/cart', 'page');
  revalidatePath('/products', 'page');

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(
  request: NextRequest & {
    json: () => Promise<CartBody>;
  },
  { params }: { params: Params }
) {
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const { db } = await connectToDB();
  const cartIds: Record<string, any> = { cartIds: productId };
  const updatedCart = await db
    .collection('carts')
    .findOneAndUpdate(
      { userId },
      { $pull: cartIds },
      { returnDocument: 'after' }
    );

  if (!updatedCart) {
    return new Response('Cart not found!', {
      status: 404,
    });
  }

  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  revalidatePath('/cart', 'page');
  revalidatePath('/products', 'page');

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
