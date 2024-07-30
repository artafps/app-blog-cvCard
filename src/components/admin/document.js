import { useState, useEffect } from "react";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import axios from "axios";
import Markdown from 'markdown-to-jsx'

const Document = () => {
    const [DataMD, setDataMD] = useState('');



    const handleGetFileData = () => {
        const filePath = `https://raw.githubusercontent.com/artafps/app-blog-cvCard/main/README.md`;
        axios.get(filePath).then((res) => {
            setDataMD(res.data)
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        handleGetFileData()
    }, []);
    return (<MainLayoutAdmin title={'Document'}>
        <div>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <Markdown >{DataMD}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </MainLayoutAdmin>);
}

export default Document;