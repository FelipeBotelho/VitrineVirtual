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
    addProduct: any;
    editProduct: any;
    deleteProduct: any;
    obterFavoritos: any;
    obterProdutosPorListaId: any;
    favoritarProduto: any;
    desfavoritarProduto: any;
    obterUltimoIdFavorito: any;
    realizarCompra: any;
    obterUltimasCompras: any;
}

const ProductsContext = createContext<ContextModel>({} as ContextModel);

const ProductsProvider: React.FC = ({ children }) => {
    const castApi = useCastApi();
    const [products, setProducts] = useState(new Array<ProductModel>());


    async function addProduct(product: any) {
        try {
            await castApi.post(`products/`, product);
            await loadData();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function editProduct(product: any) {
        try {
            await castApi.put(`products/${product.id}`, product);
            await loadData();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function deleteProduct(product: any) {
        try {
            await castApi.delete(`products/${product.id}`)
            await loadData();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function obterFavoritos(idUsuario: number) {
        try {
            const valores = await castApi.get(`favorito?idUsuario=${idUsuario}`);
            return valores.data;
        } catch (error) {
            return null;
        }
    }

    async function obterUltimoIdFavorito() {
        try {
            const valores: any = await castApi.get(`favorito?_sort=id&_order=desc`);
            return valores.data[0].id;
        } catch (error) {
            return 0;
        }
    }

    async function favoritarProduto(objeto: any) {
        try {
            await castApi.post(`favorito/`, objeto);
            await loadData();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function desfavoritarProduto(idFavorito: number) {
        try {
            await castApi.delete(`favorito/${idFavorito}`);
            await loadData();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function obterProdutosPorListaId(listaId: number[]) {
        try {
            let stringRequest = "";
            if (listaId.length == 1) {
                stringRequest = `?id=${listaId[0]}`;
            } else {
                stringRequest = `?id=${listaId[0]}`;
                for (var i = 1; i < listaId.length; i++) {
                    stringRequest += `&id=${listaId[i]}`
                }
            }
            const produtos = await castApi.get(`products${stringRequest}`);
            return produtos.data;
        } catch (error) {
            return [];
        }
    }

    async function realizarCompra(compra: any) {
        try {
            debugger;
            await castApi.post(`compras/`, compra);

            //atualizar quantidades dos produtos comprados
            compra.compra.forEach(async (element: any) => {
                let produto = products.find(x => x.id == element.idProduto);
                if (produto) {
                    await castApi.put(`products/${produto.id}`, produto);
                }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function obterUltimasCompras(idUsuario: number){
        try {
            const valores = await castApi.get(`compras?idUsuario=${idUsuario}&_sort=id&_order=desc`);
            return valores.data;
        } catch (error) {
            return [];
        }
    }

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
        <ProductsContext.Provider value={{ products, setProducts, addProduct, editProduct, deleteProduct, obterFavoritos, obterProdutosPorListaId, favoritarProduto, desfavoritarProduto, obterUltimoIdFavorito, realizarCompra, obterUltimasCompras }}>
            {children}
        </ProductsContext.Provider>
    );
};

function useProducts(): ContextModel {
    const context = useContext(ProductsContext);
    const { products, setProducts, addProduct, editProduct, deleteProduct, obterFavoritos, obterProdutosPorListaId, favoritarProduto, desfavoritarProduto, obterUltimoIdFavorito, realizarCompra, obterUltimasCompras } = context;
    return { products, setProducts, addProduct, editProduct, deleteProduct, obterFavoritos, obterProdutosPorListaId, favoritarProduto, desfavoritarProduto, obterUltimoIdFavorito, realizarCompra, obterUltimasCompras };
}
export { ProductsProvider, useProducts };
