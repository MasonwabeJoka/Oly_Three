"use client";

import { useRef, useState } from "react";
import styles from "./ThumbnailPicker.module.scss";
import Image from "@/components/Image";
import { screenshots } from "@/data/screenshots";

const ThumbnailPicker = () => {
  const [thumbnails, setThumbnails] = useState(screenshots.map((s) => s.url));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetIndexRef = useRef<number>(0);

  const handleEditClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    targetIndexRef.current = index;
    inputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setThumbnails((prev) => {
      const next = [...prev];
      next[targetIndexRef.current!] = url;
      return next;
    });
    setSelectedIndex(targetIndexRef.current!);
    e.target.value = "";
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Choose or upload a thumbnail. If not, the current video frame will be used
      </p>
      <ul className={styles.thumbnails}>
        {thumbnails.map((url, i) => (
          <li
            key={i}
            className={`${styles.thumbnail} ${selectedIndex === i ? styles.selected : ""}`}
            onClick={() => setSelectedIndex(i)}
          >
            <Image src={url} alt={`thumbnail ${i + 1}`} width={208} height={117} />
            <button className={styles.editBtn} onClick={(e) => handleEditClick(e, i)}>
              <Image src="/icons/pencil.svg" alt="edit" width={16} height={16} />
            </button>
          </li>
        ))}
      </ul>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </div>
  );
};

export default ThumbnailPicker;
