"use client";

import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; 
// GLOBAL CUSTOM COMPONENTS

import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; 
// GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; 
//  LOCAL CUSTOM COMPONENT

import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper"; 

import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "contexts/SessionContext";
import { db } from "firebaseConfig";


const tableHeading = [{
  id: "name",
  label: "Name",
  align: "left"
}, {
  id: "collection",
  label: "Collection",
  align: "left"
}, {
  id: "qr-code",
  label: "QR Code",
  align: "left"
}, {
  id: "likes",
  label: "Likes",
  align: "left"
},{
  id: "published",
  label: "Published",
  align: "left"
},
{
  id: "action",
  label: "Action",
  align: "right"
}]; 
// =============================================================================


// =============================================================================
export default function ProductsPageView({}) {
  const [productList, setProductList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, "products");
        const q = query(productRef, where("createdBy", "==", user.uid));
        const productSnapshot = await getDocs(q);
        const products = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProductList(products);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      }
    };

    fetchProducts();
  }, [user]);

  const filteredProducts = productList.map(item => ({
    id: item.id,
    name: item.name,
    collectionId: item.collectionId,
    collectionName: item.collectionName,
    image: item.thumbnail,
    likes: item.userLikes ? item.userLikes.length : 0,
    published: item.published,
    qrCodeSettings: item.qrCodeSettings,
    qrCode: item.qr_code
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredProducts
  });
  return <PageWrapper title="Product List">
      <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/dashboard/products/create" searchPlaceholder="Search Product..." />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={productList.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((product, index) => <ProductRow key={index} product={product}/>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(productList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
}