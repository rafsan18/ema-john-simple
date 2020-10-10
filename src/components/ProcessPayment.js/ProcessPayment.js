import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";

const ProcessPayment = () => {
    const stripePromise = loadStripe(
        "pk_test_51HaTGyDDhGhnZ8yfdnYLR4vlB0auqUsZpJ5IpSxOan0h8e4U38FvZg3e0ngzqOKJcPNRKSnyplipyL9B1Pm5jNPs00aZ5j2wCq"
    );
    return (
        <div>
            <Elements stripe={stripePromise}>
                <SplitCardForm></SplitCardForm>
            </Elements>
        </div>
    );
};

export default ProcessPayment;
