"use client"

import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter()
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center justify-center w-full">
                <h1 className="font-bold text-2xl"> Venkatesh Kashyap Assesment Project</h1>
            </div>
            <button onClick={ () => router.push("/login")} className="border-2 font-semibold border-blue-800 rounded-xl w-16 hover:bg-blue-800 hover:text-white">Login</button>
            <button onClick={ () => router.push("/signup")}  className="border-2 font-semibold border-blue-800 rounded-xl w-16 hover:bg-blue-800 hover:text-white" >Sign up</button>
           <span className=" flex items-center justify-center w-full"> 
            <a href="https://www.postman.com/science-participant-84749/workspace/assesmentv2/request/36295893-de6966ac-39b5-44a1-9030-4d04d10fae33?action=share&source=copy-link&creator=36295893&ctx=documentation">
            <img width="50" src="https://img.icons8.com/wired/128/postman-api.png" alt="postman-api"/>

            </a>
           </span>

            <div className="border-4 border-blue-600 rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-lg font-semibold mb-2">Discussion Routes</h3>
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/disccussion/createDiscussion</p>
                    <p><span className="font-semibold">Method:</span> POST</p>
                    <p><span className="font-semibold">Body:</span> text, imageUrl, hashtag, userId, username</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/disccussion/deleteDiscussion</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> userId, postId</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/disccussion/getDiscussion</p>
                    <p><span className="font-semibold">Method:</span> GET</p>
                    <p><span className="font-semibold">Search Params:</span> keywords</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/disccussion/updateDiscussion</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> userId, postId, newText</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/disccussion/updateDiscussionLikes</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> postId</p>
                </div>
            </div>

            <div className="border-4 border-blue-600 rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-lg font-semibold mb-2">Comments Routes</h3>
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/comments/addComments</p>
                    <p><span className="font-semibold">Method:</span> POST</p>
                    <p><span className="font-semibold">Body:</span> userId, username, postId, commentText</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/comments/deleteComment</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> userId, postId, commentId</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/comments/getComments</p>
                    <p><span className="font-semibold">Method:</span> GET</p>
                    <p><span className="font-semibold">Search Params:</span> postId</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/comments/updateComment</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> userId, postId, commentId, newText</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/comments/updateLikes</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> postId, commentId</p>
                </div>
            </div>

            <div className="border-4 border-blue-600 rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-lg font-semibold mb-2">Friends Routes</h3>
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/friends/addFriend</p>
                    <p><span className="font-semibold">Method:</span> PUT</p>
                    <p><span className="font-semibold">Body:</span> userId, username, currentUserId</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/friends/searchFriend</p>
                    <p><span className="font-semibold">Method:</span> GET</p>
                    <p><span className="font-semibold">Search Params:</span> username</p>
                </div>
            </div>

            <div className="border-4 border-blue-600 rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-lg font-semibold mb-2">Replies Routes</h3>
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/replies/addReply</p>
                    <p><span className="font-semibold">Method:</span> POST</p>
                    <p><span className="font-semibold">Body:</span> postId, commentId, replyText, userId, username</p>
                </div>
                
                <div className="mb-4">
                    <p><span className="font-semibold">Path:</span> api/replies/getReplies</p>
                    <p><span className="font-semibold">Method:</span> GET</p>
                    <p><span className="font-semibold">Search Params:</span> postId</p>
                </div>
            </div>
        </div>
    );
}

export default Page;
