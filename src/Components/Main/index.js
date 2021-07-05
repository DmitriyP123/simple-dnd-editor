import React, { useState } from "react";
import { ItemTypes } from "../../ItemTypes";
import { useDrop } from "react-dnd";
import DraggingCard from "../DraggingCard";
import styles from "./styles.module.css";

function Main() {
  const [currentList, setCurrentList] = useState([
    { type: "text", id: "1" },
    { type: "picture", id: "2" },
  ]);
  const [Image, setImage] = useState("");
  const [droppedItems, setDroppedItems] = useState([]);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: (item, monitor) => {
      setCurrentList((prev) =>
        prev.filter((el) => {
          return el.id !== item.id;
        })
      );
      setDroppedItems((prev) => [...prev, item.type]);
    },
  }));
  const handleImageLoad = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <h1>Simple Editor</h1>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <h4>DND SideBar</h4>
          {currentList?.map((el) => {
            return <DraggingCard key={el.id} type={el.type} id={el.id} />;
          })}
        </div>
        <div
          className={styles.content}
          ref={drop}
          style={{
            backgroundColor: isOver ? "rgb(25, 156, 189)" : "rgb(66, 23, 167)",
          }}
        >
          <h2>DND WorkSpace</h2>
          {droppedItems?.map((el) => {
            if (el === "text") {
              return (
                <div>
                  <textarea
                    className={styles.textarea}
                    placeholder="Введите текст"
                  />
                </div>
              );
            }
            if (el === "picture") {
              return (
                <div>
                  <label htmlFor="uploadPic">
                    <img
                      src={Image ? Image : "http://placehold.it/400x400"}
                      alt=""
                      style={{ width: "400px", height: "400px" }}
                    />
                  </label>
                  <input
                    className="fileInput"
                    type="file"
                    id="uploadPic"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageLoad(e)}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Main;
