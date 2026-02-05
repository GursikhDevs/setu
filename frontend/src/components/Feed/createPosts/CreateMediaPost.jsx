import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone"
import { MiniModal } from "../../ui/MiniModal";
import { BsEmojiSunglasses } from "react-icons/bs";
import axios from 'axios';

const Pre_API_URL = import.meta.env.VITE_API_URL;
const CreateMediaPost = () => {

  const [media, setMedia] = useState([])
  const [caption, setCaption] = useState("")
  const [createPost, setCreatePost] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [visibility, setVisibility] = useState("public")
  
  //to select multiple media, just change multiple media to true and update for selecting only one type of media
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
      "video/*": []
    },
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles) return;

      const filesWithPreview = acceptedFiles.map((file)=>(
        {
          file, 
          preview: URL.createObjectURL(file),
          type: file.type
        }
      ));
      setMedia(filesWithPreview)
    }
  });

  // Memory cleanup
  useEffect(() => {
    return () => {
      media.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [media]);

  const handlePostClick = async ()=>{
    
    if(!caption && media.length === 0 || media.length === 0){
      alert("Add media before posting")
      return
    }
    
    setIsPosting(true)

    const formData = new FormData();

    if(media.length > 0){
      formData.append("visibility", visibility)
      formData.append("text", caption)
      formData.append("media", media[0].file)
      console.log("formData:" + formData)
    }

    try{
      // const res = await fetch("http://localhost:3000/posts/createPost", {
      //   method: "POST",
      //   body: formData
      // });

      // const data = await res.json(); 
//        const API= `http://localhost:3000/posts/createPost`;
//       const res = await axios.post(API,formData, {
//   withCredentials: true,headers: {
//           'Content-Type': 'multipart/form-data' 
//         }
// });
  const API= `${Pre_API_URL}/posts/createPost`;
      const res = await axios.post(API,formData, {
  withCredentials: true
});
      const data= res.data;
      setCreatePost(true)
      console.log("Post created: ", data)

    }
    catch(error){
      console.log("Error posting", error);
    }
    finally{
      setIsPosting(false)
      setMedia([])
      setCaption("")
    }

  }

  const toggleVisibility =()=>{
    if(visibility === "public"){
      setVisibility("connections")
      return
    }
    setVisibility("public")
  }

  return (

    <div className="w-full h-full p-5 space-y-2 overflow-hidden bg-main-color text-theme-white">
      <h4 className="uppercase font-semibold px-2 py-5 text-3xl">Media post</h4>

      <div className="w-full h-[70%]  flex flex-col md:flex-row gap-5">
        {/* left name and id  */}
        <textarea 
        placeholder="Add description or title or about the post.. "
        className={`italic w-full max-w-[400px] p-2 resize-none border-2 min-h-[30%] h-[40%] md:h-[70%] rounded-2xl outline-none focus:outline-none focus:ring-0 active:ring-0 ${isPosting ? "opacity-80 cursor-not-allowed" : "cursor-text"}`} 
        value={caption}
        onChange={(e)=> setCaption(e.target.value)}
        name="" 
        id="">
        </textarea>

        {/* drag and drop area */}
        <div {...getRootProps()} className={`w-full max-w-[400px] h-[60%] md:h-[70%] border-2 border-dashed p-5 text-center rounded-2xl flex flex-col items-center justify-center ${isPosting ? "opacity-80 cursor-not-allowed" : "cursor-pointer"}`}>
          <input {...getInputProps()} />
          
          {media.length === 0 && (
            <p>Drag & drop media here, or click</p>
          )}

          <div className="flex h-full gap-4 flex-wrap justify-center">
            {media.map((item, i) => (
              item.type.startsWith("image") ? (
                <img
                  key={i}
                  src={item.preview}
                  className="w-auto h-full  rounded"
                  alt="selected image"
                />
              ) : (
                <video
                  key={i}
                  src={item.preview}
                  className="w-auto h-full rounded"
                  controls
                />
              )
            ))}
          </div>

          {/* to show the name of the file uploaded 
          {acceptedFiles.map((file) => (
            <p className="pt-2" key={file.name}>{file.name}</p>
          )
          )} */}
        </div>
      </div>

      <div className="w-full h-fit relative flex justify-between items-center px-5 mt-6 md:-mt-5">

        <div className="flex gap-2 items-center">
          <span className={`select-none ${visibility === "public" ? "": "opacity-60"}`}>Public</span>
          <button onClick={toggleVisibility} className={`w-9 h-5 border-2  rounded-full flex items-center cursor-pointer bg-[rgba(0,0,0,0.23)] border-theme-white transition-all hover:scale-x-110 ${visibility === "public" ? "justify-start":"justify-end"}`}>
            <span className="w-4 h-4 rounded-full bg-secondary-color"></span>
          </button>
          <span className={`select-none ${visibility === "private" ? "": "opacity-60"}`}>Only followers</span>
        </div>

        <button
        disabled={isPosting}
        onClick={handlePostClick} 
        className={`text-xl px-10 py-1 rounded-2xl uppercase bg-secondary-color text-white-color hover:scale-105 shadow-2xs shadow-theme-white ${isPosting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
        <MiniModal isOpen={createPost} onClose={()=> {setCreatePost(false)}}>
          <div className="relative w-full h-full text-theme-white flex flex-col items-center justify-center capitalize font-Urbanist text-2xl font-semibold p-4">
            <BsEmojiSunglasses className="text-4xl mb-1" />
            <h4>Post created</h4>

            <img className="absolute top-0 left-0 object-cover select-none w-full h-full " src="/images/celeb.gif" alt="" />
          </div>
        </MiniModal>
      </div>
    </div>
  )
}

export default CreateMediaPost