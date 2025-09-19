import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useReducer, useState } from "react";
import { getAllUsersBesidesAuthenticatedOne } from "../../../api/user";
import { useAppContext } from "../../../lib/AppContext";
import type { User } from "../../../lib/Types";
import Loader from "../Loader";

const SearchUsers = ({
  setOpenModal,
  setReceiverId,
  setUsers,
  users,
}: {
  setOpenModal: (e: boolean) => void;
  setReceiverId: (e: number) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
}) => {
  const { user, token } = useAppContext();
  const [username, setUsername] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["users", username],
    queryFn: () =>
      getAllUsersBesidesAuthenticatedOne(user?.id || -1, token || "", username),
    placeholderData: keepPreviousData,
  });


  return isPending ? (
    <Loader />
  ) : (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-10">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-1/2 p-10 rounded-lg shadow z-20">
          <div className="flex items-center justify-between text-lg">
            <h1 className="font-semibold">Find People</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-red-500 cursor-pointer hover:scale-110 hover:rotate-180"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div>
            <input
              type="text"
              className="flex-1 rounded px-3 py-2 w-full mt-5 outline-none border border-gray-200"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex flex-col gap-3 mt-3">
              {data.map((dataUser: User, i: number) => {
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-3 pl-5 hover:bg-gray-100 rounded-lg cursor-pointer`}
                    onClick={() => {
                      if (!users.find((user) => user.id == dataUser.id))
                        setUsers([...users, dataUser]);
                      setReceiverId(dataUser.id);
                      setOpenModal(false);
                    }}
                  >
                    <img
                      src={dataUser.image}
                      alt=""
                      className="w-8 rounded-full"
                    />
                    <div className="font-semibold">{dataUser?.username}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
