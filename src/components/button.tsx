import './button.css';

interface Button{
    description: string;
}


function Button({description}: Button){
return(
    <>
    <button>{description}</button>
    </>
)

}

export default Button;