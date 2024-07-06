"use client";

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./Notes.module.css";

const Notes = () => {
  const [data, setData] = useState<string[]>([]);
  const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];

  useEffect(() => {
    const existingDataString = localStorage.getItem("myData");
    if (existingDataString) {
      const existingData = JSON.parse(existingDataString);
      setData(existingData);
    }
  }, []);

  return (
    <div className={styles.container}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter="20px">
          {data.map((item: any, idx: number) => (
            <div key={idx} className={styles.noteContainer} style={{ color: colors[idx % colors.length] }}>
              <div
                className={styles.noteHeader}
                style={{ backgroundColor: colors[idx % colors.length] }}
              >
                Note - {idx + 1}
              </div>
              <div
                className={`${styles.noteContent} ProseMirror`}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Notes;
