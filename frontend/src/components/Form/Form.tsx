import { Dispatch, SetStateAction } from "react";

type FormProps = {
  isEdit?: boolean;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  surname: string;
  setSurname: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

const Form: React.FC<FormProps> = ({
  name,
  surname,
  email,
  phone,
  setName,
  setSurname,
  setEmail,
  setPhone,
  handleSubmit,
  isEdit = false,
}) => {
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
        <h1 className="text-xl font-bold">{isEdit ? "Edit" : "Add"} Contact</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 p-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="surname"
            className="block text-gray-700 font-semibold mb-2"
          >
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter surname"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isEdit ? "Edit" : "Add"} Contact
        </button>
      </form>
    </div>
  );
};

export default Form;
