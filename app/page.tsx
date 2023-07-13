import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch(`http://127.0.0.1:5328/api/chat/hello`);
  return res.json();
}

export default function Home() {
  const data = getData();
  console.log(data);
  return <main>{data}</main>;
}
