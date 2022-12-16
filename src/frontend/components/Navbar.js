import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import market from './snowflake.png'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" variant="light" style={{backgroundColor: "cornflowerblue"}}>
            <Container>
                <Navbar.Brand href="http://github.com/bkmceh">
                    <img src={market} width="40" height="40" className="" alt="" />
                    &nbsp; NFT Snowflake Marketplace
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">NFT Created By Me</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">NFT That I Bought</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;  