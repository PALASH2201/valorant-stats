import './spinner.css'
const Loading = () => {
    return (
        <div className="spinner-container">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default Loading;