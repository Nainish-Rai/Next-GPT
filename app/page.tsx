import Image from "next/image";
import Link from "next/link";
import Input from "./components/Input";

async function getData(query: string) {
  const res = await fetch(`/api/chat/${query}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Home() {
  const data = await getData("act as teacher");
  console.log(data);
  return <main>{data}</main>;
}
