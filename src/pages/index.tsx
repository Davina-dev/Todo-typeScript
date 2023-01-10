import { v4 as uuidv4 } from "uuid";
import cx from "classNames";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

let myuuid = uuidv4();

interface TodoItem {
  id: string;
  message: string;
  done: boolean;
}

const Home: FC = () => {
  const [message, setMessage] = useState<string>("");
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);
  const [items, setItems] = useState<TodoItem[]>([
    {
      id: "123",
      message: "Buy Milk",
      done: true,
    },
  ]);
  const handleEnter = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (message) {
      setItems([
        {
          id: myuuid,
          message,
          done: false,
        },
        ...items,
      ]);
      setMessage("");
    }
  };

  const handleDone = (id: string) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    });

    setItems(_items);
  };

  return (
    <div>
      <div className="pt-12">
        <h6 className="mb-2 text-xs font-bold uppercase">Learning Next.js</h6>
        <div className="flex">
          <h1 className="text-4xl mt-3">Todo App</h1>
          <img
            className="w-16 ml-3 "
            src={
              "https://media4.giphy.com/media/CkISXfgTSLTmZUOwJE/200w.webp?cid=790b76112e21xz88ih4k30lelckml0tthzlzzgmml53q0423&rid=200w.webp&ct=s"
            }
            alt="cat list"
          />
        </div>
      </div>

      <div className="pt-2">
        <input
          className=" h-10 px-6 font-semibold rounded-md text-cyan-700 "
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button
          type="submit"
          className="h-10 px-6 font-semibold rounded-md bg-sky-600 text-white hover:bg-cyan-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {items
          .filter(({ done }) => !done)
          .map(({ id, message }) => (
            <li
              key={id}
              className={cx(styles.item)}
              onClick={() => handleDone(id)}
            >
              {"🌒  " + message}
            </li>
          ))}

        {items
          .filter(({ done }) => done)
          .map(({ id, message }) => (
            <li
              key={id + "j"}
              className={cx(styles.item, styles.done)}
              onClick={() => handleDone(id)}
            >
              {"🌒  " + message}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
