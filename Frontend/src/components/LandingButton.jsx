
// Landing button component
export const LandingButton = ({onClick}) => {
    return <div>
        <button onClick={onClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Start Game
        </button>
    </div>
    
}