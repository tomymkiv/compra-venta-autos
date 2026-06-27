import { Post } from "@/types/types";
import { useState } from "react";

export default function usePriceConverter({ post }: { post: Post }) {
    const blueDolarUrl = 'https://api.bluelytics.com.ar/v2/latest';
    const [USDPrice, setUSDPrice] = useState(post.precio);
    const [ARSPrice, setARSPrice] = useState(post.precio);
    const [priceBtnActive, setPriceBtnActive] = useState(false);

    const convertPrice = () => {
        !priceBtnActive ? setPriceBtnActive(true) : setPriceBtnActive(false);

        fetch(blueDolarUrl)
            .then(data => data.json())
            .then(data => {
                const blueDolarValue = data.blue.value_avg;

                if (post.id_currency == 1) {
                    const USD_TO_ARS = blueDolarValue * post.precio;
                    setARSPrice(USD_TO_ARS);
                } else if (post.id_currency == 2) {
                    const ARS_TO_USD = Number(post.precio) / blueDolarValue;
                    setUSDPrice(ARS_TO_USD);
                }
            })
    }
    return { convertPrice, priceBtnActive, USDPrice, ARSPrice }
}
