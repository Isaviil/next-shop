import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function GET(params: Request){

    const session = await getServerSession(authOptions);

    if (!session){
        return NextResponse.json({cart: [], message: "No hay un usuario activo"})
    }

    const cartItems = await prisma.orders.findMany({

        where: {userid: Number(session.user.id)},
        include: {products: true}
    });

    return NextResponse.json({cart: cartItems.map( x => ({...x, products: {...x.products, price: x.products?.price.toString()}}))});
}

//{...x, products: {...x.products, price: x.products?.price.toString()}}
export async function POST(params: Request) {
    // Item type
    type CartItem = {
        id: number;
        price: string;
        name: string;
        shortdescription: string;
        longdescription: string | null;
        imageurl: string;
        ishot: boolean | null;
    };

    // FrontInfo type
    type FrontInfoType = { cart: CartItem[] };

    // Receiving the data from the POST
    const session = await getServerSession(authOptions);
    const frontInfo: FrontInfoType = await params.json();

    // Sending to the database
    if (session) {
        const ordersToCreate = frontInfo.cart.map(item => ({
            userid: Number(session.user.id),
            productid: item.id
        }));


        await prisma.orders.createMany({ data: ordersToCreate });
        await prisma.shoppingcart.deleteMany({
            where: { userid: Number(session.user.id) }
        });

        return NextResponse.json({success: "Muchas gracias por tu compra!"})
    }
}