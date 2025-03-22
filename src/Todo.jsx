/** @format */
import React from "react";
import { useState, useRef } from "react";

function Todo() {
  const savedText = localStorage.getItem("my-item");
  console.log("savedText", savedText);
  const [show, setshow] = useState(true);

  const [name, setname] = useState("");
  const [list, setlist] = useState(["clean my coputer", "Buy a keybord"]);
  const [doneList, setDoneList] = useState([
    "Write an article about @xstate/test",
  ]);

  console.log("list", list);

  function hadleButton() {
    setshow(false);
  }
  function hadleCancleButton() {
    setshow(true);
  }
  function hadleChangeButton(event) {
    setname(event.target.value);
  }

  function hadlesaveButton() {
    setshow(true);
    const data = name;
    if (name) {
      setlist((ls) => [...ls, data]);
      setname("");
    }
  }
  function handleSumbit(event) {
    setshow(true);
    event.preventDefault();

    const data = name;
    if (name) {
      setlist((ls) => [...ls, data]);

      setname("");
    }
  }
  function markAsDone(a) {
    const newList = list.filter((t) => t !== a);
    setlist(newList);
    setDoneList([...doneList, a]);
  }
  function markAsNotDone(d) {
    const newDoneList = doneList.filter((t) => t !== d);
    setDoneList(newDoneList);
    setlist([...list, d]);
  }

  return (
    <>
      <div className=" broder-b border border-gray-400 w-full flex items-center px-8 mx-auto font-semibold text-lg max-w-7xl h-16">
        XTodo
      </div>
      <div className="py-10 ">
        <div className="mx-auto max-w-7xl">
          <div id="todoh" className="">
            <h1 className=" font-bold text-3xl px-8">Things to get done</h1>
            <div className="py-4 px-8">
              <h2 className="text-lg  font-semibold leading-6 text-gray-900">
                {" "}
                Things to do
              </h2>

              {/* <div id="todos" className="">
								<div className="flex items-center mt-4">
									<input type="checkbox" id="myCheckbox" />
									<div className="ml-3">clean my coputer</div>
								</div>
								<div className="flex items-center mt-2">
									<input type="checkbox" />
									<div className="ml-3 text-sm">Buy a keybord</div>
								</div>
							</div> */}
              {list.map((a) => {
                return (
                  <div className="flex items-center mt-2">
                    <input type="checkbox" onChange={() => markAsDone(a)} />
                    <div className="ml-3 text-sm">{a}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {show && (
            <button
              onClick={hadleButton}
              className="border rounded-full bg-yellow-500 hover:bg-yellow-600  ml-7"
            >
              <p className="py-2 px-3 text-white font-semibold text-sm">
                + Add a Todo
              </p>
            </button>
          )}
          {!show && (
            <div className="mt-4 shadow bg-white">
              <div className=" text-lg font-semibold leading-6 text-gray-900 px-4 py-5">
                Create a Todo{" "}
              </div>
              <div className=" border border-gray-300 rounded-md w-72 ml-4">
                <form onSubmit={handleSumbit}>
                  <input
                    onChange={hadleChangeButton}
                    value={name}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm p-2"
                    type="text"
                    placeholder="Write an article about XState"
                  ></input>
                </form>
              </div>
              <button
                onClick={hadlesaveButton}
                onSubmit={handleSumbit}
                className="border rounded-md bg-yellow-500 hover:bg-yellow-600 mt-4 ml-4"
              >
                <p className="py-2 px-3 text-white font-semibold text-sm">
                  Save
                </p>
              </button>
              <button
                onClick={hadleCancleButton}
                className="border rounded-md mt-4 ml-4 mb-4"
              >
                <p className="py-2 px-3 e font-semibold text-sm">Cancle</p>
              </button>
            </div>
          )}
          <div className="mt-4">
            <p className="text-lg font-semibold leading-6 text-gray-900 px-8">
              Things done
            </p>
          </div>
          <div>
            {/* <div className="flex items-center mt-4 px-8">
							<input type="checkbox" defaultChecked="true" />
							<p className="ml-3">clean my coputer</p>
						</div> */}
            {doneList.map((d) => {
              return (
                <div className="flex items-center mt-4 px-8">
                  <input
                    type="checkbox"
                    defaultChecked="true"
                    onChange={() => markAsNotDone(d)}
                  />
                  <p className="ml-3">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Todo;
