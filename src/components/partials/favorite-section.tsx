import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaRegHeart, FaTimes } from "react-icons/fa";
import {
   Drawer,
   Button,
   Typography,
   IconButton,
   Badge,
} from "@material-tailwind/react";
import { Book } from "component-types";
import Image from "next/image";
import Link from "next/link";

const FavoriteSection = () => {
   const [cookies, setCookie, removeCookie] = useCookies(["favorite"]);
   const [items, setItems] = useState<Book[] | undefined>(undefined);
   const [open, setOpen] = useState(false);

   const openDrawer = () => setOpen(true);
   const closeDrawer = () => setOpen(false);
   useEffect(() => {
      setItems(cookies.favorite);
   }, [cookies.favorite]);
   return (
      <>
         <Badge content={items?.length}>
            <button className="text-4xl text-pink-400" onClick={openDrawer}>
               <FaRegHeart />
            </button>
         </Badge>
         <Drawer
            placeholder={"Favorites"}
            open={open}
            placement="right"
            onClose={closeDrawer}
            size={400}
         >
            <div className="mb-2 flex items-center justify-between p-4">
               <h3 className="text-2xl text-gray-700">Favorites</h3>
               <button onClick={closeDrawer}>
                  <FaTimes />
               </button>
            </div>
            <hr />
            <div className="p-4">
               {items ? (
                  <ul className="flex flex-col gap-4">
                     {items.map((item, i) => (
                        <li key={item.id} className="flex gap-2 items-end">
                           <Image
                              src={item.volumeInfo.imageLinks.thumbnail}
                              alt={item.volumeInfo.title}
                              width={50}
                              height={50}
                           />
                           <Link
                              href={`/book/${item.id}`}
                              className="text-lg text-gray-700"
                           >
                              {item.volumeInfo.title}
                           </Link>
                        </li>
                     ))}
                  </ul>
               ) : null}
            </div>
         </Drawer>
      </>
   );
};

export default FavoriteSection;
