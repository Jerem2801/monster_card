export default function SimpleInputText({label,value,onChange}){
    return (
        <div className='flex-grow max-w-[700]'>
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type="text" id="default-input" value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-md" />
        </div>
    );
}