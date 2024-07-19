import {Button, Card, Container} from 'react-bootstrap';
// import { Link } from 'react-router-dom';

function HomePage () {
    return (
        <body className='bg-secondary text-white border border-primary border-3 rounded-top container-fluid'>
            <div>
                <h1>Welcome to Our E-Commerce App</h1>
                <p>This is the place to find all your needs at one click.</p>
                
            </div>
            <Container fluid="sm">
                <Card className='mt-5 bg-info '> 
                    <Card.Img  variant="top" src="src/components/nikeLogo.jpeg"  height={"250rem"} alt='Nike Logo' />
                    <Card.Body>
                        <Card.Title>Featured Item</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Flash Sale</Card.Subtitle>
                        <Card.Text>
                            Nike on sale for $39.99. While limited supplies last.
                        </Card.Text>
                        <Card.Link href="/orders"><Button variant="primary" className='shadow-lg'>Shop Now</Button></Card.Link>
                        
                    </Card.Body>
                </Card>
            </Container>
        </body>
        
        
    )
}

export default HomePage;