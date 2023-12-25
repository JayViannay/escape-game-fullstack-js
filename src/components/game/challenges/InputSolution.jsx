const InputSolution = ({handleUserSolution, setUserSolution}) => {
    return (
        <form onSubmit={handleUserSolution}>
            <div>
                $ _<input type="text" id="userInput" onChange={(e) => setUserSolution(e.target.value)} autoFocus />
            </div>
        </form>
    )
};

export default InputSolution;