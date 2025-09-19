import CartButton from "./cartbutton";

export default async function Page(){

    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const data = await res.json();

    return (
        <>
        {data.products.map((x: any) => (
            <CartButton key={x.id} productId={x.id} />
        ))}
        </>
    )
}