import AddContactButton from "@/components/AddContactButton/AddContactButton";
import ContactList from "@/components/ContactList/ContactList";

const Home = () => {
  return (
    <div className="bg-slate-50 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full items-center sm:items-start">
        <ContactList />
        <AddContactButton />
      </main>
    </div>
  );
};

export default Home;
