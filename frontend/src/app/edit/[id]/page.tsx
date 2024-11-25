"use client";

import Form from "@/components/Form/Form";
import Contact from "@/types/Contact";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const EditContact = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [contactInfo, setContactInfo] = useState<Contact | undefined>(
    undefined
  );

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { name, surname, email, phone };

    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert("Contact edited successfully!");
      } else {
        alert("Failed to edit contact");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!contactInfo) {
      return;
    }
    setName(contactInfo.name);
    setSurname(contactInfo.surname);
    setEmail(contactInfo.email);
    setPhone(contactInfo.phone);
  }, [contactInfo]);

  return (
    <Form
      isEdit
      name={name}
      surname={surname}
      email={email}
      phone={phone}
      setName={setName}
      setSurname={setSurname}
      setEmail={setEmail}
      setPhone={setPhone}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditContact;
