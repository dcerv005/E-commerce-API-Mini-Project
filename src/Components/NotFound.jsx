import { Link, NavLink } from "react-router-dom";
import {Container, Row, Col, Image, Button} from "react-bootstrap";

function NotFound() {
    return (
        <Container fluid="md">
            <Row>
                <Col><h2>404 - Not Found</h2></Col>
            </Row>
            <Row>
                <Col lg={12}><p>Sorry, the page you are looking for does not exist.</p></Col>
            </Row>
            <Row>
                <Col lg={12}><p>You can always go back to the <NavLink as={NavLink} to='/'>home page</NavLink>.</p></Col>
            </Row>
            <Row>
                <Image src="src/Components/404.jpeg" height={'758rem'} />
            </Row>              
            

        </Container>
    )
}
export default NotFound;