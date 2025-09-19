import CartButton from "./cartbutton";

export default async function Page(){

    interface Product {
    id: number;
    name: string;
    shortdescription: string;
    longdescription?: string | null;
    price: string;       // Prisma Decimal is usually returned as string in JSON
    imageurl: string;
    category?: string | null;
    }

    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const data = await res.json();

    return (
        <>
        {data.products.map((x: Product) => (
            <CartButton key={x.id} productId={x.id} />
        ))}
        </>
    )
}