import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/context/auth/authOptions";
import { getServerSession } from "next-auth";



export async function POST(req: Request){

    const body = await req.json();

    const { name, lastname, email, password } = body;

    if (!name || !lastname || !email || !password) {
      return NextResponse.json(
        { error: "Hubo un error al crear la cuenta." },
        { status: 400 }
      );
    }

    await prisma.users.create({
      data: {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: body.password
      }
    })

    return NextResponse.json(
      { message: "Tu solicitud fue recibida" },
      { status: 201 }
    )
}


  export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: Number(session.user.id) },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true
      }
    });

    return NextResponse.json(user);
  }

  

  export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.users.update({
      where: { id: Number(session.user.id) },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.lastname && { lastname: body.lastname }),
        ...(body.email && { email: body.email }),
        ...(body.password && { password: body.password }),
      },
    });

    return NextResponse.json({
      message: "Datos actualizados",
    });
  }
