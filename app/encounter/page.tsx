import Link from "next/link";

export default function Page(){
    return (
<div className="flex justify-between h-full py-8">
  <h1 className="text-2xl font-bold">Rencontre</h1>
  <div>
    <Link 
      href="/encounter/create" 
      className="bg-blue-300 px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors"
    >
      Création
    </Link>
  </div>
</div>

    );
}