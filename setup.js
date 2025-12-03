document.addEventListener("DOMContentLoaded", () => {
  fetch("dummyData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const allPosts = data.posts || [];
      const currentTime = Math.floor(Date.now() / 1000);

      const calculateScore = (post, timeDecay, multiplier) => {
        const engagement =
          post.number_of_votes +
          post.number_of_clicks +
          post.number_of_comments;

        const timeFactor = Math.pow(
          currentTime - post.posted_at + 2,
          timeDecay
        );

        return (engagement / timeFactor) * multiplier;
      };

      // Medium Strength (Time Decay 1.8)
      let posts = allPosts.map((post) => ({
        ...post,
        score: calculateScore(post, 1.8, 100000000),
      }));

      // Low Strength (Time Decay 0.9)
      let postsLow = allPosts.map((post) => ({
        ...post,
        score: calculateScore(post, 0.9, 100000000),
      }));

      // High Strength (Time Decay 2.7)
      let postsHigh = allPosts.map((post) => ({
        ...post,
        score: calculateScore(post, 2.7, 10000000000000),
      }));

      const filterTopPosts = (postArray) => {
        postArray.sort((a, b) => b.score - a.score);
        const highestScore = postArray.length > 0 ? postArray[0].score : 0;
        const minScoreThreshold = highestScore * 0.4;
        return postArray.filter((post) => post.score >= minScoreThreshold);
      };

      const filteredPosts = filterTopPosts(posts).slice(0, 15);
      const filteredPostsLow = filterTopPosts(postsLow).slice(0, 15);
      const filteredPostsHigh = filterTopPosts(postsHigh).slice(0, 15);

      const feedEl = document.getElementById("feed");
      const feedLow = document.getElementById("feedLow");
      const feedHigh = document.getElementById("feedHigh");

      feedEl.innerHTML = "";
      feedLow.innerHTML = "";
      feedHigh.innerHTML = "";

      const renderPosts = (feedElement, postArray) => {
        postArray.forEach((post) => {
          const div = document.createElement("div");
          div.className = "post-item";

          const tagColors = {
            food: "orange",
            animals: "grey",
            games: "aqua",
            movies: "pink",
            memes: "yellow",
          };

          const tagColor = tagColors[post.tag] || "#ffbdc8";

          div.innerHTML = `

            <div
            style = "
             background: ${tagColor};
             padding: 0
             "
            >

            <p
                style="
                color: #121212;
    display: flex;
    justify-content: center;
    padding-top: 2vh;
                "
            >
                <strong></strong> ${post.tag}
            </p>

            <img 
                src="${post.image}" 
                alt="post image" 
                style="
                    width: 100%;
                    max-height: 33vh;
                    margin-top: 10px;
                "
            >

            <div
                style="
                    display: flex;
                    justify-content: space-evenly;
                "
            >
                <p><i class="fa fa-heart" aria-hidden="true"></i> ${post.number_of_votes}</p>
                <p><i class="fa fa-comment" aria-hidden="true"></i> ${post.number_of_comments}</p>
            </div>
            </div>
        `;

          feedElement.appendChild(div);
        });
      };

      renderPosts(feedEl, filteredPosts);
      renderPosts(feedLow, filteredPostsLow);
      renderPosts(feedHigh, filteredPostsHigh);
    })
    .catch((error) => {
      const msg = "Error fetching data: " + error;
      document.getElementById("posts-data-box").textContent = msg;
    });
});
