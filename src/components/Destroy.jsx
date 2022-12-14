import React from "react";
import { redirect } from "react-router-dom";
import { deleteTodo } from "";

export async function action({ params }) {
  throw new Error("Herre jävlar!");
  await deleteContact(params.contactId);
  return redirect("/");
}
