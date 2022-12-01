import React from "react";

export default function Form() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1e7ql7.jpg",
    })

    const [allMemeImages, setAllMemeImages] = React.useState([])

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevForm => ({
            ...prevForm,
            [name]: value

        }))
    }

    React.useEffect(function(){
        console.log("siuuu")
        fetch("https://api.imgflip.com/get_memes")
            .then(res=> res.json())
            .then(data => setAllMemeImages(data.data.memes))
    },[])

    function getMemeImage() {
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevState => {

            return {
                ...prevState,
                randomImage: url
            }
        })
    }


    return (

        <div>
            <form className="meme-form">
                <div className="input--container">
                    <input
                        type="text"
                        required placeholder="Put the first meme word"
                        name="topText"
                        value={meme.topText}
                        onChange = {handleChange}
                        />
                    <input 
                    type="text" 
                    required placeholder="Put the Second meme word" 
                    value={meme.bottomText}
                    name="bottomText"
                    onChange = {handleChange}
                    />
                </div>
                <div className="submit-btn">
                    <input type="submit" value="Get Your Meme" onClick={getMemeImage} />
                </div>
            </form>
            <div className="meme--container">
                <img className="meme" src={meme.randomImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className=" meme--text bottom">{meme.bottomText}</h2>
            </div>

        </div>
    )

}