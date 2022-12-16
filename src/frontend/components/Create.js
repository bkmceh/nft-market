import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'


const Create = ({ marketplace, nft }) => {
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [imageURL, setURL] = useState('')
    const [description, setDescription] = useState('')
    
    const createNFT = async () => {
        if (!price || !name || !description || !imageURL) return
        try {
            mintThenList(imageURL)
        } catch (error) {
            console.log("mint error: ", error)
        }
    }
    const mintThenList = async (result) => {
        const uri = result;
        console.log("here in minting")
        // mint nft 
        await (await nft.mint(uri)).wait()
        console.log("here after mint func")
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        console.log("here after tokenCount func")
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    }
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
                    <div className="content mx-auto">
                        <Row className="g-4">
                            <Form.Control onChange={(e) => setURL(e.target.value)} size="lg" required type="text" placeholder="Image URL" />
                            <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
                            <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
                            <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
                            <div className="d-grid px-0">
                                <Button onClick={createNFT} variant="primary" size="lg">
                                    Create And Upload NFT
                                </Button>
                            </div>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Create