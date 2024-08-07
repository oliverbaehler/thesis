"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite"; 

import useWishList from "./use-wish-list"; 

import ProductCard1 from "components/product-cards/product-card-1"; 


//import Pagination from "page-sections/customer-dashboard/pagination";
// ==================================================================


// ==================================================================
export default function WishListPageView(props) {
  const {
    totalProducts,
    products
  } = props;
  const {
    currentPage,
    handleChangePage
  } = useWishList();
  return <Fragment>
      {
      /* PRODUCT LIST AREA */
    }
      <Grid container spacing={3}>
        {products.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
          </Grid>)}
      </Grid>

      {
      /* PAGINATION AREA
      <Pagination page={currentPage} count={Math.ceil(totalProducts / 6)} onChange={(_, page) => handleChangePage(page)} /> */
    }
      
    </Fragment>;
}