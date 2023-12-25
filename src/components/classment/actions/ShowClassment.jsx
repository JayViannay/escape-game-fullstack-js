import './show_classment.css';

const ShowClassment = ({setShowClassment, showClassment}) => {
    return (
        <button id="show_classment" 
        className="btn-success" 
        onClick={() => setShowClassment(!showClassment)}>
            {showClassment ? 'Hide Classment' : 'Show Classment'}
        </button>
    );
};

export default ShowClassment;