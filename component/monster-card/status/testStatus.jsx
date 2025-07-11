export function toggleStatus(id,setSelectedStatuses){
    setSelectedStatuses((prev) =>
    prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
};