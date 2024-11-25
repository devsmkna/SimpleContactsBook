"use client";

import Contact from "@/types/Contact";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

const ContactPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [contactInfo, setContactInfo] = useState<Contact | undefined>(
    undefined
  );

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/contacts/${id}`, {
      method: "GET",
    });
    const data = await response.json();

    if (response.status === 200) {
      setContactInfo(data);
    } else {
      alert("Contact not found");
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  if (!contactInfo) {
    return <span>Loading...</span>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-500 text-white py-4 px-6 shadow-md flex items-center">
        <button
          onClick={() => history.back()}
          className="mr-4 p-2 bg-blue-400 rounded-full hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          title="Back"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Contact Details</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-2xl">
            {contactInfo.name.charAt(0)}
            {contactInfo.surname?.charAt(0)}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {contactInfo.name} {contactInfo.surname}
          </h2>
          <p className="text-gray-500">{contactInfo.email}</p>
          <p className="text-gray-500">{contactInfo.phone}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className="p-3 bg-red-100 text-red-500 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            title="Delete Contact"
            onClick={deleteContact}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 3V2a1 1 0 112 0v1h4V2a1 1 0 112 0v1h4a1 1 0 011 1v1H4V4a1 1 0 011-1h4zM5 6h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6zm2 2v10h2V8H7zm4 0v10h2V8h-2zm4 0v10h2V8h-2z" />
            </svg>
          </button>
          <Link
            href={`/edit/${id}`}
            className="p-3 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            title="Edit Contact"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-1.5a2.121 2.121 0 11-3-3L15.232 5.232zm0 0L5.232 15.232a2 2 0 00-.586 1.414V19.5a.5.5 0 00.5.5h2.854a2 2 0 001.414-.586L18.768 8.768z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
