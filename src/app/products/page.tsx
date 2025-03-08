import Product from "@/components/Product";

export default function Products() {
    return (
        <>
            <div className="mt-15 font-body">
                <div className="bg-black text-white px-30 py-10">
                    <h1 className="text-4xl font-semibold">
                        Shop Men's
                    </h1>
                    <br></br>
                    <p className="w-125 text-lg">
                        Revamp your style with the latest designer trends in men’s clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.
                    </p>
                </div>
                <div className="flex gap-10 px-30 py-10">
                    <div className="w-1/4">
                        Filters
                    </div>
                    <div className="w-3/4">
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-10">
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}