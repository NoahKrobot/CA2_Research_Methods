document.addEventListener("DOMContentLoaded", () => {
  fetch("dummyData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var posts = data.posts || [];
      var currentTime = Math.floor(Date.now() / 1000);

      posts.forEach((post) => {
        var engagement =
          post.number_of_votes +
          post.number_of_clicks +
          post.number_of_comments;

        var timeFactor = Math.pow(currentTime - post.posted_at + 2, 1.8);

        var score = (engagement / timeFactor) * 100000000;

        post.score = score;
      });

      // document.getElementById("posts-data-box").textContent =
      //   JSON.stringify(posts, null, 2);

      const feedEl = document.getElementById("feed");

      posts.forEach((post) => {
        const div = document.createElement("div");
        div.className = "post-item";

        // div.innerHTML = `
        //   <h3>${post.published_by}</h3>
        //   <p><strong>Tag:</strong> ${post.tag}</p>
        //   <p><strong>Clicks:</strong> ${post.number_of_clicks}</p>
        //   <p><strong>Votes:</strong> ${post.number_of_votes}</p>
        //   <p><strong>Comments:</strong> ${post.number_of_comments}</p>
        //   <p><strong>Score:</strong> ${post.score.toFixed(6)}</p>
        //   <img src="${post.image}" alt="post image" style="width:150px;margin-top:10px;">
        // `;

        div.innerHTML = `
          <h3>${post.published_by}</h3>
          <p><strong></strong> ${post.tag}</p>
       
          <p><strong>Score:</strong> ${post.score.toFixed(6)}</p>
          <img src="${post.image}" alt="post image" style="
              width: 100%;
              max-height: 33vh;
              margin-top: 10px;"
          >
          <div
          style="
          display: flex;
          justify-content: space-evenly;"
          >


          <p><i class="fa fa-heart" aria-hidden="true"></i> ${
            post.number_of_votes
          }</p>
          <p><i class="fa fa-comment" aria-hidden="true"></i> ${
            post.number_of_comments
          }</p>
          </div>
        
       
          `;

        feedEl.appendChild(div);
      });
    })
    .catch((error) => {
      const msg = "Error fetching data: " + error;
      document.getElementById("posts-data-box").textContent = msg;
    });
});
