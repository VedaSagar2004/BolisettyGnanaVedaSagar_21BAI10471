export const Instructions = () => {
    return <div>
        <div className="text-white flex justify-center text-4xl mt-28 mb-8">Piece Movement Guide</div>
        <div className="flex justify-around pb-6">
            <div>
                <ul className="list-inside text-white text-lg">Pawn (P): Moves 1 step in any direction</ul>
                <li className="text-white text-lg">Forward (F)</li>
                <li className="text-white text-lg">Backward (B)</li>
                <li className="text-white text-lg">Right (R) </li>
                <li className="text-white text-lg">Left (L)</li>
            </div>
            <div>
                <ul className="list-inside text-white text-lg">Hero1 (H1): Moves 2 steps in any direction</ul>
                <li className="text-white text-lg">Forward (F)</li>
                <li className="text-white text-lg">Backward (B)</li>
                <li className="text-white text-lg">Right (R) </li>
                <li className="text-white text-lg">Left (L)</li>
            </div>
            <div>
                <ul className="list-inside text-white text-lg">Hero2 (H2): Moves 2 steps Diagonally in any direction</ul>
                <li className="text-white text-lg">Forward-Left (FL)</li>
                <li className="text-white text-lg">Backward-Right (BR)</li>
                <li className="text-white text-lg">Forward-Right (FR)</li>
                <li className="text-white text-lg">Backward-Left (BL)</li>
            </div>
         </div>
    </div>
}

{/* <ul className="list-inside text-white">Piece Movement Guide</ul>
            <li className="text-white"><ul>Pawn(P): Moves 1 step in any direction</ul></li>
            <li className="text-white">(Forward(F), Backward(B), Right(R), Left(L))</li>
            <li className="text-white">Hero1(H1): Moves 2 steps in any direction(Forward(F), Backward(B), Right(R), Left(L))</li>
            <li className="text-white">Hero2(H2): Moves 2 steps Diagonally in any direction(Forward-Left(FL), Backward-Right(BR), Forward-Right(FR), Backward-Left(BL))</li> */}