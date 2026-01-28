const ProgressBar = ({ progress, className = '' }) => {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
            <div
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
