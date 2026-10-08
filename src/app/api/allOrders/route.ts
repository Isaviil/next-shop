import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
    const cartItems = await prisma.orders.findMany({
        include: { products: true }
    });

    return NextResponse.json({
        cart: cartItems.map(x => ({
            ...x,
            products: { ...x.products, price: x.products?.price.toString() }
        }))
    });
}