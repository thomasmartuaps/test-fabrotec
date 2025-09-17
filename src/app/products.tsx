"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface Product {
  [key: string]: any;
}

export default function Products({ products }: { products: Product[] }) {
  const [items, setItems] = useState<Product[]>();

  useEffect(() => {
    setItems(products);
  }, [setItems, products]);
  useEffect(() => {
    console.log(items);
  }, []);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>{JSON.stringify(products)}</div>
      </main>
    </div>
  );
}
