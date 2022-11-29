const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return await JSON.parse(contacts);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch (err) {
    console.log(err);
  }
}

async function newContacts(data) {
  try {
    const contactsData = JSON.stringify(data);
    await fs.writeFile(contactsPath, contactsData, "utf8");
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactsList = contacts.filter((contact) => contact.id !== contactId);
    newContacts(contactsList);
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const addContact = [...contacts, { id: nanoid(), name, email, phone }];
    newContacts(addContact);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
