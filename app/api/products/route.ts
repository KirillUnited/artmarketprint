import { NextResponse } from "next/server";
import { getProductsByLimit } from "@/lib/actions/product.actions";

export async function GET() {
  try {
    const products = await getProductsByLimit(4);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Ошибка загрузки товаров" }, { status: 500 });
  }
}
