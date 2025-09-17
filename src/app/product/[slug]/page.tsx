"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import { useSearchParams } from "next/navigation";

export default function Product() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const images = searchParams.get("images");
  const price = searchParams.get("price");
  const availabilityStatus = searchParams.get("availabilityStatus");

  function StockLabel(availStatus: string | null) {
    let label;
    switch (availStatus) {
      case "In Stock":
        label = (
          <span className="badge text-bg-primary">{availabilityStatus}</span>
        );
        break;
      case "Low Stock":
        label = (
          <span className="badge text-bg-warning">{availabilityStatus}</span>
        );
        break;
      case "No Stock":
        label = (
          <span className="badge text-bg-danger">{availabilityStatus}</span>
        );
        break;
      default:
        label = (
          <span className="badge text-bg-secondary">{availabilityStatus}</span>
        );
    }

    return label;
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              style={{
                width: "400px",
              }}
            >
              <img
                src={images?.toString()}
                className="d-block w-100"
                alt="..."
                style={{
                  width: "150px",
                }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <h5>
          Page for {title} {StockLabel(availabilityStatus)}
        </h5>

        <h5>{description}</h5>
        <p>Price: {price}</p>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
