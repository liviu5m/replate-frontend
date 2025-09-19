import { useEffect, useState } from "react";
import { useAppContext } from "../../../lib/AppContext";
import { Users } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUsersConversation } from "../../../api/user";
import type { Message, User } from "../../../lib/Types";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchUsers from "./SearchUsers";

const Sidebar = ({
  setReceiverId,
  receiverId,
  setUsers,
  users,
}: {
  setReceiverId: (e: number) => void;
  receiverId: number;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
}) => {
  const { user, token } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsersConversation(user?.id || -1, token || ""),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && !openModal && users.length == 0) {
      const uniqueUsersMap = new Map<number, User>();
      console.log(users);
      data.forEach((message: Message) => {
        [message.sender, message.receiver].forEach((person) => {
          if (person.id !== user?.id) {
            uniqueUsersMap.set(person.id, person);
          }
        });
      });
      if (Array.from(uniqueUsersMap.values()).length > 0) {
        setReceiverId(Array.from(uniqueUsersMap.values())[0].id);
        setUsers(Array.from(uniqueUsersMap.values()));
      } else {
        setUsers([]);
      }
    }
  }, [data]);

  return isPending ? (
    <Loader />
  ) : (
    <div className="bg-white w-1/5">
      <div className="flex items-center gap-5 border-b border-gray-400 py-5 p-10">
        <img src={user?.image} alt="" className="w-10 rounded-full" />
        <div className="font-semibold">{user?.username}</div>
      </div>
      <div>
        <div className="flex items-center justify-between mt-5 p-3">
          <div className="text-gray-400 text-sm flex items-center gap-3">
            <Users />
            <h1>Users</h1>
          </div>
          <div
            className="text-gray-400 cursor-pointer p-1"
            onClick={() => setOpenModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div>
          {users.map((otherUser: User, i: number) => {
            return (
              <div
                key={i}
                className={`flex items-center gap-3 py-3 pl-5 hover:bg-gray-100 rounded-lg m-3 cursor-pointer ${
                  receiverId == otherUser.id && "bg-gray-100"
                }`}
                onClick={() => setReceiverId(otherUser.id)}
              >
                <img
                  src={otherUser.image}
                  alt=""
                  className="w-8 rounded-full"
                />
                <div className="font-semibold">{otherUser?.username}</div>
              </div>
            );
          })}
        </div>
      </div>
      {openModal && (
        <SearchUsers
          setOpenModal={setOpenModal}
          setUsers={setUsers}
          users={users}
          setReceiverId={setReceiverId}
        />
      )}
    </div>
  );
};

export default Sidebar;
