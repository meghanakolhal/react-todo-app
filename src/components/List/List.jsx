import { useState } from "react";
import AppButton from "../AppButton/AppButton";
import Button from "../AppButton/AppButton";
import Input from "../Input/Input";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import styles from "./List.module.css";
// eslint-disable-next-line react/prop-types
const List = ({
  tasks,
  swapItemListener,
  isDoneHandler,
  dltHandler,
  editItemListener,
  saveItemListener,
  cancelItemListener,
  itemListChangeHandler,
}) => {
  const [searchItem, setSearchItem] = useState("");
  // console.log(searchItem);
  // console.log(tasks);

  const searchHandler = (e) => {
    setSearchItem(e.toLowerCase().trim());
  };
  // eslint-disable-next-line react/prop-types
  const searchedItem = tasks.filter((task) =>
    task.item.toLowerCase().trim().startsWith(searchItem)
  );
  // console.log(searchedItem);

  // // eslint-disable-next-line react/prop-types
  const listItems = searchedItem.map((task, index) => {
    return (
      <div key={index} className={styles.listBox}>
        <li className={task.isDone ? styles.itemDoneStyle : " "}>
          {task.item}
          {!task.isEditing && (
            <>
              <Button
                btnLabel={"Edit"}
                className={styles.itemBtn}
                btnClickHandler={() => {
                  editItemListener(task.id);
                }}
                isDisabled={task.isDone}
              />
            </>
          )}
          {task.isEditing && (
            <>
              <Input
              className={styles.inp}
                inputVal={task.editingItem}
                inputChangeHandler={(e) => {
                  itemListChangeHandler(task.id, e);
                }}
              />
              <AppButton
                btnLabel={"Save"}
                className={styles.itemBtn}
                btnClickHandler={() => {
                  saveItemListener(task.id);
                }}
                isDisabled={task.editingItem.trim().length === 0}
              />
              <AppButton
                btnLabel={"Cancel"}
                className={styles.itemBtn}
                btnClickHandler={() => {
                  cancelItemListener(task.id);
                }}
              />
            </>
          )}

          <AppButton
            btnLabel={"Up"}
            className={styles.itemBtn}
            btnClickHandler={() => {
              swapItemListener(index, index - 1);
            }}
            isDisabled={index === 0 || searchItem.length}
          />
          <AppButton
            btnLabel={"Down"}
            className={styles.itemBtn}
            btnClickHandler={() => {
              swapItemListener(index, index + 1);
            }}
            // eslint-disable-next-line react/prop-types
            isDisabled={task.id === tasks.length || searchItem.length}
          />
          {!task.isDone && (
            <>
              <AppButton
                btnLabel={"Done"}
                className={styles.itemBtn}
                btnClickHandler={() => {
                  isDoneHandler(index);
                }}
              />
            </>
          )}
          {task.isDone && (
            <>
              {/* <AppButton
              btnLabel={"Delete"}
              className={styles.itemBtn}
              btnClickHandler={() => {
                dltHandler(index);
              }}
            /> */}
              <ModalConfirm
                btnName="Delete"
                modalBody="Are you sure, You want to delete this item?"
                modalTitle="Delete"
                className={styles.itemBtn}
                btnClickHandler={() => {
                  dltHandler(task.id);
                }}
                isDisabled={searchItem.length}
              />
            </>
          )}
        </li>
      </div>
    );
  });
  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <Input inputChangeHandler={searchHandler} placeholder="Search" />
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.list}>{listItems}</ul>
      </div>
    </>
  );
};
export default List;
