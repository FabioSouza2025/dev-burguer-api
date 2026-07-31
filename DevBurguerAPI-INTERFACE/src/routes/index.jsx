import {  Route, Routes } from "react-router-dom";

import {Home, Menu, Cart, Checkout, CompletePayment, Orders, EditProduct, NewProduct, Products, Login, Register } from "../containers/index";
import { UserLayout} from "../layout/UserLayout";
import { AdminLayout } from "../layout/AdminLayout";

export function Router(){
    return (
        <Routes>
            <Route path="/" element={<UserLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/complete" element={<CompletePayment />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />} >
                <Route path="/admin/pedidos" element={<Orders />} />
                <Route path="/admin/editar-produto" element={<EditProduct />} />
                <Route path="/admin/novo-produto" element={<NewProduct />} />
                <Route path="/admin/produtos" element={<Products />} />
            </Route>
            
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        </Routes>
    )
}

