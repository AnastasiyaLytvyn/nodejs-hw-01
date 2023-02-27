const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

program
  .name("MyCLI")
  .description("A simple CLI to manage your contacts")
  .version("1.0.0")
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .parse(process.argv);

const { action, id, name, email, phone } = program.opts();
console.log(action, id, name, email, phone);

(async () => {
  if (action === "list") {
    const result = await listContacts();
    console.table(result);
  }
  if (action === "get") {
    const result = await getContactById(id);
    console.log(result);
  }
  if (action === "add") {
    const result = await addContact(name, email, phone);
    console.log(result);
  }
  if (action === "remove") {
    await removeContact(id);
  }
})();
