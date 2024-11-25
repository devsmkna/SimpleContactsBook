"use client";

import Link from "next/link";
import "./contact.css";
import { MouseEventHandler } from "react";

type ContactProps = {
  id: string;
  name: string;
  surname: string;
  isFav: boolean;
};

const Contact: React.FC<ContactProps> = ({ id, name, surname, isFav }) => {
  const deleteContact: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        alert("Contact deleted successfully!");
        location.reload();
      } else {
        alert("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    }
  };

  const editFav: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isFav: !isFav,
        }),
      });

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    }
  };

  return (
    <div className="w-full flex items-center contact">
      <Link href={`/contacts/${id}`} className="flex items-center contact">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
          {surname?.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="text-gray-900 font-medium">
            <span>{name}</span>
            {surname && <b> {surname}</b>}
          </p>
        </div>
      </Link>
      <div className="ms-auto flex items-center gap-2">
        <button
          className={`${
            isFav
              ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-300"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-300"
          } p-2 rounded-full  focus:outline-none focus:ring-2`}
          title="Delete Contact"
          onClick={editFav}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-.882-1.767-3.268-1.767-4.15 0L5.6 7.214l-3.399.493c-1.918.278-2.695 2.639-1.298 3.978l2.457 2.396-.579 3.37c-.333 1.94 1.7 3.419 3.448 2.51L12 17.345l3.046 1.6c1.748.909 3.781-.57 3.448-2.51l-.579-3.37 2.457-2.396c1.397-1.339.62-3.7-1.298-3.978l-3.399-.493L12 4.248z" />
          </svg>
        </button>
        <button
          className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          title="Delete Contact"
          onClick={deleteContact}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 3V2a1 1 0 112 0v1h4V2a1 1 0 112 0v1h4a1 1 0 011 1v1H4V4a1 1 0 011-1h4zM5 6h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6zm2 2v10h2V8H7zm4 0v10h2V8h-2zm4 0v10h2V8h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Contact;
