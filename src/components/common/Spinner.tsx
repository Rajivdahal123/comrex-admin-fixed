import * as React from 'react';

interface SpinnerProps {
    size?: number,
    color?: string
    className?: string,
}

const Spinner = ({size  = 20, color, className}: SpinnerProps) => {
    return (
        <div className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-${color || 'blue-700'} ${className}`} />
    )
}

export default Spinner;
