interface ProductProps {
    name: string;
    price: number;
    image: string | null;
    gender: string;
}

function Product({ name, price, image, gender }: ProductProps) {
    return (
        <div className="flex flex-col w-70">
            <div className="size-70 bg-gray-400" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat:"no-repeat" }}>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="font-bold text-lg">
                    {name}
                </div>
                <div>
                    {gender}
                </div>
            </div>
            <div>
                {price}
            </div>
        </div>
    )
}
export default Product;