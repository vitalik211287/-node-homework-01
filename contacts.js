import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./package.json");
const contacts = path.join(`${contactsPath}`, "..", "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(`${contacts}`, { encoding: "utf8" });
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.find(
      ({ id }) => Number(id) === contactId || id === contactId
    );
    return contact || null;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.filter(
      ({ id }) => Number(id) !== contactId && id !== contactId
    );
    await writeFile(contacts, JSON.stringify(contact));
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: nanoid(3), name, phone, email };
    let data = await listContacts();
    const updatedContacts = [...data, newContact];
    await writeFile(contacts, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

export { addContact, removeContact, getContactById, listContacts };
