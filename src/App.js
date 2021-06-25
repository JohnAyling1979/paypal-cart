import { useState } from 'react';
import './App.css';
import MyPayPalButton from './Component/MyPaypalButton';
import CartCount from './Component/CartCount';
import { cloneDeep } from 'lodash';

function App() {
  const [items, setItems] = useState({
    itemCount: 0,
  });

  const add = item => {
    const currentItems = cloneDeep(items);

    if (currentItems[item.sku]) {
      currentItems[item.sku].quantity ++;
    } else {
      currentItems[item.sku] = {
        ...item,
        quantity: 1
      }
    }

    currentItems.itemCount ++;

    setItems(currentItems);
  }

  const clearCart = () => {
    setItems({
      itemCount: 0
    });
  }

  return (
    <div className="App">
      <CartCount items={items} />
      <div>
        <div className='item'>
          <div className='itemName'>
            item 1
          </div>
          <div className='itemCost'>
            $10.00
          </div>
          <div className='itemButton'>
            <button onClick={() => add({name: 'item 1', sku:'item-1', price: 10.00})}>add</button>
          </div>
        </div>
        <div className='item'>
          <div className='itemName'>
            item 2
          </div>
          <div className='itemCost'>
            $25.00
          </div>
          <div className='itemButton'>
            <button onClick={() => add({name: 'item 2', sku:'item-2', price: 25.00})}>add</button>
          </div>
        </div>
        <div className='item'>
          <div className='itemName'>
            item 3
          </div>
          <div className='itemCost'>
            $100.00
          </div>
          <div className='itemButton'>
            <button onClick={() => add({name: 'item 3', sku:'item-3', price: 100.00})}>add</button>
          </div>
        </div>
      </div>
      <MyPayPalButton clearCart={clearCart} items={items} />
    </div>
  );
}

export default App;
