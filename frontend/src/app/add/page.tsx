"use client";

import Form from "@/components/Form/Form";
import { useState } from "react";

const AddContact = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { name, surname, email, phone };

    try {
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert("Contact added successfully!");
        // Reset form fields after success
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
      } else {
        alert("Failed to add contact");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    }
  };

  return (
    <Form
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

export default AddContact;
