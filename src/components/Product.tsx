import { useRouter } from "next/navigation";
import { memo } from "react";

interface ProductProps {
    name: string;
    id: string;
    price: number;
    image: string | null;
    gender: string;
}

const Product = memo(
    function Product({ name, price, image, gender, id }: ProductProps) {
        const navigate = useRouter();
        return (
            <div onClick={() => {
                navigate.push(`/products/${id}`);
            }} className="flex flex-col w-70">
                <div className="size-70 bg-gray-400" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
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
)

export default Product;