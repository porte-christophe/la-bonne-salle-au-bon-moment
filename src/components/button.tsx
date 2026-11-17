import './button.css';

interface Button{
    description: string;
    onClick?: () => void;
}


function Button({ description, onClick }: Button) {
    return (
        <>
            <button onClick={onClick}>{description}</button>
        </>
    )
}

export default Button;