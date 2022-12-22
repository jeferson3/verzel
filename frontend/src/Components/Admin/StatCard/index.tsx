import {Card} from "react-bootstrap";
import "./style.css";


type Props = {
    variant: string,
    title: string,
    value: number,
    icon: string,
}

export const StatCard: React.FC<Props> = ({ variant, icon, title, value }) => {

    return (
        <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Header>
                <i className={icon}></i>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {value}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}