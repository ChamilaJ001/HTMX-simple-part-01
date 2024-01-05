import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle GET Request
app.get("/users", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  res.send(`<h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
      ${users.map((user) => `<li>${user.name}</li>`).join("")}
    </ul>
  `);
});

//Handle Post Request for temp converter
app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);

    res.send(`
      <p>${fahrenheit} degrees Farenheit is equal to ${celsius.toFixed(
      2
    )} degrees celsius.</p>
    `);
  }, 2000);
});

//Handle get req for poll
let counter = 0;
app.get("/poll", (req, res) => {
  counter++;
  const data = { value: counter };
  res.json(data);
});

//Handle GET request for weather
let currTemp = 20;
app.get("/get-temp", (req, res) => {
  currTemp += Math.random() * 2 - 1;
  res.send(currTemp.toFixed(1) + "C");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
