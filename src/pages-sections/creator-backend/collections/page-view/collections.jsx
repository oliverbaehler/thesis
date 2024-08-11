"use client";

import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAuth } from "contexts/SessionContext"; 

import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";

import useMuiTable from "hooks/useMuiTable";

import CollectionRow from "../collection-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";

// TABLE HEAD COLUMN DATA
const tableHeading = [{
  id: "name",
  label: "Name",
  align: "left"
}, {
  id: "qr-code",
  label: "QR Code",
  align: "left"
},  {
  id: "likes",
  label: "Likes",
  align: "left"
},  {
  id: "published",
  label: "Published",
  align: "left"
},{ 
  id: "action",
  label: "Action",
  align: "right"
}]; 

export default function CollectionsPageView({}) {
  const { user } = useAuth(); // Get the current user from context
  const [collections, setCollections] = useState([]);
  

  useEffect(() => {
    if (!user) return;

    const fetchCollections = async () => {
      try {
        const q = query(
          collection(db, "collections"),
          where("createdBy", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const collections = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCollections(collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, [user]);


  const filteredCollections = collections.map(item => ({
    id: item.id,
    name: item.name,
    image: item.thumbnail,
    likes: item.userLikes ? item.userLikes.length : 0,
    published: item.published,
    qrCodeSettings: item.qrCodeSettings || {},
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
    listData: filteredCollections,
    defaultSort: "name"
  });

  return (
    <PageWrapper title="Collections">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Collection"
        url="/dashboard/collections/create"
        searchPlaceholder="Search Collection..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredList.map(collection => (
                  <CollectionRow key={collection.id} collection={collection} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}