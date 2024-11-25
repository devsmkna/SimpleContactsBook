"use client";

import "./contactList.css";
import ContactType from "@/types/Contact";
import Contact from "../Contact/Contact";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const ContactList: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const sortType = params.get("sortType") || "name";
  const sortMethod = params.get("sortMethod") || "asc";

  const [search, setSearch] = useState("");
  const [contactsList, setContactsList] = useState<
    Array<Pick<ContactType, "id" | "name" | "surname" | "isFav">>
  >([]);

  const fetchContacts = async (sort: boolean = false) => {
    const response = await fetch(
      `http://localhost:3001/contacts${
        sort ? `?_sort=${sortMethod === "desc" ? "-" : ""}${sortType}` : ""
      }`
    );
    const data = await response.json();
    setContactsList(data);
  };

  useEffect(() => {
    if (search === "") {
      fetchContacts();
      return;
    }
    setContactsList(
      contactsList.filter(
        ({ name, surname }) =>
          name.toLowerCase().startsWith(search) ||
          surname?.toLowerCase().startsWith(search)
      )
    );
  }, [search]);

  const handleSortType = () => {
    const params = new URLSearchParams();
    const possibleValues = ["name", "surname", "email"];
    const newSortTypeIndex =
      (possibleValues.indexOf(sortType) + 1) % possibleValues.length;
    params.set("sortType", possibleValues[newSortTypeIndex]);
    params.set("sortMethod", sortMethod);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortMethod = () => {
    const params = new URLSearchParams();
    params.set("sortType", sortType);
    params.set("sortMethod", sortMethod === "asc" ? "desc" : "asc");
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchContacts(true);
  }, [sortMethod, sortType]);

  return (
    <>
      <div className="w-full">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="my-4 flex flex-row justify-end gap-4">
          <button
            onClick={handleSortType}
            className="text-white py-2 px-4 rounded-lg bg-blue-500 hover:bg-opacity-90"
          >
            Sort by {sortType}
          </button>
          <button
            onClick={handleSortMethod}
            className={`${
              sortMethod === "asc" ? "bg-green-500" : "bg-red-500"
            } text-white py-2 px-4 rounded-lg hover:bg-opacity-90`}
          >
            Sort {sortMethod === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>
      {contactsList.length > 0 ? (
        contactsList.map(({ id, name, surname, isFav }) => (
          <Contact
            id={id}
            name={name}
            surname={surname}
            isFav={isFav}
            key={id}
          />
        ))
      ) : (
        <span className="text-gray-500">No contacts yet.</span>
      )}
    </>
  );
};

export default ContactList;
