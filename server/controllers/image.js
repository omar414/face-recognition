const Clarifai = require('clarifai') 


const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = "c2d6002ce5514cb5a85031a39c8dfbf0";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "kbmtnshazs0t";
    const APP_ID = "test";
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    return requestOptions;
  };
  const handleApiCall = (req,res)=>{

      fetch(
        "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
        returnClarifaiRequestOptions(req.body.input)
      ).then((response) => response.text())
      .then(data=>{
        res.json(data)
      })
      .catch(err=>res.status(400).json("unable to work with API"))
  }
    // app.models.predict('face-detection', this.state.input)
const handleImage=(req, res,db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0].entries);
      })
      .catch((err) => res.status(400).json("unable to get entries"));
  }

  module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
  }