const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    return contactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = crypto.randomUUID();
    const contactsList = await listContacts();
    const newContacts = { id, name, email, phone };
    contactsList.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 4));
    return newContacts;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const newContactsList = contactsList.filter(
      (contact) => String(contact.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 4));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { listContacts, getContactById, addContact, removeContact };
