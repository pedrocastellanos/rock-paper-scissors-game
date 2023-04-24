import { VALUES } from "../constants"
import useChooise from "../useChooise"

export const Img = ({option, active, handleClick}) => {
    return (
        <span className={`option_image ${active === option ? 'active' : ''}`} onClick={handleClick} data-name={option}>
            <img src={VALUES[option]} alt={option.toUpperCase()} />
            <p style={{textTransform: 'capitalize'}}>{option}</p>
        </span>
    )
}
