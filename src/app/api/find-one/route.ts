import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/context/auth/authOptions";
import { getServerSession } from "next-auth";


export async function GET(request: Request) {
    
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));

    const found = await prisma.products.findFirst({ where: {id: id}})
    const session = await getServerSession(authOptions)

    //Looking in the cart if already exists
    const isInCart = await prisma.shoppingcart.findFirst({where: {userid: Number(session?.user.id), productid: id}})

    if (isInCart){
        return NextResponse.json({ product: found, warning: "En tu carrito"})
    }

    //Looking in the orders if already exists
    const isInOrders = await prisma.orders.findFirst({where: {userid: Number(session?.user.id), productid: id}})

    if (isInOrders){
        return NextResponse.json({ product: found, warning: "Producto ya adquirido"})
    }


    return NextResponse.json({product: found});

}
