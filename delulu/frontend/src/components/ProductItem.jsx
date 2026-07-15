import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id ,image ,  name , price , scrool}) => {
    const {currency} = useContext(ShopContext);
 const handleClick = () => {
    if (scrool) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
   <Link onClick={handleClick} className="text-gray-700 cursor-pointer "to={`/product/${id}`}>
    <div className='overflow-hidden '>
    <img className ='hover:scale-110 transition ease-in-out'src={image[0]} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
   </Link>
  )
}

export default ProductItem
