import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckouForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink }, } = useLocation()
    const { cartProducts, clearCart } = useCart();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha, tente novamente');
            return;
        }
    
        setIsLoading(true);
    
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });
    
        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message);
                toast.error(error.message);
            } else {
                setMessage("Ocorreu um erro inesperado.");
                toast.error("Ocorreu um erro inesperado.");
            }
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((product) => {
                    return { id: product.id, quantity: product.quantity, price: product.price };
                });
    
                const { status } = await api.post('/orders', { products }, {
                    validateStatus: () => true,
                });
    
                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                    }, 2000);
                    clearCart();
                    toast.success('Pedido Realizado com Sucesso');
                } else if (status === 409) {
                    toast.error('Falha ao Realizar seu Pedido');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error("Erro ao realizar o pedido:", error);
                toast.error("Falha no Sistema, tente novamente");
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
        }
    
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="dpm-integration-checker"
                    >
                        Preview payment methods by transaction
                    </a>
                </p>
            </div>
        </div>
    );
}
