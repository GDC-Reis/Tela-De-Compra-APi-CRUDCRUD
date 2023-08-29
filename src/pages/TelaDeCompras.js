import './style.css';

import PageHeader from '../components/PageHeader';
import PageTitle from '../components/PageTitle';
import Summary from '../components/Summary';
import TableRow from '../components/TableRow';

import { useEffect, useState } from 'react';
import axios from 'axios';


const TelaDeCompra = () => {

  const productObject = {
    name: 'produto',
    category: 'categoria',
    price: 100,
    quantity: 1,
  }

  const [cart, setCart] = useState([]);

  const fetchData = () => {
    axios
    .get('https://crudcrud.com/api/0ef9f3f9cb674b7492675818517f3557/cart')
    .then((response) => setCart(response.data))
  }

  useEffect(() => {
    fetchData(); //Atualiza os dados da API
  }, [])

  const handleAddItem = () => {
    //insercao
    axios.post('https://crudcrud.com/api/0ef9f3f9cb674b7492675818517f3557/cart', productObject).then((response) => {
      console.log(response)
      fetchData();//Atualiza os dados da API
    })
  }

  const handleRemoveItem = (item) => {
    //remocao
    axios.delete(`https://crudcrud.com/api/0ef9f3f9cb674b7492675818517f3557/cart/${item._id}`).then(response => {
      console.log(response)
      fetchData();//Atualiza os dados da API
    })
  }

  const handleUpdateItem = (item, action) => {
    //alteração de quantidade
    let newQuantity = item.quantity;

    if(action === 'decrease'){
      if(newQuantity === 1){
        return;
      }
      newQuantity -= 1
    }else if(action === 'increce'){
      newQuantity += 1
    }

    const newData = {...item, quantity: newQuantity}
    axios.put(`https://crudcrud.com/api/0ef9f3f9cb674b7492675818517f3557/cart/${item._id}`, newData).then((response) => {
      console.log(response)
      fetchData();
    })
  }

    return ( 
        <>
        <PageHeader />
        <main>
          <PageTitle data={'Seu carrinho'} />
          <div className='content'>
            <section>
              <button onClick={handleAddItem}>Add to cart</button>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>-</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map(item => (
                    <TableRow 
                      key={item._id} 
                      data={item} 
                      handleRemoveItem={handleRemoveItem}
                      handleUpdateItem={handleUpdateItem}
                      /> 
                    ))}
                  {cart.length === 0 && (
                    <tr>
                      <td colSpan={'5'}>
                        <b>Carriho de compras <strong>vazio.</strong></b>
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </section>
           
            <aside>
              <Summary />
            </aside>

          </div>
        </main>
      </>
     );
}
 
export default TelaDeCompra;