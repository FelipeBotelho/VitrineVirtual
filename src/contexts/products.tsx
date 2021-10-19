import { AxiosResponse } from "axios";
import React, {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useCastApi } from "../services/api";
import { ProductModel } from "../types/products";

interface ContextModel {
    products: ProductModel[];
    setProducts: Function;
}

const ProductsContext = createContext<ContextModel>({} as ContextModel);

const ProductsProvider: React.FC = ({ children }) => {
    const castApi = useCastApi();
    const [products, setProducts] = useState(new Array<ProductModel>());

    const loadData = useCallback(async (): Promise<void> => {
        const response: AxiosResponse<any> = await castApi.get(`products/`);
        setProducts(
            response.data.map((item: ProductModel) => {
                return { ...item, rate: Math.floor(Math.random() * 5) + 2 };
            })
        );
    }, [castApi]);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

function useProducts(): ContextModel {
    const context = useContext(ProductsContext);
    const { products, setProducts } = context;
    return { products, setProducts };
}
export { ProductsProvider, useProducts };
