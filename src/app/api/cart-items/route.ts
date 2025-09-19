import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";




export async function POST(params:Request) {
    
    const session = await getServerSession(authOptions)

    //*Retrieve the info we sent from the frontend:body: JSON.stringify(toSend),
    const frontInfo = await params.json();

   if (!session?.user.id){
        throw ({error: "no hay un usuario activo"});
   }


   //*Exists in orders?
   const orderFound = await prisma.orders.findFirst({where: {userid: Number(session.user.id), productid: frontInfo.productId}})

   if (orderFound){
    return NextResponse.json({error: "Producto ya adquirido"});
   }


   //*Exists in cart?
   const cartFound = await prisma.shoppingcart.findFirst({where: {userid: Number(session.user.id), productid: frontInfo.productId}})

   if (cartFound){
    return NextResponse.json({error: "Producto en el carrito"});
   }



   //*Proceed if ok
   const addToCart = await prisma.shoppingcart.create({data: {userid: Number(session.user.id) , productid: frontInfo.productId}})

   return NextResponse.json({message: "En tu carrito"})

}


export async function GET() {

    const session = await getServerSession(authOptions)

   if (!session?.user.id){
        throw ({error: "no hay un usuario activo"});
   }

   //*Products: true
   const cartFound = await prisma.shoppingcart.findMany({where: {userid: Number(session.user.id)}, include: {products: true}})

   if (cartFound.length === 0){
    return NextResponse.json({ cart: [], message: "El carrito está vacío. Intenta agregar algo!" })
   }
   
   
   return NextResponse.json({cart: cartFound.flatMap(x=> x.products)});
}




export async function DELETE(params: Request){

    //*sessión data
    const session = await getServerSession(authOptions)

    //*Data from the frontend
    const frontInfo = await params.json();

   if (!session?.user.id){
        throw ({error: "no hay un usuario activo"});
   }

   //*Deleting
   const cartFound = await prisma.shoppingcart.deleteMany({where: {userid: Number(session.user.id), productid: frontInfo.productId}})

   //*Using .count to know if we were succesful
   if (cartFound.count>0){
     return NextResponse.json({deleteMessage: "Producto eliminado correctamente"})
   } else {
     return NextResponse.json({deleteMessage: "El producto no está en el carrito"})
   }

}