import React from "react";

function CartCount({ items }) {
	let itemCountString = `${items.itemCount} item`;


	if (items.itemCount !== 1) {
		itemCountString += 's';
	}

	return (
		<div>
			{itemCountString}
		</div>
	);
}

export default CartCount;