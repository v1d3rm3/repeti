"use client";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo of repetir represents of people askwing questions"
        width={150}
        height={180}
        className="mr-20 select-none"
      />
    </Link>
  );
}
