import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const body = await req.json();
    const userId = body.id; 

    await prisma.users.update({
        where: { id: Number(userId) }, 
        data: {
            ...(body.name && { name: body.name }),
            ...(body.lastname && { lastname: body.lastname }),
            ...(body.email && { email: body.email }),
            ...(body.password && { password: body.password }),
        },
    });

    return NextResponse.json({ message: "Datos actualizados" });
}
