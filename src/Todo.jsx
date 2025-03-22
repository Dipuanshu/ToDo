
import React, { useEffect } from "react";
import { useState, useRef } from "react";

function Todo() {
  let savedText = localStorage.getItem("my-item") || "[]";

  const [show, setshow] = useState(true);

  const [name, setname] = useState("");
  const [list, setlist] = useState(savedText ? JSON.parse(savedText) : []);

  useEffect(
    function () {
      localStorage.setItem("my-item", JSON.stringify(list));
    },
    [list]
  );

  const [doneList, setDoneList] = useState([]);

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
      setlist(function (ls) {
        console.log(...ls, data);
        return [...ls, data];
      });
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
      <div className="flex items-center w-full h-16 px-8 mx-auto text-lg font-semibold border border-gray-400 broder-b max-w-7xl">
        XTodo
      </div>
      <div className="py-10 ">
        <div className="mx-auto max-w-7xl">
          <div id="todoh" className="">
            <h1 className="px-8 text-3xl font-bold ">Things to get done</h1>
            <div className="px-8 py-4">
              <h2 className="text-lg font-semibold leading-6 text-gray-900">
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
              {list.length > 0 ? (
                list.map((a) => {
                  return (
                    <div className="flex items-center mt-2">
                      <input type="checkbox" onChange={() => markAsDone(a)} />
                      <div className="ml-3 text-sm">{a}</div>
                    </div>
                  );
                })
              ) : (
                <div>No Todos Here!</div>
              )}
            </div>
          </div>

          {show && (
            <button
              onClick={hadleButton}
              className="bg-yellow-500 border rounded-full hover:bg-yellow-600 ml-7"
            >
              <p className="px-3 py-2 text-sm font-semibold text-white">
                + Add a Todo
              </p>
            </button>
          )}
          {!show && (
            <div className="mt-4 bg-white shadow">
              <div className="px-4 py-5 text-lg font-semibold leading-6 text-gray-900 ">
                Create a Todo{" "}
              </div>
              <div className="ml-4 border border-gray-300 rounded-md w-72">
                <form onSubmit={handleSumbit}>
                  <input
                    onChange={hadleChangeButton}
                    value={name}
                    className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    type="text"
                    placeholder="Write an article about XState"
                  ></input>
                </form>
              </div>
              <button
                onClick={hadlesaveButton}
                onSubmit={handleSumbit}
                className="mt-4 ml-4 bg-yellow-500 border rounded-md hover:bg-yellow-600"
              >
                <p className="px-3 py-2 text-sm font-semibold text-white">
                  Save
                </p>
              </button>
              <button
                onClick={hadleCancleButton}
                className="mt-4 mb-4 ml-4 border rounded-md"
              >
                <p className="px-3 py-2 text-sm font-semibold e">Cancle</p>
              </button>
            </div>
          )}
          <div className="mt-4">
            <p className="px-8 text-lg font-semibold leading-6 text-gray-900">
              Things done
            </p>
          </div>
          <div>
            {/* <div className="flex items-center px-8 mt-4">
							<input type="checkbox" defaultChecked="true" />
							<p className="ml-3">clean my coputer</p>
						</div> */}
            {doneList.map((d) => {
              return (
                <div className="flex items-center px-8 mt-4">
                  <input
                    type="checkbox"
                    defaultChecked="true"
                    onChange={() => markAsNotDone(d)}
                  />
                  <p className="ml-3">{d}</p>
                  <button
                    className="bg-orange-700 border border-red-600 rounded-md"
                    onClick={() => {
                      setDoneList(
                        doneList.filter(function (item) {
                          return d != item;
                        })
                      );
                    }}
                  >
                    Close
                  </button>
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