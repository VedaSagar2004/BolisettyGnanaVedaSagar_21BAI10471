

export const MovesCell = ({move, onClick}) => {
    return (
        <div onClick={onClick} className="flex items-center justify-center w-16 h-16 border-2 cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors">
            <div className="text-2xl text-white p-5">{move}</div>
        </div>
    );
}