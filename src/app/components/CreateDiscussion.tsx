"use client"

import axios from "axios";
import { useState } from "react";

function CreateDiscussion() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Input validation
    if (!text || !imageUrl) {
      setError("Text and Image URL cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/discussion/createDiscussion", {
        text: text,
        imageUrl: imageUrl,
        hashtag: hashtag,
      });

      if (response.status === 200) {
        setSuccess("Discussion created successfully");
        setText("");
        setImageUrl("");
        setHashtag("");
      } else {
        setError("An error has occurred");
      }
    } catch (err) {
      setError("An error has occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-green-400">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="w-full text-wrap space-y-4">
        <textarea
          placeholder="Create Discussion"
          className="w-full p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Add image URL"
          className="w-full p-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Add hashtag"
          className="w-full p-2"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreateDiscussion;
