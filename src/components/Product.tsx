import { useRouter } from "next/navigation";
import { memo } from "react";
import Image from "next/image";

interface ProductProps {
  name: string;
  id: string;
  price: number;
  image: string | null;
  gender: string;
}

const Product = memo(function Product({ name, price, image, gender, id }: ProductProps) {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push(`/products/${id}`)} 
      className="flex flex-col w-70 cursor-pointer"
    >
      <div className="relative w-70 h-70">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-400" />
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="font-bold text-lg">{name}</div>
        <div>{gender}</div>
      </div>
      <div>{price}</div>
    </div>
  );
});

export default Product;
