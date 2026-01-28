const Input = ({
    label,
    type = 'text', // text, email, password, textarea
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    disabled = false,
    required = false,
    rows = 4,
    className = '',
    ...props
}) => {
    const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500';
    const errorClasses = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${baseClasses} ${error ? errorClasses : ''}`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${baseClasses} ${error ? errorClasses : ''}`}
                    {...props}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        </div>
    );
};

export default Input;
