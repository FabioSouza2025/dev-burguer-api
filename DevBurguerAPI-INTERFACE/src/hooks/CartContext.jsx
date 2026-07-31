import { useContext, createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const putProductInCart = (product) => {
    /*
        Regras de Negócios
        
        - Produto chegou
        - SE SIM
          - Aumenta a quantidade dele

        - SE NÂO
          - Adiciono ele ao carrinho
     */
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);
    let newProductsInCart = [];

    if (cartIndex >= 0) {
      newProductsInCart = cartProducts;

      newProductsInCart[cartIndex].quantity += 1;

      setCartProducts(newProductsInCart);
    } else {
      product.quantity = 1;
      newProductsInCart = [...cartProducts, product];
      setCartProducts(newProductsInCart);
    }

    updateLocalStorage(newProductsInCart);
  };

  const clearCart = () => {
    setCartProducts([]);
    updateLocalStorage([]);
  };

  const deleteProduct = (productId) => {
    const newCart = cartProducts.filter((prd) => prd.id !== productId);
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const inCreaseProduct = (productId) => {
    const newCart = cartProducts.map((prd) => {
      return prd.id === productId
        ? { ...prd, quantity: prd.quantity + 1 }
        : prd;
    });

    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const decreaseProduct = (productId) => {
    /*
      Encontrar o item -> Tirar 1 de quantidade
      SE o item for igual 1 de quantity
      - Não fazer NADA
      - Deletar o produto do carrinho
    */
    const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((prd) => {
        return prd.id === productId
          ? { ...prd, quantity: prd.quantity - 1 }
          : prd;
      });

      setCartProducts(newCart);
      updateLocalStorage(newCart);
    } else {
      deleteProduct(productId);
    }
  };

  function updateLocalStorage(products) {
    localStorage.setItem("devburger:cartInfo", JSON.stringify(products));
  }

  //manter o estado quando atualizar
  useEffect(() => {
    const loadProducts = localStorage.getItem("devburger:cartInfo");
    if (loadProducts) {
      setCartProducts(JSON.parse(loadProducts));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        inCreaseProduct,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used with a context!");
  }

  return context;
};
