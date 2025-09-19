import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(params: Request){

    const session = await getServerSession(authOptions)
    
    //*Letting the backend know we want the "Category" column

    const url = new URL(params.url);

    const category = url.searchParams.get("category");
    const limit = url.searchParams.get("limit");

    const id = Number(url.searchParams.get("id"));

    //*If category exists, we filter by that; if not, undefined and we retrieve all data.
    const found = await prisma.products.findMany({
        where: {
            ...(id? {id}: undefined),
            ...(category? {category}: undefined)
        },
        take: limit? parseInt(limit) : undefined
    })  

    //*Check if there's no element found
    if (!found || found.length === 0) {
    return NextResponse.json({ error: "No se encontró el producto" }, { status: 404 });
    }

    
    //*React cant handle decimal, so we convert it here to return decimaL: string in the frontend
    return NextResponse.json({products: found.map((x)=> ({...x, price: x.price.toString()}))})

}


