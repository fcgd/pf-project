import "../globals.css";
import { previewData } from "next/headers";

export default function Home() {
  if (previewData()) {
    return (
      <main className="bg-black h-screen flex text-center">
        <h1 className="text-white m-auto text-4xl">Preview Mode</h1>
      </main>
    );
  }
  return (
    <main className="bg-black h-screen flex text-center">
      <h1 className="text-white m-auto text-4xl">Not in Preview Mode</h1>
    </main>
  );
}
