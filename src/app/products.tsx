"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface Product {
  [key: string]: any;
}

export default function Products({ products }: { products: Product[] }) {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

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

  function handleCategoryFilter(val: string) {
    const loc = categoryFilter.indexOf(val);
    if (loc > -1) {
      console.log(categoryFilter);
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
          {items.map((val) => {
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
                  <a
                    className="btn btn-primary"
                    href={`/product/${stringToDash(val.title)}`}
                  >
                    View details
                  </a>
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
