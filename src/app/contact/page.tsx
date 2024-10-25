import { Linkedin, Mail } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

export default function Contact() {
  return (
    <div className="flex flex-col items-center min-h-screen py-8 text-white">
      <h1 className="text-5xl font-bold mb-4 text-teal-400">Contact</h1>
      <p className="text-xl mb-8 max-w-2xl text-center text-gray-300">
        If you want to get in touch, feel free to contact me in any of the ways
        below
      </p>
      <div className="grid grid-cols-1 gap-2 text-lg text-teal-400 ">
        <span className="flex items-center">
          <Mail className="mr-4" />
          <a href="mailto:maciejkopec92@gmail.com" className="hover:underline">
            maciejkopec92@gmail.com
          </a>
        </span>
        <span className="flex items-center">
          <GitHubIcon className="mr-4" />
          <a href="https://github.com/kopecmaciej" className="hover:underline">
            kopecmaciej
          </a>
        </span>
        <span className="flex items-center">
          <Linkedin className="mr-4" />
          <a
            href="https://www.linkedin.com/in/m-kopec"
            className="hover:underline"
          >
            m-kopec
          </a>
        </span>
      </div>
    </div>
  );
}
