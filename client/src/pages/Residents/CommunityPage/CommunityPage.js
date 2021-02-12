import React, { useState, useEffect } from "react";
import SimpleBottomNavigation from "../../../components/Layouts/SimpleBottomNavigation";
import ResidentPost from "../../../components/ResidentPost/ResidentPost";
import "./CommunityPage.css";
import HttpService from "../../../services/http-service";

function CommunityPage() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = () => {
    new HttpService().getAllPosts().then(
      (data) => {
        setAllPosts(data);
      },
      (err) => {}
    );
  };

  const mappingPosts = (posts) => {
    return posts.map((post, key) => (
      <ResidentPost
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
        userAvatarUrl={post.avatarUrl}
        key={key}
        comments={post.comments}
      />
    ));
  };

  return (
    <div className="community--page">
      <div className="community--page__posts">
        {mappingPosts(allPosts)}
        {/* comment section  */}
        {/* Footer navbar */}
      </div>
      <div className="community--page__bottom">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default CommunityPage;
