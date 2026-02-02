import { useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiAiGenerateText } from "react-icons/ri";
import { Modal } from "../ui/Modal";
import CreateMediaPost from "./createPosts/CreateMediaPost";
import CreateTextPost from "./createPosts/CreateTextPost";

const CreatePost = () => {
  const [openMediaPost, setOpenMediaPost] = useState(false)
  const [openTextPost, setOpenTextPost] = useState(false)

  const handleAddMediaPost =()=>{
    setOpenMediaPost(true)
  }
  const handleAddTextPost =()=>{
    setOpenTextPost(true)
  }

  return (
    <div className='w-full h-full text-theme-white  p-5 flex flex-col gap-20 justify-center items-center'>

      <div className='text-center'>
        <h3 className='uppercase text-4xl font-semibold'>Create post</h3>
        <p>Share something that no one knows!!</p>
      </div>

      <div className='w-[90%] h-fit flex flex-wrap gap-10 justify-center'>

        <div onClick={handleAddMediaPost} className='w-[20%] min-w-[150px] h-40 border-dashed border-2 rounded-2xl p-3 text-center text-lg leading-4 flex flex-col justify-center items-center hover:scale-110 transition-all cursor-pointer'>
          <MdOutlinePermMedia className="text-3xl m-2 select-none"/>
          <h5 className=" select-none">Add media post</h5>
        </div>
        {/* using modals to open add media post */}
        <Modal isOpen={openMediaPost} onClose={()=>{setOpenMediaPost(false)}}>
          <CreateMediaPost />
        </Modal>


        <div onClick={handleAddTextPost} className='w-[20%] min-w-[150px] h-40 border-dashed border-2 rounded-2xl p-3 text-center text-lg leading-4 flex flex-col justify-center items-center hover:scale-110 transition-all cursor-pointer'>
          <RiAiGenerateText className="text-3xl m-2 select-none"/>
          <h5 className=" select-none">Add text only post</h5>
        </div>
        {/* using modals to open add text post */}
        <Modal isOpen={openTextPost} onClose={()=>{setOpenTextPost(false)}}>
          <CreateTextPost />
        </Modal>

      </div>

    </div>
  )
}

export default CreatePost

//!show create post only if the user is a alumni , students cannot post, warna gand fat jayegi paise laga laga ke 