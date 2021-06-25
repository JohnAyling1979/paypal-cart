import React from "react";
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function MyPayPalButton({ clearCart, items }) {
  const createOrder = (data, actions) => {
    const purchaseUnits = [{
      amount: {
        currency_code: 'USD',
        value: 0,
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: 0
          }
        }
      },
      items: [],
    }];

    Object.values(items).forEach(item => {
      if (typeof item === 'object') {
        purchaseUnits[0].amount.value += (item.price * item.quantity);
        purchaseUnits[0].amount.breakdown.item_total.value += (item.price * item.quantity);

        purchaseUnits[0].items.push({
          name: item.name,
          sku: item.sku,
          unit_amount: {
            currency_code: 'USD',
            value: item.price
          },
          quantity: item.quantity
        });
      }
    });

    return actions.order.create({
      purchase_units: purchaseUnits
    });
  };

  const onApprove = (data, actions) => {
    clearCart();

    return actions.order.capture();
  };

  if (items.itemCount === 0) {
    return <div>Add Items to your cart.</div>
  }

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      disable
    />
  );
}

export default MyPayPalButton