
import React, { useEffect } from "react";
import Product from "./Products";
import { useSelector, useDispatch } from "react-redux";
import { addAllProducts } from "../Redux/Reducer/Products";
import axios from 'axios';
import { db } from '../Firebase';
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// const productsList = [
//     {
//         _id: "100001",
//         img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         productName: "Round Table Clock",
//         price: "44.00",
//         color: "Black",
//     },
//     {
//         _id: "100002",
//         img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         productName: "Round Table Clock1",
//         price: "34.00",
//         color: "Black",
//     },
//     {
//         _id: "100003",
//         img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         productName: "Round Table Clock2",
//         price: "24.00",
//         color: "Black",
//     },
//     {
//         _id: "100004",
//         img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         productName: "Round Table Clock3",
//         price: "45.00",
//         color: "Black",
//     },
//     {
//         _id: "100005",
//         img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         productName: "Round Table Clock4",
//         price: "42.00",
//         color: "Black",
//     },
// ];

const ProductList = () => {
    const products = useSelector((state) => state.products.productList);
    const dispatch = useDispatch();
    // const [values, loading, error] = useCollectionData(
    //     collection(db, 'Products'),
    //     { idField: '_id' }
    //   );
    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const list = await axios.get('http://localhost:2999/products');
        //         dispatch(addAllProducts(list.data.products));
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // fetchData();
        // dispatch(addAllProducts(productsList));
    }, [dispatch]);
    const [values, loading, error] = useCollectionData(
        collection(db, 'Products'),
        { idField: '_id' }
      );
    useEffect(() => {
        if(!loading && !error)
            dispatch(addAllProducts(values));
    }, [values, loading, error]);
    //     if(!loading && !error)
    //         dispatch(addAllProducts(values));
    // }, [values, loading, error]);

    return (
        <div className="product-list-page">
            <div className="container mx-auto mt-16">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <Product
                            key={index}
                            _id={product._id}
                            img={product.img}
                            productName={product.productName}
                            price={product.price}
                            color={product.color}
                            totalCount={product.quantity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;

