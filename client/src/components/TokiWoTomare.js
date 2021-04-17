import React, { useState } from 'react';
import zaWarudo from "../media/za-warudo.jpg";

function TokiWoTomare({ show, close }) {

    return (
        <div onClick={close}>
            {show &&
                <div className="footer__za-warudo">
                    <img src={zaWarudo}></img>
                    <button onClick={close}>Ora Ora Ora</button>
                </div>
            }
        </div>

    );
}

export default TokiWoTomare
