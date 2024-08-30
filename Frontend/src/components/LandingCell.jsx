
// order cell component
export const LandingCell = ({ piece, onClick, isSelected }) => {
    return (
        <div onClick={onClick} className={`border-2 ${isSelected ? 'bg-green-600' : 'bg-slate-700'} cursor-pointer transition-colors`}>
            <div className="text-3xl text-white p-20">{piece}</div>
        </div>
    );
}

