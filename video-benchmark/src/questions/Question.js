import React from "react";

//simple question rendition
//future updates will include optional name of asker, and maybe a link to the history of their questions
function Question({question}) {

    return (
        <div className="Question">
            {question}
        </div>
    );
}

export default Question;