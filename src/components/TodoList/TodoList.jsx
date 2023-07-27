import { useEffect, useState } from "react";
import AppButton from "../AppButton/AppButton";
import Input from "../Input/Input";
import List from "../List/List";
import styles from "./TodoList.module.css";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
const TodoList = () => {
  const [inpVal, setInpVal] = useState("");
  // console.log(inpVal);
  const [list, setList] = useState([]);
  const [doneList, setDoneList] = useState(true);

  const inputChangeHandler = (inpValue) => {
    setInpVal(inpValue);
  };
  const btnClickHandler = () => {
    const trimText = inpVal.trim();
    if (trimText) {
      setList([
        ...list,
        {
          item: trimText,
          editingItem: trimText,
          isDone: false,
          isEditing: false,
          id:list.length,
        },
      ]);
      setInpVal("");
    }
  };

  const inpKeyChangeHandler = (e) => {
    if (e.key === "Enter") {
      // console.log("user has entered")
      btnClickHandler();
    }
  };
  const LS_TODO_LIST = "Todo-list";
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(LS_TODO_LIST || [])));
  }, []);
  useEffect(() => {
    // console.log("componentDidUpdate")
    localStorage.setItem(LS_TODO_LIST, JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const done = list.filter((item) => item.isDone === true);
    // console.log(done.length)
    done.length === 0 ? setDoneList(true) : setDoneList(false);
  }, [list]);
  const swapItemListener = (initialIndex, finalIndex) => {
    const items = [...list];
    [items[initialIndex], items[finalIndex]] = [
      items[finalIndex],
      items[initialIndex],
    ];
    setList(items);
  };
  const isDoneHandler = (index) => {
    const items = [...list];
    console.log(index);
    items[index].isDone = true;
    setList(items);
  };

  const dltHandler = (index) => {
    const items = [...list];
    items.splice(index, 1);
    setList(items);
  };

  const clearAllhandler = () => {
    // const sure = confirm("Are you sure you want to clear all list items?");
    // {sure &&
    setList([]);
    // }
  };
  const editItemListener = (id) => {
    const items = [...list];
    items[id].isEditing = true;
    setList(items);
  };
  const itemListChangeHandler = (index, value) => {
    const items = [...list];
    items[index].editingItem = value;
    setList(items);
  };
  const saveItemListener = (index) => {
    const items = [...list];
    const item = items[index].editingItem.trim();
    if (item) {
      items[index].item = item;
      items[index].editingItem = item;
    }
    setList(items);
    items[index].isEditing = false;
  };

  const cancelItemListener = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    setList(items);
  };

  const clearDoneHandler = () => {
    const notDoneItems = list.filter((liItem) => {
      return liItem.isDone === false;
    });
    setList(notDoneItems);
  };

  
  return (
    <div className={styles.todoContainer}>
      <div>
        <Input
          inputChangeHandler={inputChangeHandler}
          inputVal={inpVal}
          keyDownHandler={inpKeyChangeHandler}
        />
        <AppButton
          btnLabel={"Add to List"}
          btnClickHandler={btnClickHandler}
          isDisabled={inpVal.trim().length === 0}
          className={styles.addToList}
        />
        {/* <AppButton
          btnLabel={"Clear All"}
          btnClickHandler={clearAllhandler}
          isDisabled={list.length === 0}
        /> */}
        <ModalConfirm
          btnName="Clear all"
          modalBody="Are you sure, you want to clear all list items?"
          modalTitle="Clear all"
          btnClickHandler={clearAllhandler}
          isDisabled={list.length === 0}
        />

        {/* <AppButton
          btnLabel={"Clear All Done items"}
          btnClickHandler={clearDoneHandler}
          isDisabled={list.length === 0}
        /> */}
        {/* {console.log(list.map((ele) => ele.isDone === true))} */}
        <ModalConfirm
          btnName="Clear all Done items"
          modalBody="Are you sure, you want to clear all Done items?"
          modalTitle="Clear All Done items"
          btnClickHandler={clearDoneHandler}
          isDisabled={doneList}
        />
      </div>

      <List
        tasks={list}
        swapItemListener={swapItemListener}
        isDoneHandler={isDoneHandler}
        dltHandler={dltHandler}
        editItemListener={editItemListener}
        saveItemListener={saveItemListener}
        cancelItemListener={cancelItemListener}
        itemListChangeHandler={itemListChangeHandler}
      />
    </div>
  );
};
export default TodoList;
