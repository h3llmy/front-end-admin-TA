import React, { useState } from "react";

function TestForm({ onSubmit, setModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  onSubmit(async () => {
    try {
      const data = { name, email };
      console.log(data);
      // const [update] = await Promise.all([
      //   fetchApi.post("/product/update", {
      //     name,
      //     email,
      //   }),
      // ]);
      setModal(false);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </form>
    </>
  );
}

export default function Aselole() {
  const [a, setA] = useState();
  return (
    <>
      <TestForm
        onSubmit={(e) => {
          setA(e);
        }}
      />
      <button onClick={a}>asdas</button>
    </>
  );
}
