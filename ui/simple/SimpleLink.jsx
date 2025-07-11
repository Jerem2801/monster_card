import Link from 'next/link';

export default function SimpleLink({ name, href }) {
    return (
        <Link
            href={href}
            className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {name}
        </Link>
    );
}
