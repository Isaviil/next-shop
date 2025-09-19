'use client';
import { Suspense } from "react";
import ItemPreview from "./preview";

export default function Page(){
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemPreview />
    </Suspense>
    )
}