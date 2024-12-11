import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow p-8 sm:p-20">
        <h1 className="text-4xl font-bold mb-8">Welcome to Next.js</h1>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={24}
              height={24}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={24}
              height={24}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={24}
              height={24}
            />
            Go to nextjs.org →
          </a>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}