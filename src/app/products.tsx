"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface Product {
  [key: string]: any;
}

export default function Products({ products }: { products: Product[] }) {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const [sortedItems, setSortedItems] = useState<Product[]>([]);

  useEffect(() => {
    let newCategories: string[] = [];
    products.forEach((val) => {
      let found = !!newCategories.find((cat) => val.category == cat);
      if (!found) newCategories = [...newCategories, val.category];
    });
    setCategories(newCategories);
  }, [products, setCategories]);

  useEffect(() => {
    setItems(products);
  }, [setItems, products]);

  useEffect(() => {
    console.log(items, "ORIGINAL ITEMS SORT");
    let newItems: Product[] = [...items];
    if (selectedSort === 1) {
      console.log("ASCENDING");
      newItems = newItems.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 2) {
      console.log("DESCENDING");

      newItems = newItems.sort((a, b) => b.price - a.price);
    } else {
      console.log("RETURN TO BASE");
      newItems = newItems;
    }
    setSortedItems(newItems);
  }, [items, selectedSort, setSortedItems]);

  function handleCategoryFilter(val: string) {
    const loc = categoryFilter.indexOf(val);
    if (loc > -1) {
      let newCat = [...categoryFilter.filter((cat) => cat !== val)];
      console.log(newCat, "HEY");
      setCategoryFilter(newCat);
    } else {
      setCategoryFilter([...categoryFilter, val]);
    }
  }

  useEffect(() => {
    if (categoryFilter.length > 0) {
      const newItems = products.filter((val) => {
        let found = false;
        categoryFilter.forEach((i) => {
          if (val.category === i) {
            found = true;
          }
        });
        return found;
      });
      setItems(newItems);
    }
  }, [categoryFilter, setItems, products]);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>sort by price</p>
        <div>
          <input
            type="radio"
            id={"no"}
            onChange={(e) => {
              setSelectedSort(0);
            }}
            name={"no"}
            checked={selectedSort === 0}
          />
          <label htmlFor={"no"}>{"no"}</label>
        </div>
        <div>
          <input
            type="radio"
            id={"ascending"}
            onChange={(e) => {
              setSelectedSort(1);
            }}
            name={"ascending"}
            checked={selectedSort === 1}
          />
          <label htmlFor={"ascending"}>{"Lowest Price"}</label>
        </div>
        <div>
          <input
            type="radio"
            id={"descending"}
            onChange={(e) => {
              setSelectedSort(2);
            }}
            name={"descending"}
            checked={selectedSort === 2}
          />
          <label htmlFor={"descending"}>{"Highest Price"}</label>
        </div>

        <p>filter by category</p>
        {categories.map((val) => {
          const checked = categoryFilter.find((cat) => cat == val);
          return (
            <div>
              <input
                type="checkbox"
                id={val}
                onChange={(e) => {
                  handleCategoryFilter(val);
                }}
                name={val}
                checked={!!checked}
              />
              <label htmlFor={val}>{val}</label>
            </div>
          );
        })}
        <div>
          {sortedItems.map((val) => {
            return (
              <div
                className="card"
                style={{
                  width: "18rem",
                  borderWidth: "2px",
                  borderRadius: "15px",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={val.images[0]}
                  className="card-img-top"
                  style={{ width: "100px" }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{val.title}</h5>
                  <p className="card-text">{val.description}</p>
                  <Link
                    className="btn btn-primary"
                    href={{
                      pathname: `/product/${stringToDash(val.title)}`,
                      query: val,
                    }}
                  >
                    View details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function stringToDash(str: string) {
  // 1. Convert to lowercase
  let dashedString = str.toLowerCase();

  // 2. Replace multiple spaces with a single hyphen
  dashedString = dashedString.replace(/\s+/g, "-");

  // 3. Optional: Remove any non-alphanumeric characters (except hyphens)
  // This step is useful for creating SEO-friendly slugs
  dashedString = dashedString.replace(/[^a-z0-9-]/g, "");

  // 4. Optional: Remove leading/trailing hyphens
  dashedString = dashedString.replace(/^-+|-+$/g, "");

  return dashedString;
}
