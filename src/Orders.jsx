import axios from "axios";
import { Container, Form, Button, Col, Row, ListGroup, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const fullDate= new Date();
    const today= `${fullDate.getFullYear()}-${fullDate.getMonth()+1}-${fullDate.getDate()}`
    const estDelDate= `${fullDate.getFullYear()}-${fullDate.getMonth()+1}-${fullDate.getDate()+7}`
    
    const [orders, setOrders]=useState('')
    const [customer, setCustomer] = useState(null);
    const [product, setProduct] = useState(null)
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage]=useState('');
    
    const fetchProductList = async () => {
        try {
            const responseProducts = await axios.get('http://127.0.0.1:5000/products');
            setProducts(responseProducts.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCustomerList = async () => {
        try {
            const responseCustomers = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(responseCustomers.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            console.log(response)
            setOrders(response.data)
        } catch (error) {
            console.error('Error fetching orders: ', error)
        }
    };

    useEffect(() => {
        fetchProductList();
        fetchCustomerList();
        fetchOrders();
    }, []);

    const handleCustomerSelect = (customerSelect) => {
        setCustomer(customerSelect)
        
    }

    const handleProductSelect = (productSelect) => {
        setProduct(productSelect)
        

    }

    const removeProduct= () => {
        setProduct(null)
    }

    const removeCustomer= () => {
        setCustomer(null)
    }

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        try {
            
            
            await axios.post('http://127.0.0.1:5000/orders', {
                customer_id: customer.id,
                product_id: product.id,
                date: today,
                del_date: estDelDate,
            });
            setShowSuccessModal(true)
        } catch (error) {
            setErrorMessage(error.message)
        } 
        
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        
        setCustomer(null);
        setProduct(null);
    };
    
    

    if (customer && product) {
        
        
        
        return (
            <>
                <Container>
                    <h3>Order</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" as={Row} controlId='formGroupCustomer'>
                            <Col sm="2">
                                <Form.Label>Name:</Form.Label>
                            </Col>
                            <Col lg="8">
                                <Form.Control  type="text" name="customer" value={customer.name} />
                            </Col>
                            <Col sm="2"><Button variant="white" onClick={()=>removeCustomer()}>Remove</Button></Col>
                            
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row} controlId='formGroupCustomer'>
                            <Col sm="2">
                                <Form.Label>Product:</Form.Label>
                            </Col>
                            <Col lg="8">
                                <Form.Control  type="text" name="customer" value={product.name} />
                            </Col>
                            <Col sm="2"><Button variant="white" onClick={()=>removeProduct()}>Remove</Button></Col>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row} controlId='formGroupDelDate'>
                            <Col sm="2">
                                <Form.Label>Estimated Delivery Date:</Form.Label>
                            </Col>
                            <Col lg="8">
                                <Form.Control  type="text" name="del_date" value={estDelDate} />
                            </Col>
                            
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>

                </Container>
                <Modal show={showSuccessModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <ModalBody>Order is on its way!</ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            
            </>
        )
    }




    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <h3 className='text-center'>Customers</h3>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} onClick={()=>handleCustomerSelect(customer)} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                {customer.name} (ID: {customer.id})
                               
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
            {customer && (
                <>
                    <Container>
                    <h4>Selected Customer: </h4>
                        <Form >
                            <Form.Group controlId='formGroupCustomer'>
                                <Form.Control type="text" name="customer" value={customer.name} />
                            </Form.Group>
                        </Form>
                    </Container>
                </>
            )}
            <Container>
                <Row>
                    <Col>
                    <h3 className='text-center'>Products</h3>
                    <ListGroup>
                        {products.map(product => (
                            <ListGroup.Item key={product.id} onClick={()=>handleProductSelect(product)} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                {product.name} (ID: {product.id})
                                
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
            {product && (
                <>
                    <Container>
                        <h4>Selected Product: </h4>
                        <Form >
                            <Form.Group controlId='formGroupProduct'>
                                <Form.Control type="text" name="product" value={product.name} />
                            </Form.Group>
                        </Form>
                    </Container>
                </>
            )}

            {orders && (
                <Container>
                <Row>
                    <Col>
                    <h3 className='text-center'>Orders</h3>
                    <ListGroup>
                        {orders.map(order => (
                            <ListGroup.Item key={order.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                (ID: {order.id})
                                (Purchase Date: {order.date})
                                (Estimated Delivery Date: {order.del_date})
                                
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
            )}
           
        </>
    )
}

export default Orders;