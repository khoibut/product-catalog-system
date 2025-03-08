function CartItem() {
    return (
        <div className="flex gap-5 w-150 items-center">
            <div className="size-40 bg-gray-400">

            </div>
            <div className="flex flex-col gap-2">
                <div className="text-2xl font-semibold">
                    Product name
                </div>
                <div>
                    Size: L
                </div>
                <div>
                    Quanity: 1
                </div>
                <div className="flex justify-between w-100 items-end">
                    <div className="text-2xl font-semibold">
                        $99
                    </div>
                    <div className="text-sm underline select-none hover:cursor-pointer">
                        Remove
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartItem;