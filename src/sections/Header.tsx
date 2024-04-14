import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const PAGES = [
"Homepage",
"Basic Questions",
"Detailed Questions",
"ERROR"
];

export function Header(): JSX.Element {
    const [currentPage, setCurrentPage] = useState<string>(PAGES[0]);
    function changePage(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.value){
            case "Home":
                setCurrentPage(PAGES[0]);
                break;
            case "Basic Quiz":
                setCurrentPage(PAGES[1]);
                break;
            case "Detailed Quiz":
                setCurrentPage(PAGES[2]);
                break;
            default:
                setCurrentPage(PAGES[3]);
        }
    }
    
    return(
        <div>
            <h1>Welcome to the Cool Career Corner!</h1>
            {/* <Button onClick={changePage}>Basic Quiz</Button> */}
            <p>{currentPage}</p>
            
        </div>
        
    )

}