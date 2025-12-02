 document.addEventListener("DOMContentLoaded", () => {
        fetch("dummyData.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const posts = data.posts || [];

            document.getElementById("posts-data-box").textContent =
              JSON.stringify(posts, null, 2);
         
          })
          .catch((error) => {
            const msg = "Error fetching data: " + error;
            document.getElementById("posts-data-box").textContent = msg;
          });


      });
