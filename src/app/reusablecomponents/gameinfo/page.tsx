import GameInfo from "./gameinf";


export default async function Page(){
    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const data = await res.json();

    const product = data.products[0]; 

    return (
        <GameInfo products={product}/>
    )
}